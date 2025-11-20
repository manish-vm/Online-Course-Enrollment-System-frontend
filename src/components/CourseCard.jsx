import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEnrollment } from "../context/EnrollmentContext";
import api from "../services/api";
import "./CourseCard.css";

export default function CourseCard({ course }) {
  const { enrollments, enrollCourse } = useEnrollment();
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);

  // check if already enrolled
  const isEnrolled = enrollments.some(
    (en) => String(en._id) === String(course._id)
  );

  const handleEnroll = async () => {
    if (isEnrolled) return; // already enrolled

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to enroll. Redirecting to login page.");
      navigate("/login");
      return;
    }

    if (!course || !course._id) {
      alert("Course information is missing. Try refreshing the page.");
      return;
    }

    setEnrolling(true);

    try {
      await api.post("/enroll", { courseId: course._id });

      // update frontend context
      enrollCourse(course);

      alert("Enrolled Successfully!");
    } catch (err) {
      console.error("Enroll request failed:", err);
      const serverMsg =
        err?.response?.data?.error || err?.response?.data?.message;

      if (err?.response?.status === 409) {
        alert("Already enrolled!");
        enrollCourse(course); // sync UI anyway
      } else {
        alert(serverMsg || "Enrollment failed.");
      }
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="course-card">
      <div className="course-thumbnail">
        <img src={course.thumbnail} alt={course.title} />
        {course.badge && <span className="course-badge">{course.badge}</span>}
      </div>

      <div className="course-details">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>

        <div className="course-info">
          <span className="course-platform">{course.platform}</span>
          <span className="course-rating">
            ⭐ {course.rating} ({course.ratingsCount})
          </span>
        </div>

        <div className="course-price">
          <span className="price">
            {course.price ? `${course.price}` : "Free"}
          </span>
          {course.oldPrice && (
            <span className="old-price">{course.oldPrice}</span>
          )}
        </div>

        <button
          className={`enroll-button ${isEnrolled ? "enrolled" : ""}`}
          onClick={handleEnroll}
          disabled={enrolling || isEnrolled}
        >
          {isEnrolled ? "Enrolled" : enrolling ? "Enrolling..." : "Enroll"}
        </button>
      </div>
    </div>
  );
}
