function OverallScore({ score, loading, ticker, date }) {
  const getScoreColor = (score) => {
    if (score < 30) return '#10b981' // Green (low risk)
    if (score < 60) return '#f59e0b' // Orange (medium risk)
    return '#ef4444' // Red (high risk)
  }

  const getScoreLabel = (score) => {
    if (score < 30) return 'Low Risk'
    if (score < 60) return 'Moderate Risk'
    return 'High Risk'
  }

  return (
    <div className="card overall-score-card">
      <div className="score-header">
        <div className="card-title">Technical Risk Score</div>
        <div className="score-meta">
          <div className="score-ticker">{ticker}</div>
          <div className="score-date">As of {date || '--'}</div>
        </div>
      </div>

      {loading ? (
        <div className="score-loading">Loading...</div>
      ) : (
        <div className="score-display">
          <div className="score-value" style={{ color: getScoreColor(score) }}>
            {score?.toFixed(1) || '--'}
          </div>
          <div className="score-info">
            <div className="score-label" style={{ color: getScoreColor(score) }}>
              {score ? getScoreLabel(score) : 'No Data'}
            </div>
            <div className="score-range">
              <span style={{ color: '#10b981' }}>0 Low</span>
              <span style={{ color: '#f59e0b' }}>50 Med</span>
              <span style={{ color: '#ef4444' }}>100 High</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OverallScore
