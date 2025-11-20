import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminCourses.css";

export default function AdminEnrollments() {
  const [enrolls, setEnrolls] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/admin/enrollments");
        setEnrolls(res.data || []);
      } catch (err) {
        console.error("Failed to load enrollments:", err);
      }
    }
    load();
  }, []);

  return (
    <div className="admin-enrollments-page">
      <h1>Enrollments</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Course</th>
            <th>Enrolled At</th>
          </tr>
        </thead>
        <tbody>
          {enrolls.map((e) => (
            <tr key={e._id}>
              <td>{e.userEmail}</td>
              <td>{e.courseTitle || e.course}</td>
              <td>
                {e.createdAt
                  ? new Date(e.createdAt).toLocaleString()
                  : e.enrolledAt
                  ? new Date(e.enrolledAt).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
