import { useEffect, useState } from "react";
import "./Temperature.css";

function Temperature() {
  const [temperatures, setTemperatures] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get temperature data from backend
  const fetchTemperatures = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/temperature"
      );

      const result = await response.json();

      if (result.success) {
        const roomData = result.data.map((item) => ({
          id: item.cold_room_id,
          name: item.room_name,
          current: Number(item.temperature),
          min: 2,
          max: 6,
        }));

        setTemperatures(roomData);
      }
    } catch (error) {
      console.error("TEMPERATURE FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemperatures();
  }, []);

  // Update temperature in backend
  const updateTemperature = async (id, value) => {
    const newTemperature = Number(value);

    // Update UI immediately
    setTemperatures(
      temperatures.map((room) =>
        room.id === id
          ? {
              ...room,
              current: newTemperature,
            }
          : room
      )
    );

    try {
      const response = await fetch(
        "http://localhost:5000/api/temperature",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cold_room_id: id,
            temperature: newTemperature,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Failed to update temperature");
        return;
      }

      console.log("Temperature saved:", result);
    } catch (error) {
      console.error("TEMPERATURE UPDATE ERROR:", error);
      alert("Backend server connection failed");
    }
  };

  // Get temperature status
  const getStatus = (room) => {
    if (
      room.current >= room.min &&
      room.current <= room.max
    ) {
      return "Normal";
    }

    return "Warning";
  };

  if (loading) {
    return (
      <div className="temperature-page">
        <h2>Loading temperature data...</h2>
      </div>
    );
  }

  return (
    <div className="temperature-page">

      {/* Header */}
      <div className="temperature-header">
        <h1>Temperature Monitoring</h1>
        <p>
          Monitor and control cold storage temperature levels.
        </p>
      </div>

      {/* Temperature Cards */}
      <div className="temperature-cards">

        {temperatures.map((room) => (

          <div
            className="temperature-card"
            key={room.id}
          >

            <div className="temperature-icon">
              🌡️
            </div>

            <h3>{room.name}</h3>

            <h2>{room.current}°C</h2>

            <p className="safe-range">
              Safe Range: {room.min}°C to {room.max}°C
            </p>

            <span
              className={
                getStatus(room) === "Normal"
                  ? "normal"
                  : "warning"
              }
            >
              {getStatus(room)}
            </span>

            <div className="temperature-control">

              <label>
                Update Temperature
              </label>

              <input
                type="number"
                value={room.current}
                onChange={(e) =>
                  updateTemperature(
                    room.id,
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        ))}

      </div>

      {/* Temperature Details */}
      <div className="temperature-table">

        <h2>Temperature Details</h2>

        <table>

          <thead>
            <tr>
              <th>Storage Unit</th>
              <th>Current</th>
              <th>Minimum</th>
              <th>Maximum</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {temperatures.map((room) => (

              <tr key={room.id}>

                <td>{room.name}</td>

                <td>
                  <strong>
                    {room.current}°C
                  </strong>
                </td>

                <td>{room.min}°C</td>

                <td>{room.max}°C</td>

                <td
                  className={
                    getStatus(room) === "Normal"
                      ? "normal"
                      : "warning"
                  }
                >
                  {getStatus(room)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Temperature;