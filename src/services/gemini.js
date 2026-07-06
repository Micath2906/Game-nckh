import { GoogleGenerativeAI } from '@google/generative-ai'

// Free tier: 2.0 Flash đã ngừng (6/2025). Ưu tiên Flash-Lite (quota cao hơn).
export const FREE_TIER_MODELS = ['gemini-2.5-flash-lite', 'gemini-2.5-flash']
export const MAX_PDF_BYTES = 10 * 1024 * 1024
export const MAX_QUESTIONS_FREE = 15

function buildPrompt(count, focus, subjectName, hasPdf) {
  const focusLine = focus?.trim()
    ? `Chủ đề: ${focus.trim()}.`
    : ''

  const subjectLine = subjectName ? `Môn: ${subjectName}.` : ''

  const sourceLine = hasPdf
    ? 'Dựa trên PDF đính kèm.'
    : 'Dựa trên chương trình THPT Việt Nam.'

  return `${sourceLine} ${subjectLine} ${focusLine}
Tạo ${count} câu phát biểu đúng/sai tiếng Việt (không dùng câu hỏi).
~50% đúng, ~50% sai hợp lý. Mỗi câu có explanation ngắn.
JSON array: [{"statement":"...","isTrue":true,"explanation":"..."}]`
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = () => reject(new Error('Không đọc được file PDF'))
    reader.readAsDataURL(file)
  })
}

function parseGeminiError(error) {
  const message = error?.message || ''

  if (message.includes('API key not valid') || message.includes('API_KEY_INVALID')) {
    return 'API Key không hợp lệ. Tạo key miễn phí tại Google AI Studio.'
  }
  if (message.includes('limit: 0') || message.includes('limit:0')) {
    return 'Free tier chưa kích hoạt cho project này. Kiểm tra quota tại AI Studio hoặc thử key mới.'
  }
  if (message.includes('429') || message.includes('quota') || message.includes('ResourceExhausted')) {
    return 'Đã hết quota free tier (giới hạn/phút hoặc/ngày). Thử lại sau hoặc giảm số câu/PDF nhỏ hơn.'
  }
  if (message.includes('503') || message.includes('overloaded')) {
    return 'Gemini đang quá tải. Thử lại sau vài phút.'
  }
  if (message.includes('404') || message.includes('not found') || message.includes('is not supported')) {
    return 'Model không khả dụng. Ứng dụng sẽ thử model free tier khác — thử lại.'
  }

  return message || 'Không thể tạo câu hỏi. Vui lòng thử lại.'
}

function parseQuestionsResponse(text) {
  let parsed
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error('AI trả về định dạng không hợp lệ. Vui lòng thử lại.')
  }

  if (!Array.isArray(parsed)) {
    throw new Error('AI trả về định dạng không hợp lệ.')
  }

  const questions = parsed
    .filter((q) => q.statement?.trim())
    .map((q) => ({
      statement: q.statement.trim(),
      isTrue: Boolean(q.isTrue),
      explanation: (q.explanation || '').trim()
    }))

  if (questions.length === 0) {
    throw new Error('AI không tạo được câu hỏi nào. Thử điều chỉnh môn học hoặc nội dung focus.')
  }

  return questions
}

async function generateWithModel(genAI, modelName, contents) {
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: 'application/json',
      maxOutputTokens: 4096,
      temperature: 0.7
    }
  })

  const result = await model.generateContent(contents)
  return parseQuestionsResponse(result.response.text())
}

function isRetryableModelError(error) {
  const message = error?.message || ''
  return (
    message.includes('404') ||
    message.includes('not found') ||
    message.includes('is not supported') ||
    message.includes('no longer available')
  )
}

export async function generateQuestionsFromPdf({ apiKey, pdfFile, count, focus, subjectName }) {
  if (!apiKey?.trim()) {
    throw new Error('Vui lòng nhập API Key Gemini')
  }

  const safeCount = Math.min(Math.max(count, 5), MAX_QUESTIONS_FREE)

  if (pdfFile) {
    if (pdfFile.type !== 'application/pdf') {
      throw new Error('Chỉ hỗ trợ file PDF')
    }
    if (pdfFile.size > MAX_PDF_BYTES) {
      throw new Error(`PDF tối đa ${MAX_PDF_BYTES / (1024 * 1024)}MB (phù hợp free tier)`)
    }
  }

  const genAI = new GoogleGenerativeAI(apiKey.trim())
  const prompt = buildPrompt(safeCount, focus, subjectName, Boolean(pdfFile))
  const contents = pdfFile
    ? [
        { inlineData: { mimeType: 'application/pdf', data: await fileToBase64(pdfFile) } },
        { text: prompt }
      ]
    : [{ text: prompt }]

  let lastError = null

  for (const modelName of FREE_TIER_MODELS) {
    try {
      return await generateWithModel(genAI, modelName, contents)
    } catch (error) {
      lastError = error
      if (error.message?.includes('AI trả về') || error.message?.includes('AI không tạo')) {
        throw error
      }
      if (!isRetryableModelError(error)) {
        throw new Error(parseGeminiError(error))
      }
    }
  }

  throw new Error(parseGeminiError(lastError))
}
