import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./admin-forms.css";

export default function AdminAddCourse() {

  // Default categories used in the student side
  const categories = [
    "Artificial Intelligence (AI)",
    "Python",
    "Microsoft Excel",
    "AI Agents & Agentic AI",
    "Digital Marketing",
    "Amazon AWS",
  ];

  const [form, setForm] = useState({
    title: "",
    description: "",
    platform: "",
    price: "",
    oldPrice: "",
    category: categories[0],  // default
    thumbnail: "",
    rating: "",
    ratingsCount: "",
  });

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      rating: form.rating ? Number(form.rating) : undefined,
      ratingsCount: form.ratingsCount ? Number(form.ratingsCount) : undefined,
    };

    try {
      await api.post("/courses", payload);
      alert("Course created");
      nav("/admin/courses");
    } catch (err) {
      console.error("Create course failed:", err);
      alert("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-page">
      <h1>Add New Course</h1>

      <form className="admin-form" onSubmit={submit}>

        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handle}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handle}
          rows="5"
          required
        />

        <label>Platform / Instructor</label>
        <input
          name="platform"
          value={form.platform}
          onChange={handle}
        />

        <label>Price</label>
        <input
          name="price"
          value={form.price}
          onChange={handle}
          placeholder="₹999"
        />

        <label>Old Price (optional)</label>
        <input
          name="oldPrice"
          value={form.oldPrice}
          onChange={handle}
          placeholder="₹1999"
        />

        {/* === CATEGORY DROPDOWN === */}
        <label>Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handle}
          className="admin-select"
        >
          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label>Thumbnail URL</label>
        <input
          name="thumbnail"
          value={form.thumbnail}
          onChange={handle}
          placeholder="https://..."
        />

        <label>Rating (0–5)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          name="rating"
          value={form.rating}
          onChange={handle}
          placeholder="4.5"
        />

        <label>Ratings Count</label>
        <input
          type="number"
          min="0"
          name="ratingsCount"
          value={form.ratingsCount}
          onChange={handle}
          placeholder="1200"
        />

        <div className="form-actions">
          <button className="primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Course"}
          </button>
        </div>
      </form>
    </div>
  );
}
