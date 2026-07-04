import { useState } from 'react'
import Navbar from './components/Navbar'
import SubjectSelection from './components/SubjectSelection'
import LessonSelection from './components/LessonSelection'
import CreateQuestions from './components/CreateQuestions'
import SetupScreen from './components/SetupScreen'
import GameScreen from './components/GameScreen'
import WinnerScreen from './components/WinnerScreen'

function App() {
  const [gameState, setGameState] = useState('subjects') // 'subjects', 'create', 'lessons', 'setup', 'playing', 'winner'
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [players, setPlayers] = useState([])
  const [winner, setWinner] = useState(null)
  const [customQuestions, setCustomQuestions] = useState([])

  // Navigation handlers
  const handleNavigate = (screen) => {
    setGameState(screen)
  }

  // Subject Selection -> Create Questions
  const handleCreateQuestions = () => {
    setGameState('create')
  }

  // Subject Selection -> Lesson Selection
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject)
    setGameState('lessons')
  }

  // Lesson Selection -> Setup (with pre-made questions)
  const handleLessonSelect = (lesson, questions) => {
    setSelectedLesson(lesson)
    setCustomQuestions(questions || [])
    setGameState('setup')
  }

  // Create Questions -> Setup
  const handleQuestionsReady = (questions) => {
    setCustomQuestions(questions)
    setGameState('setup')
  }

  // Lesson Selection -> Question Manager (create new) - REMOVED
  // const handleCreateNew = () => {
  //   setGameState('questions')
  // }

  // Setup -> Game
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

  // Game -> Winner
  const endGame = (winnerPlayer) => {
    setWinner(winnerPlayer)
    setGameState('winner')
  }

  // Back navigation handlers
  const handleBackToSubjects = () => {
    setSelectedLesson(null)
    setSelectedSubject(null)
    setGameState('subjects')
  }

  const handleBackFromCreate = () => {
    setGameState('subjects')
  }

  const handleBackFromLessons = () => {
    setGameState('subjects')
  }

  // Determine if back button should show
  const canGoBack = gameState !== 'subjects' && gameState !== 'playing' && gameState !== 'winner'
  
  const handleBack = () => {
    if (gameState === 'create') handleBackFromCreate()
    else if (gameState === 'lessons') handleBackFromLessons()
    else if (gameState === 'setup') handleBackToSubjects()
  }

  return (
    <div className="app">
      {/* Global Navbar */}
      <Navbar 
        currentScreen={gameState}
        onNavigate={handleNavigate}
        canGoBack={canGoBack}
        onBack={handleBack}
      />

      {gameState === 'subjects' && (
        <SubjectSelection 
          onSelectSubject={handleSubjectSelect}
          onCreateQuestions={handleCreateQuestions}
        />
      )}
      
      {gameState === 'create' && (
        <CreateQuestions 
          onQuestionsReady={handleQuestionsReady}
          onBack={handleBackFromCreate}
        />
      )}
      
      {gameState === 'lessons' && (
        <LessonSelection 
          subject={selectedSubject}
          onSelectLesson={handleLessonSelect}
          onBack={handleBackFromLessons}
        />
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
