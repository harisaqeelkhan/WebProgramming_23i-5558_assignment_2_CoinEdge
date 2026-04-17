import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { useWallet } from "../contexts/FinancialWalletContext";
import { generateDecisionInsight } from "../utils/suggestionEngine";
import VolatilityPill from "../components/VolatilityPill";
import YieldChip from "../components/YieldChip";
import "../styles/AssetView.css";

const RISK_WIDTH = { low: 33, medium: 66, high: 100 };

function getRiskColor(level) {
  const map = { low: "var(--color-risk-low)", medium: "var(--color-risk-medium)", high: "var(--color-risk-high)" };
  return map[level] || map.medium;
}

// this function provides the asset id from the url and then finds the product with that id from the products array and returns the product details to display in the UI

export default function AssetView({ products }) {
  const { id } = useParams();
  const { addToMyWallet, isInMyWallet } = useWallet();

  const product = useMemo(
    () => products.find((p) => p.id === Number(id)),
    [products, id]
  );

  const [investmentAmount, setInvestmentAmount] = useState("");
  const [compareId, setCompareId] = useState("");

  const compareProduct = useMemo(
    () => (compareId ? products.find((p) => p.id === Number(compareId)) : null),
    [products, compareId]
  );

  if (!product) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h3>Whoops, Product Not Found</h3>
          <p>Looks like this product was moved or deleted. Try searching for something else!</p>
        </div>
      </div>
    );
  }

  const added = isInMyWallet(product.id);
  const insight = generateDecisionInsight(product);
  const amount = Number(investmentAmount) || 0;
  const rate = product.expectedReturn / 100;

  const projections = [1, 3, 5].map((years) => {
    const futureValue = amount * Math.pow(1 + rate, years);
    return {
      years,
      value: Math.round(futureValue),
      gain: Math.round(futureValue - amount),
    };
  });

  function handleAdd() {
    if (!added) {
      addToMyWallet(product, product.minInvestment);
    }
  }

  return (
    <div className="page-container">
      <div className="product-detail">
        <div className="product-detail-image-card">
          <img className="product-detail-image" src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-content">
          <div>
            <h1 className="product-detail-name">{product.name}</h1>
            <div className="product-detail-badges" style={{ marginTop: "var(--space-md)" }}>
              <span className={`category-badge category-badge-${product.category}`}>
                {product.category}
              </span>
              <VolatilityPill riskLevel={product.riskLevel} />
            </div>
          </div>

          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-attrs">
            <div className="product-attr">
              <div className="product-attr-label">Expected Return</div>
              <div className="product-attr-value"><YieldChip value={product.expectedReturn} /></div>
            </div>
            <div className="product-attr">
              <div className="product-attr-label">Risk Level</div>
              <div className="product-attr-value">{product.riskLevel}</div>
            </div>
            <div className="product-attr">
              <div className="product-attr-label">Liquidity</div>
              <div className="product-attr-value" style={{ textTransform: "capitalize" }}>{product.liquidity}</div>
            </div>
            <div className="product-attr">
              <div className="product-attr-label">Time Horizon</div>
              <div className="product-attr-value" style={{ textTransform: "capitalize" }}>{product.timeHorizon}</div>
            </div>
            <div className="product-attr">
              <div className="product-attr-label">Min Investment</div>
              <div className="product-attr-value">PKR {product.minInvestment.toLocaleString()}</div>
            </div>
            <div className="product-attr">
              <div className="product-attr-label">Category</div>
              <div className="product-attr-value" style={{ textTransform: "capitalize" }}>{product.category}</div>
            </div>
          </div>

          <div className="risk-viz">
            <div className="risk-viz-title">Risk Check</div>
            <div className="risk-viz-track">
              <div
                className="risk-viz-fill"
                style={{
                  width: `${RISK_WIDTH[product.riskLevel]}%`,
                  background: getRiskColor(product.riskLevel),
                }}
              />
            </div>
            <div className="risk-viz-labels">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          <div className="decision-insight">
            <div className="decision-insight-title">💡 Our Take</div>
            <p className="decision-insight-text">{insight}</p>
          </div>

          <div className="return-calculator">
            <h3 className="return-calculator-title">Watch Your Money Grow</h3>
            <div className="return-calculator-input-row">
              <label>How much are you dropping in? (PKR):</label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="e.g. 50000"
                min="0"
              />
            </div>
            {amount > 0 && (
              <div className="return-calculator-projections">
                {projections.map((p) => (
                  <div key={p.years} className="projection-card">
                    <div className="projection-card-period">After {p.years} year{p.years > 1 ? "s" : ""}</div>
                    <div className="projection-card-value">PKR {p.value.toLocaleString()}</div>
                    <div className="projection-card-gain">+PKR {p.gain.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="product-detail-actions">
            <button
              className={added ? "btn-success" : "btn-primary"}
              onClick={handleAdd}
              disabled={added}
            >
              {added ? "Added to Stash ✓" : "Add to Stash"}
            </button>
          </div>

          <div className="product-comparison">
            <h3 className="product-comparison-title">Compare with Something Else</h3>
            <select
              className="product-comparison-select"
              value={compareId}
              onChange={(e) => setCompareId(e.target.value)}
            >
              <option value="">Select a product...</option>
              {products
                .filter((p) => p.id !== product.id)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>

            {compareProduct && (
              <div className="product-comparison-table">
                <div className="comparison-cell comparison-cell-header"></div>
                <div className="comparison-cell comparison-cell-header">{product.name.substring(0, 30)}</div>
                <div className="comparison-cell comparison-cell-header">{compareProduct.name.substring(0, 30)}</div>

                {[
                  { label: "Category", key: "category" },
                  { label: "Risk", key: "riskLevel" },
                  { label: "Return", key: "expectedReturn", suffix: "%" },
                  { label: "Liquidity", key: "liquidity" },
                  { label: "Horizon", key: "timeHorizon" },
                  { label: "Min Invest", key: "minInvestment", prefix: "PKR " },
                ].map((attr) => (
                  <div key={attr.label} style={{ display: "contents" }}>
                    <div className="comparison-cell comparison-cell-label">{attr.label}</div>
                    <div className="comparison-cell">
                      {attr.prefix || ""}{typeof product[attr.key] === "number" ? product[attr.key].toLocaleString() : product[attr.key]}{attr.suffix || ""}
                    </div>
                    <div className="comparison-cell">
                      {attr.prefix || ""}{typeof compareProduct[attr.key] === "number" ? compareProduct[attr.key].toLocaleString() : compareProduct[attr.key]}{attr.suffix || ""}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
