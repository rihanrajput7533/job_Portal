import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./JobDetails.css";

const JobDetails = () => {

  const { id } = useParams();

  const [step, setStep] = useState(1);
  const [job, setJob] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const progressRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const formSectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
    resumeName: "",
    message: ""
  });

  /* ================= LOAD JOB ================= */
  useEffect(() => {
    const storedJobs =
      JSON.parse(localStorage.getItem("jobs")) || [];

    const selectedJob =
      storedJobs.find((j) => j.id === Number(id));

    setJob(selectedJob);
  }, [id]);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {

    if (e.target.name === "resume") {

      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            resume: reader.result,     // ✅ base64 file
            resumeName: file.name
          }));
        };

        reader.readAsDataURL(file);   // ✅ correct place
      }

    } else {

      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
      }));

      if (step === 1) setStep(2);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill required fields");
      return;
    }

    if (!formData.resume) {
      alert("Please upload resume");
      return;
    }

    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      name: formData.name,
      email: formData.email,
      resume: formData.resume,        // ✅ actual file
      resumeName: formData.resumeName,
      message: formData.message,
      appliedAt: new Date().toLocaleString(),
      status: "pending"
    };

    const storedApps =
      JSON.parse(localStorage.getItem("applications")) || [];

    const updatedApps = [...storedApps, newApplication];

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApps)
    );

    setSubmitted(true);
    setStep(3);

    formSectionRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  if (!job) {
    return (
      <>
        <Header />
        <h2 style={{ textAlign: "center", marginTop: 80 }}>
          Job Not Found
        </h2>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <section className="apply-hero">
        <div className="apply-hero-overlay">
          <h1>Apply for: {job.title}</h1>
          <p>
            {job.company} • {job.location} • {job.salary}
          </p>
          <div
            className="scroll-down"
            onClick={() =>
              formSectionRef.current?.scrollIntoView({
                behavior: "smooth"
              })
            }
          >
            ↓ Scroll to Apply
          </div>
        </div>
      </section>

      <section className="job-details">
        <div className="job-card-details">

          <div className="job-content-details">
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>📍 {job.location}</p>
            <span>💰 {job.salary}</span>
            <p>{job.description}</p>
          </div>

          {job.image && (
            <div className="job-image-details">
              <img ref={imageRef} src={job.image} alt={job.title} />
            </div>
          )}

        </div>
      </section>

      <section className="apply-wrapper" ref={formSectionRef}>

        {!submitted ? (

          <div className="apply-card">

            <h2>Submit Your Application</h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="file"
                name="resume"
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
              />

              <button type="submit">
                Submit Application
              </button>

            </form>

          </div>

        ) : (

          <div className="success-page">
            <h1>🎉 Application Submitted</h1>
            <p>Your application has been sent successfully.</p>
          </div>

        )}

      </section>

      <Footer />
    </>
  );
};

export default JobDetails;