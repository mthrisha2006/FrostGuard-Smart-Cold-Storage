import "./Alerts.css";

function Alerts() {
  return (
    <div className="alerts-page">
      <h1>Alerts & Notifications</h1>
      <p>Monitor important cold storage alerts</p>

      <div className="alert-cards">

        <div className="alert-card danger">
          <h3>🚨 Temperature Alert</h3>
          <p>Cold Room B temperature is above the safe limit.</p>
          <span>8°C detected</span>
        </div>

        <div className="alert-card warning">
          <h3>⚠️ Expiry Alert</h3>
          <p>Milk is expiring soon.</p>
          <span>Expiry: 20-08-2026</span>
        </div>

        <div className="alert-card info">
          <h3>📦 Stock Alert</h3>
          <p>Fresh Apples stock needs to be monitored.</p>
          <span>250 kg available</span>
        </div>

      </div>

      <div className="alerts-table">
        <h2>Recent Alerts</h2>

        <table>
          <thead>
            <tr>
              <th>Alert Type</th>
              <th>Product / Storage</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Temperature</td>
              <td>Cold Room B</td>
              <td>Temperature above safe limit</td>
              <td>10-09-2026</td>
              <td className="danger-text">Critical</td>
            </tr>

            <tr>
              <td>Expiry</td>
              <td>Milk</td>
              <td>Product expiring soon</td>
              <td>10-09-2026</td>
              <td className="warning-text">Warning</td>
            </tr>

            <tr>
              <td>Stock</td>
              <td>Fresh Apples</td>
              <td>Stock needs monitoring</td>
              <td>10-09-2026</td>
              <td className="info-text">Info</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Alerts;