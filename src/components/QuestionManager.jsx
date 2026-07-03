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

    // Tạo câu đảo ngược tự động
    const invertedQuestion = generateInvertedStatement(currentQuestion, isTrue)

    const newQuestion = {
      id: Date.now(),
      statement: currentQuestion.trim(),
      invertedStatement: invertedQuestion,
      isTrue: isTrue,
      explanation: explanation.trim() || 'Không có giải thích'
    }

    setQuestions([...questions, newQuestion])
    
    // Reset form
    setCurrentQuestion('')
    setIsTrue(true)
    setExplanation('')
  }

  const generateInvertedStatement = (statement, isOriginalTrue) => {
    // Logic đơn giản để tạo câu đảo ngược
    const lowerStatement = statement.toLowerCase()
    
    if (lowerStatement.includes(' không ')) {
      return statement.replace(/không /gi, '')
    } else if (lowerStatement.includes(' có thể ')) {
      return statement.replace(/có thể/gi, 'không thể')
    } else if (lowerStatement.includes(' là ')) {
      return statement.replace(/là /gi, 'không phải là ')
    } else if (lowerStatement.includes('lớn hơn')) {
      return statement.replace(/lớn hơn/gi, 'nhỏ hơn')
    } else if (lowerStatement.includes('nhỏ hơn')) {
      return statement.replace(/nhỏ hơn/gi, 'lớn hơn')
    } else if (lowerStatement.includes('nhanh hơn')) {
      return statement.replace(/nhanh hơn/gi, 'chậm hơn')
    } else if (lowerStatement.includes('chậm hơn')) {
      return statement.replace(/chậm hơn/gi, 'nhanh hơn')
    } else {
      // Mặc định thêm "không"
      return statement.replace(/^(.+?)\s+(là|có|được|bị|mang)/i, '$1 không $2')
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
      {
        id: 1,
        statement: 'Tia Alpha có khả năng đâm xuyên mạnh nhất trong ba loại tia phóng xạ',
        invertedStatement: 'Tia Alpha có khả năng đâm xuyên yếu nhất trong ba loại tia phóng xạ',
        isTrue: false,
        explanation: 'Sai. Tia Gamma có khả năng đâm xuyên mạnh nhất'
      },
      {
        id: 2,
        statement: 'Tia Beta là dòng electron chuyển động nhanh',
        invertedStatement: 'Tia Beta không phải là dòng electron',
        isTrue: true,
        explanation: 'Đúng. Tia Beta thực chất là các electron'
      },
      {
        id: 3,
        statement: 'Tia Gamma bị lệch trong điện trường',
        invertedStatement: 'Tia Gamma không bị lệch trong điện trường',
        isTrue: false,
        explanation: 'Sai. Tia Gamma là sóng điện từ, không mang điện nên không bị lệch'
      },
      {
        id: 4,
        statement: 'Tấm chì có thể chặn được tia Alpha',
        invertedStatement: 'Tấm chì không thể chặn được tia Alpha',
        isTrue: true,
        explanation: 'Đúng. Chì có thể chặn mọi loại tia phóng xạ'
      },
      {
        id: 5,
        statement: 'Tia Alpha là hạt nhân Heli (2 proton + 2 neutron)',
        invertedStatement: 'Tia Alpha không phải là hạt nhân Heli',
        isTrue: true,
        explanation: 'Đúng. Tia Alpha chính là hạt nhân nguyên tử Heli'
      },
      {
        id: 6,
        statement: 'Giấy có thể chặn tia Gamma',
        invertedStatement: 'Giấy không thể chặn tia Gamma',
        isTrue: false,
        explanation: 'Sai. Giấy chỉ có thể chặn tia Alpha'
      },
      {
        id: 7,
        statement: 'Tia Beta có khối lượng lớn hơn tia Alpha',
        invertedStatement: 'Tia Beta có khối lượng nhỏ hơn tia Alpha',
        isTrue: false,
        explanation: 'Sai. Electron nhỏ hơn nhiều so với hạt Alpha'
      },
      {
        id: 8,
        statement: 'Tia Gamma là sóng điện từ có tần số rất cao',
        invertedStatement: 'Tia Gamma không phải là sóng điện từ',
        isTrue: true,
        explanation: 'Đúng. Tia Gamma là dạng sóng điện từ năng lượng cao'
      },
      {
        id: 9,
        statement: 'Tia Alpha mang điện tích dương',
        invertedStatement: 'Tia Alpha mang điện tích âm',
        isTrue: true,
        explanation: 'Đúng. Tia Alpha mang điện tích +2e'
      },
      {
        id: 10,
        statement: 'Tia Beta mang điện tích âm',
        invertedStatement: 'Tia Beta mang điện tích dương',
        isTrue: true,
        explanation: 'Đúng. Tia Beta là electron nên mang điện âm'
      }
    ]
    setQuestions(defaultQuestions)
  }

  return (
    <div className="setup-screen fade-in">
      <div className="setup-header">
        <div className="game-logo">
          <span className="logo-icon">📝</span>
          <h1 className="game-title">QUẢN LÝ CÂU HỎI</h1>
          <p className="game-subtitle">Tạo ngân hàng câu hỏi lý thuyết cho trò chơi</p>
        </div>
      </div>
      
      <div className="setup-content">
        <div className="question-form-section">
          <div className="section-header">
            <span className="section-icon">✍️</span>
            <h3>Thêm câu hỏi mới</h3>
          </div>

          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                <span className="label-icon">💬</span>
                Câu phát biểu lý thuyết
              </label>
              <textarea 
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder="VD: Tia Alpha có khả năng đâm xuyên mạnh nhất trong ba loại tia phóng xạ"
                rows="3"
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">✓</span>
                Tính đúng/sai
              </label>
              <div className="truth-selector">
                <button
                  className={`truth-btn true ${isTrue ? 'active' : ''}`}
                  onClick={() => setIsTrue(true)}
                >
                  <span className="truth-icon">✅</span>
                  <span>ĐÚNG</span>
                </button>
                <button
                  className={`truth-btn false ${!isTrue ? 'active' : ''}`}
                  onClick={() => setIsTrue(false)}
                >
                  <span className="truth-icon">❌</span>
                  <span>SAI</span>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📚</span>
                Giải thích (tùy chọn)
              </label>
              <textarea 
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="VD: Tia Gamma có khả năng đâm xuyên mạnh nhất, không phải tia Alpha"
                rows="2"
                className="form-textarea"
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" onClick={addQuestion}>
              <span className="btn-icon">➕</span>
              <span>Thêm Câu Hỏi</span>
            </button>
            <button className="btn btn-secondary" onClick={loadDefaultQuestions}>
              <span className="btn-icon">📚</span>
              <span>Tải Câu Mẫu</span>
            </button>
          </div>
        </div>

        {questions.length > 0 && (
          <div className="questions-list-section">
            <div className="section-header">
              <span className="section-icon">📋</span>
              <h3>Danh sách câu hỏi ({questions.length})</h3>
              {questions.length >= 5 && (
                <span className="ready-badge pulse">✓ Đủ điều kiện</span>
              )}
            </div>
            
            <div className="questions-list">
              {questions.map((q, index) => (
                <div 
                  key={q.id} 
                  className={`question-card ${q.isTrue ? 'true' : 'false'}`}
                >
                  <div className="question-number">{index + 1}</div>
                  
                  <div className="question-content">
                    <div className="question-statement">
                      {q.statement}
                    </div>
                    
                    <div className="question-meta">
                      <span className={`truth-badge ${q.isTrue ? 'true' : 'false'}`}>
                        {q.isTrue ? '✅ ĐÚNG' : '❌ SAI'}
                      </span>
                      <span className="explanation-text">
                        {q.explanation}
                      </span>
                    </div>

                    <div className="question-inverted">
                      <span className="inverted-label">Câu đảo:</span>
                      <span className="inverted-text">"{q.invertedStatement}"</span>
                    </div>
                  </div>

                  <button 
                    className="delete-btn" 
                    onClick={() => deleteQuestion(q.id)}
                    title="Xóa câu hỏi"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {questions.length > 0 && questions.length < 5 && (
          <div className="status-message warning">
            <span className="status-icon">⚠️</span>
            <span>Cần thêm ít nhất {5 - questions.length} câu hỏi nữa để bắt đầu (tối thiểu 5 câu)</span>
          </div>
        )}

        {questions.length >= 5 && (
          <button 
            className="btn btn-start" 
            onClick={handleStart}
          >
            <span className="btn-icon">✅</span>
            <span>TIẾP TỤC VỚI {questions.length} CÂU HỎI</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default QuestionManager
