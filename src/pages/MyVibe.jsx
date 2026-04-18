import { useInvestorMyVibe } from "../contexts/InvestorPreferencesContext";
import InvestorSurvey from "../components/InvestorSurvey";

export default function MyVibe({ products }) {
  const { profile, updateMyVibe, isProfileComplete, getProductCuratedPicks } = useInvestorMyVibe();

  const matchCount = isProfileComplete() ? getProductCuratedPicks(products).length : null;

  return (
    <div className="page-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 className="section-title" style={{ textAlign: "center" }}>Your Investment MyVibe</h1>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-xl)", fontWeight: "var(--weight-bold)", textAlign: "center" }}>
        Tell us about your vibe so we can suggest the best stash elements.
      </p>

      <InvestorSurvey profile={profile} onSubmit={updateMyVibe} />

      {matchCount !== null && (
        <div className="profile-form-match-count" style={{ maxWidth: "640px", marginTop: "var(--space-lg)", fontWeight: "var(--weight-bold)", border: "2px solid var(--color-text)", padding: "10px", borderRadius: "10px", backgroundColor: "white", boxShadow: "4px 4px 0 var(--color-text)", textAlign: "center" }}>
          Based on your vibe, <strong>{matchCount}</strong> products are a perfect match.
        </div>
      )}
    </div>
  );
}
