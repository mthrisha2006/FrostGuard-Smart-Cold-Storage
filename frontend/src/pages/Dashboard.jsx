function Dashboard() {
  return (
    <div className="dashboard">

      <h1>FrostGuard Dashboard</h1>
      <p>Smart Cold Storage Inventory Management System</p>

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

    </div>
  );
}

export default Dashboard;