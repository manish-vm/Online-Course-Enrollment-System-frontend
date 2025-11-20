import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          MERN Learn
        </Link>

        {/* MOBILE MENU ICON */}
        <button className="navbar-toggle" onClick={() => setOpen(!open)}>
          {open ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        {/* NAVIGATION LINKS */}
        <div className={`navbar-links ${open ? "open" : ""}`}>
          <Link
            className="nav-link underline-anim"
            to="/"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            className="nav-link underline-anim"
            to="/courses"
            onClick={() => setOpen(false)}
          >
            Courses
          </Link>

          {/* Show My Enrollments ONLY for non-admin logged-in users */}
          {user && user.role !== "admin" && (
            <Link
              className="nav-link underline-anim"
              to="/enrollments"
              onClick={() => setOpen(false)}
            >
              My Enrollments
            </Link>
          )}

          {/* Admin Panel link only for admins */}
          {user?.role === "admin" && (
            <Link
              className="nav-link underline-anim"
              to="/admin"
              onClick={() => setOpen(false)}
            >
              Admin Panel
            </Link>
          )}

          {/* Auth buttons */}
          {!user ? (
            <>
              <Link
                className="nav-btn"
                to="/login"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                className="nav-btn-outline"
                to="/register"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* Avatar */}
              <div className="avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              {/* Logout Button */}
              <button className="nav-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
