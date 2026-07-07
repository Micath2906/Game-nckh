import './styles.css'

function LandingPage({ onStart }) {
  return (
    <div className="landing-screen">
      <div className="landing-container">
        {/* Hero Section */}
        <div className="landing-hero">
          <div className="landing-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z"/>
            </svg>
          </div>
          <h1 className="landing-title">GETTER SAVER</h1>
          <p className="landing-subtitle">Trò chơi ôn luyện lý thuyết - Chinh phục từng câu hỏi</p>
        </div>

        {/* Game Rules */}
        <div className="landing-rules-section">
          <h2 className="rules-title">Luật chơi</h2>
          
          {/* Radiation Types */}
          <div className="rules-category">
            <h3 className="category-title">
              <span className="category-icon radiation-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
              </span>
              3 Loại tia phóng xạ
            </h3>
            <div className="radiation-cards">
              <div className="radiation-card alpha">
                <span className="radiation-symbol">α</span>
                <span className="radiation-name">Alpha</span>
                <span className="radiation-damage">-1 Tim</span>
                <span className="radiation-desc">Hạt Heli, yếu nhất</span>
              </div>
              <div className="radiation-card beta">
                <span className="radiation-symbol">β</span>
                <span className="radiation-name">Beta</span>
                <span className="radiation-damage">-2 Tim</span>
                <span className="radiation-desc">Electron nhanh</span>
              </div>
              <div className="radiation-card gamma">
                <span className="radiation-symbol">γ</span>
                <span className="radiation-name">Gamma</span>
                <span className="radiation-damage">-3 Tim</span>
                <span className="radiation-desc">Sóng năng lượng cao</span>
              </div>
            </div>
          </div>

          {/* Shields */}
          <div className="rules-category">
            <h3 className="category-title">
              <span className="category-icon shield-icon">
                <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
              </span>
              3 Loại lá chắn
            </h3>
            <div className="shield-cards">
              <div className="shield-card">
                <span className="shield-icon-wrapper paper">
                  <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>
                </span>
                <span className="shield-name">Giấy</span>
                <span className="shield-blocks">Chặn α</span>
              </div>
              <div className="shield-card">
                <span className="shield-icon-wrapper aluminum">
                  <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
                </span>
                <span className="shield-name">Nhôm</span>
                <span className="shield-blocks">Chặn α + β</span>
              </div>
              <div className="shield-card">
                <span className="shield-icon-wrapper lead">
                  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z"/></svg>
                </span>
                <span className="shield-name">Chì</span>
                <span className="shield-blocks">Chặn tất cả</span>
              </div>
            </div>
          </div>

          {/* Gameplay Flow */}
          <div className="rules-category">
            <h3 className="category-title">
              <span className="category-icon flow-icon">
                <svg viewBox="0 0 24 24"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/></svg>
              </span>
              Lượt chơi
            </h3>
            <div className="flow-steps">
              <div className="flow-step">
                <span className="step-num">1</span>
                <span className="step-text">Thiết lập</span>
              </div>
              <div className="flow-step">
                <span className="step-num">2</span>
                <span className="step-text">Đọc câu lý thuyết</span>
              </div>
              <div className="flow-step">
                <span className="step-num">3</span>
                <span className="step-text">Chọn đáp án</span>
              </div>
              <div className="flow-step">
                <span className="step-num">4</span>
                <span className="step-text">Kiểm tra</span>
              </div>
              <div className="flow-step">
                <span className="step-num">5</span>
                <span className="step-text">Xem kết quả</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="landing-cta">
          <button className="btn btn-start btn-large" onClick={onStart}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>BẮT ĐẦU CHƠI</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="landing-quick-stats">
          <div className="stat-item">
            <span className="stat-icon hearts">
              <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </span>
            <span className="stat-value">3</span>
            <span className="stat-label">Mạng</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon shields">
              <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
            </span>
            <span className="stat-value">3</span>
            <span className="stat-label">Lá chắn</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon players">
              <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            </span>
            <span className="stat-value">3-5</span>
            <span className="stat-label">Người chơi</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
