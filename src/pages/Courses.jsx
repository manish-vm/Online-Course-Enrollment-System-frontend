import { useEffect, useState } from "react";
import api from "../services/api";
import CourseCard from "../components/CourseCard";
import "./Courses.css";

const categories = [
  "Artificial Intelligence (AI)",
  "Python",
  "Microsoft Excel",
  "AI Agents & Agentic AI",
  "Digital Marketing",
  "Amazon AWS",
];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/courses");
        setCourses(res.data || []);
      } catch (err) {
        console.error("Failed to load courses:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const filteredCourses = courses.filter(
    (c) => c.category === activeCategory
  );

  return (
    <div className="courses-container">
      <h1 className="courses-title">Explore Courses</h1>

      <div className="categories-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${
              activeCategory === cat ? "active" : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p>Loading courses...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="courses-grid">
        {!loading && filteredCourses.length === 0 && (
          <p>No courses found in this category.</p>
        )}

        {filteredCourses.map((c) => (
          <CourseCard key={c._id} course={c} />
        ))}
      </div>
    </div>
  );
}
