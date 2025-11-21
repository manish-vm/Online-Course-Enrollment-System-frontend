import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";

export default function AdminRoute({ children }) {
  const { admin, isAdminAuthenticated, loading } = useContext(AdminAuthContext);

  if (loading) {
    return <div style={{ padding: "2rem" }}>Checking admin authentication...</div>;
  }

  if (!isAdminAuthenticated || !admin || admin.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  // Support <AdminRoute><Component/></AdminRoute> and <Route element={<AdminRoute/>} />
  return children ? children : <Outlet />;
}
