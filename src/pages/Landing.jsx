import { motion } from "framer-motion";
import heroImg from "../assets/hero.png";
import "./Landing.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  // ---------------------------
  // CLOUD ROLE DATA
  // ---------------------------
  const rolesCloud = [
    { label: "Cloud operator (SysOps)", icon: "https://cdn-icons-png.flaticon.com/512/115/115804.png" },
    { label: "Data engineer", icon: "https://static.thenounproject.com/png/4065150-200.png" },
    { label: "Decision maker", icon: "https://cdn3.iconfinder.com/data/icons/planning-3/64/decision-making-planning-choosing-select-512.png" },
    { label: "Developer", icon: "https://cdn1.iconfinder.com/data/icons/information-technology-16/1700/9303_-_Programmer-512.png" },
    { label: "DevOps", icon: "https://cdn-icons-png.flaticon.com/512/5084/5084071.png" },
    { label: "Machine learning engineer", icon: "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-deep-learning-line-icon-vector-png-image_6688986.png" },
    { label: "Solutions architect", icon: "https://png.pngtree.com/png-vector/20230221/ourmid/pngtree-business-solution-icon-png-image_6607457.png" },
  ];

  // ---------------------------
  // PRODUCT DOMAIN DATA
  // ---------------------------
  const rolesProduct = [
    { label: "Application integration", icon: "https://png.pngtree.com/png-vector/20220502/ourmid/pngtree-global-integration-icon-flat-design-information-ux-ui-vector-png-image_24298802.png" },
    { label: "Artificial Intelligence", icon: "https://png.pngtree.com/png-clipart/20230418/original/pngtree-artificial-intelligence-line-icon-png-image_9064961.png" },
    { label: "Cloud for Games", icon: "https://static.thenounproject.com/png/563921-200.png" },
    { label: "Blockchain", icon: "https://cdn-icons-png.flaticon.com/512/2152/2152349.png" },
    { label: "Business applications", icon: "https://cdn-icons-png.flaticon.com/512/752/752241.png" },
    { label: "Cloud financial management", icon: "https://cdn4.iconfinder.com/data/icons/accounting-5/48/bl_640_cloud_accounting_internet_share_document_report_financial-512.png" },
    { label: "Compute", icon: "https://static.vecteezy.com/system/resources/previews/010/366/243/non_2x/computer-icon-transparent-free-png.png" },
    { label: "Contact center", icon: "https://cdn-icons-png.flaticon.com/512/3734/3734873.png" },
    { label: "Containers", icon: "https://assets.streamlinehq.com/image/private/w_240,h_240,ar_1/f_auto/v1/icons/development/docker-qnxi55acpx4qay93x57d.png/docker-a5uixph9ibbdey3zayq8la.png?_a=DATAg1AAZAA0" },
    { label: "Data analytics", icon: "https://png.pngtree.com/png-clipart/20230425/original/pngtree-analytics-line-icon-png-image_9096205.png" },
  ];

  // ---------------------------
  // TAB STATE
  // ---------------------------
  const [activeTab, setActiveTab] = useState("cloud");

  const currentRoles = activeTab === "cloud" ? rolesCloud : rolesProduct;

  return (
    <div className="landing-container">
      {/* HERO SECTION */}
      <section className="landing-hero">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-text"
        >
          <h1 className="hero-title">
            Master New Skills Online <br />
            with <span className="highlight">Premium Courses</span>
          </h1>

          <p className="hero-subtitle">
            Learn from experts anytime, anywhere. Upgrade your career today.
          </p>

          <Link to="/courses" className="hero-button">
            Explore Courses
          </Link>
        </motion.div>

        <motion.img
          src={heroImg}
          className="hero-image"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          alt="Hero"
        />
      </section>

      {/* FEATURES – smooth reveal on scroll */}
      <section className="landing-features">
        {[
          {
            title: "Expert Instructors",
            text: "Learn directly from industry professionals and certified trainers.",
            img: "https://cdn3d.iconscout.com/3d/premium/thumb/business-expert-3d-icon-png-download-4745552.png",
          },
          {
            title: "Lifetime Access",
            text: "Access your courses anytime — even after completion.",
            img: "https://cdn3d.iconscout.com/3d/premium/thumb/save-time-3d-icon-png-download-9646539.png",
          },
          {
            title: "Certificates Provided",
            text: "Earn shareable certificates to boost your résumé.",
            img: "https://cdn3d.iconscout.com/3d/premium/thumb/certificate-3d-icon-png-download-5117408.png",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.2}}
            whileHover={{ scale: 1.05 }}
          >
            <img src={feature.img} alt={feature.title} className="feature-icon" />
            <h2 className="feature-title">{feature.title}</h2>
            <p className="feature-text">{feature.text}</p>
          </motion.div>
        ))}
      </section>

      {/* PROFESSIONAL GOALS SECTION */}
      <div className="goals-container">
        <h2 className="heading">Advance your professional goals</h2>

        {/* TABS */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "cloud" ? "active" : ""}`}
            onClick={() => setActiveTab("cloud")}
          >
            Learn by cloud role
          </button>

          <button
            className={`tab ${activeTab === "product" ? "active" : ""}`}
            onClick={() => setActiveTab("product")}
          >
            Learn by product domain
          </button>
        </div>

        {/* GRID CONTENT – smooth transition between tabs */}
        <motion.div
          key={activeTab}                      
          className="roles-grid tab-content"   
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {currentRoles.map((item, index) => (
            <div key={index} className="role-card">
              <img src={item.icon} alt={item.label} className="role-icon" />
              <p className="role-label">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
