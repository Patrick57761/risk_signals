
function TechnicalIndicators({ data, loading }) {
  const getStateLabel = (state) => {
    if (state === 1) return 'Bullish'
    if (state === -1) return 'Bearish'
    return 'Neutral'
  }

  const getStateColor = (state) => {
    if (state === 1) return '#10b981'
    if (state === -1) return '#ef4444'
    return '#f59e0b'
  }

  const getMomentumLabel = (state) => {
    if (state === 1) return 'Overbought'
    if (state === -1) return 'Oversold'
    return 'Neutral'
  }

  return (
    <div className="card technical-indicators-card">
      <div className="card-title">Technical Indicators</div>

      {loading ? (
        <div className="indicators-loading">Loading...</div>
      ) : data ? (
        <>
          <div className="indicators-list">
            <div className="indicator-item">
              <div className="indicator-label">Volatility Regime</div>
              <div className="indicator-value">
                {data.volatility_regime.toFixed(2)}
              </div>
              <div className="indicator-description">
                {data.volatility_regime > 1.2 ? 'Elevated' :
                  data.volatility_regime < 0.8 ? 'Compressed' : 'Normal'}
              </div>
            </div>

            <div className="indicator-item">
              <div className="indicator-label">Trend State</div>
              <div
                className="indicator-value"
                style={{ color: getStateColor(data.trend_state) }}
              >
                {getStateLabel(data.trend_state)}
              </div>
              <div className="indicator-description">
                Strength: {(data.trend_strength * 100).toFixed(1)}%
              </div>
            </div>

            <div className="indicator-item">
              <div className="indicator-label">Momentum State</div>
              <div
                className="indicator-value"
                style={{ color: getStateColor(data.momentum_state) }}
              >
                {getMomentumLabel(data.momentum_state)}
              </div>
              <div className="indicator-description">
                Strength: {(data.momentum_strength * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="technical-score">
            <div className="technical-score-label">Technical Score</div>
            <div className="technical-score-value">
              {data.technical_risk_score.toFixed(1)}/100
            </div>
          </div>
        </>
      ) : (
        <div className="indicators-loading">No data available</div>
      )}
    </div>
  )
}

export default TechnicalIndicators
