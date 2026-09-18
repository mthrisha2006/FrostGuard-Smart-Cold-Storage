import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email.trim() === "") {
      alert("Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    if (password.trim() === "") {
      alert("Please enter your password");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    onLogin();
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
        <h2>Welcome Back</h2>
        <p>Login to your FrostGuard account</p>

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
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

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;