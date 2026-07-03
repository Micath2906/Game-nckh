import { useState } from 'react'

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
    <div className="setup-screen">
      <h1>📝 QUẢN LÝ CÂU HỎI</h1>
      <h2>Thêm câu hỏi lý thuyết cho game</h2>
      
      <div className="question-form">
        <div className="player-input">
          <label>Câu phát biểu lý thuyết:</label>
          <textarea 
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            placeholder="VD: Tia Alpha có khả năng đâm xuyên mạnh nhất"
            rows="3"
            style={{resize: 'vertical'}}
          />
        </div>

        <div className="player-input">
          <label>Câu này đúng hay sai?</label>
          <select value={isTrue} onChange={(e) => setIsTrue(e.target.value === 'true')}>
            <option value="true">✅ ĐÚNG</option>
            <option value="false">❌ SAI</option>
          </select>
        </div>

        <div className="player-input">
          <label>Giải thích (tùy chọn):</label>
          <textarea 
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="VD: Tia Gamma có khả năng đâm xuyên mạnh nhất"
            rows="2"
            style={{resize: 'vertical'}}
          />
        </div>

        <div style={{display: 'flex', gap: '10px'}}>
          <button className="btn btn-primary" onClick={addQuestion} style={{flex: 1}}>
            ➕ Thêm Câu Hỏi
          </button>
          <button className="btn btn-success" onClick={loadDefaultQuestions} style={{flex: 1}}>
            📚 Tải Câu Mẫu
          </button>
        </div>
      </div>

      {questions.length > 0 && (
        <div className="questions-list" style={{marginTop: '30px'}}>
          <h3 style={{marginBottom: '15px'}}>
            Danh sách câu hỏi ({questions.length})
          </h3>
          
          {questions.map((q, index) => (
            <div 
              key={q.id} 
              className="question-item"
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '10px',
                borderLeft: `4px solid ${q.isTrue ? '#4facfe' : '#f5576c'}`
              }}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                <div style={{flex: 1}}>
                  <div style={{fontWeight: 'bold', marginBottom: '5px'}}>
                    {index + 1}. {q.statement}
                  </div>
                  <div style={{fontSize: '0.85em', opacity: 0.8, marginBottom: '5px'}}>
                    <span style={{
                      background: q.isTrue ? '#4facfe' : '#f5576c',
                      padding: '2px 8px',
                      borderRadius: '5px',
                      marginRight: '10px'
                    }}>
                      {q.isTrue ? '✅ ĐÚNG' : '❌ SAI'}
                    </span>
                    {q.explanation}
                  </div>
                  <div style={{fontSize: '0.8em', opacity: 0.6, fontStyle: 'italic'}}>
                    Câu đảo: "{q.invertedStatement}"
                  </div>
                </div>
                <button 
                  className="btn btn-danger" 
                  onClick={() => deleteQuestion(q.id)}
                  style={{padding: '5px 15px', marginLeft: '10px'}}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {questions.length >= 5 && (
        <button 
          className="btn btn-primary" 
          onClick={handleStart}
          style={{marginTop: '20px', fontSize: '1.2em', padding: '15px 40px'}}
        >
          ✅ TIẾP TỤC ({questions.length} câu hỏi)
        </button>
      )}

      {questions.length > 0 && questions.length < 5 && (
        <p style={{marginTop: '20px', color: '#FFD700', textAlign: 'center'}}>
          Cần thêm ít nhất {5 - questions.length} câu hỏi nữa để bắt đầu
        </p>
      )}
    </div>
  )
}

export default QuestionManager
