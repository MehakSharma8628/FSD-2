import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>RBAC Login</h1>

        <p>Login to continue</p>

        <form onSubmit={handleLogin}>

          {/* USERNAME */}

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            required
          />

          {/* PASSWORD */}

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
          />

          {/* ERROR */}

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}

          <button type="submit">
            Login
          </button>

        </form>


        {/* DEMO CREDENTIALS */}

        <div className="demo-credentials">

          <h3>Demo Credentials</h3>

          <div className="credential">
            <strong>Admin</strong>
            <span>Username: admin</span>
            <span>Password: admin123</span>
          </div>

          <div className="credential">
            <strong>Editor</strong>
            <span>Username: editor</span>
            <span>Password: editor123</span>
          </div>

          <div className="credential">
            <strong>Viewer</strong>
            <span>Username: viewer</span>
            <span>Password: viewer123</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;