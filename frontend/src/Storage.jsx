import "./Storage.css";

function Storage() {
  return (
    <div className="storage-page">
      <h1>Storage Management</h1>
      <p>Monitor cold storage units and their capacity</p>

      <div className="storage-cards">

        <div className="storage-card">
          <h3>❄️ Cold Room A</h3>
          <h2>75%</h2>
          <p>Capacity Used</p>
          <span className="normal">Available</span>
        </div>

        <div className="storage-card">
          <h3>❄️ Cold Room B</h3>
          <h2>90%</h2>
          <p>Capacity Used</p>
          <span className="warning">Almost Full</span>
        </div>

        <div className="storage-card">
          <h3>🧊 Freezer A</h3>
          <h2>60%</h2>
          <p>Capacity Used</p>
          <span className="normal">Available</span>
        </div>

      </div>

      <div className="storage-table">
        <h2>Storage Details</h2>

        <table>
          <thead>
            <tr>
              <th>Storage Unit</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Used</th>
              <th>Available</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Cold Room A</td>
              <td>Cold Storage</td>
              <td>1000 kg</td>
              <td>750 kg</td>
              <td>250 kg</td>
              <td className="normal">Available</td>
            </tr>

            <tr>
              <td>Cold Room B</td>
              <td>Cold Storage</td>
              <td>1000 kg</td>
              <td>900 kg</td>
              <td>100 kg</td>
              <td className="warning">Almost Full</td>
            </tr>

            <tr>
              <td>Freezer A</td>
              <td>Freezer</td>
              <td>800 kg</td>
              <td>480 kg</td>
              <td>320 kg</td>
              <td className="normal">Available</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Storage;