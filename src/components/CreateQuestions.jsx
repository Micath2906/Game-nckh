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

const buildLibraryLesson = (subjectId, grade, title, description) => {
  const questions = getQuestionsBySubject(subjectId)
  return {
    id: `${subjectId}-${grade.toLowerCase().replace(/\s+/g, '-')}`,
    subjectId,
    grade,
    title,
    description,
    sets: [
      {
        id: `${subjectId}-${grade.toLowerCase().replace(/\s+/g, '-')}-default`,
        title: 'Bộ câu mẫu',
        questions: questions.slice(0, Math.min(6, questions.length))
      }
    ]
  }
}

const LIBRARY_SUBJECTS = [
  {
    id: 'physics', name: 'Vật Lý', icon: '⚛️', color: '#4F46E5', bgColor: '#EEF2FF', description: 'Cơ học, Điện từ, Quang học, Hạt nhân',
    lessons: [
      buildLibraryLesson('physics', 'Lớp 10', 'Lăng kính', 'Bộ câu lý thuyết mẫu về lăng kính'),
      buildLibraryLesson('physics', 'Lớp 11', 'Điện từ', 'Bộ câu lý thuyết mẫu về điện từ'),
      buildLibraryLesson('physics', 'Lớp 12', 'Hạt nhân', 'Bộ câu lý thuyết mẫu về hạt nhân')
    ]
  },
  {
    id: 'chemistry', name: 'Hóa Học', icon: '🧪', color: '#DC2626', bgColor: '#FEE2E2', description: 'Hóa vô cơ, Hữu cơ, Phân tích',
    lessons: [
      buildLibraryLesson('chemistry', 'Lớp 10', 'Hóa 10', 'Bộ câu lý thuyết mẫu cho Hóa lớp 10'),
      buildLibraryLesson('chemistry', 'Lớp 11', 'Hóa 11', 'Bộ câu lý thuyết mẫu cho Hóa lớp 11'),
      buildLibraryLesson('chemistry', 'Lớp 12', 'Hóa 12', 'Bộ câu lý thuyết mẫu cho Hóa lớp 12')
    ]
  },
  {
    id: 'biology', name: 'Sinh Học', icon: '🧬', color: '#059669', bgColor: '#D1FAE5', description: 'Tế bào, Di truyền, Sinh thái',
    lessons: [
      buildLibraryLesson('biology', 'Lớp 10', 'Sinh 10', 'Bộ câu lý thuyết mẫu cho Sinh lớp 10'),
      buildLibraryLesson('biology', 'Lớp 12', 'Sinh 12', 'Bộ câu lý thuyết mẫu cho Sinh lớp 12')
    ]
  },
  {
    id: 'math', name: 'Toán Học', icon: '📐', color: '#D97706', bgColor: '#FEF3C7', description: 'Đại số, Hình học, Giải tích',
    lessons: [
      buildLibraryLesson('math', 'Lớp 10', 'Toán 10', 'Bộ câu lý thuyết mẫu cho Toán lớp 10'),
      buildLibraryLesson('math', 'Lớp 11', 'Toán 11', 'Bộ câu lý thuyết mẫu cho Toán lớp 11'),
      buildLibraryLesson('math', 'Lớp 12', 'Toán 12', 'Bộ câu lý thuyết mẫu cho Toán lớp 12'),
      buildLibraryLesson('math', 'Đại học', 'Toán Đại học', 'Bộ câu lý thuyết mẫu cho Toán đại học')
    ]
  },
  {
    id: 'literature', name: 'Ngữ Văn', icon: '📚', color: '#7C3AED', bgColor: '#EDE9FE', description: 'Văn học, Tác phẩm, Tác giả',
    lessons: [
      buildLibraryLesson('literature', 'Lớp 10', 'Ngữ Văn 10', 'Bộ câu lý thuyết mẫu cho Ngữ Văn lớp 10'),
      buildLibraryLesson('literature', 'Lớp 11', 'Ngữ Văn 11', 'Bộ câu lý thuyết mẫu cho Ngữ Văn lớp 11'),
      buildLibraryLesson('literature', 'Lớp 12', 'Ngữ Văn 12', 'Bộ câu lý thuyết mẫu cho Ngữ Văn lớp 12')
    ]
  },
  {
    id: 'history', name: 'Lịch Sử', icon: '🏛️', color: '#BE185D', bgColor: '#FCE7F3', description: 'Việt Nam, Thế giới, Văn hóa',
    lessons: [
      buildLibraryLesson('history', 'Lớp 10', 'Lịch Sử 10', 'Bộ câu lý thuyết mẫu cho Lịch Sử lớp 10'),
      buildLibraryLesson('history', 'Lớp 11', 'Lịch Sử 11', 'Bộ câu lý thuyết mẫu cho Lịch Sử lớp 11'),
      buildLibraryLesson('history', 'Lớp 12', 'Lịch Sử 12', 'Bộ câu lý thuyết mẫu cho Lịch Sử lớp 12')
    ]
  }
]
const MAX_UPLOAD_BYTES = 100 * 1024 * 1024

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
  const [showLibraryModal, setShowLibraryModal] = useState(false)
  const [libraryGradeFilter, setLibraryGradeFilter] = useState('Tất cả')
  const [selectedLibrarySubjectId, setSelectedLibrarySubjectId] = useState(null)
  const [selectedLibraryLesson, setSelectedLibraryLesson] = useState(null)
  const [selectedLibrarySetIds, setSelectedLibrarySetIds] = useState([])
  const [selectedLibraryQuestionIds, setSelectedLibraryQuestionIds] = useState([])

  const allSubjects = [...SUBJECTS_LIST, ...customSubjects]
  const filteredLibrarySubjects = libraryGradeFilter === 'Tất cả'
    ? LIBRARY_SUBJECTS
    : LIBRARY_SUBJECTS.filter((subject) => subject.lessons.some((lesson) => lesson.grade === libraryGradeFilter))

  const selectedLibrarySubject = LIBRARY_SUBJECTS.find((subject) => subject.id === selectedLibrarySubjectId)
  const filteredLibraryLessons = !selectedLibrarySubject
    ? []
    : libraryGradeFilter === 'Tất cả'
      ? selectedLibrarySubject.lessons
      : selectedLibrarySubject.lessons.filter((lesson) => lesson.grade === libraryGradeFilter)
  const previewQuestions = selectedLibraryLesson
    ? getQuestionsBySubject(selectedLibraryLesson.subjectId).slice(0, 5)
    : []

  const toggleLibrarySetSelection = (setId) => {
    setSelectedLibrarySetIds((prev) =>
      prev.includes(setId) ? prev.filter((id) => id !== setId) : [...prev, setId]
    )
  }

  const toggleLibraryQuestionSelection = (questionId) => {
    setSelectedLibraryQuestionIds((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    )
  }

  const handleSelectAllLibraryQuestions = () => {
    if (!selectedLibraryLesson) return
    const allQuestionIds = selectedLibraryLesson.sets.flatMap((set) => set.questions.map((q) => q.id))
    setSelectedLibraryQuestionIds(allQuestionIds)
  }

  const handleClearLibrarySelections = () => {
    setSelectedLibrarySetIds([])
    setSelectedLibraryQuestionIds([])
  }

  const handleAddSelectedLibrarySets = () => {
    if (!selectedLibraryLesson) return

    const selectedSets = selectedLibraryLesson.sets.filter((set) => selectedLibrarySetIds.includes(set.id))
    const selectedQuestions = selectedLibraryLesson.sets
      .flatMap((set) => set.questions)
      .filter((q) => selectedLibraryQuestionIds.includes(q.id))

    const questionsToAdd = selectedSets.length > 0
      ? selectedSets.flatMap((set) => set.questions)
      : selectedQuestions

    if (!questionsToAdd.length) {
      alert('Vui lòng chọn ít nhất một bộ câu hoặc một câu riêng để thêm.')
      return
    }

    const addedCount = addQuestionsToCurrentList(questionsToAdd, selectedLibraryLesson.title)
    if (addedCount > 0) {
      setSelectedLibrarySetIds([])
      setSelectedLibraryQuestionIds([])
      setSelectedLibraryLesson(null)
      setShowLibraryModal(false)
    }
  }

  useEffect(() => {
    const subjectCandidates = [...SUBJECTS_LIST, ...customSubjects]
    const lastSubjectId = loadSelectedSubjectId()
    const subject = subjectCandidates.find((item) => item.id === lastSubjectId) || subjectCandidates[0] || null

    if (subject) {
      setSelectedSubject((prev) => (prev?.id === subject.id ? prev : subject))
      setQuestions((prev) => {
        if (prev.length > 0 && selectedSubject?.id === subject.id) {
          return prev
        }
        return resolveQuestionsForSubject(subject.id)
      })
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
    setSelectedSubject(newSubject)
    setQuestions([])
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
      alert('Vui lòng nhập câu lý thuyết!')
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

  const clearAllQuestions = () => {
    setQuestions([])
  }

  const handleOpenLibrary = () => {
    setShowLibraryModal(true)
  }

  const addQuestionsToCurrentList = (questionsToAdd, label) => {
    if (!questionsToAdd?.length) return 0

    const uniqueQuestions = questionsToAdd.filter((q) => {
      const normalized = q.statement?.trim().toLowerCase()
      return !questions.some((existing) => existing.statement?.trim().toLowerCase() === normalized)
    })

    if (!uniqueQuestions.length) {
      alert('Các câu này đã có trong danh sách hiện tại.')
      return 0
    }

    setQuestions([...questions, ...uniqueQuestions])
    if (selectedSubject) {
      saveQuestionsBySubject(selectedSubject.id, [...questions, ...uniqueQuestions])
    }
    alert(`Đã thêm ${uniqueQuestions.length} câu từ ${label}.`)
    return uniqueQuestions.length
  }

  const handleAddLibrarySet = (subjectId) => {
    const libraryQuestions = getQuestionsBySubject(subjectId)
    const addedCount = addQuestionsToCurrentList(libraryQuestions, 'bộ câu mẫu')
    if (addedCount > 0) {
      setShowLibraryModal(false)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (file.size > MAX_UPLOAD_BYTES) {
      alert('File vượt quá giới hạn 100MB!')
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target.result
        const lines = text.split('\n').filter(line => line.trim())
        
        const uploadedQuestions = lines.map((line, index) => {
          // Format: "câu lý thuyết|true/false" hoặc chỉ "câu lý thuyết"
          const parts = line.split('|')
          return {
            id: Date.now() + index,
            statement: parts[0].trim(),
            isTrue: parts[1] ? parts[1].trim().toLowerCase() === 'true' : true,
            explanation: ''
          }
        })

        setQuestions([...questions, ...uploadedQuestions])
        alert(`Đã tải lên ${uploadedQuestions.length} câu lý thuyết!`)
      } catch (error) {
        alert('Lỗi khi đọc file. Vui lòng kiểm tra định dạng.')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const handleAiQuestionsAdd = (newQuestions) => {
    setQuestions([...questions, ...newQuestions])
    alert(`Đã thêm ${newQuestions.length} câu lý thuyết từ AI!`)
  }

  const handleStart = () => {
    if (questions.length < 5) {
      alert('Cần ít nhất 5 câu lý thuyết để bắt đầu!')
      return
    }
    onQuestionsReady(questions)
  }

  // Lọc câu lý thuyết theo lớp
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
            <h1 className="create-main-title">Tạo Bộ Câu Lý Thuyết</h1>
            <p className="create-subtitle">Chọn môn, thêm câu lý thuyết, tải file hoặc dùng AI</p>
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

            <div className="actions-row actions-row-three" style={{ marginTop: '8px' }}>
              {/* Upload File */}
              <button className="action-card upload" onClick={() => fileInputRef.current?.click()}>
                <div className="action-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                  </svg>
                </div>
                <div className="action-content">
                  <h4>Tải file lên</h4>
                  <p>TXT, mỗi dòng 1 câu (tối đa 100MB)</p>
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
                    placeholder="Nhập câu lý thuyết nhanh..."
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
                  Danh sách câu lý thuyết
                </h3>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button className="btn-start-game" style={{ padding: '8px 12px', fontSize: '0.9rem' }} onClick={handleOpenLibrary}>
                    Thêm bộ câu lý thuyết có sẵn
                  </button>
                  <button className="btn-create-subject" style={{ padding: '8px 12px', fontSize: '0.9rem' }} onClick={clearAllQuestions} disabled={filteredQuestions.length === 0}>
                    Xóa toàn bộ
                  </button>
                  <span className="count-badge">{filteredQuestions.length} câu</span>
                </div>
              </div>

              {filteredQuestions.length === 0 ? (
                <div className="empty-state">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                  <p>Chưa có câu lý thuyết nào</p>
                  <span>Thêm câu lý thuyết hoặc tải file lên</span>
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
                Bắt đầu với {filteredQuestions.length} câu lý thuyết
              </button>
            )}
          </>
        )}
      </div>

      {showLibraryModal && (
        <div
          className="challenge-modal active"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 1000
          }}
        >
          <div
            className="modal-content"
            style={{
              maxWidth: '900px',
              width: '100%',
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              maxHeight: '82vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div>
                <h3 style={{ margin: 0, color: '#1E293B' }}>Thư viện bộ câu lý thuyết có sẵn</h3>
                <p style={{ margin: '6px 0 0', color: '#64748B' }}>Chọn môn trước, rồi chọn bài học để thêm nhanh vào danh sách hiện tại.</p>
              </div>
              <button className="btn-create-subject" onClick={() => setShowLibraryModal(false)}>
                Đóng
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, color: '#475569' }}>Lọc theo lớp:</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {GRADE_OPTIONS.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setLibraryGradeFilter(grade)}
                    style={{
                      padding: '7px 12px',
                      borderRadius: '999px',
                      border: `1px solid ${libraryGradeFilter === grade ? '#6366F1' : '#CBD5E1'}`,
                      background: libraryGradeFilter === grade ? '#EEF2FF' : 'white',
                      color: libraryGradeFilter === grade ? '#4338CA' : '#475569',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            {!selectedLibrarySubject ? (
              <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', textAlign: 'left' }}>
                {filteredLibrarySubjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedLibrarySubjectId(subject.id)}
                    style={{
                      border: `1px solid ${subject.color}`,
                      borderRadius: '14px',
                      padding: '14px',
                      background: subject.bgColor,
                      textAlign: 'left',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '1.1rem' }}>{subject.icon}</span>
                      <span style={{ fontWeight: 700, color: subject.color }}>{subject.name}</span>
                    </div>
                    <p style={{ margin: '0 0 8px', color: '#475569', fontSize: '0.92rem', lineHeight: 1.4 }}>{subject.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.86rem', color: '#64748B' }}>
                      <span>{subject.lessons.length} bài học</span>
                      <span>Chọn bài học</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => {
                    setSelectedLibrarySubjectId(null)
                    setSelectedLibraryLesson(null)
                  }}
                  style={{ marginBottom: '12px', padding: '8px 12px', borderRadius: '999px', border: '1px solid #CBD5E1', background: 'white', cursor: 'pointer', fontWeight: 600, color: '#475569' }}
                >
                  ← Quay lại các môn
                </button>
                <div style={{ display: 'grid', gap: '10px', textAlign: 'left' }}>
                  {filteredLibraryLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      style={{
                        border: `1px solid ${selectedLibrarySubject.color}`,
                        borderRadius: '12px',
                        padding: '12px 14px',
                        background: 'white',
                        boxShadow: '0 1px 4px rgba(15, 23, 42, 0.06)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 800, color: selectedLibrarySubject.color, fontSize: '1rem' }}>{lesson.title}</span>
                        <span style={{ fontSize: '0.8rem', padding: '4px 8px', borderRadius: '999px', background: '#F8FAFC', color: '#64748B' }}>{lesson.grade}</span>
                      </div>
                      <p style={{ margin: '0 0 10px', color: '#64748B', fontSize: '0.92rem' }}>{lesson.description}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => {
                            setSelectedLibraryLesson(lesson)
                            setSelectedLibrarySetIds([])
                            setSelectedLibraryQuestionIds([])
                          }}
                          style={{ padding: '7px 12px', borderRadius: '999px', border: '1px solid #CBD5E1', background: 'white', cursor: 'pointer', fontWeight: 700, color: '#475569' }}
                        >
                          {selectedLibraryLesson?.id === lesson.id ? 'Ẩn nội dung' : 'Mở nội dung'}
                        </button>
                      </div>
                      {selectedLibraryLesson?.id === lesson.id && (
                        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                            <div style={{ fontWeight: 800, color: '#1E293B' }}>Chọn câu hỏi</div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              <button
                                onClick={handleSelectAllLibraryQuestions}
                                style={{ padding: '6px 10px', borderRadius: '999px', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', fontWeight: 700, color: '#334155' }}
                              >
                                Chọn tất cả câu
                              </button>
                              <button
                                onClick={handleClearLibrarySelections}
                                style={{ padding: '6px 10px', borderRadius: '999px', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: 'pointer', fontWeight: 700, color: '#334155' }}
                              >
                                Bỏ chọn tất cả
                              </button>
                            </div>
                          </div>
                          <div style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#64748B', fontWeight: 600 }}>
                            Đã chọn: {selectedLibraryQuestionIds.length} câu • {selectedLibrarySetIds.length} bộ
                          </div>
                          <div style={{ display: 'grid', gap: '10px' }}>
                            {lesson.sets.map((set) => (
                              <div key={set.id} style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '10px', background: '#F8FAFC' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                  <span style={{ fontWeight: 700, color: '#334155' }}>{set.title}</span>
                                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    <button
                                      onClick={() => {
                                        const addedCount = addQuestionsToCurrentList(set.questions, `${lesson.title} • ${set.title}`)
                                        if (addedCount > 0) {
                                          setSelectedLibraryLesson(null)
                                          setShowLibraryModal(false)
                                        }
                                      }}
                                      style={{ padding: '6px 10px', borderRadius: '999px', border: 'none', background: '#10B981', color: 'white', cursor: 'pointer', fontWeight: 700 }}
                                    >
                                      Thêm cả bộ
                                    </button>
                                    <button
                                      onClick={() => toggleLibrarySetSelection(set.id)}
                                      style={{ padding: '6px 10px', borderRadius: '999px', border: '1px solid #CBD5E1', background: selectedLibrarySetIds.includes(set.id) ? '#EEF2FF' : 'white', color: selectedLibrarySetIds.includes(set.id) ? '#4338CA' : '#475569', cursor: 'pointer', fontWeight: 700 }}
                                    >
                                      {selectedLibrarySetIds.includes(set.id) ? 'Đã chọn bộ' : 'Chọn bộ'}
                                    </button>
                                  </div>
                                </div>
                                <div style={{ marginBottom: '8px', fontSize: '0.84rem', color: '#64748B' }}>Bạn có thể chọn từng câu bên dưới hoặc thêm cả bộ ngay.</div>
                                <div style={{ display: 'grid', gap: '6px' }}>
                                  {set.questions.map((q, index) => (
                                    <label key={`${set.id}-${q.id}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: '#475569', cursor: 'pointer', background: 'white', padding: '7px 8px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                                      <input
                                        type="checkbox"
                                        checked={selectedLibraryQuestionIds.includes(q.id)}
                                        onChange={() => toggleLibraryQuestionSelection(q.id)}
                                      />
                                      <span>{index + 1}. {q.statement}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                            <button
                              onClick={handleAddSelectedLibrarySets}
                              style={{ padding: '8px 14px', borderRadius: '999px', border: 'none', background: selectedLibrarySubject.color, color: 'white', cursor: 'pointer', fontWeight: 800 }}
                            >
                              Thêm các câu đã chọn
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateQuestions
