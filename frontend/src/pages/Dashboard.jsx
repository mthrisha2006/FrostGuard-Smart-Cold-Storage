import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <h1>FrostGuard Dashboard</h1>
      <p>Smart Cold Storage Inventory Management System</p>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">

        <div className="card">
          <h3>Total Products</h3>
          <h2>3</h2>
          <p>Products stored</p>
        </div>

        <div className="card">
          <h3>Good Stock</h3>
          <h2>2</h2>
          <p>Products in good condition</p>
        </div>

        <div className="card">
          <h3>Expiring Soon</h3>
          <h2>1</h2>
          <p>Needs attention</p>
        </div>

        <div className="card">
          <h3>Storage Units</h3>
          <h2>3</h2>
          <p>Active storage areas</p>
        </div>

      </div>

      {/* Recent Products */}
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
            <tr>
              <td>Fresh Apples</td>
              <td>Fruits</td>
              <td>250 kg</td>
              <td>Cold Room A</td>
              <td>Good</td>
            </tr>

            <tr>
              <td>Milk</td>
              <td>Dairy</td>
              <td>180 L</td>
              <td>Cold Room B</td>
              <td>Expiring</td>
            </tr>

            <tr>
              <td>Frozen Chicken</td>
              <td>Meat</td>
              <td>320 kg</td>
              <td>Freezer A</td>
              <td>Good</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;