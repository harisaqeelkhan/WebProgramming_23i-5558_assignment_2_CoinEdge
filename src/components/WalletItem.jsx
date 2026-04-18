import VolatilityPill from "./VolatilityPill";
import YieldChip from "./YieldChip";
import "../styles/MyWallet.css";

export default function WalletItem({ item, onRemove, onUpdateAmount }) {
  const { product, allocatedAmount } = item;

  return (
    <div className="portfolio-item">
      <img
        className="portfolio-item-image"
        src={product.image}
        alt={product.name}
      />

      <div className="portfolio-item-info">
        <div className="portfolio-item-name">{product.name}</div>
        <div className="portfolio-item-meta">
          <VolatilityPill riskLevel={product.riskLevel} />
          <YieldChip value={product.expectedReturn} />
        </div>
      </div>

      <input
        className="portfolio-item-amount-input"
        type="number"
        value={allocatedAmount}
        onChange={(e) => onUpdateAmount(product.id, e.target.value)}
        min="0"
        aria-label={`Allocation for ${product.name}`}
      />

      <button
        className="portfolio-item-remove"
        onClick={() => onRemove(product.id)}
        aria-label={`Remove ${product.name}`}
        title="Remove"
      >
        ✕
      </button>
    </div>
  );
}
