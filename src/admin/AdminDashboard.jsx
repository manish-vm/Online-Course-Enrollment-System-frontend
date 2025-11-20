import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminDashboard.css";
import AdminUsers from "./AdminUsers";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    totalCourses: 0,
    totalEnrollments: 0,
    totalUsers: 0,
    usersByRole: {},
    enrollmentsByCategory: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/admin/summary");
        setCounts(res.data || {});
      } catch (err) {
        console.error("Failed to load admin summary:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard loading-state">
        Loading dashboard...
      </div>
    );
  }


  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>


      <div className="admin-stats">
        <div className="stat-card">
          <p className="stat-label">Total Courses</p>
          <p className="stat-value">{counts.totalCourses}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Enrollments</p>
          <p className="stat-value">{counts.totalEnrollments}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Users</p>
          <p className="stat-value">{counts.totalUsers}</p>
        </div>
      </div>
      <AdminUsers/>
    </div>
  );
}
