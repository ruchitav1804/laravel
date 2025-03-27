import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, token } = useStateContext();
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        login(data.user, data.token);
        // Immediately navigate after login
        if (data.user.role && data.user.role[0] === 'superadmin') {
          navigate('/dashboard');
        } else {
          navigate('/products');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed due to network error!');
    }
  };

  useEffect(() => {
    if (user && token) {
      console.log("User and token available, navigating...");
      if (user.role && user.role[0] === 'superadmin') {
        navigate('/dashboard');
      } else {
        navigate('/products');
      }
    }
  }, [user, token, navigate]); // Watch user and token!
  
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
