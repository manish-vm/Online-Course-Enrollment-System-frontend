import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminCourses.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to load users:", err);
      }
    }
    load();
  }, []);

  return (
    <>
      <div className="admin-users-page">
        <h1>Users</h1>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
