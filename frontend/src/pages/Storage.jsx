import { useEffect, useState } from "react";
import "./Storage.css";

function Storage() {
  const [storageUnits, setStorageUnits] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("http://localhost:5000/api/storage")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch storage");
      }
      return response.json();
    })
    .then((result) => {
      if (!result.success) {
        throw new Error("Storage data loading failed");
      }

      setStorageUnits(
        result.data.map((item) => ({
          id: item.id,
          name: item.room_name,
          type: item.room_name.toLowerCase().includes("freezer")
            ? "Freezer"
            : "Cold Storage",
          capacity: Number(item.capacity),
          used: Number(item.used_capacity),
        }))
      );
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);
    if (loading) {
  return (
    <div className="storage-page">
      <h2>Loading storage data...</h2>
    </div>
  );
}
  // Update used capacity
  
const updateUsed = (id, value) => {
  let newValue = Number(value);

  const unit = storageUnits.find((item) => item.id === id);

  if (!unit) return;

  if (value === "" || !Number.isFinite(newValue)) {
    return;
  }

  if (newValue < 0) {
    newValue = 0;
  }

  if (newValue > unit.capacity) {
    alert(`Maximum capacity is ${unit.capacity} kg`);
    return;
  }

  setStorageUnits((previousUnits) =>
    previousUnits.map((item) =>
      item.id === id
        ? { ...item, used: newValue }
        : item
    )
  );

  fetch(`http://localhost:5000/api/storage/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      used_capacity: newValue,
    }),
  })
    .then(async (response) => {
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save capacity");
      }

      console.log("Storage capacity saved successfully");
    })
    .catch((error) => {
      console.error("STORAGE UPDATE ERROR:", error);
      alert("Database-la save aagala. Page refresh panni check pannunga.");
    });
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