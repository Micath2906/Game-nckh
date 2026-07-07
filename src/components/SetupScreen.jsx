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
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h1 className="game-title">GETTER SAVER</h1>
          <p className="game-subtitle">Trò chơi phóng xạ - Ai sẽ sống sót?</p>
        </div>
      </div>
      
      <div className="setup-content">
        <div className="setup-section">
          <div className="section-header">
            <div className="section-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <h3>Thiết lập người chơi</h3>
          </div>
          
          <div className="player-count-selector">
            <label htmlFor="player-count">Số lượng người chơi:</label>
            <div className="count-buttons" role="group" aria-label="Chọn số lượng người chơi">
              {[3, 4, 5].map(count => (
                <button
                  key={count}
                  className={`count-btn ${playerCount === count ? 'active' : ''}`}
                  onClick={() => handlePlayerCountChange({ target: { value: count } })}
                  aria-pressed={playerCount === count}
                >
                  {count} người
                </button>
              ))}
            </div>
          </div>

          <div className="player-inputs-grid" role="group" aria-label="Nhập tên người chơi">
            {playerNames.map((name, index) => (
              <div key={index} className="player-input-card">
                <div className="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  id={`player-name-${index}`}
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Tên người chơi ${index + 1}`}
                  className="player-name-input"
                  aria-label={`Tên người chơi ${index + 1}`}
                  maxLength={20}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <button className="btn btn-start" onClick={handleStart}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
        </svg>
        <span>BẮT ĐẦU GAME</span>
      </button>
    </div>
  )
}

export default SetupScreen
