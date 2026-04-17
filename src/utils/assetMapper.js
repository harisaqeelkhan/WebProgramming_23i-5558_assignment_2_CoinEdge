


const CATEGORIES = ["savings", "investment", "insurance", "crypto"];


const RISK_MAP = {
  savings: "low",
  insurance: "low",
  investment: "medium",
  crypto: "high",
};


const RETURN_RANGES = {
  low: [3, 7],
  medium: [7, 12],
  high: [12, 27],
};


const LIQUIDITY_MAP = {
  savings: "easy",
  crypto: "easy",
  insurance: "locked",
  investment: "moderate",
};


const TIME_HORIZON_MAP = {
  low: "short",
  medium: "medium",
  high: "long",
};


function seededValue(id, seed = 9301) {
  return Math.abs(Math.sin(id * seed + 49297)) % 1;
}


function scaleToRange(value, min, max) {
  return Math.round((min + value * (max - min)) * 100) / 100;
}

export function transformToFinancialProduct(apiProduct) {

  const categoryIndex = apiProduct.id % CATEGORIES.length;
  const category = CATEGORIES[categoryIndex];

  const riskLevel = RISK_MAP[category];
  const [minReturn, maxReturn] = RETURN_RANGES[riskLevel];
  const seed = seededValue(apiProduct.id);
  const expectedReturn = scaleToRange(seed, minReturn, maxReturn);
  const liquidity = LIQUIDITY_MAP[category];
  const timeHorizon = TIME_HORIZON_MAP[riskLevel];
  const minInvestment = Math.round(apiProduct.price * 1000);

  const image = apiProduct.thumbnail || apiProduct.image || (apiProduct.images && apiProduct.images[0]);

  return {
    id: apiProduct.id,
    name: apiProduct.title,
    category,
    expectedReturn,
    riskLevel,
    liquidity,
    timeHorizon,
    minInvestment,
    description: apiProduct.description,
    image: image,
  };
}


export function transformAllMarketPage(apiMarketPage) {
  if (!apiMarketPage || !Array.isArray(apiMarketPage)) {
    return [];
  }
  return apiMarketPage.map(transformToFinancialProduct);
}
