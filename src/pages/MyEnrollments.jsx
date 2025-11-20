import React from "react";
import { useEnrollment } from "../context/EnrollmentContext";
import "./MyEnrollments.css"; // optional if you have styles

export default function MyEnrollments() {
  const { enrollments, loading, error } = useEnrollment();

  if (loading) {
    return <div className="my-enrollments-page">Loading your enrollments...</div>;
  }

  if (error) {
    return <div className="my-enrollments-page error-text">{error}</div>;
  }

  if (!enrollments || enrollments.length === 0) {
    return (
      <div className="my-enrollments-page">
        <h2>My Enrollments</h2>
        <p>You have not enrolled in any course yet.</p>
      </div>
    );
  }

  return (
    <div className="my-enrollments-page">
      <h2>My Enrollments</h2>
      <div className="enrolled-courses-grid">
        {enrollments.map((course) => (
          <div key={course._id} className="enrolled-course-card">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="enrolled-course-thumb"
            />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="enrolled-course-meta">
              <span>{course.platform}</span>
              <span>
                ⭐ {course.rating} ({course.ratingsCount})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
