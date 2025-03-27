import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const { user, token, loading } = useStateContext();

  console.log("ProtectedRoute loaded");
  console.log("loading:", loading);
  console.log("token:", token);
  console.log("user:", user);
  console.log("allowedRoles:", allowedRoles);

  if (loading) {
    console.log("Still loading user and token...");
    return <div>Loading...</div>; // ✅ Block route loading until done
  }

  if (!token || !user) {
    console.warn("No token or user found, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role || (user.roles && user.roles[0]) || undefined;

  console.log("User role:", userRole);

  if (!allowedRoles.includes(userRole)) {
    console.warn(`User role (${userRole}) not allowed, redirecting to /dashboard`);
    return <Navigate to="/dashboard" replace />;
  }

  return children; // ✅ Show the protected children only when all checks pass
}
