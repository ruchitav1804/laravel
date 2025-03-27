import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import "./DefaultLayout.css";
import Breadcrumbs from "./Breadcrumbs";

export default function DefaultLayout() {
  const { user, token, loading, logout } = useStateContext();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div id="defaultLayout" className="layout-container">
      
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <hr />
            <li><Link to="/products">Products</Link></li>
            <hr />
            <li><Link to="/vendors">Vendors</Link></li>
            <hr />
            <li><Link to="/categories">Categories</Link></li>
            <hr />
            <li><Link to="/majors">Majors</Link></li>
            <hr />
            <li><Link to="/minors">Minors</Link></li>
            <hr />
            <li><Link to="/users">Users</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="content">
        <header className="header">
          <div className="header-left">
            <h1>Admin Panel</h1>
          </div>
          <div className="header-right">
            <span className="user-name">{user?.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <section className="breadcrumbs-container">
          <Breadcrumbs />
        </section>

        <main>
          {/* Just for debugging - remove this after test */}
          <h2>Main Content Area</h2>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
