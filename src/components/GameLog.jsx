function GameLog({ logs }) {
  return (
    <div className="game-log">
      <h3>📜 Nhật Ký Game</h3>
      {logs.map(log => (
        <div key={log.id} className={`log-entry ${log.type}`}>
          {log.message}
        </div>
      ))}
      {logs.length === 0 && (
        <p style={{textAlign: 'center', opacity: 0.5}}>Chưa có hoạt động nào...</p>
      )}
    </div>
  )
}

export default GameLog
