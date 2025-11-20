import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
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
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      login(res.data);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page1">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="login-box1"
      >
        <h1 className="login-title1">Welcome Back</h1>
        <p className="login-subtitle1">Login to continue learning</p>

        <form onSubmit={handleSubmit} className="login-form1">
          <div className="input-group1">
            <label className="input-label1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="input-field1"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group1">
            <label className="input-label1">Password</label>

            <div className="password-wrapper1">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="input-field1 password-input1"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="eye-btn1"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="error-text1">{error}</p>}

          <button type="submit" className="login-btn1" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-text1">
          Don’t have an account?{" "}
          <Link to="/register" className="register-link1">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
