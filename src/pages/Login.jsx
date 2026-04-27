import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    // 🔥 Get registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔥 Check if user exists
    const validUser = users.find(
      (user) =>
        user.email === formData.email &&
        user.password === formData.password
    );

    if (!validUser) {
      setError("Invalid email or password");
      return;
    }

    // ✅ Save logged user
    localStorage.setItem("loggedUser", JSON.stringify(validUser));

    // ✅ Redirect to profile
    navigate("/profile");
  };

  return (
    <>
      <Header />

      <section className="auth-section">
        <div className="auth-card">
          <h2>Welcome Back 👋</h2>
          <p>Login to your account</p>

          {error && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <label>Email Address</label>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <label>Password</label>
              <span
                className="toggle-pass"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button className="auth-btn">Login</button>
          </form>

          <div className="auth-footer">
            Don’t have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Login;