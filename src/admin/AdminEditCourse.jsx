import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./admin-forms.css";

export default function AdminEditCourse() {
  const { id } = useParams();
  const nav = useNavigate();

  const categories = [
    "Artificial Intelligence (AI)",
    "Python",
    "Microsoft Excel",
    "AI Agents & Agentic AI",
    "Digital Marketing",
    "Amazon AWS",
  ];

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        const c = res.data;

        setForm({
          title: c.title || "",
          description: c.description || "",
          platform: c.platform || "",
          price: c.price || "",
          oldPrice: c.oldPrice || "",
          category: c.category || categories[0],
          thumbnail: c.thumbnail || "",
          rating: c.rating ?? "",
          ratingsCount: c.ratingsCount ?? "",
        });
      } catch (err) {
        console.error("Failed to load course:", err);
        alert("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      rating: form.rating !== "" ? Number(form.rating) : undefined,
      ratingsCount:
        form.ratingsCount !== "" ? Number(form.ratingsCount) : undefined,
    };

    try {
      await api.put(`/courses/${id}`, payload);
      alert("Course updated");
      nav("/admin/courses");
    } catch (err) {
      console.error("Update course failed:", err);
      alert("Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) {
    return (
      <div className="admin-form-page">
        <h1>Edit Course</h1>
        <p>Loading course...</p>
      </div>
    );
  }

  return (
    <div className="admin-form-page">
      <h1>Edit Course</h1>

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
          <button className="primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
