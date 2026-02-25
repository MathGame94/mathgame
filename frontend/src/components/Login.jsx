import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
    const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Check if input is empty
    if (!username.trim()) {
      setError("Username is required!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 2. Send username to backend
      const response = await axios.post("https://your-backend.com/api/users", {
        username,
      });

      // 3. Handle backend response
      if (response.data.success) {
        setError("");
        onLogin(username); // Proceed to the game
      } else {
        setError(response.data.message); // e.g., "Username already taken"
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Math Game Login</h2>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button  onClick={()=>{navigate("/mainmenue")}} type="submit" disabled={loading}>
          {loading ? "Checking..." : "Start Game"}
        </button>
      </form>
    </div>
  );
};

export default Login;
