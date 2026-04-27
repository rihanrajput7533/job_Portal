import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import jobsData from "../data/JobsData";

const Home = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);

  // Load jobs
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs"));

    if (storedJobs && storedJobs.length > 0) {
      setJobs(storedJobs);
    } else {
      setJobs(jobsData);
      localStorage.setItem("jobs", JSON.stringify(jobsData));
    }
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter((job) =>
    (job?.title || "").toLowerCase().includes(search.toLowerCase()) &&
    (job?.location || "").toLowerCase().includes(location.toLowerCase())
  );

  // 🔐 Check login
  const checkAuth = () => {
    const user = localStorage.getItem("loggedUser");

    if (!user) {
      navigate("/register");
      return false;
    }

    return true;
  };

  // View Details
  const handleViewDetails = (id) => {

    if (!checkAuth()) return;

    navigate(`/jobDetails/${id}`);
  };

  // Search button
  const handleSearch = () => {

    if (!checkAuth()) return;

    // search already applied via filter
  };

  return (
    <>
      <Header />

      <div className="home">

        {/* HERO */}
        <section className="hero">

          <div className="hero-content">

            <h1>
              Find Your <span>Dream Job</span> Today
            </h1>

            <p>
              Discover thousands of opportunities from top companies.
              Start your career journey with us.
            </p>

            <div className="search-box">

              <input
                type="text"
                placeholder="Search job title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <button onClick={handleSearch}>
                Search
              </button>

            </div>

          </div>

          <div className="floating-shapes">
            <div className="shape s1"></div>
            <div className="shape s2"></div>
            <div className="shape s3"></div>
          </div>

        </section>


        {/* JOB LIST */}
        <section className="featured">

          <h2>Available Jobs</h2>

          <div className="job-cards">

            {filteredJobs.length > 0 ? (

              filteredJobs.map((job) => (

                <div className="job-card" key={job.id}>

                  {job.image && (
                    <img src={job.image} alt={job.title} />
                  )}

                  <h3>{job.title}</h3>

                  <p>
                    {job.company} • {job.location}
                  </p>

                  <span>{job.salary}</span>

                  <button
                    onClick={() => handleViewDetails(job.id)}
                  >
                    View Details
                  </button>

                </div>

              ))

            ) : (
              <p style={{ color: "white" }}>
                No jobs found
              </p>
            )}

          </div>

        </section>


        {/* CTA */}
        <section className="cta">

          <h2>Ready to Start Your Career?</h2>

          <button onClick={() => navigate("/register")}>
            Create Account
          </button>

        </section>

      </div>

      <Footer />
    </>
  );
};

export default Home;