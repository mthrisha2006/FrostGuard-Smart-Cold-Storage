import { useState } from "react";
import "./Alerts.css";

function Alerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "Temperature",
      item: "Cold Room B",
      message: "Temperature is above the safe limit.",
      status: "Critical",
      time: "10 minutes ago",
    },
    {
      id: 2,
      type: "Expiry",
      item: "Milk",
      message: "Product is expiring soon.",
      status: "Warning",
      time: "30 minutes ago",
    },
    {
      id: 3,
      type: "Stock",
      item: "Fresh Apples",
      message: "Stock level needs monitoring.",
      status: "Info",
      time: "1 hour ago",
    },
  ]);

  // Clear alert
  const clearAlert = (id) => {
    setAlerts(
      alerts.filter((alert) => alert.id !== id)
    );
  };

  // Clear all alerts
  const clearAllAlerts = () => {
    if (alerts.length === 0) {
      return;
    }

    const confirmClear = window.confirm(
      "Are you sure you want to clear all alerts?"
    );

    if (confirmClear) {
      setAlerts([]);
    }
  };

  const criticalCount = alerts.filter(
    (alert) => alert.status === "Critical"
  ).length;

  const warningCount = alerts.filter(
    (alert) => alert.status === "Warning"
  ).length;

  const infoCount = alerts.filter(
    (alert) => alert.status === "Info"
  ).length;

  return (
    <div className="alerts-page">

      {/* Header */}
      <div className="alerts-header">
        <div>
          <h1>Alerts & Notifications</h1>
          <p>
            Monitor important cold storage alerts and notifications.
          </p>
        </div>

        <button
          className="clear-all-btn"
          onClick={clearAllAlerts}
        >
          Clear All
        </button>
      </div>

      {/* Alert Summary */}
      <div className="alert-summary">

        <div className="summary-card critical-summary">
          <h3>🚨 Critical</h3>
          <h2>{criticalCount}</h2>
          <p>Immediate attention</p>
        </div>

        <div className="summary-card warning-summary">
          <h3>⚠️ Warning</h3>
          <h2>{warningCount}</h2>
          <p>Needs attention</p>
        </div>

        <div className="summary-card info-summary">
          <h3>ℹ️ Information</h3>
          <h2>{infoCount}</h2>
          <p>General notifications</p>
        </div>

      </div>

      {/* Alert Cards */}
      <div className="alert-cards">

        <div className="alert-card danger">
          <h3>🚨 Temperature Alert</h3>
          <p>
            Cold Room B temperature is above the safe limit.
          </p>
          <span>8°C detected</span>
        </div>

        <div className="alert-card warning">
          <h3>⚠️ Expiry Alert</h3>
          <p>
            Milk is approaching its expiry date.
          </p>
          <span>Expiry: 20-08-2026</span>
        </div>

        <div className="alert-card info">
          <h3>📦 Stock Alert</h3>
          <p>
            Fresh Apples stock needs monitoring.
          </p>
          <span>250 kg available</span>
        </div>

      </div>

      {/* Recent Alerts */}
      <div className="alerts-table">

        <div className="table-header">
          <h2>Recent Alerts</h2>
          <span>
            {alerts.length} active alert
            {alerts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {alerts.length === 0 ? (

          <div className="no-alerts">
            <div>✅</div>
            <h3>No Active Alerts</h3>
            <p>
              All your cold storage alerts have been cleared.
            </p>
          </div>

        ) : (

          <table>

            <thead>
              <tr>
                <th>Alert Type</th>
                <th>Product / Storage</th>
                <th>Message</th>
                <th>Status</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {alerts.map((alert) => (

                <tr key={alert.id}>

                  <td>{alert.type}</td>

                  <td>{alert.item}</td>

                  <td>{alert.message}</td>

                  <td>
                    <span
                      className={
                        alert.status === "Critical"
                          ? "critical"
                          : alert.status === "Warning"
                          ? "warning"
                          : "info"
                      }
                    >
                      {alert.status}
                    </span>
                  </td>

                  <td>{alert.time}</td>

                  <td>
                    <button
                      className="clear-btn"
                      onClick={() =>
                        clearAlert(alert.id)
                      }
                    >
                      Clear
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default Alerts;