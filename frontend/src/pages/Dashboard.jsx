import "./Dashboard.css";

function Dashboard({ products, setPage }) {
  const totalProducts = products.length;

  const goodStock = products.filter(
    (product) => product.status === "Good"
  ).length;

  const expiringSoon = products.filter(
    (product) => product.status === "Expiring"
  ).length;

  const expiredProducts = products.filter(
    (product) => product.status === "Expired"
  ).length;

  const storageUnits = new Set(
    products.map((product) => product.storage)
  ).size;

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>FrostGuard Dashboard</h1>
          <p>
            Smart Cold Storage Inventory Management System
          </p>
        </div>

        <button
          className="dashboard-report-btn"
          onClick={() => setPage("reports")}
        >
          📊 View Reports
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">

        <div
          className="card clickable-card"
          onClick={() => setPage("products")}
        >
          <div className="card-icon">📦</div>
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
          <p>Products stored</p>
        </div>

        <div className="card">
          <div className="card-icon">✅</div>
          <h3>Good Stock</h3>
          <h2 className="good-number">
            {goodStock}
          </h2>
          <p>Products in good condition</p>
        </div>

        <div
          className="card clickable-card"
          onClick={() => setPage("products")}
        >
          <div className="card-icon">⚠️</div>
          <h3>Expiring Soon</h3>
          <h2 className="warning-number">
            {expiringSoon}
          </h2>
          <p>Products need attention</p>
        </div>

        <div
          className="card clickable-card"
          onClick={() => setPage("products")}
        >
          <div className="card-icon">🚨</div>
          <h3>Expired Products</h3>
          <h2 className="expired-number">
            {expiredProducts}
          </h2>
          <p>Requires action</p>
        </div>

        <div
          className="card clickable-card"
          onClick={() => setPage("storage")}
        >
          <div className="card-icon">❄️</div>
          <h3>Storage Units</h3>
          <h2>{storageUnits}</h2>
          <p>Active storage areas</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="quick-actions">

        <h2>Quick Actions</h2>

        <div className="action-buttons">

          <button onClick={() => setPage("products")}>
            ➕ Add Product
          </button>

          <button onClick={() => setPage("temperature")}>
            🌡️ Check Temperature
          </button>

          <button onClick={() => setPage("alerts")}>
            🚨 View Alerts
          </button>

          <button onClick={() => setPage("storage")}>
            ❄️ Storage Management
          </button>

          <button onClick={() => setPage("reports")}>
            📊 View Reports
          </button>

        </div>

      </div>

      {/* Recent Products */}
      <div className="recent-products">

        <div className="section-header">
          <div>
            <h2>Recent Products</h2>
            <p>Latest products stored in FrostGuard</p>
          </div>

          <button
            className="view-all-btn"
            onClick={() => setPage("products")}
          >
            View All
          </button>
        </div>

        {products.length === 0 ? (

          <div className="empty-dashboard">
            <div>📦</div>
            <h3>No Products Available</h3>
            <p>Add your first product to get started.</p>

            <button onClick={() => setPage("products")}>
              + Add Product
            </button>
          </div>

        ) : (

          <div className="dashboard-table">

            <table>

              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Storage</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {products.slice(-5).reverse().map(
                  (product) => (

                    <tr key={product.id}>

                      <td>
                        <strong>{product.name}</strong>
                      </td>

                      <td>{product.category}</td>

                      <td>{product.quantity}</td>

                      <td>{product.storage}</td>

                      <td>
                        <span
                          className={
                            product.status === "Good"
                              ? "status-good"
                              : product.status === "Expiring"
                              ? "status-warning"
                              : "status-expired"
                          }
                        >
                          {product.status}
                        </span>
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* System Overview */}
      <div className="system-overview">

        <h2>System Overview</h2>

        <div className="overview-items">

          <div className="overview-item">
            <span>Inventory</span>
            <strong className="online">
              ● Active
            </strong>
          </div>

          <div className="overview-item">
            <span>Temperature Monitoring</span>
            <strong className="online">
              ● Active
            </strong>
          </div>

          <div className="overview-item">
            <span>Alerts</span>
            <strong className="online">
              ● Active
            </strong>
          </div>

          <div className="overview-item">
            <span>Storage Monitoring</span>
            <strong className="online">
              ● Active
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;