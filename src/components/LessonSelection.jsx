import { useState } from 'react'
import './styles.css'
import { getQuestionsBySubject } from '../data/subjectQuestions'

// Sample lessons - you can expand this
const LESSONS_BY_SUBJECT = {
  physics: [
    { id: 1, name: 'Chuyển động cơ học', difficulty: 'Dễ', questionCount: 18, grade: 'Lớp 10' },
    { id: 2, name: 'Dao động cơ', difficulty: 'Trung bình', questionCount: 16, grade: 'Lớp 12' },
    { id: 3, name: 'Sóng điện từ', difficulty: 'Trung bình', questionCount: 15, grade: 'Lớp 12' },
    { id: 4, name: 'Quang học', difficulty: 'Dễ', questionCount: 18, grade: 'Lớp 11' },
    { id: 5, name: 'Phóng xạ và Hạt nhân', difficulty: 'Khó', questionCount: 20, grade: 'Lớp 12' },
    { id: 6, name: 'Điện trường', difficulty: 'Trung bình', questionCount: 17, grade: 'Lớp 11' },
    { id: 7, name: 'Từ trường', difficulty: 'Trung bình', questionCount: 16, grade: 'Lớp 11' },
    { id: 8, name: 'Cơ học đại cương', difficulty: 'Dễ', questionCount: 20, grade: 'Đại học' }
  ],
  chemistry: [
    { id: 1, name: 'Bảng tuần hoàn', difficulty: 'Dễ', questionCount: 22, grade: 'Lớp 10' },
    { id: 2, name: 'Liên kết hóa học', difficulty: 'Trung bình', questionCount: 18, grade: 'Lớp 10' },
    { id: 3, name: 'Phản ứng oxi hóa khử', difficulty: 'Khó', questionCount: 18, grade: 'Lớp 10' },
    { id: 4, name: 'Hóa hữu cơ', difficulty: 'Trung bình', questionCount: 20, grade: 'Lớp 11' },
    { id: 5, name: 'Hóa học polimer', difficulty: 'Khó', questionCount: 16, grade: 'Lớp 12' },
    { id: 6, name: 'Hóa vô cơ nâng cao', difficulty: 'Khó', questionCount: 19, grade: 'Đại học' }
  ],
  biology: [
    { id: 1, name: 'Tế bào học', difficulty: 'Dễ', questionCount: 20, grade: 'Lớp 10' },
    { id: 2, name: 'Cấu trúc tế bào', difficulty: 'Trung bình', questionCount: 15, grade: 'Lớp 10' },
    { id: 3, name: 'Di truyền học', difficulty: 'Khó', questionCount: 17, grade: 'Lớp 12' },
    { id: 4, name: 'Sinh thái học', difficulty: 'Dễ', questionCount: 14, grade: 'Lớp 12' },
    { id: 5, name: 'Sinh học phân tử', difficulty: 'Khó', questionCount: 18, grade: 'Đại học' }
  ],
  math: [
    { id: 1, name: 'Đại số cơ bản', difficulty: 'Dễ', questionCount: 25, grade: 'Lớp 10' },
    { id: 2, name: 'Hình học không gian', difficulty: 'Trung bình', questionCount: 20, grade: 'Lớp 11' },
    { id: 3, name: 'Hàm số và đồ thị', difficulty: 'Trung bình', questionCount: 22, grade: 'Lớp 10' },
    { id: 4, name: 'Logarit và Mũ', difficulty: 'Trung bình', questionCount: 18, grade: 'Lớp 12' },
    { id: 5, name: 'Đại số tuyến tính', difficulty: 'Khó', questionCount: 25, grade: 'Đại học' },
    { id: 6, name: 'Tích phân', difficulty: 'Khó', questionCount: 20, grade: 'Lớp 12' }
  ],
  literature: [
    { id: 1, name: 'Văn học dân gian', difficulty: 'Dễ', questionCount: 15, grade: 'Lớp 10' },
    { id: 2, name: 'Văn học Trung đại', difficulty: 'Trung bình', questionCount: 12, grade: 'Lớp 11' },
    { id: 3, name: 'Tác phẩm hiện đại', difficulty: 'Dễ', questionCount: 15, grade: 'Lớp 12' },
    { id: 4, name: 'Văn học đương đại', difficulty: 'Trung bình', questionCount: 14, grade: 'Đại học' }
  ],
  history: [
    { id: 1, name: 'Lịch sử Việt Nam cổ đại', difficulty: 'Trung bình', questionCount: 18, grade: 'Lớp 10' },
    { id: 2, name: 'Lịch sử thế giới cận đại', difficulty: 'Trung bình', questionCount: 20, grade: 'Lớp 11' },
    { id: 3, name: 'Chiến tranh thế giới', difficulty: 'Khó', questionCount: 18, grade: 'Lớp 12' },
    { id: 4, name: 'Lịch sử Việt Nam hiện đại', difficulty: 'Trung bình', questionCount: 22, grade: 'Lớp 12' }
  ]
}

