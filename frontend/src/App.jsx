import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Temperature from "./pages/Temperature";
import Alerts from "./pages/Alerts";
import Storage from "./pages/Storage";
import Reports from "./pages/Reports";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div>
      <nav className="navbar">
        <h2>❄️ FrostGuard</h2>

        <div>
          <button onClick={() => setPage("dashboard")}>
            Dashboard
          </button>

          <button onClick={() => setPage("products")}>
            Products
          </button>

          <button onClick={() => setPage("temperature")}>
            Temperature
          </button>

          <button onClick={() => setPage("alerts")}>
            Alerts
          </button>

          <button onClick={() => setPage("storage")}>
            Storage
          </button>

          <button onClick={() => setPage("reports")}>
            Reports
          </button>

          <button onClick={() => setIsLoggedIn(false)}>
            Logout
          </button>
        </div>
      </nav>

      {page === "dashboard" && <Dashboard />}
      {page === "products" && <Products />}
      {page === "temperature" && <Temperature />}
      {page === "alerts" && <Alerts />}
      {page === "storage" && <Storage />}
      {page === "reports" && <Reports />}
    </div>
  );
}

export default App;