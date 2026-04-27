import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // handle input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setError("");
  };

  // handle image upload
  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // submit form
  const handleSubmit = (e) => {

    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = existingUsers.find(
      (user) => user.email === email
    );

    if (emailExists) {
      setError("Email already registered");
      return;
    }

    // create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      image
    };

    const updatedUsers = [...existingUsers, newUser];

    // save users
    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    // save logged user
    localStorage.setItem(
      "loggedUser",
      JSON.stringify(newUser)
    );

    setSuccess("Registration successful 🎉");

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

    setTimeout(() => {
      navigate("/profile");
    }, 1200);
  };

  return (
    <>
      <Header />

      <section className="auth-section">

        <div className="auth-card">

          <h2>Create Account 🚀</h2>
          <p>Start your career journey</p>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          {success && (
            <div className="auth-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Profile Image Upload */}

            <div className="profile-upload">

              {image && (
                <img
                  src={image}
                  alt="preview"
                  className="profile-preview"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

            </div>


            <div className="input-group">

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />

              <label>Full Name</label>

            </div>


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
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />

              <label>Password</label>

            </div>


            <div className="input-group">

              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <label>Confirm Password</label>

            </div>


            <button className="auth-btn">
              Register
            </button>

          </form>

          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </div>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default Register;