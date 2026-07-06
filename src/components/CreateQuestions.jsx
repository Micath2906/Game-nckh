import { useState, useRef, useEffect } from 'react'
import './styles.css'
import { getQuestionsBySubject } from '../data/subjectQuestions'
import AiQuestionGenerator from './AiQuestionGenerator'
import {
  loadCustomSubjects,
  saveCustomSubjects,
  loadQuestionsBySubject,
  saveQuestionsBySubject,
  loadSelectedSubjectId,
  saveSelectedSubjectId,
  loadSelectedGrade,
  saveSelectedGrade
} from '../utils/customDataStorage'

const SUBJECTS_LIST = [
  { id: 'physics', name: 'Vật Lý', icon: '⚛️', color: '#4F46E5' },
  { id: 'chemistry', name: 'Hóa Học', icon: '🧪', color: '#DC2626' },
  { id: 'biology', name: 'Sinh Học', icon: '🧬', color: '#059669' },
  { id: 'math', name: 'Toán Học', icon: '📐', color: '#D97706' },
  { id: 'literature', name: 'Ngữ Văn', icon: '📚', color: '#7C3AED' },
  { id: 'history', name: 'Lịch Sử', icon: '🏛️', color: '#BE185D' }
]

const GRADE_OPTIONS = ['Tất cả', 'Lớp 10', 'Lớp 11', 'Lớp 12', 'Đại học']

function resolveQuestionsForSubject(subjectId) {
  const saved = loadQuestionsBySubject(subjectId)
  if (saved !== null) return saved
  if (subjectId.startsWith('custom-')) return []
  return getQuestionsBySubject(subjectId)
}

