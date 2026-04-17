import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useWallet } from "../contexts/FinancialWalletContext";
import VolatilityPill from "./VolatilityPill";
import YieldChip from "./YieldChip";
import "../styles/Components.css";

export default function EliteAssetCard({ product }) {
  const { addToMyWallet, isInMyWallet } = useWallet();
  const added = isInMyWallet(product.id);

  function handleAdd() {
    if (!added) {
      addToMyWallet(product, product.minInvestment);
      toast.success(`${product.name} added to your Stash!`);
    }
  }

  return (
    <div className="elite-asset-card">
      <div className="elite-asset-card-image-container">
        <img
          className="elite-asset-card-image"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        <div className="elite-asset-card-overlay">
          <VolatilityPill riskLevel={product.riskLevel} />
          <div className="elite-asset-card-overlay-item">
            Return: <span><YieldChip value={product.expectedReturn} /></span>
          </div>
          <div className="elite-asset-card-overlay-item">
            Liquidity: <span>{product.liquidity}</span>
          </div>
          <div className="elite-asset-card-overlay-item">
            Min Invest: <span>PKR {product.minInvestment.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="elite-asset-card-body">
        <h3 className="elite-asset-card-name">{product.name}</h3>
        <div className="elite-asset-card-meta">
          <span className={`category-badge category-badge-${product.category}`}>
            {product.category}
          </span>
          <YieldChip value={product.expectedReturn} />
        </div>

        <div className="elite-asset-card-actions">
          <Link to={`/product/${product.id}`}>
            <button className="elite-asset-card-btn-details">View Details</button>
          </Link>
          <button
            className={added ? "elite-asset-card-btn-added" : "elite-asset-card-btn-add"}
            onClick={handleAdd}
            disabled={added}
          >
            {added ? "Added to Stash ✓" : "Add to Stash"}
          </button>
        </div>
      </div>
    </div>
  );
}
