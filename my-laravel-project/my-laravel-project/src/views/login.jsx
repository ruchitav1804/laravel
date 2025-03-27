import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axiosClient"; // ✅ Ensure API requests use axiosClient
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, user, token } = useStateContext();
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError(null);

    try {
      const response = await axiosClient.post('/login', { email, password });
      
      const { user: userData, token: authToken } = response.data;
      login(userData, authToken);

      if (userData.role && userData.role[0] === 'superadmin') {
        navigate('/dashboard');
      } else {
        navigate('/products');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  useEffect(() => {
    if (user && token) {
      if (user.role && user.role[0] === 'superadmin') {
        navigate('/dashboard');
      } else {
        navigate('/products');
      }
    }
  }, [user, token, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <div className="slider">
            <div className="slide active">
              <div className="caption">
                <h1>Power Transmission Solutions</h1>
                <p>Leading the industry in energy-efficient solutions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <h2>TBEA</h2>
          <h3>LOGIN</h3>
          <p>Log In To Your TBEA Account Now</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">LOG IN</button>
            <p className="message">
              Not registered? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
