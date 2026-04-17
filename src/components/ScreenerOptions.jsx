import "../styles/ScreenerOptions.css";

export default function ScreenerOptions({ filters, onFilterChange, productCount }) {
  function toggleArrayFilter(key, value) {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [key]: updated });
  }

  function updateFilter(key, value) {
    onFilterChange({ ...filters, [key]: value });
  }

  function resetFilters() {
    onFilterChange({
      riskLevels: [],
      categories: [],
      minReturn: "",
      maxReturn: "",
      liquidity: "all",
      timeHorizon: "all",
      maxInvestment: "",
    });
  }

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3 className="filter-panel-title">Filters</h3>
        <span className="filter-panel-count">{productCount} products</span>
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Risk Level</span>
        <div className="filter-group-checkboxes">
          {["low", "medium", "high"].map((level) => (
            <label key={level} className="filter-checkbox">
              <input
                type="checkbox"
                checked={(filters.riskLevels || []).includes(level)}
                onChange={() => toggleArrayFilter("riskLevels", level)}
              />
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Return Range (%)</span>
        <div className="filter-group-input-row">
          <input
            type="number"
            placeholder="Min"
            value={filters.minReturn || ""}
            onChange={(e) => updateFilter("minReturn", e.target.value)}
            min="0"
            step="0.1"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxReturn || ""}
            onChange={(e) => updateFilter("maxReturn", e.target.value)}
            min="0"
            step="0.1"
          />
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Category</span>
        <div className="filter-group-checkboxes">
          {["savings", "investment", "insurance", "crypto"].map((cat) => (
            <label key={cat} className="filter-checkbox">
              <input
                type="checkbox"
                checked={(filters.categories || []).includes(cat)}
                onChange={() => toggleArrayFilter("categories", cat)}
              />
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Liquidity</span>
        <select
          value={filters.liquidity || "all"}
          onChange={(e) => updateFilter("liquidity", e.target.value)}
        >
          <option value="all">All</option>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="locked">Locked</option>
        </select>
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Time Horizon</span>
        <select
          value={filters.timeHorizon || "all"}
          onChange={(e) => updateFilter("timeHorizon", e.target.value)}
        >
          <option value="all">All</option>
          <option value="short">Short (1-2 yrs)</option>
          <option value="medium">Medium (3-5 yrs)</option>
          <option value="long">Long (5+ yrs)</option>
        </select>
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Max Investment (PKR)</span>
        <input
          type="number"
          placeholder="e.g. 100000"
          value={filters.maxInvestment || ""}
          onChange={(e) => updateFilter("maxInvestment", e.target.value)}
          min="0"
        />
      </div>

      <button className="filter-panel-reset" onClick={resetFilters}>
        Reset All Filters
      </button>
    </div>
  );
}
