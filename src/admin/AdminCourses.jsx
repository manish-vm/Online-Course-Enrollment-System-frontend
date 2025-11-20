import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "./AdminCourses.css";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/courses");
      // backend returns { data, total, page... } in earlier version; handle both
      const payload = Array.isArray(res.data) ? res.data : res.data.data || [];
      setCourses(payload);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await api.delete(`/courses/${id}`);
      load();
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  return (
    <>
      <div className="courses-header">
        <h2>Courses</h2>
        <Link to="/admin/courses/add" className="primary-btn">Add Course</Link>
      </div>

      <div className="table-card">
        {loading ? <div className="muted">Loading...</div> : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c._id}>
                  <td>
                    <div className="course-row">
                      <img src={c.image || c.thumbnail} alt="" className="course-thumb" />
                      <div>
                        <div className="course-title">{c.title}</div>
                        <div className="muted">{(c.description || "").slice(0,80)}{(c.description||"").length>80?"...":""}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.category || "-"}</td>
                  <td>{new Date(c.createdAt || c.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link className="table-action" to={`/admin/courses/edit/${c._id}`}>Edit</Link>
                    <button className="table-action danger" onClick={()=>handleDelete(c._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
