import { useEffect, useState } from "react";
import "./Alerts.css";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real data from backend
  const fetchAlerts = async () => {
    try {
      const [productsResponse, temperatureResponse] =
        await Promise.all([
          fetch("http://localhost:5000/api/products"),
          fetch("http://localhost:5000/api/temperature"),
        ]);

      const productsResult = await productsResponse.json();
      const temperatureResult =
        await temperatureResponse.json();

      const generatedAlerts = [];

      // =========================
      // TEMPERATURE ALERTS
      // =========================

      if (temperatureResult.success) {
        const latestRooms = {};

        temperatureResult.data.forEach((item) => {
          if (!latestRooms[item.cold_room_id]) {
            latestRooms[item.cold_room_id] = item;
          }
        });

        Object.values(latestRooms).forEach((room) => {
          const temperature = Number(room.temperature);

          if (temperature > 6) {
            generatedAlerts.push({
              id: `temp-${room.cold_room_id}`,
              type: "Temperature",
              item: room.room_name,
              message:
                "Temperature is above the safe limit.",
              status: "Critical",
              time: "Recent",
            });
          } else if (temperature < 2) {
            generatedAlerts.push({
              id: `temp-${room.cold_room_id}`,
              type: "Temperature",
              item: room.room_name,
              message:
                "Temperature is below the safe limit.",
              status: "Warning",
              time: "Recent",
            });
          }
        });
      }

      // =========================
      // PRODUCT ALERTS
      // =========================

      if (productsResult.success) {
        productsResult.data.forEach((product) => {
          const expiryDate = new Date(product.expiry_date);
          const today = new Date();

          const difference =
            expiryDate.getTime() - today.getTime();

          const daysLeft = Math.ceil(
            difference / (1000 * 60 * 60 * 24)
          );

          // Expired product
          if (daysLeft < 0) {
            generatedAlerts.push({
              id: `expiry-${product.id}`,
              type: "Expiry",
              item: product.name,
              message: "Product has expired.",
              status: "Critical",
              time: "Expired",
            });
          }

          // Expiring within 7 days
          else if (daysLeft <= 7) {
            generatedAlerts.push({
              id: `expiry-${product.id}`,
              type: "Expiry",
              item: product.name,
              message: "Product is expiring soon.",
              status: "Warning",
              time: `${daysLeft} day${
                daysLeft !== 1 ? "s" : ""
              } left`,
            });
          }

          // Stock alert
          const quantityNumber = parseFloat(
            product.quantity
          );

          if (
            !isNaN(quantityNumber) &&
            quantityNumber <= 250
          ) {
            generatedAlerts.push({
              id: `stock-${product.id}`,
              type: "Stock",
              item: product.name,
              message:
                "Stock level needs monitoring.",
              status: "Info",
              time: "Recent",
            });
          }
        });
      }

      setAlerts(generatedAlerts);
    } catch (error) {
      console.error("ALERT FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Clear single alert
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

  if (loading) {
    return (
      <div className="alerts-page">
        <h2>Loading alerts...</h2>
      </div>
    );
  }

  return (
    <div className="alerts-page">

      {/* Header */}
      <div className="alerts-header">
        <div>
          <h1>Alerts & Notifications</h1>
          <p>
            Monitor important cold storage alerts and
            notifications.
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

        {alerts
          .filter(
            (alert) => alert.type === "Temperature"
          )
          .slice(0, 1)
          .map((alert) => (
            <div
              className="alert-card danger"
              key={alert.id}
            >
              <h3>🚨 Temperature Alert</h3>
              <p>
                {alert.item} {alert.message}
              </p>
              <span>
                Temperature requires attention
              </span>
            </div>
          ))}

        {alerts
          .filter(
            (alert) => alert.type === "Expiry"
          )
          .slice(0, 1)
          .map((alert) => (
            <div
              className="alert-card warning"
              key={alert.id}
            >
              <h3>⚠️ Expiry Alert</h3>
              <p>
                {alert.item} {alert.message}
              </p>
              <span>{alert.time}</span>
            </div>
          ))}

        {alerts
          .filter(
            (alert) => alert.type === "Stock"
          )
          .slice(0, 1)
          .map((alert) => (
            <div
              className="alert-card info"
              key={alert.id}
            >
              <h3>📦 Stock Alert</h3>
              <p>
                {alert.item} stock needs monitoring.
              </p>
              <span>
                Check available quantity
              </span>
            </div>
          ))}

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
              All your cold storage alerts have
              been cleared.
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