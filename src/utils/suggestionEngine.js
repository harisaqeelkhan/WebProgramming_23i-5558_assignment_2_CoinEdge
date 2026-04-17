
// this file basically helps in the risk assesment of the user. 

const RISK_TOLERANCE_MAP = {
  conservative: ["low"],
  moderate: ["low", "medium"],
  aggressive: ["low", "medium", "high"],
};


const HORIZON_MAP = {
  short: ["short"],
  medium: ["short", "medium"],
  long: ["short", "medium", "long"],
};


const LIQUIDITY_MAP = {
  easy: ["easy"],
  moderate: ["easy", "moderate"],
  locked: ["easy", "moderate", "locked"],
};

export function getCuratedPicks(products, userMyVibe) {
  if (!products || !userMyVibe) return [];

  const allowedRisks = RISK_TOLERANCE_MAP[userMyVibe.riskTolerance] || [];
  const allowedHorizons = HORIZON_MAP[userMyVibe.investmentHorizon] || [];
  const allowedLiquidity = LIQUIDITY_MAP[userMyVibe.liquidityPreference] || [];
  const budget = userMyVibe.monthlyCapacity || 0;


  const filtered = products.filter((product) => {
    const passesRisk = allowedRisks.includes(product.riskLevel);
    const passesHorizon = allowedHorizons.includes(product.timeHorizon);
    const passesLiquidity = allowedLiquidity.includes(product.liquidity);
    const passesBudget = product.minInvestment <= budget;
    return passesRisk && passesHorizon && passesLiquidity && passesBudget;
  });


  filtered.sort((a, b) => {
    if (userMyVibe.riskTolerance === "conservative") {
      return a.expectedReturn - b.expectedReturn;
    }
    return b.expectedReturn - a.expectedReturn;
  });

  return filtered;
}

// generating insights for the user based on their selections
export function generateDecisionInsight(product) {
  let insight = "";


  if (product.riskLevel === "low") {
    insight += "This is a low-risk product, making it suitable for conservative investors seeking capital preservation. ";
  } else if (product.riskLevel === "medium") {
    insight += "This product carries moderate risk, offering a balance between growth potential and stability. ";
  } else if (product.riskLevel === "high") {
    insight += "This is a high-risk product with significant volatility — only suitable for aggressive investors comfortable with potential losses. ";
  }


  if (product.liquidity === "easy") {
    insight += "Your funds remain easily accessible, allowing withdrawals at any time. ";
  } else if (product.liquidity === "moderate") {
    insight += "Liquidity is moderate — withdrawals may take a few business days to process. ";
  } else if (product.liquidity === "locked") {
    insight += "Your capital will be locked for the duration of the term; early withdrawal may incur penalties. ";
  }


  if (product.timeHorizon === "short") {
    insight += "Best suited for short-term goals of 1-2 years.";
  } else if (product.timeHorizon === "medium") {
    insight += "Ideal for medium-term goals spanning 3-5 years.";
  } else if (product.timeHorizon === "long") {
    insight += "Designed for long-term wealth building over 5+ years.";
  }

  return insight.trim();
}
