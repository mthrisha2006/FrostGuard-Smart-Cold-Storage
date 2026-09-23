import "./Reports.css";

function Reports({ products }) {
  const totalProducts = products.length;

  const goodProducts = products.filter(
    (product) => product.status === "Good"
  ).length;

  const expiringProducts = products.filter(
    (product) => product.status === "Expiring"
  ).length;

  const expiredProducts = products.filter(
    (product) => product.status === "Expired"
  ).length;

  const storageUnits = new Set(
    products.map((product) => product.storage)
  ).size;

  // Category-wise products
  const categories = {};

  products.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = 0;
    }

    categories[product.category]++;
  });

  return (
    <div className="reports-page">

      {/* Header */}
      <div className="reports-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>
            Overview of FrostGuard inventory performance.
          </p>
        </div>

        <button
          className="report-btn"
          onClick={() => window.print()}
        >
          🖨️ Print Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="report-cards">

        <div className="report-card">
          <div className="report-icon">📦</div>
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
          <p>Currently stored</p>
        </div>

        <div className="report-card good-card">
          <div className="report-icon">✅</div>
          <h3>Good Stock</h3>
          <h2>{goodProducts}</h2>
          <p>Products in good condition</p>
        </div>

        <div className="report-card warning-card">
          <div className="report-icon">⚠️</div>
          <h3>Expiring Products</h3>
          <h2>{expiringProducts}</h2>
          <p>Needs attention</p>
        </div>

        <div className="report-card expired-card">
          <div className="report-icon">🚨</div>
          <h3>Expired Products</h3>
          <h2>{expiredProducts}</h2>
          <p>Requires action</p>
        </div>

      </div>

      {/* Storage Summary */}
      <div className="analytics-section">

        <h2>Inventory Overview</h2>

        <div className="overview-grid">

          <div className="overview-item">
            <span>Total Products</span>
            <strong>{totalProducts}</strong>
          </div>

          <div className="overview-item">
            <span>Active Storage Units</span>
            <strong>{storageUnits}</strong>
          </div>

          <div className="overview-item">
            <span>Products Needing Attention</span>
            <strong>
              {expiringProducts + expiredProducts}
            </strong>
          </div>

          <div className="overview-item">
            <span>Inventory Status</span>
            <strong className="active-status">
              Active
            </strong>
          </div>

        </div>

      </div>

      {/* Category Report */}
      <div className="category-report">

        <h2>Category-wise Products</h2>

        {Object.keys(categories).length === 0 ? (

          <div className="no-report">
            No product data available.
          </div>

        ) : (

          <table>

            <thead>
              <tr>
                <th>Category</th>
                <th>Number of Products</th>
                <th>Percentage</th>
              </tr>
            </thead>

            <tbody>

              {Object.keys(categories).map(
                (category) => {

                  const count = categories[category];

                  const percentage =
                    totalProducts === 0
                      ? 0
                      : Math.round(
                          (count / totalProducts) * 100
                        );

                  return (
                    <tr key={category}>

                      <td>
                        <strong>{category}</strong>
                      </td>

                      <td>{count}</td>

                      <td>
                        <div className="percentage-cell">

                          <div className="percentage-bar">
                            <div
                              className="percentage-fill"
                              style={{
                                width: `${percentage}%`,
                              }}
                            ></div>
                          </div>

                          <span>{percentage}%</span>

                        </div>
                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        )}

      </div>

      {/* Product Status Report */}
      <div className="status-report">

        <h2>Product Status Summary</h2>

        <div className="status-row">

          <div className="status-item">
            <span className="status-dot good-dot"></span>
            <span>Good</span>
            <strong>{goodProducts}</strong>
          </div>

          <div className="status-item">
            <span className="status-dot warning-dot"></span>
            <span>Expiring</span>
            <strong>{expiringProducts}</strong>
          </div>

          <div className="status-item">
            <span className="status-dot expired-dot"></span>
            <span>Expired</span>
            <strong>{expiredProducts}</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;