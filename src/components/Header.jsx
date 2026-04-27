import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {

  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    // get logged user
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    setUser(loggedUser);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("loggedUser");

    setUser(null);

    navigate("/");
  };

  return (
    <header className={scrolled ? "header scrolled" : "header"}>

      <div className="logo">
        Job<span>Portal</span>
      </div>

      <nav className={menuOpen ? "nav active" : "nav"}>

        <Link
          className={location.pathname === "/" ? "active" : ""}
          to="/"
        >
          Home
        </Link>

   

        <Link
          className={location.pathname.startsWith("/companyProfile") ? "active" : ""}
          to="/companyProfile"
        >
          Company
        </Link>

        <Link
          className={location.pathname.startsWith("/addJob") ? "active" : ""}
          to="/addJob"
        >
          Add Job
        </Link>


        {/* 🔐 LOGIN OR PROFILE */}

        {!user ? (

          <Link
            className={
              location.pathname.startsWith("/login")
                ? "active login-btn"
                : "login-btn"
            }
            to="/login"
          >
            Login
          </Link>

        ) : (

          <div className="profile-menu">

            <img
              src={
                user?.profileImage
                  ? user.profileImage
                  : `https://ui-avatars.com/api/?name=${user.name}`
              }
              alt="profile"
              className="profile-img"
              onClick={() => navigate("/profile")}
            />

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        )}

      </nav>

      <div
        className={menuOpen ? "hamburger active" : "hamburger"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

    </header>
  );
}