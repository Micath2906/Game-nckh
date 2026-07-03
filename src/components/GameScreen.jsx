import { useState, useEffect } from 'react'
import PlayerCard from './PlayerCard'
import GameLog from './GameLog'
import { THEORIES, RADIATION_TYPES } from '../data/theories'

function GameScreen({ players, setPlayers, onGameEnd, customQuestions }) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [chamber, setChamber] = useState([])
  const [currentTheory, setCurrentTheory] = useState(null)
  const [gamePhase, setGamePhase] = useState('draw') // 'draw', 'read', 'challenge', 'shoot'
  const [selectedShield, setSelectedShield] = useState(null)
  const [logs, setLogs] = useState([])
  const [challenger, setChallenger] = useState(null)

  // Sử dụng câu hỏi custom hoặc mặc định
  const questionsToUse = customQuestions.length > 0 ? customQuestions : THEORIES

  // Initialize chamber
  useEffect(() => {
    resetChamber()
  }, [])

  // Check for winner
  useEffect(() => {
    const alivePlayers = players.filter(p => p.isAlive)
    if (alivePlayers.length === 1) {
      setTimeout(() => {
        onGameEnd(alivePlayers[0])
      }, 2000)
    }
  }, [players, onGameEnd])

  const resetChamber = () => {
    // 6 bullets: 5 empty, 1 radiation
    const radiationType = RADIATION_TYPES[Math.floor(Math.random() * RADIATION_TYPES.length)]
    const newChamber = Array(6).fill(null)
    const randomIndex = Math.floor(Math.random() * 6)
    newChamber[randomIndex] = radiationType
    
    setChamber(newChamber)
    addLog(`🔫 Ổ đạn đã được nạp lại! Loại tia: ??? (${radiationType.damage}❤️)`, 'info')
  }

  const addLog = (message, type = 'info') => {
    setLogs(prev => [{
      id: Date.now(),
      message,
      type
    }, ...prev].slice(0, 20))
  }

  const drawTheory = () => {
    const theory = questionsToUse[Math.floor(Math.random() * questionsToUse.length)]
    setCurrentTheory(theory)
    setGamePhase('read')
    addLog(`📖 ${players[currentPlayerIndex].name} đã rút lá bài lý thuyết`, 'info')
  }

  const readTheory = (readCorrectly) => {
    const actualStatement = currentTheory.statement
    const invertedStatement = currentTheory.invertedStatement
    
    // Người chơi chọn đọc đúng hay sai
    const statementToRead = readCorrectly ? actualStatement : invertedStatement
    const actuallyTrue = readCorrectly ? currentTheory.isTrue : !currentTheory.isTrue
    
    // Lưu thông tin về câu đã đọc
    setCurrentTheory({
      ...currentTheory,
      readStatement: statementToRead,
      readCorrectly: readCorrectly,
      actuallyTrue: actuallyTrue
    })
    
    setGamePhase('challenge')
    addLog(`📖 ${players[currentPlayerIndex].name} đọc: "${statementToRead}"`, 'info')
  }

  const handleChallenge = () => {
    // Check if the statement read was actually false (người đọc nói sai)
    const statementIsFalse = !currentTheory.actuallyTrue
    
    if (statementIsFalse) {
      // Challenger wins - bắt bài đúng
      const radiationType = chamber.find(b => b !== null)
      if (radiationType) {
        const hint = radiationType.hints[Math.floor(Math.random() * radiationType.hints.length)]
        
        const updatedPlayers = [...players]
        updatedPlayers[currentPlayerIndex].hints.push(hint)
        setPlayers(updatedPlayers)
        
        addLog(`✅ BẮT BÀI ĐÚNG! Câu lý thuyết SAI. Nhận gợi ý: "${hint}"`, 'safe')
      }
      
      addLog(`🔫 ${players[currentPlayerIndex].name} (người đọc) phải bóp cò!`, 'damage')
      setGamePhase('shoot')
    } else {
      // Challenger loses - bắt bài sai (câu vốn đúng)
      addLog(`❌ BẮT BÀI SAI! Câu lý thuyết là ĐÚNG!`, 'damage')
      addLog(`🔫 Người bắt bài phải tự bóp cò!`, 'damage')
      
      // Người bắt bài phải bóp cò - chuyển sang họ
      setChallenger(currentPlayerIndex)
      setGamePhase('shoot')
    }
  }

  const handleAccept = () => {
    // Move to next player
    addLog(`✅ ${players[currentPlayerIndex].name} chấp nhận lý thuyết`, 'safe')
    nextPlayer()
  }

  const handleShoot = () => {
    const availableBullets = chamber.filter((_, index) => chamber[index] !== undefined)
    
    if (availableBullets.length === 0) {
      resetChamber()
      return
    }

    // Random bullet from remaining
    const bulletIndex = Math.floor(Math.random() * chamber.length)
    const bullet = chamber[bulletIndex]

    // Remove bullet from chamber
    const newChamber = [...chamber]
    newChamber[bulletIndex] = undefined
    setChamber(newChamber)

    // Người bóp cò có thể là người đọc hoặc người bắt bài
    const shooterIndex = challenger !== null ? challenger : currentPlayerIndex
    const currentPlayer = players[shooterIndex]

    if (bullet === null) {
      // Empty bullet - safe
      addLog(`💨 ${currentPlayer.name} bóp cò... ĐẠN TRỐNG! May mắn!`, 'safe')
      nextPlayer()
    } else {
      // Hit radiation
      let damage = bullet.damage
      const shieldUsed = selectedShield

      // Check shield protection
      if (shieldUsed) {
        if (shieldUsed === 'paper' && bullet.type === 'alpha') {
          damage = 0
          addLog(`🛡️ ${currentPlayer.name} dùng Giấy - Miễn nhiễm hoàn toàn Alpha!`, 'safe')
        } else if (shieldUsed === 'aluminum' && (bullet.type === 'alpha' || bullet.type === 'beta')) {
          damage = 0
          addLog(`🛡️ ${currentPlayer.name} dùng Nhôm - Miễn nhiễm hoàn toàn ${bullet.type}!`, 'safe')
        } else if (shieldUsed === 'lead') {
          damage = 0
          addLog(`🛡️ ${currentPlayer.name} dùng Chì - Miễn nhiễm hoàn toàn mọi tia!`, 'safe')
        } else {
          addLog(`🛡️ ${currentPlayer.name} dùng lá chắn nhưng không đủ mạnh chống ${bullet.symbol}!`, 'damage')
        }

        // Remove shield
        const updatedPlayers = [...players]
        updatedPlayers[shooterIndex].shields[shieldUsed] = false
        setPlayers(updatedPlayers)
      }

      // Apply damage
      if (damage > 0) {
        addLog(`☢️ ${currentPlayer.name} trúng đạn ${bullet.symbol} (${bullet.name})! -${damage}❤️`, 'damage')
        
        const updatedPlayers = [...players]
        updatedPlayers[shooterIndex].hearts -= damage
        
        if (updatedPlayers[shooterIndex].hearts <= 0) {
          updatedPlayers[shooterIndex].hearts = 0
          updatedPlayers[shooterIndex].isAlive = false
          addLog(`💀 ${currentPlayer.name} đã bị loại!`, 'damage')
        }
        
        setPlayers(updatedPlayers)
      }

      // Reset chamber after radiation hit
      setTimeout(() => {
        resetChamber()
      }, 1000)
      
      nextPlayer()
    }

    setSelectedShield(null)
    setGamePhase('draw')
  }

  const nextPlayer = () => {
    setCurrentTheory(null)
    setChallenger(null)
    setSelectedShield(null)
    setGamePhase('draw')
    
    // Find next alive player
    let nextIndex = (currentPlayerIndex + 1) % players.length
    let attempts = 0
    
    while (!players[nextIndex].isAlive && attempts < players.length) {
      nextIndex = (nextIndex + 1) % players.length
      attempts++
    }
    
    setCurrentPlayerIndex(nextIndex)
  }

  const currentPlayer = players[currentPlayerIndex]
  const bulletsLeft = chamber.filter(b => b !== undefined).length

  return (
    <div className="game-screen">
      <div className="game-header">
        <h1>🎲 RADIATION BAR</h1>
        <p style={{fontSize: '1.2em', marginTop: '10px'}}>
          Lượt của: <strong style={{color: '#FFD700'}}>{currentPlayer?.name}</strong>
        </p>
      </div>

      <div className="chamber-info">
        <h3>🔫 Ổ Đạn</h3>
        <p>Số đạn còn lại: {bulletsLeft}/6</p>
        <div className="bullets">
          {chamber.map((bullet, index) => (
            <div 
              key={index} 
              className={`bullet ${bullet === undefined ? 'used' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="players-grid">
        {players.map((player, index) => (
          <PlayerCard 
            key={player.id}
            player={player}
            isActive={index === currentPlayerIndex}
          />
        ))}
      </div>

      <div className="game-actions">
        {gamePhase === 'draw' && (
          <div className="theory-section">
            <h3>📖 Giai đoạn Lý Thuyết</h3>
            <div className="theory-display">
              <button className="btn btn-primary" onClick={drawTheory}>
                🎴 Rút Lá Bài Lý Thuyết
              </button>
            </div>
          </div>
        )}

        {gamePhase === 'read' && (
          <div className="theory-section">
            <h3>📖 Lá Bài Của Bạn</h3>
            <div className="theory-display" style={{flexDirection: 'column', gap: '15px'}}>
              <div style={{background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px'}}>
                <p style={{fontSize: '0.9em', opacity: 0.7, marginBottom: '10px'}}>
                  ⚠️ CHỈ BẠN NHÌN THẤY LÁ BÀI NÀY
                </p>
                <p style={{fontWeight: 'bold', fontSize: '1.1em'}}>
                  "{currentTheory.statement}"
                </p>
                <p style={{fontSize: '0.9em', marginTop: '10px', color: currentTheory.isTrue ? '#4facfe' : '#f5576c'}}>
                  {currentTheory.isTrue ? '✅ Câu này ĐÚNG' : '❌ Câu này SAI'}
                </p>
              </div>
              
              <p style={{fontSize: '0.95em', opacity: 0.9}}>
                🎭 Bạn có thể đọc ĐÚNG hoặc đọc SAI để lừa người khác!
              </p>
              
              <div style={{display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap'}}>
                <button className="btn btn-success" onClick={() => readTheory(true)}>
                  ✅ Đọc ĐÚNG nguyên văn<br/>
                  <span style={{fontSize: '0.85em', opacity: 0.8}}>
                    (Trung thực)
                  </span>
                </button>
                <button className="btn btn-danger" onClick={() => readTheory(false)}>
                  🎭 Đọc câu ĐẢO NGƯỢC<br/>
                  <span style={{fontSize: '0.85em', opacity: 0.8}}>
                    (Lừa bịp)
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {gamePhase === 'challenge' && (
          <div className="challenge-section">
            <h3>⚠️ Giai đoạn Thách Thức</h3>
            <div className="theory-display">
              <p style={{fontStyle: 'italic'}}>"{currentTheory.readStatement}"</p>
            </div>
            <p style={{marginBottom: '15px'}}>Các người chơi khác có 5 giây để bắt bài...</p>
            <div className="challenge-buttons">
              <button className="btn btn-danger" onClick={handleChallenge}>
                ❌ SAI RỒI! (Bắt bài)
              </button>
              <button className="btn btn-success" onClick={handleAccept}>
                ✅ Tin Tưởng / Không Biết
              </button>
            </div>
          </div>
        )}

        {gamePhase === 'shoot' && (
          <div className="challenge-section">
            <h3>🔫 Giai đoạn Bóp Cò</h3>
            <p style={{marginBottom: '20px', fontSize: '1.1em'}}>
              {players[challenger !== null ? challenger : currentPlayerIndex].name} phải bóp cò!
            </p>

            <div className="shield-selection">
              <h4>🛡️ Chọn lá chắn bảo vệ (tùy chọn)</h4>
              <div className="shield-buttons">
                <button 
                  className={`shield-btn ${selectedShield === 'paper' ? 'active' : ''}`}
                  onClick={() => setSelectedShield('paper')}
                  disabled={!players[challenger !== null ? challenger : currentPlayerIndex].shields.paper}
                >
                  📄 Giấy (Chặn α)
                </button>
                <button 
                  className={`shield-btn ${selectedShield === 'aluminum' ? 'active' : ''}`}
                  onClick={() => setSelectedShield('aluminum')}
                  disabled={!players[challenger !== null ? challenger : currentPlayerIndex].shields.aluminum}
                >
                  🔩 Nhôm (Chặn α, β)
                </button>
                <button 
                  className={`shield-btn ${selectedShield === 'lead' ? 'active' : ''}`}
                  onClick={() => setSelectedShield('lead')}
                  disabled={!players[challenger !== null ? challenger : currentPlayerIndex].shields.lead}
                >
                  🔘 Chì (Chặn tất cả)
                </button>
                <button 
                  className="shield-btn"
                  onClick={() => setSelectedShield(null)}
                >
                  ❌ Không dùng
                </button>
              </div>
            </div>

            <button 
              className="btn btn-danger" 
              onClick={handleShoot}
              style={{marginTop: '20px', fontSize: '1.2em'}}
            >
              🔫 BÓP CÒ
            </button>
          </div>
        )}
      </div>

      <GameLog logs={logs} />
    </div>
  )
}

export default GameScreen
