import { useMemo } from "react";
import EliteAssetCard from "./EliteAssetCard";
import "../styles/Components.css";

//this is the MarketGrid component that is used to display the products in a grid format
// basically it takes products ki array and unko filter krta hai with 6 filters 
// and renders a grid of EliteAssetCards
// no products match will be shown whrn the results are empty


export default function MarketGrid({ products, filters }) {
  const filtered = useMemo(() => {
    return products.filter((product) => {
      /* 1. Risk Level filter */
      if (
        filters.riskLevels &&
        filters.riskLevels.length > 0 &&
        !filters.riskLevels.includes(product.riskLevel)
      ) {
        return false;
      }

      /* 2. Return Range filter */
      if (filters.minReturn !== "" && filters.minReturn !== undefined) {
        if (product.expectedReturn < Number(filters.minReturn)) return false;
      }
      if (filters.maxReturn !== "" && filters.maxReturn !== undefined) {
        if (product.expectedReturn > Number(filters.maxReturn)) return false;
      }

      /* 3. Category filter */
      if (
        filters.categories &&
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }

      /* 4. Liquidity filter */
      if (
        filters.liquidity &&
        filters.liquidity !== "all" &&
        product.liquidity !== filters.liquidity
      ) {
        return false;
      }

      /* 5. Time Horizon filter */
      if (
        filters.timeHorizon &&
        filters.timeHorizon !== "all" &&
        product.timeHorizon !== filters.timeHorizon
      ) {
        return false;
      }

      /* 6. Max Investment filter */
      if (filters.maxInvestment !== "" && filters.maxInvestment !== undefined) {
        if (product.minInvestment > Number(filters.maxInvestment)) return false;
      }

      return true;
    });
  }, [products, filters]);

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        <h3>No products match your filters</h3>
        <p>Try adjusting or resetting your filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="product-grid" key={JSON.stringify(filters)}>
      {filtered.map((product) => (
        <EliteAssetCard key={product.id} product={product} />
      ))}
    </div>
  );
}
