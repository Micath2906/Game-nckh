function PlayerCard({ player, isActive }) {
  const hearts = '❤️'.repeat(Math.max(0, player.hearts))
  
  return (
    <div className={`player-card ${isActive ? 'active' : ''} ${!player.isAlive ? 'eliminated' : ''}`}>
      <div className="player-name">{player.name}</div>
      
      <div className="hearts">
        {hearts || '💀'}
      </div>
      
      <div className="shields">
        <div className={`shield ${!player.shields.paper ? 'used' : ''}`}>
          📄 Giấy
        </div>
        <div className={`shield ${!player.shields.aluminum ? 'used' : ''}`}>
          🔩 Nhôm
        </div>
        <div className={`shield ${!player.shields.lead ? 'used' : ''}`}>
          🔘 Chì
        </div>
      </div>

      {player.hints.length > 0 && (
        <div style={{marginTop: '15px', fontSize: '0.85em', padding: '10px', background: 'rgba(255,215,0,0.2)', borderRadius: '8px'}}>
          <strong>💡 Gợi ý:</strong>
          {player.hints.map((hint, index) => (
            <div key={index} style={{marginTop: '5px'}}>• {hint}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PlayerCard
