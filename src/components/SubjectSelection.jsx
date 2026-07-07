import { useState } from 'react'
import './styles.css'

const SUBJECTS = [
  {
    id: 'physics',
    name: 'Vật Lý',
    icon: '⚛️',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    description: 'Cơ học, Điện từ, Quang học, Hạt nhân',
    lessonCount: 12,
    grades: ['Lớp 10', 'Lớp 11', 'Lớp 12', 'Đại học']
  },
  {
    id: 'chemistry',
    name: 'Hóa Học',
    icon: '🧪',
    color: '#DC2626',
    bgColor: '#FEE2E2',
    description: 'Hóa vô cơ, Hữu cơ, Phân tích',
    lessonCount: 10,
    grades: ['Lớp 10', 'Lớp 11', 'Lớp 12', 'Đại học']
  },
  {
    id: 'biology',
    name: 'Sinh Học',
    icon: '🧬',
    color: '#059669',
    bgColor: '#D1FAE5',
    description: 'Tế bào, Di truyền, Sinh thái',
    lessonCount: 8,
    grades: ['Lớp 10', 'Lớp 12', 'Đại học']
  },
  {
    id: 'math',
    name: 'Toán Học',
    icon: '📐',
    color: '#D97706',
    bgColor: '#FEF3C7',
    description: 'Đại số, Hình học, Giải tích',
    lessonCount: 15,
    grades: ['Lớp 10', 'Lớp 11', 'Lớp 12', 'Đại học']
  },
  {
    id: 'literature',
    name: 'Ngữ Văn',
    icon: '📚',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    description: 'Văn học, Tác phẩm, Tác giả',
    lessonCount: 6,
    grades: ['Lớp 10', 'Lớp 11', 'Lớp 12', 'Đại học']
  },
  {
    id: 'history',
    name: 'Lịch Sử',
    icon: '🏛️',
    color: '#BE185D',
    bgColor: '#FCE7F3',
    description: 'Việt Nam, Thế giới, Văn hóa',
    lessonCount: 7,
    grades: ['Lớp 10', 'Lớp 11', 'Lớp 12']
  }
]

function SubjectSelection({ onSelectSubject, onCreateQuestions }) {
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [gradeFilter, setGradeFilter] = useState('Tất cả')

  const gradeOptions = ['Tất cả', 'Lớp 10', 'Lớp 11', 'Lớp 12', 'Đại học']
  
  // Lọc môn học theo lớp
  const filteredSubjects = gradeFilter === 'Tất cả'
    ? SUBJECTS
    : SUBJECTS.filter(subject => subject.grades.includes(gradeFilter))

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject.id)
    setTimeout(() => {
      onSelectSubject(subject)
    }, 300)
  }

  return (
    <div className="subject-selection-screen">
      <div className="subject-container">
        {/* Header */}
        <div className="subject-header-simple">
          <p className="subject-subtitle">Chọn môn học để bắt đầu học tập hoặc tạo bộ câu lý thuyết riêng</p>
        </div>

        {/* Grade Filter */}
        <div className="grade-filter-section">
          <label className="filter-label">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
            Lọc theo lớp:
          </label>
          <div className="grade-buttons">
            {gradeOptions.map((grade) => (
              <button
                key={grade}
                className={`grade-btn ${gradeFilter === grade ? 'active' : ''}`}
                onClick={() => setGradeFilter(grade)}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Grid */}
        <div className="subjects-grid">
          {filteredSubjects.length === 0 ? (
            <div className="no-subjects">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <p>Không có môn học nào cho {gradeFilter}</p>
            </div>
          ) : (
            filteredSubjects.map((subject, index) => (
              <div
                key={subject.id}
                className={`subject-card stagger-item ${selectedSubject === subject.id ? 'selected' : ''}`}
                onClick={() => handleSubjectClick(subject)}
                style={{ 
                  '--subject-color': subject.color,
                  '--subject-bg-color': subject.bgColor,
                  animationDelay: `${index * 0.1}s` 
                }}
              >
                <div className="subject-icon-wrapper">
                  <span className="subject-emoji">{subject.icon}</span>
                </div>
                <h3 className="subject-name">{subject.name}</h3>
                <p className="subject-description">{subject.description}</p>
                <div className="subject-meta">
                  <div className="lesson-count">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                    </svg>
                    {subject.lessonCount} bài
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SubjectSelection
