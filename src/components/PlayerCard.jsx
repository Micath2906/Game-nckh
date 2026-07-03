import './styles.css'

function PlayerCard({ player, isActive }) {
  const hearts = '❤️'.repeat(Math.max(0, player.hearts))
  
  return (
    <div className={`player-card ${isActive ? 'active glow' : ''} ${!player.isAlive ? 'eliminated' : ''}`}>
      <div className="player-card-header">
        <div className="player-avatar">
          {player.isAlive ? '🎮' : '💀'}
        </div>
        <div className="player-info">
          <div className="player-name">{player.name}</div>
          {isActive && <div className="active-badge">⚡ Lượt của bạn</div>}
        </div>
      </div>
      
      <div className="player-stats">
        <div className="hearts-container">
          <div className="stat-label">Mạng sống</div>
          <div className="hearts">
            {player.isAlive ? (
              <>
                {hearts}
                <span className="hearts-count">×{player.hearts}</span>
              </>
            ) : (
              <span className="eliminated-text">💀 ĐÃ LOẠI</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="shields-container">
        <div className="stat-label">Lá chắn bảo vệ</div>
        <div className="shields">
          <div className={`shield-item paper ${!player.shields.paper ? 'used' : ''}`} title="Chặn tia Alpha">
            <div className="shield-icon">📄</div>
            <div className="shield-name">Giấy</div>
            {!player.shields.paper && <div className="used-overlay">✗</div>}
          </div>
          <div className={`shield-item aluminum ${!player.shields.aluminum ? 'used' : ''}`} title="Chặn tia Alpha & Beta">
            <div className="shield-icon">🔩</div>
            <div className="shield-name">Nhôm</div>
            {!player.shields.aluminum && <div className="used-overlay">✗</div>}
          </div>
          <div className={`shield-item lead ${!player.shields.lead ? 'used' : ''}`} title="Chặn tất cả tia">
            <div className="shield-icon">🔘</div>
            <div className="shield-name">Chì</div>
            {!player.shields.lead && <div className="used-overlay">✗</div>}
          </div>
        </div>
      </div>

      {player.hints.length > 0 && (
        <div className="hints-section">
          <div className="hints-header">
            <span className="hint-icon">💡</span>
            <span className="hint-label">Gợi ý thu được</span>
          </div>
          <div className="hints-list">
            {player.hints.map((hint, index) => (
              <div key={index} className="hint-item">
                <span className="hint-bullet">▸</span>
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