function CreateQuestions({ onQuestionsReady, onBack }) {
  const [customSubjects, setCustomSubjects] = useState(() => loadCustomSubjects())
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedGrade, setSelectedGrade] = useState(() => loadSelectedGrade())
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [isTrue, setIsTrue] = useState(true)
  const [showCreateSubject, setShowCreateSubject] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState('')
  const [newSubjectIcon, setNewSubjectIcon] = useState('📖')
  const fileInputRef = useRef(null)
  const [showAiPanel, setShowAiPanel] = useState(false)

  const allSubjects = [...SUBJECTS_LIST, ...customSubjects]

  useEffect(() => {
    const lastSubjectId = loadSelectedSubjectId()
    if (!lastSubjectId) return

    const subject = [...SUBJECTS_LIST, ...customSubjects].find((s) => s.id === lastSubjectId)
    if (subject) {
      setSelectedSubject(subject)
      setQuestions(resolveQuestionsForSubject(subject.id))
    }
  }, [])

  useEffect(() => {
    saveCustomSubjects(customSubjects)
  }, [customSubjects])

  useEffect(() => {
    if (selectedSubject) {
      saveQuestionsBySubject(selectedSubject.id, questions)
      saveSelectedSubjectId(selectedSubject.id)
    }
  }, [questions, selectedSubject])

  useEffect(() => {
    saveSelectedGrade(selectedGrade)
  }, [selectedGrade])

  const handleCreateSubject = () => {
    if (!newSubjectName.trim()) {
      alert('Vui lòng nhập tên môn học!')
      return
    }

    const newSubject = {
      id: `custom-${Date.now()}`,
      name: newSubjectName.trim(),
      icon: newSubjectIcon,
      color: '#6366F1' // Màu mặc định
    }

    setCustomSubjects([...customSubjects, newSubject])
    setNewSubjectName('')
    setNewSubjectIcon('📖')
    setShowCreateSubject(false)
    alert(`Đã tạo môn "${newSubject.name}"!`)
  }

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject)
    setQuestions(resolveQuestionsForSubject(subject.id))
  }

  const addQuestion = () => {
    if (!currentQuestion.trim()) {
      alert('Vui lòng nhập câu hỏi!')
      return
    }

    const newQuestion = {
      id: Date.now(),
      statement: currentQuestion.trim(),
      isTrue: isTrue,
      explanation: ''
    }

    setQuestions([...questions, newQuestion])
    setCurrentQuestion('')
    setIsTrue(true)
  }

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target.result
        const lines = text.split('\n').filter(line => line.trim())
        
        const uploadedQuestions = lines.map((line, index) => {
          // Format: "câu hỏi|true/false" hoặc chỉ "câu hỏi"
          const parts = line.split('|')
          return {
            id: Date.now() + index,
            statement: parts[0].trim(),
            isTrue: parts[1] ? parts[1].trim().toLowerCase() === 'true' : true,
            explanation: ''
          }
        })

        setQuestions([...questions, ...uploadedQuestions])
        alert(`Đã tải lên ${uploadedQuestions.length} câu hỏi!`)
      } catch (error) {
        alert('Lỗi khi đọc file. Vui lòng kiểm tra định dạng.')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const handleAiQuestionsAdd = (newQuestions) => {
    setQuestions([...questions, ...newQuestions])
    alert(`Đã thêm ${newQuestions.length} câu hỏi từ AI!`)
  }

  const handleStart = () => {
    if (questions.length < 5) {
      alert('Cần ít nhất 5 câu hỏi để bắt đầu!')
      return
    }
    onQuestionsReady(questions)
  }

  // Lọc câu hỏi theo lớp
  const filteredQuestions = selectedGrade === 'Tất cả'
    ? questions
    : questions.filter(q => q.grade === selectedGrade || !q.grade)

  return (
    <div className="create-questions-screen">
      <div className="create-container">
        {/* Header */}
        <div className="create-header">
          <button className="btn-back" onClick={onBack}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <div className="create-title-section">
            <h1 className="create-main-title">Tạo Bộ Câu Hỏi</h1>
            <p className="create-subtitle">Chọn môn, thêm câu hỏi, tải file hoặc dùng AI</p>
          </div>
        </div>

        {/* Subject Selection */}
        <div className="subject-select-section">
          <h3 className="section-label">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>
            Chọn môn học
          </h3>
          <div className="subject-chips">
            {allSubjects.map((subject) => (
              <button
                key={subject.id}
                className={`subject-chip ${selectedSubject?.id === subject.id ? 'active' : ''}`}
                onClick={() => handleSubjectClick(subject)}
                style={{
                  background: selectedSubject?.id === subject.id ? subject.color : 'white',
                  borderColor: subject.color,
                  color: selectedSubject?.id === subject.id ? 'white' : subject.color
                }}
              >
                <span className="chip-icon">{subject.icon}</span>
                <span className="chip-name">{subject.name}</span>
              </button>
            ))}
            
            {/* Create New Subject Button */}
            <button
              className="subject-chip create-new"
              onClick={() => setShowCreateSubject(!showCreateSubject)}
            >
              <span className="chip-icon">➕</span>
              <span className="chip-name">Tạo môn mới</span>
            </button>
          </div>

          {/* Create Subject Form */}
          {showCreateSubject && (
            <div className="create-subject-form">
              <input
                type="text"
                className="subject-name-input"
                placeholder="Tên môn học (vd: Tiếng Anh)"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateSubject()}
              />
              <input
                type="text"
                className="subject-icon-input"
                placeholder="Icon (vd: 🌍)"
                value={newSubjectIcon}
                onChange={(e) => setNewSubjectIcon(e.target.value)}
                maxLength={2}
              />
              <button className="btn-create-subject" onClick={handleCreateSubject}>
                Tạo
              </button>
            </div>
          )}
        </div>

        {selectedSubject && (
          <>
            {/* Grade Filter */}
            <div className="grade-select-section">
              <h3 className="section-label">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
                Lọc theo lớp
              </h3>
              <div className="grade-chips">
                {GRADE_OPTIONS.map((grade) => (
                  <button
                    key={grade}
                    className={`grade-chip ${selectedGrade === grade ? 'active' : ''}`}
                    onClick={() => setSelectedGrade(grade)}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="actions-row actions-row-three">
              {/* Upload File */}
              <button className="action-card upload" onClick={() => fileInputRef.current?.click()}>
                <div className="action-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                  </svg>
                </div>
                <div className="action-content">
                  <h4>Tải file lên</h4>
                  <p>TXT, mỗi dòng 1 câu</p>
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />

              {/* AI Generator */}
              <button
                className={`action-card upload ai ${showAiPanel ? 'active' : ''}`}
                onClick={() => setShowAiPanel(!showAiPanel)}
              >
                <div className="action-icon ai">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
                  </svg>
                </div>
                <div className="action-content">
                  <h4>Tạo bằng AI</h4>
                  <p>PDF tuỳ chọn + Gemini</p>
                </div>
              </button>

              {/* Add Question Form */}
              <div className="action-card add">
                <div className="add-form">
                  <input
                    type="text"
                    className="quick-input"
                    placeholder="Nhập câu hỏi nhanh..."
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addQuestion()}
                  />
                  <div className="truth-toggle-compact">
                    <button
                      className={`truth-btn-compact true ${isTrue ? 'active' : ''}`}
                      onClick={() => setIsTrue(true)}
                    >
                      ✓ Đúng
                    </button>
                    <button
                      className={`truth-btn-compact false ${!isTrue ? 'active' : ''}`}
                      onClick={() => setIsTrue(false)}
                    >
                      ✕ Sai
                    </button>
                  </div>
                  <button className="btn-add-quick" onClick={addQuestion}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                    Thêm
                  </button>
                </div>
              </div>
            </div>

            {showAiPanel && (
              <AiQuestionGenerator
                subjectName={selectedSubject?.name}
                onAddQuestions={handleAiQuestionsAdd}
                onClose={() => setShowAiPanel(false)}
              />
            )}

            {/* Questions List */}
            <div className="questions-list-compact">
              <div className="list-header">
                <h3>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                  Danh sách câu hỏi
                </h3>
                <span className="count-badge">{filteredQuestions.length} câu</span>
              </div>

              {filteredQuestions.length === 0 ? (
                <div className="empty-state">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                  <p>Chưa có câu hỏi nào</p>
                  <span>Thêm câu hỏi hoặc tải file lên</span>
                </div>
              ) : (
                <div className="questions-scroll">
                  {filteredQuestions.map((q, index) => (
                    <div key={q.id} className={`question-item ${q.isTrue ? 'true' : 'false'}`}>
                      <div className="q-number">{index + 1}</div>
                      <div className="q-content">{q.statement}</div>
                      <div className={`q-truth ${q.isTrue ? 'true' : 'false'}`}>
                        {q.isTrue ? '✓' : '✕'}
                      </div>
                      <button className="q-delete" onClick={() => deleteQuestion(q.id)}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Start Button */}
            {filteredQuestions.length >= 5 && (
              <button className="btn-start-game" onClick={handleStart}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Bắt đầu với {filteredQuestions.length} câu hỏi
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CreateQuestions
