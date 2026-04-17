# CoinEdge — Digital Asset Financial Hub 🚀
**A modern, high-performance React application for live digital asset screening and portfolio simulation.**

## 📖 Overview
CoinEdge is a sophisticated single-page financial application (SPA) built to track, categorize, and simulate investments in genuine, real-time cryptocurrency markets. Featuring a fully bespoke dark-mode "Glassmorphism" UI, CoinEdge securely normalizes live endpoint data into actionable retail categories: **Savings**, **Investments**, **Insurance**, and **High-Risk Crypto**, providing users with dynamically calculated portfolio analytics.

## ✨ Core Features
*   **Live Market Data:** Integrates directly with the `CoinGecko Public API`, pulling live market caps, prices, and imagery for top digital equity assets.
*   **Algorithmic Asset Mapping (AST-Secure):** Custom `assetMapper` pipelines dynamically distribute incoming API assets across the four assignment-required categories using deterministic seed formulas.
*   **Robust State Management:** Completely prop-drill free utilizing React's advanced Context API architecture (`FinancialWalletContext`, `InvestorPreferencesContext`).
*   **Vibe-Based Recommendations:** A multi-step `InvestorSurvey` system tracks user risk profiles to curate tailored asset suggestions via the `suggestionEngine` module.
*   **Premium Glassmorphic UI:** Features pure-CSS elite styling, floating lens overlays, dynamic grid matrixes, and fully responsive fluid layouts.

## 🛠️ Technology Stack
*   **Core:** React 18
*   **Build Tool:** Vite
*   **Routing:** React Router v6
*   **Styling:** Pure Vanilla CSS (Variables, Flexbox/Grid, Backdrop Filters)
*   **Data Source:** Live CoinGecko Crypto Markets API
*   **Toast Notifications:** React Hot Toast

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1.  Clone the repository or unzip the assignment folder.
2.  Navigate to the project directory:
    ```bash
    cd "Assignment2"
    ```
3.  Install dependency packages:
    ```bash
    npm install
    ```
4.  Boot up the development environment:
    ```bash
    npm run dev
    ```
5.  Open your browser to the URL provided in the terminal (typically `http://localhost:5173`).

## 📂 Project Architecture
The codebase has been rigidly structured to segregate UI rendering from business logic:
*   `/src/components/`: Reusable atomic UI parts (`EliteAssetCard`, `ScreenerOptions`, `Navbar`).
*   `/src/contexts/`: Centralized state management boundaries handling portfolio calculations and user preferences.
*   `/src/pages/`: Distinct macro router views mapping to `react-router` paths.
*   `/src/utils/`: Pure analytical functions responsible for normalization, hashing, and mock financial calculus.

---
*Built as a capstone submission for Web Programming Assignment 2.*
