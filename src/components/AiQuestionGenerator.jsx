import { useState, useRef, useEffect } from 'react'
import { getGeminiApiKey, setGeminiApiKey } from '../utils/apiKeyStorage'
import { generateQuestionsFromPdf, MAX_QUESTIONS_FREE, MAX_PDF_BYTES } from '../services/gemini'

function AiQuestionGenerator({ subjectName, onAddQuestions, onClose }) {
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [pdfFile, setPdfFile] = useState(null)
  const [questionCount, setQuestionCount] = useState(10)
  const [focus, setFocus] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [previewQuestions, setPreviewQuestions] = useState([])
  const pdfInputRef = useRef(null)

  useEffect(() => {
    setApiKey(getGeminiApiKey())
  }, [])

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      alert('Vui lòng nhập API Key!')
      return
    }
    setGeminiApiKey(apiKey.trim())
    alert('Đã lưu API Key!')
  }

  const handlePdfSelect = (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      alert('Chỉ hỗ trợ file PDF!')
      event.target.value = ''
      return
    }

    if (file.size > MAX_PDF_BYTES) {
      alert(`File PDF vượt quá giới hạn 100MB!`)
      event.target.value = ''
      return
    }

    setPdfFile(file)
    setPreviewQuestions([])
    setError('')
    event.target.value = ''
  }

  const handleGenerate = async () => {
    setError('')
    setPreviewQuestions([])

    if (!apiKey.trim()) {
      setError('Vui lòng nhập và lưu API Key Gemini')
      return
    }
    setLoading(true)
    try {
      setGeminiApiKey(apiKey.trim())
      const generated = await generateQuestionsFromPdf({
        apiKey: apiKey.trim(),
        pdfFile,
        count: questionCount,
        focus,
        subjectName
      })
      setPreviewQuestions(generated)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddAll = () => {
    if (previewQuestions.length === 0) return

    const withIds = previewQuestions.map((q, index) => ({
      id: Date.now() + index,
      statement: q.statement,
      isTrue: q.isTrue,
      explanation: q.explanation
    }))

    onAddQuestions(withIds)
    setPreviewQuestions([])
    setPdfFile(null)
    onClose()
  }

  const handleRemovePreview = (index) => {
    setPreviewQuestions(previewQuestions.filter((_, i) => i !== index))
  }

  return (
    <div className="ai-generator-panel">
      <div className="ai-panel-header">
        <div className="ai-panel-title">
          <span className="ai-panel-icon">🤖</span>
          <div>
            <h4>Tạo câu lý thuyết bằng Gemini AI</h4>
            <p>Tương thích Gemini free tier — key từ AI Studio</p>
          </div>
        </div>
        <button className="ai-panel-close" onClick={onClose} aria-label="Đóng">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      <div className="ai-form-grid">
        <div className="ai-field">
          <label htmlFor="gemini-api-key">API Key Gemini</label>
          <div className="ai-key-row">
            <input
              id="gemini-api-key"
              type={showApiKey ? 'text' : 'password'}
              className="ai-input"
              placeholder="Nhập key từ Google AI Studio"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button
              type="button"
              className="ai-btn-secondary"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? 'Ẩn' : 'Hiện'}
            </button>
            <button type="button" className="ai-btn-secondary" onClick={handleSaveApiKey}>
              Lưu
            </button>
          </div>
          <span className="ai-hint">
            Lấy key miễn phí tại{' '}
            <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">
              Google AI Studio
            </a>
            {' '}— dùng model Flash-Lite/Flash, không tốn phí trong giới hạn quota
          </span>
        </div>

        <div className="ai-field">
          <label>PDF bài giảng (tuỳ chọn)</label>
          <div className="ai-pdf-row">
            <button
              type="button"
              className="ai-pdf-picker"
              onClick={() => pdfInputRef.current?.click()}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
              </svg>
              {pdfFile ? pdfFile.name : `Chọn PDF nếu có (tối đa ${MAX_PDF_BYTES / (1024 * 1024)}MB)`}
            </button>
            {pdfFile && (
              <button
                type="button"
                className="ai-btn-secondary"
                onClick={() => setPdfFile(null)}
              >
                Bỏ file
              </button>
            )}
          </div>
          <span className="ai-hint">
            Không có PDF thì AI tạo theo môn học. PDF lớn tốn quota free tier — nên dùng file ngắn.
          </span>
          <input
            ref={pdfInputRef}
            type="file"
            accept=".pdf,application/pdf"
            style={{ display: 'none' }}
            onChange={handlePdfSelect}
          />
        </div>

        <div className="ai-field ai-field-sm">
          <label htmlFor="question-count">Số câu lý thuyết</label>
          <input
            id="question-count"
            type="number"
            className="ai-input"
            min={5}
            max={MAX_QUESTIONS_FREE}
            value={questionCount}
            onChange={(e) => {
              const val = Number(e.target.value)
              setQuestionCount(Math.min(Math.max(val || 5, 5), MAX_QUESTIONS_FREE))
            }}
          />
          <span className="ai-hint">Free tier: tối đa {MAX_QUESTIONS_FREE} câu/lần</span>
        </div>

        <div className="ai-field">
          <label htmlFor="focus-topic">Nội dung focus (tuỳ chọn)</label>
          <input
            id="focus-topic"
            type="text"
            className="ai-input"
            placeholder="VD: Chương 2 - Phóng xạ, Định luật Newton..."
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="ai-error">{error}</div>}

      <button
        type="button"
        className="ai-btn-generate"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="ai-spinner" />
            Đang tạo câu lý thuyết...
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
            </svg>
            Tạo {questionCount} câu lý thuyết
          </>
        )}
      </button>

      {previewQuestions.length > 0 && (
        <div className="ai-preview">
          <div className="ai-preview-header">
            <h5>Xem trước ({previewQuestions.length} câu)</h5>
            <button type="button" className="ai-btn-add-all" onClick={handleAddAll}>
              Thêm tất cả vào danh sách
            </button>
          </div>
          <div className="ai-preview-list">
            {previewQuestions.map((q, index) => (
              <div key={index} className={`ai-preview-item ${q.isTrue ? 'true' : 'false'}`}>
                <span className="ai-preview-num">{index + 1}</span>
                <div className="ai-preview-content">
                  <p>{q.statement}</p>
                  {q.explanation && <span className="ai-preview-explanation">{q.explanation}</span>}
                </div>
                <span className={`ai-preview-badge ${q.isTrue ? 'true' : 'false'}`}>
                  {q.isTrue ? 'Đúng' : 'Sai'}
                </span>
                <button
                  type="button"
                  className="ai-preview-remove"
                  onClick={() => handleRemovePreview(index)}
                  aria-label="Xóa câu này"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AiQuestionGenerator
