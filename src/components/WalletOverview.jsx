import "../styles/MyWallet.css";

export default function WalletOverview({ stats }) {
  const { totalInvested, weightedReturn, riskDistribution } = stats;

  return (
    <div className="portfolio-summary">
      <h2 className="portfolio-summary-title">Stash Summary</h2>

      <div className="portfolio-summary-stats">
        <div className="portfolio-summary-stat">
          <span className="portfolio-summary-stat-label">Total Stacked</span>
          <span className="portfolio-summary-stat-value">
            PKR {totalInvested.toLocaleString()}
          </span>
        </div>
        <div className="portfolio-summary-stat">
          <span className="portfolio-summary-stat-label">Weighted Return</span>
          <span className="portfolio-summary-stat-value portfolio-summary-stat-value-return">
            {weightedReturn.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="risk-distribution">
        <span className="risk-distribution-title">Risk Spread</span>
        {["low", "medium", "high"].map((level) => (
          <div key={level} className="risk-bar">
            <span className="risk-bar-label">{level}</span>
            <div className="risk-bar-track">
              <div
                className={`risk-bar-fill risk-bar-fill-${level}`}
                style={{ width: `${riskDistribution[level]}%` }}
              />
            </div>
            <span className="risk-bar-value">{riskDistribution[level]}%</span>
          </div>
        ))}
      </div>

      {riskDistribution.high > 70 && (
        <div className="portfolio-summary-warning">
          ⚠ Yikes! High-risk stuff is over 70%. Maybe spread it out a bit?
        </div>
      )}
    </div>
  );
}
