import './styles.css'

function Navbar({ currentScreen, onNavigate, canGoBack = false, onBack }) {
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'subjects': return 'Chọn Môn Học'
      case 'lessons': return 'Chọn Bài Học'
      case 'create': return 'Tạo Câu Hỏi'
      case 'setup': return 'Thiết Lập Game'
      case 'playing': return 'Đang Chơi'
      case 'winner': return 'Kết Quả'
      default: return 'Radiation Bar'
    }
  }

  return (
    <nav className="app-navbar">
      <div className="navbar-content">
        {/* Left side - Back button & Title */}
        <div className="navbar-left">
          {canGoBack && onBack && (
            <button className="navbar-back-btn" onClick={onBack}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </button>
          )}
          
          <div className="navbar-brand">
            <span className="navbar-icon">☢️</span>
            <span className="navbar-title">{getScreenTitle()}</span>
          </div>
        </div>

        {/* Right side - Navigation buttons */}
        <div className="navbar-right">
          {currentScreen === 'subjects' && (
            <button 
              className="navbar-btn primary" 
              onClick={() => onNavigate('create')}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              <span>Tạo Câu Hỏi</span>
            </button>
          )}

          {currentScreen === 'create' && (
            <button 
              className="navbar-btn secondary" 
              onClick={() => onNavigate('subjects')}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
              </svg>
              <span>Duyệt Môn Học</span>
            </button>
          )}

          {(currentScreen === 'playing' || currentScreen === 'winner') && (
            <button 
              className="navbar-btn danger" 
              onClick={() => onNavigate('subjects')}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span>Về Trang Chủ</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
