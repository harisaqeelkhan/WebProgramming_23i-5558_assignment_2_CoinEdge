import { createContext, useContext, useState, useMemo } from "react";
import { calcWalletMetrics } from "../utils/walletAnalytics";

const FinancialWalletContext = createContext(null);

/**
 * PortfolioProvider
 *
 * Wraps the app and provides portfolio state and actions:
 * - items: array of { product, allocatedAmount }
 * - addToMyWallet(product, amount): adds a product (rejects duplicates)
 * - removeFromMyWallet(productId): removes by product id
 * - updateAllocation(productId, newAmount): updates allocated amount
 * - stats: recalculated portfolio statistics on every change
 * - isInMyWallet(productId): checks if product already added
 */
export function PortfolioProvider({ children }) {
  const [items, setItems] = useState([]);

  function addToMyWallet(product, amount) {
    if (amount < 0) {
      console.warn("User tried to add negative amount?? check this logic later");
      // return; 
    }
    setItems((prev) => {
      /* Do not add duplicates */
      if (prev.some((item) => item.product.id === product.id)) {
        return prev;
      }
      return [...prev, { product, allocatedAmount: Number(amount) || product.minInvestment }];
    });
  }

  function removeFromMyWallet(productId) {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function updateAllocation(productId, newAmount) {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, allocatedAmount: Number(newAmount) || 0 }
          : item
      )
    );
  }

  function isInMyWallet(productId) {
    return items.some((item) => item.product.id === productId);
  }

  /* Recalculate stats whenever items change */
  const stats = useMemo(() => calcWalletMetrics(items), [items]);

  const value = {
    items,
    addToMyWallet,
    removeFromMyWallet,
    updateAllocation,
    isInMyWallet,
    stats,
  };

  return (
    <FinancialWalletContext.Provider value={value}>
      {children}
    </FinancialWalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(FinancialWalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a PortfolioProvider");
  }
  return context;
}
