import './styles.css'

function PlayerCard({ player, isActive }) {
  return (
    <div 
      className={`player-card ${isActive ? 'active glow' : ''} ${!player.isAlive ? 'eliminated' : ''}`}
      role="article"
      aria-label={`Người chơi ${player.name}, ${player.isAlive ? 'còn sống' : 'đã bị loại'}`}
    >
      <div className="player-card-header">
        <div className="player-avatar" aria-hidden="true">
          {player.isAlive ? (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            </svg>
          )}
        </div>
        <div className="player-info">
          <div className="player-name">{player.name}</div>
          {isActive && (
            <div className="active-badge" role="status" aria-label="Đang là lượt của bạn">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Lượt của bạn
            </div>
          )}
        </div>
      </div>
      
      <div className="player-stats">
        <div className="hearts-container">
          <div className="stat-label" aria-hidden="true">Mạng sống</div>
          <div className="hearts" role="img" aria-label={`Còn ${player.hearts} mạng`}>
            {player.isAlive ? (
              <>
                {[...Array(player.hearts)].map((_, i) => (
                  <div key={i} className="heart" aria-hidden="true">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                ))}
                <span className="hearts-count">x{player.hearts}</span>
              </>
            ) : (
              <span className="eliminated-text" role="alert">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                </svg>
                ĐÃ LOẠI
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="shields-container">
        <div className="stat-label" aria-hidden="true">Lá chắn bảo vệ</div>
        <div className="shields" role="group" aria-label="Lá chắn">
          <div 
            className={`shield-item paper ${!player.shields.paper ? 'used' : ''}`} 
            title="Chặn tia Alpha"
            aria-label={`Giấy - ${player.shields.paper ? 'Còn' : 'Đã dùng'}`}
          >
            <div className="shield-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <div className="shield-name">Giấy</div>
            {!player.shields.paper && <div className="used-overlay" aria-hidden="true">✕</div>}
          </div>
          <div 
            className={`shield-item aluminum ${!player.shields.aluminum ? 'used' : ''}`} 
            title="Chặn tia Alpha & Beta"
            aria-label={`Nhôm - ${player.shields.aluminum ? 'Còn' : 'Đã dùng'}`}
          >
            <div className="shield-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
              </svg>
            </div>
            <div className="shield-name">Nhôm</div>
            {!player.shields.aluminum && <div className="used-overlay" aria-hidden="true">✕</div>}
          </div>
          <div 
            className={`shield-item lead ${!player.shields.lead ? 'used' : ''}`} 
            title="Chặn tất cả tia"
            aria-label={`Chì - ${player.shields.lead ? 'Còn' : 'Đã dùng'}`}
          >
            <div className="shield-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                <circle cx="12" cy="12" r="5"/>
              </svg>
            </div>
            <div className="shield-name">Chì</div>
            {!player.shields.lead && <div className="used-overlay" aria-hidden="true">✕</div>}
          </div>
        </div>
      </div>

      {player.hints.length > 0 && (
        <div className="hints-section" role="region" aria-label="Gợi ý đã thu thập">
          <div className="hints-header">
            <div className="hint-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
              </svg>
            </div>
            <span className="hint-label">Gợi ý thu được</span>
          </div>
          <div className="hints-list">
            {player.hints.map((hint, index) => (
              <div key={index} className="hint-item">
                <span className="hint-bullet" aria-hidden="true">▸</span>
                {hint}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PlayerCard
