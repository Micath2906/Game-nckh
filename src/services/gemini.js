import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'

const GEMINI_MODELS = ['gemini-3.1-flash-lite'];
const QUESTION_SCHEMA = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      statement: { type: SchemaType.STRING },
      isTrue: { type: SchemaType.BOOLEAN },
      explanation: { type: SchemaType.STRING }
    },
    required: ['statement', 'isTrue']
  }
}

function buildPrompt(count, focus, subjectName, hasPdf) {
  const focusLine = focus?.trim() ? `Chủ đề: ${focus.trim()}.` : ''
  const subjectLine = subjectName ? `Môn: ${subjectName}.` : ''
  const sourceLine = hasPdf
    ? 'Dựa trên PDF đính kèm.'
    : 'Dựa trên chương trình THPT Việt Nam.'

  return `${sourceLine} ${subjectLine} ${focusLine}
Tạo đúng ${count} câu phát biểu đúng/sai tiếng Việt (không dùng dạng câu hỏi).
Khoảng một nửa isTrue=true, một nửa isTrue=false. Mỗi câu có explanation ngắn.

CHỈ trả JSON array hợp lệ, không markdown, không text thừa:
[{"statement":"...","isTrue":true,"explanation":"..."}]`
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
    return 'API Key không hợp lệ. Kiểm tra lại key tại Google AI Studio.'
  }
  if (message.includes('limit: 0') || message.includes('limit:0')) {
    return 'API chưa được kích hoạt cho project này. Kiểm tra tại AI Studio hoặc thử key khác.'
  }
  if (message.includes('429') || message.includes('quota') || message.includes('ResourceExhausted')) {
    return 'Đã vượt giới hạn API. Vui lòng thử lại sau.'
  }
  if (message.includes('503') || message.includes('overloaded')) {
    return 'Gemini đang quá tải. Vui lòng thử lại sau vài phút.'
  }
  if (message.includes('404') || message.includes('not found') || message.includes('is not supported')) {
    return 'Model không khả dụng. Ứng dụng sẽ thử model khác — thử lại.'
  }
  return message || 'Không thể tạo câu hỏi. Vui lòng thử lại.'
}

function extractJsonText(text) {
  const trimmed = text.trim()
  if (!trimmed) return ''

  const codeBlock = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (codeBlock) return codeBlock[1].trim()

  const arrayStart = trimmed.indexOf('[')
  const objectStart = trimmed.indexOf('{')

  // Array trước — tránh cắt nhầm từ { bên trong phần tử array
  if (arrayStart !== -1 && (objectStart === -1 || arrayStart < objectStart)) {
    const arrayEnd = trimmed.lastIndexOf(']')
    if (arrayEnd > arrayStart) {
      return trimmed.slice(arrayStart, arrayEnd + 1)
    }
  }

  if (objectStart !== -1) {
    const objectEnd = trimmed.lastIndexOf('}')
    if (objectEnd > objectStart) {
      return trimmed.slice(objectStart, objectEnd + 1)
    }
  }

  return trimmed
}

function getResponseText(response) {
  try {
    const text = response.text()
    if (text?.trim()) return text
  } catch {
    // fallback đọc trực tiếp từ parts
  }

  const parts = response.candidates?.[0]?.content?.parts || []
  return parts
    .filter((part) => part.text && !part.thought)
    .map((part) => part.text)
    .join('\n')
    .trim()
}

function parseBoolean(value) {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    const lower = value.trim().toLowerCase()
    if (lower === 'true' || lower === 'đúng') return true
    if (lower === 'false' || lower === 'sai') return false
  }
  return Boolean(value)
}

function normalizeQuestion(raw) {
  if (!raw || typeof raw !== 'object') return null

  const statement = (
    raw.statement ||
    raw.question ||
    raw.content ||
    raw.text ||
    raw.cau_hoi ||
    ''
  ).trim()

  if (!statement) return null

  return {
    statement,
    isTrue: parseBoolean(raw.isTrue ?? raw.is_true ?? raw.correct ?? raw.answer ?? true),
    explanation: (raw.explanation || raw.reason || raw.giai_thich || '').trim()
  }
}

function normalizeToQuestionList(parsed) {
  if (Array.isArray(parsed)) {
    return parsed.map(normalizeQuestion).filter(Boolean)
  }

  if (parsed && typeof parsed === 'object') {
    const candidates = [
      parsed.questions,
      parsed.items,
      parsed.data,
      parsed.results,
      parsed.cau_hoi
    ]

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate.map(normalizeQuestion).filter(Boolean)
      }
    }

    const single = normalizeQuestion(parsed)
    if (single) return [single]
  }

  return []
}

function tryParseJson(text) {
  const jsonText = extractJsonText(text)
  if (!jsonText) return null

  try {
    return JSON.parse(jsonText)
  } catch {
    // JSON có thể bị cắt cụt — thử cứu các object hoàn chỉnh
    const objects = [...jsonText.matchAll(/\{[^{}]*"statement"\s*:\s*"[\s\S]*?"[^{}]*\}/g)]
    if (objects.length === 0) return null

    const salvaged = objects
      .map((match) => {
        try {
          return JSON.parse(match[0])
        } catch {
          return null
        }
      })
      .filter(Boolean)

    return salvaged.length > 0 ? salvaged : null
  }
}

function parseQuestionsResponse(text) {
  if (!text?.trim()) {
    throw new Error('AI không trả về nội dung. Vui lòng thử lại.')
  }

  const parsed = tryParseJson(text)
  if (parsed === null) {
    throw new Error('AI trả về định dạng không hợp lệ. Vui lòng thử lại.')
  }

  const questions = normalizeToQuestionList(parsed)

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
      responseSchema: QUESTION_SCHEMA,
      maxOutputTokens: 8192,
      temperature: 0.4
    }
  })

  const result = await model.generateContent(contents)
  const response = result.response

  if (response.promptFeedback?.blockReason) {
    throw new Error('Nội dung bị chặn bởi bộ lọc an toàn. Thử đổi chủ đề hoặc bỏ PDF.')
  }

  return parseQuestionsResponse(getResponseText(response))
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

function isParseError(error) {
  const message = error?.message || ''
  return (
    message.includes('AI trả về') ||
    message.includes('AI không trả về') ||
    message.includes('AI không tạo')
  )
}

export async function generateQuestionsFromPdf({ apiKey, pdfFile, count, focus, subjectName }) {
  if (!apiKey?.trim()) {
    throw new Error('Vui lòng nhập API Key Gemini')
  }

  const questionCount = Math.max(Number(count) || 1, 1)

  if (pdfFile && pdfFile.type !== 'application/pdf') {
    throw new Error('Chỉ hỗ trợ file PDF')
  }

  const genAI = new GoogleGenerativeAI(apiKey.trim())
  const prompt = buildPrompt(questionCount, focus, subjectName, Boolean(pdfFile))
  const contents = pdfFile
    ? [
        { inlineData: { mimeType: 'application/pdf', data: await fileToBase64(pdfFile) } },
        { text: prompt }
      ]
    : [{ text: prompt }]

  let lastError = null

  for (const modelName of GEMINI_MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        return await generateWithModel(genAI, modelName, contents)
      } catch (error) {
        lastError = error

        if (isParseError(error) && attempt === 0) {
          continue
        }

        if (isParseError(error)) {
          throw error
        }

        if (!isRetryableModelError(error)) {
          throw new Error(parseGeminiError(error))
        }

        break
      }
    }
  }

  throw new Error(parseGeminiError(lastError))
}
