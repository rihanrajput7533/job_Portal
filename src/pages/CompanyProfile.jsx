import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import "./CompanyPage.css";
import Footer from "../components/Footer";

const CompanyPage = () => {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <>
      <Header />

      {/* ================= HERO ================= */}
      <AnimatePresence mode="wait">

        {activeSection === "home" && (
          <motion.section
            key="home"
            className="hero"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-left">
              <h1>Innovate. Build. Scale.</h1>
              <p>
                We create powerful digital products that help businesses grow
                faster with modern web & AI solutions.
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-btn"
                  onClick={() => setActiveSection("about")}
                >
                  About
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => setActiveSection("services")}
                >
                  Services
                </button>
              </div>
            </div>

            {/* 3D Cube */}
            <div className="hero-right">
              <div className="cube">
                <div className="face front">Tech</div>
                <div className="face back">AI</div>
                <div className="face left">Web</div>
                <div className="face right">Cloud</div>
                <div className="face top">Apps</div>
                <div className="face bottom">UX</div>
              </div>
            </div>
          </motion.section>


        )}


        {/* ================= ABOUT ================= */}
        {activeSection === "about" && (
          <motion.section
            key="about"
            className="about-page"
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 0.7 }}
          >
            <button className="back-btn" onClick={() => setActiveSection("home")}>
              ← Back
            </button>

            <div className="about-container">

              <div className="about-left">
                <h2>About Our Company</h2>
                <p>
                  We build powerful digital experiences combining modern web
                  development, artificial intelligence, and scalable cloud systems.
                </p>

                <div className="about-stats">
                  <div>
                    <h3>250+</h3>
                    <span>Happy Clients</span>
                  </div>

                  <div>
                    <h3>120+</h3>
                    <span>Projects Delivered</span>
                  </div>

                  <div>
                    <h3>5+ Years</h3>
                    <span>Experience</span>
                  </div>
                </div>
              </div>

              <div className="about-right">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                  alt="Team Work"
                />
              </div>

            </div>
          </motion.section>
        )}


        {/* ================= SERVICES ================= */}
        {activeSection === "services" && (
          <motion.section
            key="services"
            className="services-page"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7 }}
          >
            <button className="back-btn" onClick={() => setActiveSection("home")}>
              ← Back
            </button>

            <h2 className="services-title">Our Premium Services</h2>

            <div className="services-grid">

              <div className="service-card-big">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" />
                <div className="service-content">
                  <h3>Web Development</h3>
                  <p>Modern React, full-stack and scalable web applications.</p>
                </div>
              </div>

              <div className="service-card-big">
                <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c" />
                <div className="service-content">
                  <h3>Mobile Apps</h3>
                  <p>Cross-platform Android & iOS applications.</p>
                </div>
              </div>

              <div className="service-card-big">
                <img src="https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1" />
                <div className="service-content">
                  <h3>AI Solutions</h3>
                  <p>AI automation & machine learning integration.</p>
                </div>
              </div>

              <div className="service-card-big">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" />
                <div className="service-content">
                  <h3>Cloud Services</h3>
                  <p>Secure, scalable cloud infrastructure.</p>
                </div>
              </div>

              <div className="service-card-big">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" />
                <div className="service-content">
                  <h3>Backend Development</h3>
                  <p>Powerful APIs and server-side applications using modern technologies.</p>
                </div>
              </div>

              <div className="service-card-big">
                <img src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c" />
                <div className="service-content">
                  <h3>UI/UX Design</h3>
                  <p>Beautiful, user-friendly and responsive interface designs.</p>
                </div>
              </div>

            </div>
          </motion.section>
        )}



      </AnimatePresence>
      <Footer />
    </>
  );
};

export default CompanyPage;