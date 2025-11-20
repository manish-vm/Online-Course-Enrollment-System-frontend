import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import "./Register.css";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // include role in state, default "user"
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // backend only allows "user" or "admin"
  });

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // send role explicitly so backend doesn't get "student" from anywhere
      const res = await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role || "user",
      });

      // AuthContext.login expects entire payload (token + user)
      login(res.data);
      navigate("/");
    } catch (err) {
      console.error("Register error:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Animated Background */}
      <div className="bg-bubble b1"></div>
      <div className="bg-bubble b2"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="register-card"
      >
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtext">Start your learning journey today 🚀</p>

        <form onSubmit={handleSubmit} className="register-form">
          {/* Name */}
          <div>
            <label className="register-label">Full Name</label>
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="register-input"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="register-label">Email</label>
            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="register-input"
                placeholder="example@mail.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="register-label">Password</label>
            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="register-input"
                placeholder="Create a strong password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading} className="register-btn">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
