import "./footer.css";
import { useEffect, useState } from "react";

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Show "back to top" button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <footer className="footer fade-in">
        <div className="footer-content">

          <div className="footer-section">
            <h2 className="footer-title">Manish Kumar V</h2>
            <p className="footer-role">MERN Stack Developer</p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Contact</h3>
            <p>Email: <a href="mailto:manishvm310@gmail.com">manishvm310@gmail.com</a></p>
            <p>Phone: <a href="tel:+916385329793">+91 - 6385329793</a></p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Follow Me</h3>

            <div className="footer-icons">

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/manish310a" target="_blank"  className="icon-wrapper">
                <svg className="icon" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zM8.5 8h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4.1 0 4.8 2.7 4.8 6.2V24h-4v-7.7c0-1.8 0-4.1-2.5-4.1-2.5 0-2.9 2-2.9 4V24h-4V8z"
                  />
                </svg>
              </a>

              {/* GitHub */}
              <a href="https://github.com/manish-vm" target="_blank" className="icon-wrapper">
                <svg className="icon" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.97.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.55-3.87-1.55-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.78 2.71 1.27 3.37.97.1-.75.4-1.27.72-1.56-2.55-.29-5.23-1.3-5.23-5.82 0-1.29.46-2.35 1.2-3.18-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.2a11.1 11.1 0 0 1 5.8 0c2.2-1.51 3.17-1.2 3.17-1.2.63 1.59.24 2.77.12 3.06.75.83 1.2 1.89 1.2 3.18 0 4.54-2.69 5.52-5.26 5.8.41.36.78 1.08.78 2.18v3.24c0 .32.21.68.79.56A10.54 10.54 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5Z"
                  />
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/" target="_blank" className="icon-wrapper">
                <svg className="icon" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.75a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
                  />
                </svg>
              </a>

              {/* Twitter (X) */}
              <a href="https://twitter.com/" target="_blank" className="icon-wrapper">
                <svg className="icon" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M17.53 3h3l-7.6 8.65L22 21h-6.3l-5-6.43L5 21H2l8.26-9.4L2.47 3h6.33l4.2 5.6L17.53 3z"
                  />
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com/" target="_blank" className="icon-wrapper">
                <svg className="icon" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C17.2 2.5 12 2.5 12 2.5h-.1s-5.2 0-8.6.4c-.4.1-1.3.1-2.1 1-.6.7-.8 2.3-.8 2.3S0 8.1 0 10v1.9c0 1.9.2 3.8.2 3.8s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1C6.8 19.5 12 19.5 12 19.5s5.2 0 8.6-.4c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3S24 13.9 24 12V10c0-1.9-.5-3.8-.5-3.8zM9.75 14.7V7.8l6.5 3.45-6.5 3.45z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Manish Kumar V. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Back to top button */}
      {showTopBtn && (
        <button className="back-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </>
  );
}
