import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useContext(AuthContext);

  // Wait for AuthContext to finish loading user from localStorage
  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Checking authentication...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only route check
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Support both <ProtectedRoute><Component/></ProtectedRoute>
  // and <Route element={<ProtectedRoute/>}>
  return children ? children : <Outlet />;
}
