import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { PortfolioProvider } from "./contexts/FinancialWalletContext";
import { UserProfileProvider } from "./contexts/InvestorPreferencesContext";
import { transformAllMarketPage } from "./utils/assetMapper";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import MarketPage from "./pages/MarketPage";
import AssetView from "./pages/AssetView";
import MyVibe from "./pages/MyVibe";
import MyWallet from "./pages/MyWallet";
import CuratedPicks from "./pages/CuratedPicks";
import NotFound from "./pages/NotFound";

export default function App() {
  const [products, setMarketPage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMarketPage() {
      try {
        setLoading(true);
        setError(null);
        
        // console.log("fetching api...");
        // const response = await fetch("https://dummyjson.com/products");
        // wait sir said we need a real financial api, using coingecko instead
        
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1");
        
        console.log("Response status:", response.status); // debugging
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        if (!cancelled) {
          // Normalize CoinGecko financial data to fit the app's structure
          const normalizedData = data.map((coin, index) => ({
            id: index + 1, // Generate numeric id for the math functions
            title: `${coin.name} (${coin.symbol.toUpperCase()})`,
            price: coin.current_price,
            description: `Live Market Cap: $${coin.market_cap.toLocaleString()}`,
            image: coin.image
          }));
          setMarketPage(transformAllMarketPage(normalizedData));
        }
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load products. Please try again later.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMarketPage();
    return () => { cancelled = true; };
  }, []);

  return (
    <PortfolioProvider>
      <UserProfileProvider>
        <BrowserRouter>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                border: '3px solid var(--color-text)',
                boxShadow: '4px 4px 0 var(--color-text)',
                borderRadius: '0',
                padding: '16px',
                color: 'var(--color-text)',
                fontWeight: '900',
                fontSize: 'var(--text-lg)',
              },
              success: {
                style: {
                  background: 'var(--color-success)',
                },
              },
              error: {
                style: {
                  background: 'var(--color-risk-high)',
                  color: 'white',
                },
              },
            }}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing products={products} />} />
            <Route
              path="/products"
              element={
                <MarketPage products={products} loading={loading} error={error} />
              }
            />
            <Route
              path="/product/:id"
              element={<AssetView products={products} />}
            />
            <Route
              path="/profile"
              element={<MyVibe products={products} />}
            />
            <Route path="/portfolio" element={<MyWallet />} />
            <Route
              path="/suggestionEngine"
              element={<CuratedPicks products={products} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProfileProvider>
    </PortfolioProvider>
  );
}
