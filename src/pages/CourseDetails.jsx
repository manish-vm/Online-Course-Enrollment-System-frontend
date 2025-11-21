import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";


export default function CourseDetails() {
  const { id } = useParams(); // expects route like /courses/:id
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState(null);

  // Check auth token presence (api instance usually reads token from localStorage)
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
        // If backend returns an `isEnrolled` flag or user data, you could set enrolled here.
        // If not, we'll rely on enrollment response to set enrolled = true.
        // Example: if API returns { course, isEnrolled: true } -> setEnrolled(res.data.isEnrolled)
        if (res.data.isEnrolled) setEnrolled(true);
      } catch (err) {
        console.error("Failed to load course:", err);
        const msg = err?.response?.data?.message || err?.response?.data?.error || "Failed to load course";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const handleEnroll = async () => {
    // If no token, send user to login first so backend can pick up req.user from JWT
    if (!token) {
      // Optionally show a toast / message before redirect
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
      // Backend expects { courseId } and will derive the user from the JWT (req.user).
      const res = await api.post("/enroll", { courseId: course._id });

      // If backend created an enrollment, it should return 201 and enrollment object
      if (res.status === 201 || res.status === 200) {
        setEnrolled(true);
        // optionally update UI with returned enrollment info
        alert("Successfully enrolled in the course!");
      } else {
        // some backends might return 200; treat as success
        setEnrolled(true);
      }
    } catch (err) {
      console.error("Enroll error:", err);
      // Server-sent message
      const serverMsg = err?.response?.data?.message || err?.response?.data?.error;

      // handle common status codes
      if (err?.response?.status === 409) {
        // already enrolled
        setEnrolled(true);
        alert(serverMsg || "You are already enrolled in this course.");
      } else if (err?.response?.status === 400) {
        alert(serverMsg || "Bad request — enrollment failed. Please check your data.");
      } else if (err?.response?.status === 401) {
        // token invalid / expired
        alert(serverMsg || "You are not authorized. Please log in again.");
        navigate("/login");
      } else {
        alert(serverMsg || "Enrollment failed. Please try again later.");
      }
    } finally {
      setEnrolling(false);
    }
  };
  
  if (loading) return <div className="p-6">Loading course...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!course) return <div className="p-6">No course found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} className="w-full rounded shadow" />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
              No thumbnail
            </div>
          )}
        </div>

        <div className="md:w-2/3">
          <h1 className="text-2xl font-semibold mb-2">{course.title}</h1>
          <p className="text-sm text-gray-600 mb-4">{course.category || "Uncategorized"}</p>
          <p className="mb-4">{course.description}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="text-lg font-bold">
              {course.price ? `₹ ${course.price}` : "Free"}
            </div>
            {course.rating && (
              <div className="text-sm text-yellow-600">⭐ {course.rating} ({course.ratingsCount || 0})</div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleEnroll}
              disabled={enrolling || enrolled}
              className={`px-4 py-2 rounded ${
                enrolled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {enrolling ? "Enrolling..." : enrolled ? "Enrolled" : "Enroll"}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded border"
            >
              Back
            </button>
          </div>

          {/* optional more course details */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">What you'll learn</h3>
            {course.sections && course.sections.length ? (
              <ul className="list-disc pl-6">
                {course.sections.map((section) => (
                  <li key={section._id || section.title} className="mb-1">
                    <strong>{section.title}</strong>
                    {section.lessons && (
                      <div className="text-sm text-gray-700 ml-4">
                        {section.lessons.map((l) => (
                          <div key={l._id || l.title}>• {l.title}</div>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No sections yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
