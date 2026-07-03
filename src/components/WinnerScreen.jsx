import './styles.css'

function WinnerScreen({ winner, onRestart }) {
  return (
    <div className="winner-screen">
      <div className="winner-trophy">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
        </svg>
      </div>
      <h1>CHIẾN THẮNG!</h1>
      <h2>{winner?.name || 'Người chơi'}</h2>
      <p>
        đã sống sót qua những tia phóng xạ chết chóc!
      </p>
      
      <button className="btn btn-primary" onClick={onRestart} style={{ marginTop: '32px' }}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
        </svg>
        CHƠI LẠI
      </button>
    </div>
  )
}

export default WinnerScreen
