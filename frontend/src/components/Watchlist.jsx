const SECTORS = [
  { ticker: 'XLK', name: 'Technology' },
  { ticker: 'XLV', name: 'Health Care' },
  { ticker: 'XLF', name: 'Financials' },
  { ticker: 'XLE', name: 'Energy' },
  { ticker: 'XLU', name: 'Utilities' },
  { ticker: 'SPY', name: 'S&P 500' }
]

function Watchlist({ selectedTicker, onTickerChange, collapsed, onToggleCollapse }) {
  return (
    <div className={`watchlist ${collapsed ? 'collapsed' : ''}`}>
      <div className="watchlist-header">
        <h2 className="watchlist-title">{!collapsed && 'Watchlist'}</h2>
        <button className="collapse-btn" onClick={onToggleCollapse}>
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {!collapsed && (
        <div className="watchlist-items">
          {SECTORS.map(sector => (
            <button
              key={sector.ticker}
              className={`watchlist-item ${sector.ticker === selectedTicker ? 'active' : ''}`}
              onClick={() => onTickerChange(sector.ticker)}
            >
              <span className="watchlist-ticker">{sector.ticker}</span>
              <span className="watchlist-name">{sector.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Watchlist
