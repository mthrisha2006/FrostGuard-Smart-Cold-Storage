import { useState } from "react";
import "./Alerts.css";

function Alerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "Temperature",
      item: "Cold Room B",
      message: "Temperature above safe limit",
      status: "Critical",
    },
    {
      id: 2,
      type: "Expiry",
      item: "Milk",
      message: "Product expiring soon",
      status: "Warning",
    },
    {
      id: 3,
      type: "Stock",
      item: "Fresh Apples",
      message: "Stock needs monitoring",
      status: "Info",
    },
  ]);

  const clearAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

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
          <p>Fresh Apples stock needs monitoring.</p>
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
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.type}</td>
                <td>{alert.item}</td>
                <td>{alert.message}</td>
                <td>{alert.status}</td>
                <td>
                  <button
                    className="clear-btn"
                    onClick={() => clearAlert(alert.id)}
                  >
                    Clear
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Alerts;