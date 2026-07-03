import { useState, useEffect } from 'react'
import PlayerCard from './PlayerCard'
import GameLog from './GameLog'
import { THEORIES, RADIATION_TYPES } from '../data/theories'

function GameScreen({ players, setPlayers, onGameEnd, customQuestions }) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [chamber, setChamber] = useState([])
  const [currentTheory, setCurrentTheory] = useState(null)
  const [gamePhase, setGamePhase] = useState('draw') // 'draw', 'waiting', 'challenge', 'shoot'
  const [selectedShield, setSelectedShield] = useState(null)
  const [logs, setLogs] = useState([])
  const [shooterIndex, setShooterIndex] = useState(null)
  const [timer, setTimer] = useState(5)

  // Sử dụng câu hỏi custom hoặc mặc định
  const questionsToUse = customQuestions.length > 0 ? customQuestions : THEORIES

  // Initialize chamber
  useEffect(() => {
    resetChamber()
  }, [])

  // Timer countdown
  useEffect(() => {
    if (gamePhase === 'waiting' && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(countdown)
    } else if (gamePhase === 'waiting' && timer === 0) {
      // Hết giờ, không ai bắt bài
      handleAccept()
    }
  }, [gamePhase, timer])

  // Check for winner
  useEffect(() => {
    const alivePlayers = players.filter(p => p.isAlive)
    if (alivePlayers.length === 1 && gamePhase !== 'draw') {
      setTimeout(() => {
        onGameEnd(alivePlayers[0])
      }, 2000)
    }
  }, [players, onGameEnd, gamePhase])

  const resetChamber = () => {
    const radiationType = RADIATION_TYPES[Math.floor(Math.random() * RADIATION_TYPES.length)]
    const newChamber = Array(6).fill(null)
    const randomIndex = Math.floor(Math.random() * 6)
    newChamber[randomIndex] = radiationType
    
    setChamber(newChamber)
    addLog(`🔫 Ổ đạn mới! Loại tia bí mật đã được nạp...`, 'info')
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
    setGamePhase('waiting')
    setTimer(5)
    addLog(`📖 ${players[currentPlayerIndex].name} đã rút bài và đọc câu lý thuyết!`, 'info')
    addLog(`⏱️ Còn 5 giây để bắt bài...`, 'info')
  }

  const handleChallenge = () => {
    setGamePhase('challenge')
    setTimer(0)
  }

  const handleChallengeResult = (isStatementTrue) => {
    // isStatementTrue: câu người chơi ĐỌC ra có đúng với thực tế không
    const actuallyCorrect = currentTheory.isTrue === isStatementTrue
    
    if (!actuallyCorrect) {
      // Người đọc NÓI DỐI - người bắt bài thắng
      const radiationType = chamber.find(b => b !== null)
      if (radiationType) {
        const hint = radiationType.hints[Math.floor(Math.random() * radiationType.hints.length)]
        
        const updatedPlayers = [...players]
        const allAlivePlayers = updatedPlayers.filter(p => p.isAlive)
        // Cho hint cho người bắt bài (random một người còn sống khác người hiện tại)
        const otherPlayers = allAlivePlayers.filter((_, idx) => idx !== currentPlayerIndex)
        if (otherPlayers.length > 0) {
          const randomPlayer = otherPlayers[Math.floor(Math.random() * otherPlayers.length)]
          randomPlayer.hints.push(hint)
          setPlayers(updatedPlayers)
          addLog(`✅ BẮT BÀI ĐÚNG! ${players[currentPlayerIndex].name} đã nói dối!`, 'safe')
          addLog(`💡 Người bắt bài nhận gợi ý: "${hint}"`, 'safe')
        }
      }
      
      addLog(`🔫 ${players[currentPlayerIndex].name} phải bóp cò!`, 'damage')
      setShooterIndex(currentPlayerIndex)
      setGamePhase('shoot')
    } else {
      // Người đọc NÓI THẬT - người bắt bài thua
      addLog(`❌ BẮT BÀI SAI! ${players[currentPlayerIndex].name} đã nói thật!`, 'damage')
      addLog(`🔫 Người bắt bài phải bóp cò!`, 'damage')
      
      // Người bắt bài phải bóp cò - giả sử là người kế tiếp
      let challengerIdx = (currentPlayerIndex + 1) % players.length
      while (!players[challengerIdx].isAlive) {
        challengerIdx = (challengerIdx + 1) % players.length
      }
      setShooterIndex(challengerIdx)
      setGamePhase('shoot')
    }
  }

  const handleAccept = () => {
    addLog(`✅ Không ai bắt bài. Lượt chơi an toàn!`, 'safe')
    nextPlayer()
  }

  const handleShoot = () => {
    const availableBullets = chamber.map((b, i) => b !== undefined ? i : -1).filter(i => i !== -1)
    
    if (availableBullets.length === 0) {
      resetChamber()
      return
    }

    const randomBulletIndex = availableBullets[Math.floor(Math.random() * availableBullets.length)]
    const bullet = chamber[randomBulletIndex]

    const newChamber = [...chamber]
    newChamber[randomBulletIndex] = undefined
    setChamber(newChamber)

    const currentPlayer = players[shooterIndex]

    if (bullet === null) {
      addLog(`💨 ${currentPlayer.name} bóp cò... ĐẠN TRỐNG! May mắn!`, 'safe')
      nextPlayer()
    } else {
      let damage = bullet.damage
      const shieldUsed = selectedShield

      if (shieldUsed) {
        if (shieldUsed === 'paper' && bullet.type === 'alpha') {
          damage = 0
          addLog(`🛡️ ${currentPlayer.name} dùng Giấy - Chặn hoàn toàn ${bullet.symbol}!`, 'safe')
        } else if (shieldUsed === 'aluminum' && (bullet.type === 'alpha' || bullet.type === 'beta')) {
          damage = 0
          addLog(`🛡️ ${currentPlayer.name} dùng Nhôm - Chặn hoàn toàn ${bullet.symbol}!`, 'safe')
        } else if (shieldUsed === 'lead') {
          damage = 0
          addLog(`🛡️ ${currentPlayer.name} dùng Chì - Chặn hoàn toàn mọi tia!`, 'safe')
        } else {
          addLog(`🛡️ Lá chắn không đủ mạnh chống ${bullet.symbol}!`, 'damage')
        }

        const updatedPlayers = [...players]
        updatedPlayers[shooterIndex].shields[shieldUsed] = false
        setPlayers(updatedPlayers)
      }

      if (damage > 0) {
        addLog(`☢️ ${currentPlayer.name} trúng ${bullet.symbol} ${bullet.name}! -${damage}❤️`, 'damage')
        
        const updatedPlayers = [...players]
        updatedPlayers[shooterIndex].hearts -= damage
        
        if (updatedPlayers[shooterIndex].hearts <= 0) {
          updatedPlayers[shooterIndex].hearts = 0
          updatedPlayers[shooterIndex].isAlive = false
          addLog(`💀 ${currentPlayer.name} đã bị loại!`, 'damage')
        }
        
        setPlayers(updatedPlayers)
      }

      setTimeout(() => {
        resetChamber()
      }, 1000)
      
      nextPlayer()
    }

    setSelectedShield(null)
    setShooterIndex(null)
  }

  const nextPlayer = () => {
    setCurrentTheory(null)
    setShooterIndex(null)
    setSelectedShield(null)
    setGamePhase('draw')
    
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
        <h1>☢️ RADIATION BAR</h1>
        <div className="current-turn">
          Lượt: <span className="player-highlight">{currentPlayer?.name}</span>
        </div>
      </div>

      <div className="game-container">
        <div className="left-panel">
          <div className="chamber-section">
            <h3>🔫 Ổ Đạn</h3>
            <div className="bullets">
              {chamber.map((bullet, index) => (
                <div 
                  key={index} 
                  className={`bullet ${bullet === undefined ? 'used' : ''} ${bullet !== null && bullet !== undefined ? 'live' : ''}`}
                  title={bullet === undefined ? 'Đã bắn' : bullet === null ? 'Trống' : 'Phóng xạ'}
                />
              ))}
            </div>
            <p className="bullets-count">Còn {bulletsLeft}/6 viên</p>
          </div>

          <div className="players-section">
            <h3>👥 Người Chơi</h3>
            <div className="players-list-compact">
              {players.map((player, index) => (
                <PlayerCard 
                  key={player.id}
                  player={player}
                  isActive={index === currentPlayerIndex}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="main-panel">
          <div className="game-stage">
            {gamePhase === 'draw' && (
              <div className="stage-content fade-in">
                <div className="stage-icon">🎴</div>
                <h2>Rút Lá Bài Lý Thuyết</h2>
                <p>Người chơi sẽ rút bài và đọc to câu lý thuyết</p>
                <button className="btn btn-primary btn-large" onClick={drawTheory}>
                  🎴 RÚT BÀI
                </button>
              </div>
            )}

            {gamePhase === 'waiting' && (
              <div className="stage-content fade-in">
                <div className="stage-icon pulse">⏱️</div>
                <h2>Giai Đoạn Thách Thức</h2>
                <div className="theory-card-display">
                  <p className="theory-statement">
                    "{currentTheory.statement}"
                  </p>
                  <p className="theory-truth" style={{color: currentTheory.isTrue ? '#4facfe' : '#f5576c'}}>
                    {currentTheory.isTrue ? '✅ Thực tế: ĐÚNG' : '❌ Thực tế: SAI'}
                  </p>
                </div>
                <div className="timer-display">{timer}s</div>
                <p style={{marginBottom: '20px'}}>Người khác có thể bắt bài!</p>
                <div className="action-buttons">
                  <button className="btn btn-danger" onClick={handleChallenge}>
                    ⚠️ BẮT BÀI!
                  </button>
                  <button className="btn btn-success" onClick={handleAccept}>
                    ✅ Chấp Nhận
                  </button>
                </div>
              </div>
            )}

            {gamePhase === 'challenge' && (
              <div className="stage-content fade-in">
                <div className="stage-icon">🤔</div>
                <h2>Kiểm Tra Lá Bài</h2>
                <p style={{marginBottom: '20px'}}>
                  Người chơi <strong>{currentPlayer.name}</strong> đã đọc câu gì?
                </p>
                <div className="action-buttons">
                  <button 
                    className="btn btn-success" 
                    onClick={() => handleChallengeResult(true)}
                  >
                    ✅ Nói ĐÚNG (Câu đúng)
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleChallengeResult(false)}
                  >
                    ❌ Nói DỐI (Câu sai)
                  </button>
                </div>
              </div>
            )}

            {gamePhase === 'shoot' && (
              <div className="stage-content fade-in">
                <div className="stage-icon shake">🔫</div>
                <h2>Giai Đoạn Bóp Cò</h2>
                <p className="shooter-name">
                  {players[shooterIndex]?.name} phải bóp cò!
                </p>

                <div className="shield-selection">
                  <h4>🛡️ Chọn Lá Chắn (Tùy chọn)</h4>
                  <div className="shield-buttons">
                    <button 
                      className={`shield-btn ${selectedShield === 'paper' ? 'active' : ''}`}
                      onClick={() => setSelectedShield(selectedShield === 'paper' ? null : 'paper')}
                      disabled={!players[shooterIndex]?.shields.paper}
                    >
                      <div className="shield-icon">📄</div>
                      <div>Giấy</div>
                      <div className="shield-desc">Chặn α</div>
                    </button>
                    <button 
                      className={`shield-btn ${selectedShield === 'aluminum' ? 'active' : ''}`}
                      onClick={() => setSelectedShield(selectedShield === 'aluminum' ? null : 'aluminum')}
                      disabled={!players[shooterIndex]?.shields.aluminum}
                    >
                      <div className="shield-icon">🔩</div>
                      <div>Nhôm</div>
                      <div className="shield-desc">Chặn α, β</div>
                    </button>
                    <button 
                      className={`shield-btn ${selectedShield === 'lead' ? 'active' : ''}`}
                      onClick={() => setSelectedShield(selectedShield === 'lead' ? null : 'lead')}
                      disabled={!players[shooterIndex]?.shields.lead}
                    >
                      <div className="shield-icon">🔘</div>
                      <div>Chì</div>
                      <div className="shield-desc">Chặn tất cả</div>
                    </button>
                  </div>
                </div>

                <button 
                  className="btn btn-danger btn-large" 
                  onClick={handleShoot}
                >
                  🔫 BÓP CÒ
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="right-panel">
          <GameLog logs={logs} />
        </div>
      </div>
    </div>
  )
}

export default GameScreen
