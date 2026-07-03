import { useState } from 'react'

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
    <div className="setup-screen">
      <h1>🎲 RADIATION BAR</h1>
      <h2>Trò chơi phóng xạ - Ai sẽ sống sót?</h2>
      
      <div className="player-inputs">
        <div className="player-input">
          <label>Số lượng người chơi (3-5):</label>
          <input 
            type="number" 
            min="3" 
            max="5" 
            value={playerCount}
            onChange={handlePlayerCountChange}
          />
        </div>
        
        {playerNames.map((name, index) => (
          <div key={index} className="player-input">
            <label>Tên người chơi {index + 1}:</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              placeholder={`Người chơi ${index + 1}`}
            />
          </div>
        ))}
      </div>
      
      <button className="btn btn-primary" onClick={handleStart}>
        🎮 BẮT ĐẦU GAME
      </button>
      
      <div style={{marginTop: '30px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', fontSize: '0.9em'}}>
        <h3 style={{marginBottom: '10px'}}>📖 Luật chơi ngắn gọn:</h3>
        <ul style={{textAlign: 'left', lineHeight: '1.8'}}>
          <li>Mỗi người có 3 ❤️ và 3 lá chắn (Giấy, Nhôm, Chì)</li>
          <li>Mỗi lượt: Đọc lý thuyết → Bắt bài hoặc tin tưởng → Bóp cò</li>
          <li>Trúng đạn Alpha (α) -1❤️, Beta (β) -2❤️, Gamma (γ) -3❤️</li>
          <li>Dùng lá chắn để miễn nhiễm: Giấy chặn α, Nhôm chặn α+β, Chì chặn tất cả</li>
          <li>Người sống sót cuối cùng chiến thắng!</li>
        </ul>
      </div>
    </div>
  )
}

export default SetupScreen
