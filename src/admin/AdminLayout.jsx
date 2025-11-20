import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>

        <nav className="sidebar-menu">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/courses">Manage Courses</Link>
          <Link to="/admin/add-course">Add Course</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/enrollments">Enrollments</Link>
        </nav>
      </aside>

      {/* MAIN PAGE CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
}
