
// calculates each users specific metrics of items selected

export function calcWalletMetrics(items) {

  if (!items || items.length === 0) {
    return {
      totalInvested: 0,
      weightedReturn: 0,
      riskDistribution: { low: 0, medium: 0, high: 0 },
    };
  }

  const totalInvested = items.reduce((sum, item) => sum + item.allocatedAmount, 0);

  // let tempSum = 0;
  // for (let i=0; i<items.length; i++) { tempSum += items[i] } // this loop didn't work, using reduce instead

  const weightedReturn =
    totalInvested > 0
      ? Math.round(
        items.reduce(
          (sum, item) =>
            sum +
            (item.allocatedAmount / totalInvested) *
            item.product.expectedReturn,
          0
        ) * 100
      ) / 100
      : 0;


  const riskTotals = { low: 0, medium: 0, high: 0 };
  items.forEach((item) => {
    const risk = item.product.riskLevel;
    if (riskTotals.hasOwnProperty(risk)) {
      riskTotals[risk] += item.allocatedAmount;
    }
  });

  // risk distrubition 

  const riskDistribution = {
    low:
      totalInvested > 0
        ? Math.round((riskTotals.low / totalInvested) * 1000) / 10
        : 0,
    medium:
      totalInvested > 0
        ? Math.round((riskTotals.medium / totalInvested) * 1000) / 10
        : 0,
    high:
      totalInvested > 0
        ? Math.round((riskTotals.high / totalInvested) * 1000) / 10
        : 0,
  };

  return { totalInvested, weightedReturn, riskDistribution };
}
