import { useState, useEffect } from 'react'
import PlayerCard from './PlayerCard'
import GameLog from './GameLog'
import { THEORIES, RADIATION_TYPES } from '../data/theories'

function GameScreen({ players, setPlayers, onGameEnd, customQuestions }) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [chamber, setChamber] = useState([])
  const [currentTheory, setCurrentTheory] = useState(null)
  const [gamePhase, setGamePhase] = useState('draw')
  const [selectedShield, setSelectedShield] = useState(null)
  const [logs, setLogs] = useState([])
  const [shooterIndex, setShooterIndex] = useState(null)
  const [timer, setTimer] = useState(10)
  const [waveNumber, setWaveNumber] = useState(1) // Đợt sóng phóng xạ

  const questionsToUse = customQuestions.length > 0 ? customQuestions : THEORIES

  useEffect(() => {
    resetChamber()
  }, [])

  useEffect(() => {
    if (gamePhase === 'waiting' && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(countdown)
    } else if (gamePhase === 'waiting' && timer === 0) {
      handleAccept()
    }
  }, [gamePhase, timer])

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
    
    // Tính số viên theo đợt sóng: 4 -> 3 -> 2 -> 1
    const chamberSize = Math.max(1, 5 - waveNumber)
    const newChamber = Array(chamberSize).fill(null)
    const randomIndex = Math.floor(Math.random() * chamberSize)
    newChamber[randomIndex] = radiationType
    
    setChamber(newChamber)
    addLog(`🌊 Đợt sóng ${waveNumber} mới: ${chamberSize} vị trí đo đạc`, 'info')
    setWaveNumber(prev => prev + 1)
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
    setTimer(10)
    addLog(`${players[currentPlayerIndex].name} đã rút bài và đọc câu lý thuyết!`, 'info')
    addLog(`Còn 10 giây để bắt bài...`, 'info')
  }

  const handleChallenge = () => {
    setGamePhase('challenge')
    setTimer(0)
  }

  const handleChallengeResult = (isStatementTrue) => {
    const actuallyCorrect = currentTheory.isTrue === isStatementTrue
    
    if (!actuallyCorrect) {
      // Người đọc bài nói dối → người đọc bài phải đo đạc
      const radiationType = chamber.find(b => b !== null)
      if (radiationType) {
        const hint = radiationType.hints[Math.floor(Math.random() * radiationType.hints.length)]
        
        // Tạo phương trình phân rã ngẫu nhiên
        const N0 = Math.pow(2, Math.floor(Math.random() * 3) + 2) // 4, 8, 16
        const T = Math.floor(Math.random() * 2) + 1 // 1 hoặc 2
        const turnsUntilBullet = Math.floor(Math.random() * 3) + 2 // 2-4 lượt
        const N = N0 * Math.pow(0.5, turnsUntilBullet / T)
        
        const equation = `N = ${N0}·(1/2)^(t/${T}), biết N = ${N.toFixed(1)}. Tính t (số lượt tới viên lỗi)?`
        
        // Gợi ý riêng tư - chỉ người bắt bài thấy
        const updatedPlayers = [...players]
        let challengerIdx = (currentPlayerIndex + 1) % players.length
        while (!players[challengerIdx].isAlive) {
          challengerIdx = (challengerIdx + 1) % players.length
        }
        
        updatedPlayers[challengerIdx].hints.push({ 
          hint, 
          equation, 
          answer: turnsUntilBullet,
          radiationType: radiationType.type, // Thông tin loại tia (riêng tư)
          waveInfo: `Đợt ${waveNumber}: ${radiationType.name} (${radiationType.symbol})`
        })
        setPlayers(updatedPlayers)
        
        addLog(`✅ BẮT BÀI ĐÚNG! ${players[currentPlayerIndex].name} đã nói dối!`, 'safe')
        addLog(`Người bắt bài nhận gợi ý bí mật!`, 'safe')
      }
      
      addLog(`${players[currentPlayerIndex].name} phải đi đo đạc!`, 'damage')
      setShooterIndex(currentPlayerIndex)
      setGamePhase('shoot')
    } else {
      // Người bắt bài sai → người bắt bài phải đo đạc
      addLog(`❌ BẮT BÀI SAI! ${players[currentPlayerIndex].name} đã nói thật!`, 'damage')
      addLog(`Người bắt bài phải đi đo đạc!`, 'damage')
      
      let challengerIdx = (currentPlayerIndex + 1) % players.length
      while (!players[challengerIdx].isAlive) {
        challengerIdx = (challengerIdx + 1) % players.length
      }
      setShooterIndex(challengerIdx)
      setGamePhase('shoot')
    }
  }

  const handleAccept = () => {
    addLog(`Không ai bắt bài. Lượt chơi an toàn!`, 'safe')
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
      addLog(`${currentPlayer.name} đo đạc... AN TOÀN! Không có sóng phóng xạ!`, 'safe')
      nextPlayer()
    } else {
      let damage = bullet.damage
      const shieldUsed = selectedShield

      if (shieldUsed) {
        if (shieldUsed === 'paper' && bullet.type === 'alpha') {
          damage = 0
          addLog(`${currentPlayer.name} dùng Giáp Giấy - Chặn hoàn toàn ${bullet.symbol}!`, 'safe')
        } else if (shieldUsed === 'aluminum' && (bullet.type === 'alpha' || bullet.type === 'beta')) {
          damage = 0
          addLog(`${currentPlayer.name} dùng Giáp Nhôm - Chặn hoàn toàn ${bullet.symbol}!`, 'safe')
        } else if (shieldUsed === 'lead') {
          damage = 0
          addLog(`${currentPlayer.name} dùng Giáp Chì - Chặn hoàn toàn mọi tia!`, 'safe')
        } else {
          addLog(`Giáp không đủ mạnh chống ${bullet.symbol}!`, 'damage')
        }

        const updatedPlayers = [...players]
        updatedPlayers[shooterIndex].shields[shieldUsed] = false
        setPlayers(updatedPlayers)
      }

      if (damage > 0) {
        addLog(`${currentPlayer.name} trúng sóng ${bullet.name}! -${damage}❤`, 'damage')
        
        const updatedPlayers = [...players]
        updatedPlayers[shooterIndex].hearts -= damage
        
        if (updatedPlayers[shooterIndex].hearts <= 0) {
          updatedPlayers[shooterIndex].hearts = 0
          updatedPlayers[shooterIndex].isAlive = false
          addLog(`${currentPlayer.name} đã bị loại!`, 'damage')
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
        <h1>☢️ PHÓNG XẠ BAR</h1>
        <div className="current-turn">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Lượt: <span className="player-highlight">{currentPlayer?.name}</span>
        </div>
        <div style={{fontSize: '14px', marginTop: '8px', color: '#9CA3AF'}}>
          🌊 Đợt sóng {waveNumber} | Ổ còn {bulletsLeft} viên
        </div>
      </div>

      <div className="game-container">
        <div className="left-panel">
          <div className="chamber-section">
            <h3>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Đợt Sóng Phóng Xạ
            </h3>
            <div className="bullets">
              {chamber.map((bullet, index) => (
                <div 
                  key={index} 
                  className={`bullet ${bullet === undefined ? 'used' : ''} ${bullet !== null && bullet !== undefined ? 'live' : ''}`}
                  title={bullet === undefined ? 'Đã đo' : '???'}
                />
              ))}
            </div>
            <p className="bullets-count">Còn {bulletsLeft} vị trí chưa đo</p>
            <p style={{fontSize: '12px', color: '#9CA3AF', marginTop: '4px'}}>
              🌊 Đợt sóng #{waveNumber-1}
            </p>
          </div>

          <div className="players-section">
            <h3>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              Người Chơi
            </h3>
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
                <div className="stage-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.47 4.35l-1.34-.56v9.03l2.43-5.86c.41-1.02-.06-2.19-1.09-2.61zm-19.5 3.7L6.93 20a2.01 2.01 0 0 0 1.81 1.26c.26 0 .53-.05.79-.16l7.37-3.05c.75-.32 1.22-1.06 1.22-1.92v-10.2l-2.43 5.86c-.41 1.02-1.59 1.63-2.59 1.22l-.25-.1a2.04 2.04 0 0 0-1.94.41l-8.96 4.92c-.83.46-1.71-.14-1.77-1.02l-.29-5.92zm15.03 9.48l-2.26-5.95-1.74 3.04 2.26 5.95 1.74-3.04zm-11.57-.8l-2.26-5.95-1.74 3.04 2.26 5.95 1.74-3.04z"/>
                  </svg>
                </div>
                <h2>Rút Lá Bài Lý Thuyết</h2>
                <p>
                  <strong>{currentPlayer?.name}</strong> sẽ tiếp cận lõi nghiên cứu và đọc dữ liệu
                </p>
                <button className="btn btn-primary btn-large" onClick={drawTheory}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.47 4.35l-1.34-.56v9.03l2.43-5.86c.41-1.02-.06-2.19-1.09-2.61zm-19.5 3.7L6.93 20a2.01 2.01 0 0 0 1.81 1.26c.26 0 .53-.05.79-.16l7.37-3.05c.75-.32 1.22-1.06 1.22-1.92v-10.2l-2.43 5.86c-.41 1.02-1.59 1.63-2.59 1.22l-.25-.1a2.04 2.04 0 0 0-1.94.41l-8.96 4.92c-.83.46-1.71-.14-1.77-1.02l-.29-5.92zm15.03 9.48l-2.26-5.95-1.74 3.04 2.26 5.95 1.74-3.04zm-11.57-.8l-2.26-5.95-1.74 3.04 2.26 5.95 1.74-3.04z"/>
                  </svg>
                  RÚT BÀI
                </button>
              </div>
            )}

            {gamePhase === 'waiting' && (
              <div className="stage-content fade-in">
                <div className="stage-icon pulse">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <h2>Giai Đoạn Thách Thức</h2>
                <div className="theory-card-display">
                  <p className="theory-statement">
                    "{currentTheory.statement}"
                  </p>
                  {/* Giấu đáp án - không hiển thị true/false */}
                </div>
                <div className="timer-display">{timer}s</div>
                <p style={{marginBottom: '20px'}}>Người khác có thể bắt bài!</p>
                <div className="action-buttons">
                  <button className="btn btn-danger" onClick={handleChallenge}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    BẮT BÀI!
                  </button>
                  <button className="btn btn-success" onClick={handleAccept}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Chấp Nhận
                  </button>
                </div>
              </div>
            )}

            {gamePhase === 'challenge' && (
              <div className="stage-content fade-in">
                <div className="stage-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
                  </svg>
                </div>
                <h2>Kiểm Tra Lá Bài</h2>
                <p style={{marginBottom: '20px'}}>
                  Người chơi <strong>{currentPlayer.name}</strong> đã đọc câu gì?
                </p>
                <div className="action-buttons">
                  <button 
                    className="btn btn-success" 
                    onClick={() => handleChallengeResult(true)}
                  >
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Nói ĐÚNG (Câu đúng)
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleChallengeResult(false)}
                  >
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                    Nói DỐI (Câu sai)
                  </button>
                </div>
              </div>
            )}

            {gamePhase === 'shoot' && (
              <div className="stage-content fade-in">
                <div className="stage-icon shake">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  </svg>
                </div>
                <h2>Giai Đoạn Đo Đạc</h2>
                <p className="shooter-name">
                  {players[shooterIndex]?.name} phải tiếp cận lõi và đo đạc!
                </p>

                <div className="shield-selection">
                  <h4>Chọn Giáp Bảo Vệ (Tùy chọn)</h4>
                  <div className="shield-buttons">
                    <button 
                      className={`shield-btn paper ${selectedShield === 'paper' ? 'active' : ''}`}
                      onClick={() => setSelectedShield(selectedShield === 'paper' ? null : 'paper')}
                      disabled={!players[shooterIndex]?.shields.paper}
                    >
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/>
                      </svg>
                      <div>Giáp Giấy</div>
                      <div className="shield-desc">Chặn α</div>
                    </button>
                    <button 
                      className={`shield-btn aluminum ${selectedShield === 'aluminum' ? 'active' : ''}`}
                      onClick={() => setSelectedShield(selectedShield === 'aluminum' ? null : 'aluminum')}
                      disabled={!players[shooterIndex]?.shields.aluminum}
                    >
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                      </svg>
                      <div>Giáp Nhôm</div>
                      <div className="shield-desc">Chặn α, β</div>
                    </button>
                    <button 
                      className={`shield-btn lead ${selectedShield === 'lead' ? 'active' : ''}`}
                      onClick={() => setSelectedShield(selectedShield === 'lead' ? null : 'lead')}
                      disabled={!players[shooterIndex]?.shields.lead}
                    >
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        <circle cx="12" cy="12" r="5"/>
                      </svg>
                      <div>Giáp Chì</div>
                      <div className="shield-desc">Chặn tất cả</div>
                    </button>
                  </div>
                </div>

                <button 
                  className="btn btn-danger btn-large" 
                  onClick={handleShoot}
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  </svg>
                  ĐI ĐO ĐẠC
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
