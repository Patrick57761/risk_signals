import { useState } from 'react'
import PriceChart from './PriceChart'

const SECTORS = [
  { ticker: 'XLK', name: 'Technology' },
  { ticker: 'XLV', name: 'Health Care' },
  { ticker: 'XLF', name: 'Financials' },
  { ticker: 'XLE', name: 'Energy' },
  { ticker: 'XLU', name: 'Utilities' },
  { ticker: 'SPY', name: 'S&P 500' }
]

function SectorSelector({ selectedTicker, onTickerChange, sectorData }) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedSector = SECTORS.find(s => s.ticker === selectedTicker)

  return (
    <div className="card sector-selector-card">
      <div className="card-title">Sector Analysis</div>

      <div className="selector-container">
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="selected-sector">
              <span className="sector-ticker">{selectedSector?.ticker}</span>
              <span className="sector-name">{selectedSector?.name}</span>
            </span>
            <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
          </button>

          {isOpen && (
            <div className="dropdown-menu">
              {SECTORS.map(sector => (
                <button
                  key={sector.ticker}
                  className={`dropdown-item ${sector.ticker === selectedTicker ? 'active' : ''}`}
                  onClick={() => {
                    onTickerChange(sector.ticker)
                    setIsOpen(false)
                  }}
                >
                  <span className="sector-ticker">{sector.ticker}</span>
                  <span className="sector-name">{sector.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {sectorData && (
          <div className="sector-meta">
            <span className="meta-date">As of {sectorData.date}</span>
          </div>
        )}
      </div>

      <div className="chart-container">
        <PriceChart ticker={selectedTicker} />
      </div>
    </div>
  )
}

export default SectorSelector
