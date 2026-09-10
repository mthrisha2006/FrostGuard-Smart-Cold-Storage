import "./Temperature.css";

function Temperature() {
  return (
    <div className="temperature-page">
      <h1>Temperature Monitoring</h1>
      <p>Monitor cold storage temperature levels</p>

      <div className="temperature-cards">

        <div className="temperature-card">
          <h3>Cold Room A</h3>
          <h2>4°C</h2>
          <p className="normal">Normal</p>
        </div>

        <div className="temperature-card">
          <h3>Cold Room B</h3>
          <h2>8°C</h2>
          <p className="warning">Warning</p>
        </div>

        <div className="temperature-card">
          <h3>Freezer A</h3>
          <h2>-18°C</h2>
          <p className="normal">Normal</p>
        </div>

      </div>

      <div className="temperature-table">
        <h2>Temperature Details</h2>

        <table>
          <thead>
            <tr>
              <th>Storage Unit</th>
              <th>Current Temperature</th>
              <th>Minimum</th>
              <th>Maximum</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Cold Room A</td>
              <td>4°C</td>
              <td>2°C</td>
              <td>6°C</td>
              <td className="normal">Normal</td>
            </tr>

            <tr>
              <td>Cold Room B</td>
              <td>8°C</td>
              <td>2°C</td>
              <td>6°C</td>
              <td className="warning">Warning</td>
            </tr>

            <tr>
              <td>Freezer A</td>
              <td>-18°C</td>
              <td>-25°C</td>
              <td>-15°C</td>
              <td className="normal">Normal</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Temperature;