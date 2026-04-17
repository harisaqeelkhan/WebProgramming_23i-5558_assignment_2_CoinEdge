import "../styles/Components.css";

/**
 * VolatilityPill
 *
 * Renders a color-coded pill badge based on risk level.
 * Props: riskLevel ("low" | "medium" | "high")
 */
export default function VolatilityPill({ riskLevel }) {
  const label = riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1);
  return (
    <span className={`risk-badge risk-badge--${riskLevel}`}>
      {label} Risk
    </span>
  );
}
