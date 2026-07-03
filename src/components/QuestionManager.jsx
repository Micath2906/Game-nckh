import { useState } from 'react'
import './styles.css'

function QuestionManager({ onQuestionsReady }) {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [isTrue, setIsTrue] = useState(true)
  const [explanation, setExplanation] = useState('')

  const addQuestion = () => {
    if (!currentQuestion.trim()) {
      alert('Vui lòng nhập câu hỏi!')
      return
    }

    const invertedQuestion = generateInvertedStatement(currentQuestion)

    const newQuestion = {
      id: Date.now(),
      statement: currentQuestion.trim(),
      invertedStatement: invertedQuestion,
      isTrue: isTrue,
      explanation: explanation.trim() || 'Không có giải thích'
    }

    setQuestions([...questions, newQuestion])
    
    setCurrentQuestion('')
    setIsTrue(true)
    setExplanation('')
  }

  const generateInvertedStatement = (statement) => {
    const lowerStatement = statement.toLowerCase()
    
    if (lowerStatement.includes(' không ')) {
      return statement.replace(/không /gi, '')
    } else if (lowerStatement.includes(' là ')) {
      return statement.replace(/là /gi, 'không phải là ')
    } else if (lowerStatement.includes(' có ')) {
      return statement.replace(/có /gi, 'không có ')
    } else {
      return '~' + statement
    }
  }

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const handleStart = () => {
    if (questions.length < 5) {
      alert('Vui lòng thêm ít nhất 5 câu hỏi!')
      return
    }
    onQuestionsReady(questions)
  }

  const loadDefaultQuestions = () => {
    const defaultQuestions = [
      { id: 1, statement: 'Tia Alpha có khả năng đâm xuyên mạnh nhất', invertedStatement: 'Tia Alpha có khả năng đâm xuyên yếu nhất', isTrue: false, explanation: 'Sai. Tia Gamma mới là mạnh nhất' },
      { id: 2, statement: 'Tia Beta là dòng electron chuyển động nhanh', invertedStatement: 'Tia Beta không phải là dòng electron', isTrue: true, explanation: 'Đúng. Tia Beta thực chất là các electron' },
      { id: 3, statement: 'Tia Gamma bị lệch trong điện trường', invertedStatement: 'Tia Gamma không bị lệch trong điện trường', isTrue: false, explanation: 'Sai. Tia Gamma là sóng điện từ, không mang điện' },
      { id: 4, statement: 'Tấm chì có thể chặn được tia Alpha', invertedStatement: 'Tấm chì không thể chặn được tia Alpha', isTrue: true, explanation: 'Đúng. Chì có thể chặn mọi loại tia' },
      { id: 5, statement: 'Giấy có thể chặn tia Gamma', invertedStatement: 'Giấy không thể chặn được tia Gamma', isTrue: false, explanation: 'Sai. Giấy chỉ chặn được tia Alpha' },
      { id: 6, statement: 'Tia Alpha mang điện tích dương', invertedStatement: 'Tia Alpha mang điện tích âm', isTrue: true, explanation: 'Đúng. Tia Alpha mang điện tích +2e' },
      { id: 7, statement: 'Tia Beta mang điện tích âm', invertedStatement: 'Tia Beta mang điện tích dương', isTrue: true, explanation: 'Đúng. Tia Beta là electron nên mang điện âm' },
      { id: 8, statement: 'Tia Gamma là sóng điện từ có tần số rất cao', invertedStatement: 'Tia Gamma không phải là sóng điện từ', isTrue: true, explanation: 'Đúng. Tia Gamma là dạng sóng điện từ năng lượng cao' },
      { id: 9, statement: 'Tia Alpha là hạt nhân Heli', invertedStatement: 'Tia Alpha không phải là hạt nhân Heli', isTrue: true, explanation: 'Đúng. Tia Alpha chính là hạt nhân nguyên tử Heli' },
      { id: 10, statement: 'Tia Beta có khối lượng lớn hơn tia Alpha', invertedStatement: 'Tia Beta có khối lượng nhỏ hơn tia Alpha', isTrue: false, explanation: 'Sai. Electron nhỏ hơn nhiều so với hạt Alpha' }
    ]
    setQuestions(defaultQuestions)
  }

  return (
    <div className="qm-screen">
      {/* Compact Header */}
      <div className="qm-header">
        <div className="qm-breadcrumb">
          <span className="breadcrumb-item">Landing</span>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-item active">Câu hỏi</span>
        </div>
        <h1 className="qm-title">Ngân hàng câu hỏi</h1>
        <p className="qm-subtitle">Thêm câu hỏi hoặc dùng câu mẫu có sẵn</p>
      </div>

      {/* Side by Side Layout */}
      <div className="qm-main-layout">
        {/* Left Column: Form */}
        <div className="qm-form-section">
          <div className="qm-form-card">
            <h3 className="qm-form-title">Thêm câu hỏi mới</h3>
            
            <div className="qm-form-input-group">
              <input 
                type="text" 
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder="Nhập câu phát biểu lý thuyết..."
                className="qm-input"
              />
            </div>

            <div className="qm-form-row">
              <div className="qm-truth-toggle">
                <button 
                  className={`truth-btn true ${isTrue ? 'active' : ''}`}
                  onClick={() => setIsTrue(true)}
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Đúng
                </button>
                <button 
                  className={`truth-btn false ${!isTrue ? 'active' : ''}`}
                  onClick={() => setIsTrue(false)}
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                  Sai
                </button>
              </div>
              
              <button className="btn btn-primary" onClick={addQuestion}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Thêm
              </button>
            </div>

            <button className="qm-load-default" onClick={loadDefaultQuestions}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 14H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1z"/>
              </svg>
              Dùng 10 câu mẫu
            </button>
          </div>

          {/* Status & CTA below form on mobile */}
          <div className="qm-status-mobile">
            <div className="qm-count-badge">{questions.length} câu hỏi</div>
            {questions.length >= 5 && (
              <button className="btn btn-start" onClick={handleStart}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                TIẾP TỤC
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Questions List */}
        <div className="qm-list-section">
          <div className="qm-list-header">
            <h3 className="qm-list-title">Danh sách câu hỏi</h3>
            <span className="qm-list-count">{questions.length} câu</span>
          </div>
          
          {questions.length === 0 ? (
            <div className="qm-empty">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 14H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1z"/>
              </svg>
              <p>Chưa có câu hỏi nào</p>
              <span>Thêm câu hỏi hoặc dùng câu mẫu</span>
            </div>
          ) : (
            <div className="qm-list">
              {questions.map((q, index) => (
                <div key={q.id} className={`qm-card ${q.isTrue ? 'true' : 'false'}`}>
                  <div className="qm-card-num">{index + 1}</div>
                  <div className="qm-card-content">
                    <div className="qm-card-statement">{q.statement}</div>
                    <div className="qm-card-meta">
                      <span className={`qm-badge ${q.isTrue ? 'true' : 'false'}`}>
                        {q.isTrue ? '✓' : '✗'}
                      </span>
                      <span className="qm-card-index">{q.isTrue ? 'Đúng' : 'Sai'}</span>
                    </div>
                  </div>
                  <button className="qm-delete" onClick={() => deleteQuestion(q.id)}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status & CTA on desktop */}
      <div className="qm-status-desktop">
        {questions.length > 0 && questions.length < 5 && (
          <div className="qm-warning">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
            Cần thêm {5 - questions.length} câu nữa (tối thiểu 5)
          </div>
        )}
        {questions.length >= 5 && (
          <button className="btn btn-start" onClick={handleStart}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7z"/>
            </svg>
            TIẾP TỤC VỚI {questions.length} CÂU HỎI
          </button>
        )}
      </div>
    </div>
  )
}

export default QuestionManager
