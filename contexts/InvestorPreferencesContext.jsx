import { createContext, useContext, useState, useCallback } from "react";
import { getCuratedPicks } from "../utils/suggestionEngine";

const InvestorPreferencesContext = createContext(null);

/**
 * UserProfileProvider
 *
 * Wraps the app and provides user profile state and actions:
 * - profile: the current profile object (null if not saved yet)
 * - updateMyVibe(newMyVibe): saves/overwrites the profile
 * - isProfileComplete(): true only if all 5 fields are filled
 * - getProductCuratedPicks(products): returns filtered/sorted products
 */
export function UserProfileProvider({ children }) {
  const [profile, setMyVibe] = useState(null);

  function updateMyVibe(newMyVibe) {
    setMyVibe(newMyVibe);
  }

  const isProfileComplete = useCallback(() => {
    if (!profile) return false;
    const requiredFields = [
      "riskTolerance",
      "investmentHorizon",
      "monthlyCapacity",
      "liquidityPreference",
      "investmentGoal",
    ];
    return requiredFields.every(
      (field) => profile[field] !== undefined && profile[field] !== "" && profile[field] !== null
    );
  }, [profile]);

  function getProductCuratedPicks(products) {
    if (!isProfileComplete()) return [];
    return getCuratedPicks(products, profile);
  }

  const value = {
    profile,
    updateMyVibe,
    isProfileComplete,
    getProductCuratedPicks,
  };

  return (
    <InvestorPreferencesContext.Provider value={value}>
      {children}
    </InvestorPreferencesContext.Provider>
  );
}

export function useInvestorMyVibe() {
  const context = useContext(InvestorPreferencesContext);
  if (!context) {
    throw new Error("useInvestorMyVibe must be used within a UserProfileProvider");
  }
  return context;
}
