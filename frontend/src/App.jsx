import { useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div>

      {/* Navigation */}
      <nav className="navbar">
        <h2>❄️ FrostGuard</h2>

        <div>
          <button onClick={() => setPage("dashboard")}>
            Dashboard
          </button>

          <button onClick={() => setPage("products")}>
            Products
          </button>
        </div>
      </nav>

      {/* Pages */}
      {page === "dashboard" && <Dashboard />}
      {page === "products" && <Products />}

    </div>
  );
}

export default App;