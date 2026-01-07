import { useState, useEffect } from 'react'
import './App.css'
import Watchlist from './components/Watchlist'
import OverallScore from './components/OverallScore'
import TechnicalIndicators from './components/TechnicalIndicators'
import FearGreedIndex from './components/FearGreedIndex'
import NewsAnalysis from './components/NewsAnalysis'

function App() {
  const [selectedTicker, setSelectedTicker] = useState('XLK')
  const [sectorData, setSectorData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    fetchSectorData(selectedTicker)
  }, [selectedTicker])

  const fetchSectorData = async (ticker) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/sector/${ticker}`)
      const data = await response.json()
      setSectorData(data)
    } catch (error) {
      console.error('Error fetching sector data:', error)
      // Use hardcoded data if API fails
      setSectorData({
        ticker: ticker,
        date: '2026-01-06',
        technical_risk_score: 45.2,
        volatility_regime: 1.15,
        trend_state: 1,
        momentum_state: 0,
        trend_strength: 0.032,
        momentum_strength: 0.15
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      {/* Left Sidebar - Watchlist */}
      <Watchlist
        selectedTicker={selectedTicker}
        onTickerChange={setSelectedTicker}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content - Vertical Feed */}
      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        <OverallScore
          score={sectorData?.technical_risk_score}
          loading={loading}
          ticker={selectedTicker}
          date={sectorData?.date}
        />
        <FearGreedIndex />
        <NewsAnalysis ticker={selectedTicker} />
        <TechnicalIndicators data={sectorData} loading={loading} />
      </div>
    </div>
  )
}

export default App
