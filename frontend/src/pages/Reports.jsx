import "./Reports.css";

function Reports({ products }) {
  const totalProducts = products.length;

  const expiringProducts = products.filter(
    (product) => product.status === "Expiring"
  ).length;

  const categories = {};

  products.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = {
        count: 0,
        quantity: 0,
      };
    }

    categories[product.category].count++;
  });

  return (
    <div className="reports-page">
      <h1>Reports & Analytics</h1>
      <p>Overview of cold storage inventory performance</p>

      <div className="report-cards">
        <div className="report-card">
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
          <p>Currently stored</p>
        </div>

        <div className="report-card">
          <h3>Expiring Products</h3>
          <h2>{expiringProducts}</h2>
          <p>Needs attention</p>
        </div>

        <div className="report-card">
          <h3>Storage Units</h3>
          <h2>
            {new Set(products.map((product) => product.storage)).size}
          </h2>
          <p>Active storage areas</p>
        </div>

        <div className="report-card">
          <h3>Inventory Status</h3>
          <h2>Active</h2>
          <p>System running normally</p>
        </div>
      </div>

      <div className="category-report">
        <h2>Category-wise Products</h2>

        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Number of Products</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(categories).map((category) => (
              <tr key={category}>
                <td>{category}</td>
                <td>{categories[category].count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;