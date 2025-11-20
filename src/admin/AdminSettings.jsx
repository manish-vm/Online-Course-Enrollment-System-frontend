import React, { useContext } from "react";
import AdminLayout from "../admin/AdminLayout";
import { AuthContext } from "../context/AuthContext";

export default function AdminSettings() {
  const { user, logout } = useContext(AuthContext);

  return (
    <AdminLayout>
      <div style={{ padding: "20px" }}>
        <h1>Settings</h1>
        <p>Logged in as: <strong>{user?.name}</strong> ({user?.email})</p>
        <p>Role: {user?.role}</p>
        <button onClick={logout} style={{ marginTop: "10px" }}>
          Logout
        </button>
      </div>
    </AdminLayout>
  );
}
