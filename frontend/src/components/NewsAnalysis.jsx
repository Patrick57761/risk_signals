import { useState } from 'react'

const MOCK_NEWS = [
  {
    id: 1,
    headline: 'Tech sector rallies on strong earnings reports',
    summary: 'Major technology companies exceeded earnings expectations, driving sector performance higher. Cloud computing and AI services showed particularly strong growth.',
    sentiment: 'positive',
    date: '2h ago'
  },
  {
    id: 2,
    headline: 'Healthcare stocks remain defensive amid volatility',
    summary: 'Healthcare sector maintains stable performance as investors seek defensive positioning. Pharmaceutical companies benefiting from strong fundamentals.',
    sentiment: 'neutral',
    date: '5h ago'
  },
  {
    id: 3,
    headline: 'Financial sector faces headwinds from rate concerns',
    summary: 'Banking stocks under pressure as market reassesses interest rate outlook. Regional banks showing weakness while larger institutions hold steady.',
    sentiment: 'negative',
    date: '1d ago'
  }
]

function NewsAnalysis({ ticker }) {
  const [expandedId, setExpandedId] = useState(null)

  const getSentimentColor = (sentiment) => {
    if (sentiment === 'positive') return '#10b981'
    if (sentiment === 'negative') return '#ef4444'
    return '#f59e0b'
  }

  const getSentimentDot = (sentiment) => {
    return '●'
  }

  return (
    <div className="card news-analysis-card">
      <div className="card-title">Market Analysis</div>

      <div className="news-list">
        {MOCK_NEWS.map(article => (
          <div
            key={article.id}
            className={`news-card ${expandedId === article.id ? 'expanded' : ''}`}
            onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
          >
            <div className="news-header">
              <span
                className="sentiment-indicator"
                style={{ color: getSentimentColor(article.sentiment) }}
              >
                {getSentimentDot(article.sentiment)}
              </span>
              <span className="news-date">{article.date}</span>
            </div>

            <div className="news-headline">{article.headline}</div>

            {expandedId === article.id && (
              <div className="news-summary">{article.summary}</div>
            )}
          </div>
        ))}
      </div>

      <div className="analysis-footer">
        <span className="footer-note">Click cards to expand</span>
      </div>
    </div>
  )
}

export default NewsAnalysis
