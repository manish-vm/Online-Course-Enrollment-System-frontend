import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./AdminManageCourses.css";

export default function AdminManageCourses() {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data || []);
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await api.delete(`/courses/${id}`);
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete course failed:", err);
      alert("Failed to delete course");
    }
  };

  return (
    <>
      <div className="manage-container2">
        <div className="manage-header2">
          <h1>Manage Courses</h1>
          <Link to="/admin/add-course" className="add-course-btn2">
            + Add Course
          </Link>
        </div>

        <div className="courses-grid2">
          {courses.length === 0 && <p>No courses found.</p>}

          {courses.map((course) => (
            <div key={course._id} className="course-card2">
              <div className="course-card-inner2">
                {/* Thumbnail */}
                <div className="course-thumb-wrap2">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="course-thumb2"
                  />
                </div>

                <div className="course-info2">
                  {/* Title */}
                  <h3>{course.title}</h3>

                  {/* Short description */}
                  <p className="course-desc2">
                    {course.description?.slice(0, 100)}...
                  </p>

                  {/* Meta section */}
                  <div className="course-meta2">
                    <span>{course.platform || "Online"}</span>
                    <span className="price2">{course.price}</span>
                  </div>

                  {/* Actions */}
                  <div className="course-actions2">
                    <Link
                      to={`/admin/edit/${course._id}`}
                      className="edit-btn2"
                    >
                      <FaEdit /> Edit
                    </Link>

                    <button
                      onClick={() => deleteCourse(course._id)}
                      className="delete-btn2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
