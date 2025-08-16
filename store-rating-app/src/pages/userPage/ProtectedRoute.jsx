// ProtectedRoute.js
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the children components
  return children;
}
