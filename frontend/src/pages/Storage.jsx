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

  // Update used capacity
  const updateUsed = (id, value) => {
    let newValue = Number(value);

    if (newValue < 0) {
      newValue = 0;
    }

    setStorageUnits(
      storageUnits.map((unit) =>
        unit.id === id
          ? {
              ...unit,
              used: newValue,
            }
          : unit
      )
    );
  };

  // Calculate percentage
  const getPercentage = (unit) => {
    if (unit.capacity === 0) {
      return 0;
    }

    return Math.min(
      100,
      Math.round((unit.used / unit.capacity) * 100)
    );
  };

  // Get status
  const getStatus = (unit) => {
    const percentage = getPercentage(unit);

    if (percentage >= 90) {
      return "Almost Full";
    }

    return "Available";
  };

  return (
    <div className="storage-page">

      {/* Header */}
      <div className="storage-header">
        <div>
          <h1>Storage Management</h1>
          <p>
            Monitor cold storage units and their capacity.
          </p>
        </div>
      </div>

      {/* Storage Cards */}
      <div className="storage-cards">

        {storageUnits.map((unit) => {

          const percentage = getPercentage(unit);
          const available = Math.max(
            0,
            unit.capacity - unit.used
          );

          return (
            <div
              className="storage-card"
              key={unit.id}
            >

              <div className="storage-card-header">
                <div>
                  <h3>❄️ {unit.name}</h3>
                  <p>{unit.type}</p>
                </div>

                <span
                  className={
                    getStatus(unit) === "Available"
                      ? "normal"
                      : "warning"
                  }
                >
                  {getStatus(unit)}
                </span>
              </div>

              <h2>{percentage}%</h2>

              <p className="capacity-label">
                Capacity Used
              </p>

              {/* Progress Bar */}
              <div className="progress-bar">
                <div
                  className={
                    percentage >= 90
                      ? "progress-fill danger-fill"
                      : "progress-fill"
                  }
                  style={{
                    width: `${percentage}%`,
                  }}
                ></div>
              </div>

              <div className="capacity-details">
                <span>
                  Used: {unit.used} kg
                </span>

                <span>
                  Available: {available} kg
                </span>
              </div>

              {/* Update Capacity */}
              <div className="storage-control">

                <label>
                  Update Used Capacity
                </label>

                <input
                  type="number"
                  min="0"
                  max={unit.capacity}
                  value={unit.used}
                  onChange={(e) =>
                    updateUsed(
                      unit.id,
                      e.target.value
                    )
                  }
                />

              </div>

            </div>
          );
        })}

      </div>

      {/* Storage Details */}
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
              <th>Usage</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {storageUnits.map((unit) => {

              const percentage = getPercentage(unit);
              const available = Math.max(
                0,
                unit.capacity - unit.used
              );

              return (
                <tr key={unit.id}>

                  <td>{unit.name}</td>

                  <td>{unit.type}</td>

                  <td>{unit.capacity} kg</td>

                  <td>{unit.used} kg</td>

                  <td>{available} kg</td>

                  <td>{percentage}%</td>

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
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Storage;