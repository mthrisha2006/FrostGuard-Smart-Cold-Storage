import { useState } from "react";
import "./Temperature.css";

function Temperature() {
  const [temperatures, setTemperatures] = useState([
    {
      id: 1,
      name: "Cold Room A",
      current: 4,
      min: 2,
      max: 6,
    },
    {
      id: 2,
      name: "Cold Room B",
      current: 8,
      min: 2,
      max: 6,
    },
    {
      id: 3,
      name: "Freezer A",
      current: -18,
      min: -25,
      max: -15,
    },
  ]);

  const updateTemperature = (id, value) => {
    setTemperatures(
      temperatures.map((room) =>
        room.id === id
          ? { ...room, current: Number(value) }
          : room
      )
    );
  };

  const getStatus = (room) => {
    if (room.current >= room.min && room.current <= room.max) {
      return "Normal";
    }
    return "Warning";
  };

  return (
    <div className="temperature-page">
      <h1>Temperature Monitoring</h1>
      <p>Monitor cold storage temperature levels</p>

      <div className="temperature-cards">
        {temperatures.map((room) => (
          <div className="temperature-card" key={room.id}>
            <h3>{room.name}</h3>

            <h2>{room.current}°C</h2>

            <p
              className={
                getStatus(room) === "Normal"
                  ? "normal"
                  : "warning"
              }
            >
              {getStatus(room)}
            </p>

            <input
              type="number"
              value={room.current}
              onChange={(e) =>
                updateTemperature(room.id, e.target.value)
              }
            />
          </div>
        ))}
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
            {temperatures.map((room) => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.current}°C</td>
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