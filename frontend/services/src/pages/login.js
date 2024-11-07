import React, { useState } from "react";
import Navbar1 from "../components/navbar1";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "User";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("/api/login/", {
        email,
        password,
        role,
      });

      const { access, refresh, user, message } = response.data;

      // Display success message and navigate to homepage
      alert(message);

      // Store tokens and user info
      sessionStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to home page
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid email, password, or role. Please try again.");
    }
  };

  return (
    <div>
      <Navbar1 />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>{role} Login</h2>
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>
              Login
            </button>
            <p style={styles.registerText}>
              New user?{" "}
              <Link to="/register" style={styles.registerLink}>
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '9px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '450px',
    height: '275px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#ff9833',
    color: 'white',
    border: 'none',
    width: "25%",
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: "150px",
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  registerText: {
    marginTop: "15px",
  },
  registerLink: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default LoginPage;
