import { useState } from "react";
import "./Storage.css";

function Storage() {
  const [storageUnits, setStorageUnits] = useState([
    {
      id: 1,
      name: "Cold Room A",
      type: "Cold Storage",
      capacity: 1000,
      used: 750,
    },
    {
      id: 2,
      name: "Cold Room B",
      type: "Cold Storage",
      capacity: 1000,
      used: 900,
    },
    {
      id: 3,
      name: "Freezer A",
      type: "Freezer",
      capacity: 800,
      used: 480,
    },
  ]);

  const updateUsed = (id, value) => {
    setStorageUnits(
      storageUnits.map((unit) =>
        unit.id === id
          ? { ...unit, used: Number(value) }
          : unit
      )
    );
  };

  const getPercentage = (unit) => {
    return Math.round((unit.used / unit.capacity) * 100);
  };

  const getStatus = (unit) => {
    if (getPercentage(unit) >= 90) {
      return "Almost Full";
    }
    return "Available";
  };

  return (
    <div className="storage-page">
      <h1>Storage Management</h1>
      <p>Monitor cold storage units and their capacity</p>

      <div className="storage-cards">
        {storageUnits.map((unit) => (
          <div className="storage-card" key={unit.id}>
            <h3>❄️ {unit.name}</h3>

            <h2>{getPercentage(unit)}%</h2>

            <p>Capacity Used</p>

            <span
              className={
                getStatus(unit) === "Available"
                  ? "normal"
                  : "warning"
              }
            >
              {getStatus(unit)}
            </span>

            <input
              type="number"
              value={unit.used}
              onChange={(e) =>
                updateUsed(unit.id, e.target.value)
              }
            />
          </div>
        ))}
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
            {storageUnits.map((unit) => (
              <tr key={unit.id}>
                <td>{unit.name}</td>
                <td>{unit.type}</td>
                <td>{unit.capacity} kg</td>
                <td>{unit.used} kg</td>
                <td>{unit.capacity - unit.used} kg</td>
                <td
                  className={
                    getStatus(unit) === "Available"
                      ? "normal"
                      : "warning"
                  }
                >
                  {getStatus(unit)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Storage;