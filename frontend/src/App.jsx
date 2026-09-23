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

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Fresh Apples",
      category: "Fruits",
      quantity: "250 kg",
      storage: "Cold Room A",
      expiryDate: "25-08-2026",
      status: "Good",
    },
    {
      id: 2,
      name: "Milk",
      category: "Dairy",
      quantity: "180 L",
      storage: "Cold Room B",
      expiryDate: "20-08-2026",
      status: "Expiring",
    },
    {
      id: 3,
      name: "Frozen Chicken",
      category: "Meat",
      quantity: "320 kg",
      storage: "Freezer A",
      expiryDate: "15-12-2026",
      status: "Good",
    },
  ]);

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

      {page === "dashboard" && (
        <Dashboard
  products={products}
  setPage={setPage}
/>
      )}

     {page === "products" && (
  <Products
    products={products}
    setProducts={setProducts}
  />
)}
      {page === "temperature" && <Temperature />}
      {page === "alerts" && <Alerts />}
      {page === "storage" && <Storage />}
      {page === "reports" && <Reports products={products} />}
    </div>
  );
}

export default App;