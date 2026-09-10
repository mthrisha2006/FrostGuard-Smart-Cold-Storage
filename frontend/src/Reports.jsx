import "./Reports.css";

function Reports() {
  return (
    <div className="reports-page">
      <h1>Reports & Analytics</h1>
      <p>Overview of cold storage inventory performance</p>

      <div className="report-cards">

        <div className="report-card">
          <h3>Total Products</h3>
          <h2>3</h2>
          <p>Currently stored</p>
        </div>

        <div className="report-card">
          <h3>Total Stock</h3>
          <h2>750 kg</h2>
          <p>Available inventory</p>
        </div>

        <div className="report-card">
          <h3>Expiring Products</h3>
          <h2>1</h2>
          <p>Needs attention</p>
        </div>

        <div className="report-card">
          <h3>Storage Usage</h3>
          <h2>75%</h2>
          <p>Overall capacity used</p>
        </div>

      </div>

      <div className="category-report">
        <h2>Category-wise Products</h2>

        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Number of Products</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Fruits</td>
              <td>1</td>
              <td>250 kg</td>
            </tr>

            <tr>
              <td>Dairy</td>
              <td>1</td>
              <td>180 L</td>
            </tr>

            <tr>
              <td>Meat</td>
              <td>1</td>
              <td>320 kg</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;