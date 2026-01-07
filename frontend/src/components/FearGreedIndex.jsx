import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

function FearGreedIndex() {
  // Hardcoded for now - will integrate with API later
  const fearGreedValue = 42 // 0-100 scale

  const getLabel = (value) => {
    if (value < 25) return 'Extreme Fear'
    if (value < 45) return 'Fear'
    if (value < 55) return 'Neutral'
    if (value < 75) return 'Greed'
    return 'Extreme Greed'
  }

  const getColor = (value) => {
    if (value < 25) return '#ef4444'
    if (value < 45) return '#f59e0b'
    if (value < 55) return '#888'
    if (value < 75) return '#10b981'
    return '#10b981'
  }

  const data = [
    { name: 'Value', value: fearGreedValue },
    { name: 'Remaining', value: 100 - fearGreedValue }
  ]

  const COLORS = [getColor(fearGreedValue), '#f0f0f0']

  return (
    <div className="card fear-greed-card">
      <div className="card-title">Fear & Greed Index</div>

      <div className="fear-greed-content">
        <div className="fear-greed-chart">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="fear-greed-value-overlay">
            <div className="fear-greed-number">{fearGreedValue}</div>
            <div className="fear-greed-label" style={{ color: getColor(fearGreedValue) }}>
              {getLabel(fearGreedValue)}
            </div>
          </div>
        </div>

        <div className="fear-greed-dashboard">
          <div className="dashboard-item">
            <span className="dashboard-label">Market Momentum</span>
            <span className="dashboard-value">Neutral</span>
          </div>
          <div className="dashboard-item">
            <span className="dashboard-label">Stock Price Breadth</span>
            <span className="dashboard-value">Declining</span>
          </div>
          <div className="dashboard-item">
            <span className="dashboard-label">Put/Call Ratio</span>
            <span className="dashboard-value">0.87</span>
          </div>
          <div className="dashboard-item">
            <span className="dashboard-label">VIX Level</span>
            <span className="dashboard-value">16.2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FearGreedIndex
