import React from "react";
import { useStateContext } from "../contexts/contextprovider";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useStateContext(); // Get user data from context

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name}!</h1>
      <p>Your Role: <strong>{user?.role}</strong></p>

      {/* Admin Navigation */}
      {user?.role === "admin" && (
        <div>
          <h2>Admin Panel</h2>
          <ul>
            <li><Link to="/products">Manage Products</Link></li>
            <li><Link to="/categories">Manage Categories</Link></li>
            <li><Link to="/users">Manage Users</Link></li>
          </ul>
        </div>
      )}

      {/* Superadmin Navigation */}
      {user?.role === "superadmin" && (
        <div>
          <h2>Superadmin Panel</h2>
          <ul>
            <li><Link to="/vendors">Manage Vendors</Link></li>
            <li><Link to="/majors">Manage Majors</Link></li>
            <li><Link to="/minors">Manage Minors</Link></li>
            <li><Link to="/users">Manage All Users</Link></li>
          </ul>
        </div>
      )}

      {/* Common for all users */}
      <div>
        <h2>General Links</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">My Profile</Link></li>
        </ul>
      </div>
    </div>
  );
}
