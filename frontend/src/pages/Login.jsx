import "./Login.css";

function Login() {
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
        <input type="email" placeholder="Enter your email" />

        <label>Password</label>
        <input type="password" placeholder="Enter your password" />

        <button>Login</button>
      </div>
    </div>
  );
}

export default Login;