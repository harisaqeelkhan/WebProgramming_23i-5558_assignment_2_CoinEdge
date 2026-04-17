import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-container">
      <div className="empty-state" style={{ paddingTop: "var(--space-3xl)" }}>
        <h3 style={{ fontSize: "var(--text-4xl)", marginBottom: "var(--space-md)" }}>404</h3>
        <h3>Whoops! Dead End</h3>
        <p>The page you're hunting for doesn't exist or took a vacation.</p>
        <Link to="/">
          <button className="btn-primary" style={{ marginTop: "var(--space-md)" }}>
            Go Landing
          </button>
        </Link>
      </div>
    </div>
  );
}
