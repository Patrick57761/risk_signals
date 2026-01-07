import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function PriceChart({ ticker }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // Hardcoded data for now - will fetch from API later
    const mockData = generateMockData()
    setChartData(mockData)
  }, [ticker])

  const generateMockData = () => {
    const data = []
    let price = 100
    for (let i = 0; i < 90; i++) {
      price = price * (1 + (Math.random() - 0.48) * 0.02)
      data.push({
        date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: price
      })
    }
    return data
  }

  return (
    <div className="price-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis
            dataKey="date"
            stroke="#e5e5e5"
            tick={{ fill: '#999', fontSize: 12 }}
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis
            stroke="#e5e5e5"
            tick={{ fill: '#999', fontSize: 12 }}
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            labelStyle={{ color: '#666' }}
            itemStyle={{ color: '#10b981' }}
            formatter={(value) => `$${value.toFixed(2)}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PriceChart
