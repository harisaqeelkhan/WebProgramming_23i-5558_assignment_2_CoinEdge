import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ScreenerOptions from "../components/ScreenerOptions";
import MarketGrid from "../components/MarketGrid";
import "../styles/MarketPage.css";

const DEFAULT_FILTERS = {
  riskLevels: [],
  categories: [],
  minReturn: "",
  maxReturn: "",
  liquidity: "all",
  timeHorizon: "all",
  maxInvestment: "",
};

export default function MarketPage({ products, loading, error }) {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [filters, setFilters] = useState(() => {
    if (categoryFromUrl) {
      return { ...DEFAULT_FILTERS, categories: [categoryFromUrl] };
    }
    return DEFAULT_FILTERS;
  });

  useEffect(() => {
    if (categoryFromUrl) {
      setFilters((prev) => ({
        ...prev,
        categories: [categoryFromUrl],
      }));
    }
  }, [categoryFromUrl]);

  const filteredCount = useMemo(() => {
    return products.filter((product) => {
      if (filters.riskLevels.length > 0 && !filters.riskLevels.includes(product.riskLevel)) return false;
      if (filters.minReturn !== "" && product.expectedReturn < Number(filters.minReturn)) return false;
      if (filters.maxReturn !== "" && product.expectedReturn > Number(filters.maxReturn)) return false;
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false;
      if (filters.liquidity !== "all" && product.liquidity !== filters.liquidity) return false;
      if (filters.timeHorizon !== "all" && product.timeHorizon !== filters.timeHorizon) return false;
      if (filters.maxInvestment !== "" && product.minInvestment > Number(filters.maxInvestment)) return false;
      return true;
    }).length;
  }, [products, filters]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Loading financial products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="products-page-header">
        <h1 className="products-page-title">Financial MarketPage</h1>
        <p className="products-page-subtitle">
          Browse and filter products to find the right investment for you.
        </p>
      </div>

      <div className="products-page">
        <ScreenerOptions
          filters={filters}
          onFilterChange={setFilters}
          productCount={filteredCount}
        />
        <MarketGrid products={products} filters={filters} />
      </div>
    </div>
  );
}
