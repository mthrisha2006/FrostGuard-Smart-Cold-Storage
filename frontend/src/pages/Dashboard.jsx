import "./Dashboard.css";

function Dashboard({ products }) {
  const totalProducts = products.length;

  const goodStock = products.filter(
    (product) => product.status === "Good"
  ).length;

  const expiringSoon = products.filter(
    (product) => product.status === "Expiring"
  ).length;

  const storageUnits = new Set(
    products.map((product) => product.storage)
  ).size;

  return (
    <div className="dashboard">

      <h1>FrostGuard Dashboard</h1>
      <p>Smart Cold Storage Inventory Management System</p>

      <div className="dashboard-cards">

        <div className="card">
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
          <p>Products stored</p>
        </div>

        <div className="card">
          <h3>Good Stock</h3>
          <h2>{goodStock}</h2>
          <p>Products in good condition</p>
        </div>

        <div className="card">
          <h3>Expiring Soon</h3>
          <h2>{expiringSoon}</h2>
          <p>Needs attention</p>
        </div>

        <div className="card">
          <h3>Storage Units</h3>
          <h2>{storageUnits}</h2>
          <p>Active storage areas</p>
        </div>

      </div>

      <div className="recent-products">
        <h2>Recent Products</h2>

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
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>{product.storage}</td>
                <td>{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;