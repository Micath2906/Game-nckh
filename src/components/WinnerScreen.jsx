function WinnerScreen({ winner, onRestart }) {
  return (
    <div className="winner-screen">
      <h1>🎉 CHIẾN THẮNG!</h1>
      <h2>{winner?.name || 'Người chơi'}</h2>
      <p style={{fontSize: '1.2em', marginTop: '20px', opacity: 0.9}}>
        đã sống sót qua những tia phóng xạ chết chóc!
      </p>
      
      <div style={{marginTop: '30px', fontSize: '3em'}}>
        🏆
      </div>
      
      <button className="btn btn-primary" onClick={onRestart}>
        🔄 CHƠI LẠI
      </button>
    </div>
  )
}

export default WinnerScreen
