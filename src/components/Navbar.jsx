import { NavLink, Link } from "react-router-dom";
import { useWallet } from "../contexts/FinancialWalletContext";
import { useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const { items } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          {/* Mock Logo Element */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12V22L22 17V7L12 2Z" fill="white"/>
          </svg>
          CoinEdge
        </Link>
        
        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={`navbar-links-wrapper ${menuOpen ? "navbar-links-open" : ""}`}>
          <ul className="navbar-links">
            <li>
              <NavLink to="/" className="navbar-link" onClick={closeMenu} end>Landing</NavLink>
            </li>
            <li>
              <NavLink to="/products" className="navbar-link" onClick={closeMenu}>Explore</NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="navbar-link" onClick={closeMenu}>My Vibe</NavLink>
            </li>
            <li>
              <NavLink to="/suggestionEngine" className="navbar-link" onClick={closeMenu}>For Me</NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-actions">
          <NavLink to="/portfolio" className="navbar-icon-btn" onClick={closeMenu} aria-label="Stash">
            🛍️
            {items.length > 0 && (
              <span className="navbar-badge">{items.length}</span>
            )}
          </NavLink>
          <button className="navbar-btn-text">Login</button>
          <button className="navbar-btn-solid">Sign up</button>
        </div>
      </div>
    </nav>
  );
}
