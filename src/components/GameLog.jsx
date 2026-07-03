import './styles.css'

function GameLog({ logs }) {
  return (
    <div className="game-log" role="log" aria-label="Nhật ký trò chơi" aria-live="polite">
      <h3>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
        Nhật ký trò chơi
      </h3>
      {logs.length === 0 ? (
        <div className="log-empty">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
          <p>Chưa có sự kiện nào</p>
        </div>
      ) : (
        <div className="log-entries">
          {logs.map((log) => (
            <div key={log.id} className={`log-entry ${log.type}`}>
              {log.message}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GameLog
