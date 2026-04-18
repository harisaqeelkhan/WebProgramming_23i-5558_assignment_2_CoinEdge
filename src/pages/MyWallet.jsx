import { Link } from "react-router-dom";
import { useWallet } from "../contexts/FinancialWalletContext";
import WalletOverview from "../components/WalletOverview";
import WalletItem from "../components/WalletItem";
import "../styles/MyWallet.css";

export default function MyWallet() {
  const { items, removeFromMyWallet, updateAllocation, stats } = useWallet();

  if (items.length === 0) {
    return (
      <div className="page-container">
        <h1 className="section-title">Your Stash</h1>
        <div className="empty-state">
          <h3>Your stash is looking pretty empty</h3>
          <p>Start exploring and stack up some products.</p>
          <Link to="/products">
            <button className="btn-primary">Find MarketPage</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="section-title">Your Stash</h1>

      <WalletOverview stats={stats} />

      <div className="portfolio-items-list">
        {items.map((item) => (
          <WalletItem
            key={item.product.id}
            item={item}
            onRemove={removeFromMyWallet}
            onUpdateAmount={updateAllocation}
          />
        ))}
      </div>
    </div>
  );
}
