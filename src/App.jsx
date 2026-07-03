import { useState } from 'react'
import QuestionManager from './components/QuestionManager'
import SetupScreen from './components/SetupScreen'
import GameScreen from './components/GameScreen'
import WinnerScreen from './components/WinnerScreen'

function App() {
  const [gameState, setGameState] = useState('questions') // 'questions', 'setup', 'playing', 'winner'
  const [players, setPlayers] = useState([])
  const [winner, setWinner] = useState(null)
  const [customQuestions, setCustomQuestions] = useState([])

  const handleQuestionsReady = (questions) => {
    setCustomQuestions(questions)
    setGameState('setup')
  }

  const startGame = (playerNames) => {
    const initialPlayers = playerNames.map((name, index) => ({
      id: index,
      name: name,
      hearts: 3,
      shields: {
        paper: true,    // Cản Alpha
        aluminum: true, // Cản Beta
        lead: true      // Cản Gamma
      },
      isAlive: true,
      hints: []
    }))
    
    setPlayers(initialPlayers)
    setGameState('playing')
  }

  const endGame = (winnerPlayer) => {
    setWinner(winnerPlayer)
    setGameState('winner')
  }

  const resetGame = () => {
    setPlayers([])
    setWinner(null)
    setGameState('questions')
    setCustomQuestions([])
  }

  return (
    <div className="app">
      {gameState === 'questions' && (
        <QuestionManager onQuestionsReady={handleQuestionsReady} />
      )}
      
      {gameState === 'setup' && (
        <SetupScreen onStartGame={startGame} />
      )}
      
      {gameState === 'playing' && (
        <GameScreen 
          players={players} 
          setPlayers={setPlayers}
          onGameEnd={endGame}
          customQuestions={customQuestions}
        />
      )}
      
      {gameState === 'winner' && (
        <WinnerScreen 
          winner={winner}
          onRestart={resetGame}
        />
      )}
    </div>
  )
}

export default App
