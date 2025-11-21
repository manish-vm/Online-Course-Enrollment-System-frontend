import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

const EnrollmentContext = createContext();

export const useEnrollment = () => useContext(EnrollmentContext);

export function EnrollmentProvider({ children }) {
  const { user } = useContext(AuthContext); // 👈 know who is logged in

  const [enrollments, setEnrollments] = useState([]); // course objects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnrollments = async () => {
      setLoading(true);
      setError("");

      // If no user logged in -> no enrollments
      if (!user) {
        setEnrollments([]);
        setLoading(false);
        return;
      }

      try {
        // 1) Get enrollment docs for this user (backend uses email from token)
        const enrollRes = await api.get("/enroll");
        const enrollDocs = enrollRes.data || [];

        if (!enrollDocs.length) {
          setEnrollments([]);
          setLoading(false);
          return;
        }

        // 2) Get all courses
        const coursesRes = await api.get("/courses");
        const courses = coursesRes.data || [];

        // 3) Map enrollment.course -> course object by _id
        const enrolledCourses = enrollDocs
          .map((en) =>
            courses.find((c) => String(c._id) === String(en.course))
          )
          .filter(Boolean);

        setEnrollments(enrolledCourses);
      } catch (err) {
        console.error("Failed to load enrollments:", err);
        setError("Failed to load enrollments.");
      } finally {
        setLoading(false);
      }
    };

    // 🔥 RUN whenever user changes
    fetchEnrollments();
  }, [user]); // 👈 this is the key change

  // Called from CourseCard on successful enroll
  const enrollCourse = (course) => {
    setEnrollments((prev) => {
      if (prev.some((c) => String(c._id) === String(course._id))) {
        return prev;
      }
      return [...prev, course];
    });
  };

  const value = {
    enrollments,
    enrollCourse,
    loading,
    error,
  };

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
}
