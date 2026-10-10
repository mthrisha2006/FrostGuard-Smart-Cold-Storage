
import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (isRegister && !name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(cleanEmail)) {
      alert("Please enter a valid Gmail address");
      return;
    }

    if (!password || password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/${isRegister ? "register" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: cleanEmail,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (isRegister) {
        alert("Registration successful! Please login.");
        setIsRegister(false);
        setPassword("");
      } else {
        alert("Login successful!");
        onLogin(data.user);
      }
    } catch (error) {
      alert("Cannot connect to backend. Please check the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>❄️ FrostGuard</h1>
        <p>Smart Cold Storage</p>
        <p>Inventory Management System</p>
        <div className="features">
          <div>📦 Smart Inventory</div>
          <div>🌡️ Temperature Monitoring</div>
          <div>🚨 Alerts & Notifications</div>
        </div>
      </div>

      <div className="login-box">
        <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
        <p>
          {isRegister
            ? "Register for your FrostGuard account"
            : "Login to your FrostGuard account"}
        </p>

        {isRegister && (
          <>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}

        <label>Gmail Address</label>
        <input
          type="email"
          placeholder="Enter your Gmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading
            ? "Please wait..."
            : isRegister
            ? "Register"
            : "Login"}
        </button>

        <p>
          {isRegister
            ? "Already have an account? "
            : "Don't have an account? "}
          <span
            onClick={() => {
              setIsRegister(!isRegister);
              setPassword("");
            }}
            style={{
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;   