const GRADE_OPTIONS = ['Tất cả', 'Lớp 10', 'Lớp 11', 'Lớp 12', 'Đại học']

function LessonSelection({ subject, onSelectLesson, onBack }) {
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [gradeFilter, setGradeFilter] = useState('Tất cả')
  
  const lessons = LESSONS_BY_SUBJECT[subject.id] || []
  
  const gradeOptions = ['Tất cả', 'Lớp 10', 'Lớp 11', 'Lớp 12', 'Đại học']
  
  // Lọc bài học theo lớp
  const filteredLessons = gradeFilter === 'Tất cả' 
    ? lessons 
    : lessons.filter(lesson => lesson.grade === gradeFilter)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Dễ': return '#10B981'
      case 'Trung bình': return '#F59E0B'
      case 'Khó': return '#EF4444'
      default: return '#6366F1'
    }
  }

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson.id)
    
    // Load câu hỏi thực tế từ data
    const subjectQuestions = getQuestionsBySubject(subject.id)
    
    setTimeout(() => {
      onSelectLesson(lesson, subjectQuestions)
    }, 300)
  }

  return (
    <div className="lesson-selection-screen">
      <div className="lesson-container">
        {/* Header */}
        <div className="lesson-header">
          <button className="btn-back" onClick={onBack}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <div className="lesson-title-section">
            <div className="subject-badge" style={{ background: subject.color }}>
              <span>{subject.icon}</span>
              <span>{subject.name}</span>
            </div>
            <h1 className="lesson-main-title">Chọn Bài Học</h1>
            <p className="lesson-subtitle">Chọn một bài học để bắt đầu</p>
          </div>
        </div>

        {/* Lessons Section */}
        <div className="lessons-section">
          <div className="lessons-header-section">
            <h2 className="lessons-section-title">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
              Bài Học Có Sẵn
            </h2>
            
            {/* Grade Filter */}
            <div className="grade-filter">
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
          </div>
          
          <div className="lessons-grid">
            {filteredLessons.length === 0 ? (
              <div className="no-lessons">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <p>Không có bài học nào cho {gradeFilter}</p>
              </div>
            ) : (
              filteredLessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className={`lesson-card stagger-item ${selectedLesson === lesson.id ? 'selected' : ''}`}
                onClick={() => handleLessonClick(lesson)}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="lesson-number">#{lesson.id}</div>
                <div className="lesson-grade-badge">{lesson.grade}</div>
                <h3 className="lesson-name">{lesson.name}</h3>
                <div className="lesson-stats">
                  <div 
                    className="difficulty-badge"
                    style={{ background: getDifficultyColor(lesson.difficulty) }}
                  >
                    {lesson.difficulty}
                  </div>
                  <div className="question-count">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                    </svg>
                    {lesson.questionCount} câu
                  </div>
                </div>
                <div className="lesson-select-indicator">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonSelection
