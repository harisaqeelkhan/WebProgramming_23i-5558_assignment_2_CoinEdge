import "../styles/Components.css";

export default function YieldChip({ value }) {
  return (
    <span className="return-display">
      {value.toFixed(2)}% p.a.
    </span>
  );
}
