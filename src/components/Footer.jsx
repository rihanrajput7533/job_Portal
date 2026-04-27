import { color } from "framer-motion";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* ===== Company Info ===== */}
        <div className="footer-col">
          <h2 className="footer-logo">Job<span>Portal</span></h2>
          <p>
            Connecting talented professionals with top companies worldwide.
            Find your dream job faster with our smart hiring platform.
          </p>
        </div>

        {/* ===== Quick Links ===== */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Browse Jobs</li>
            <li>Companies</li>
            <li>Post a Job</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* ===== Job Categories ===== */}
        <div className="footer-col">
          <h3>Top Categories</h3>
          <ul>
            <li>IT & Software</li>
            <li>Marketing</li>
            <li>Finance</li>
            <li>Healthcare</li>
            <li>Design</li>
          </ul>
        </div>

        {/* ===== Newsletter ===== */}
        <div className="footer-col">
          <h3>Subscribe</h3>
          <p>Get latest job updates directly to your inbox.</p>

          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>

          <div className="social-icons">
            <span>🌐</span>
            <span>💼</span>
            <span>📱</span>
            <span>🐦</span>
          </div>
        </div>

      </div>

      {/* ===== Bottom ===== */}
      <div className="footer-bottom">
        <p>© 2026 JobNova. All Rights Reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;