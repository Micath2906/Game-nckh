import { useState } from 'react'
import './styles.css'

function SetupScreen({ onStartGame }) {
  const [playerCount, setPlayerCount] = useState(3)
  const [playerNames, setPlayerNames] = useState(['', '', ''])

  const handlePlayerCountChange = (e) => {
    const count = parseInt(e.target.value)
    setPlayerCount(count)
    
    // Adjust player names array
    const newNames = [...playerNames]
    while (newNames.length < count) {
      newNames.push('')
    }
    while (newNames.length > count) {
      newNames.pop()
    }
    setPlayerNames(newNames)
  }

  const handleNameChange = (index, value) => {
    const newNames = [...playerNames]
    newNames[index] = value
    setPlayerNames(newNames)
  }

  const handleStart = () => {
    // Validate names
    const validNames = playerNames.map((name, index) => 
      name.trim() || `Người chơi ${index + 1}`
    )
    
    if (validNames.length >= 3 && validNames.length <= 5) {
      onStartGame(validNames)
    } else {
      alert('Vui lòng chọn từ 3-5 người chơi!')
    }
  }

  return (
    <div className="setup-screen fade-in">
      <div className="setup-header">
        <div className="game-logo">
          <span className="logo-icon pulse">☢️</span>
          <h1 className="game-title">RADIATION BAR</h1>
          <p className="game-subtitle">Trò chơi phóng xạ - Ai sẽ sống sót?</p>
        </div>
      </div>
      
      <div className="setup-content">
        <div className="setup-section">
          <div className="section-header">
            <span className="section-icon">👥</span>
            <h3>Thiết lập người chơi</h3>
          </div>
          
          <div className="player-count-selector">
            <label>Số lượng người chơi:</label>
            <div className="count-buttons">
              {[3, 4, 5].map(count => (
                <button
                  key={count}
                  className={`count-btn ${playerCount === count ? 'active' : ''}`}
                  onClick={() => handlePlayerCountChange({ target: { value: count } })}
                >
                  {count} người
                </button>
              ))}
            </div>
          </div>

          <div className="player-inputs-grid">
            {playerNames.map((name, index) => (
              <div key={index} className="player-input-card">
                <div className="input-icon">🎮</div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Người chơi ${index + 1}`}
                  className="player-name-input"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rules-section">
          <div className="section-header">
            <span className="section-icon">📖</span>
            <h3>Luật chơi cơ bản</h3>
          </div>
          
          <div className="rules-grid">
            <div className="rule-card">
              <div className="rule-icon">❤️</div>
              <h4>Mạng sống</h4>
              <p>Mỗi người có <strong>3 Tim</strong> và 3 lá chắn bảo vệ</p>
            </div>

            <div className="rule-card">
              <div className="rule-icon">🎯</div>
              <h4>Lượt chơi</h4>
              <p>Đọc lý thuyết → Bắt bài/Tin → Bóp cò</p>
            </div>

            <div className="rule-card">
              <div className="rule-icon">☢️</div>
              <h4>Tia phóng xạ</h4>
              <p><span className="alpha-badge">α -1❤️</span> <span className="beta-badge">β -2❤️</span> <span className="gamma-badge">γ -3❤️</span></p>
            </div>

            <div className="rule-card">
              <div className="rule-icon">🛡️</div>
              <h4>Lá chắn</h4>
              <p>📄 chặn α | 🔩 chặn α+β | 🔘 chặn tất cả</p>
            </div>
          </div>
        </div>
      </div>
      
      <button className="btn btn-start" onClick={handleStart}>
        <span className="btn-icon">🚀</span>
        <span>BẮT ĐẦU GAME</span>
      </button>
    </div>
  )
}

export default SetupScreen
