import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AddJob = () => {
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    description: "",
    image: ""
  });

  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // ✅ Convert image to Base64 (persistent)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setJobData({ ...jobData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !jobData.title ||
      !jobData.company ||
      !jobData.location ||
      !jobData.salary ||
      !jobData.type
    ) {
      alert("Please fill all required fields");
      return;
    }

    const existingJobs =
      JSON.parse(localStorage.getItem("jobs")) || [];

    const newJob = {
      id: Date.now(),
      ...jobData,
      createdAt: new Date().toLocaleString()
    };

    const updatedJobs = [...existingJobs, newJob];

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    setSuccess(true);

    // Reset form
    setJobData({
      title: "",
      company: "",
      location: "",
      salary: "",
      type: "",
      description: "",
      image: ""
    });

    setPreview(null);

    setTimeout(() => {
      navigate("/admin");
    }, 1500);
  };

  return (
    <>
      <Header />

      <div className="addjob-container">

        <div className="addjob-hero">
          <h1>Add New Job 🚀</h1>
          <p>Create and publish new job listings</p>
        </div>

        <div className="addjob-card">
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={jobData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={jobData.salary}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select
                name="type"
                value={jobData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </div>

            <div className="form-group">
              <label>Job Description</label>
              <textarea
                name="description"
                rows="4"
                value={jobData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Job Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="image-preview"
                />
              )}
            </div>

            <button type="submit" className="submit-btn">
              Publish Job
            </button>

            {success && (
              <p className="success-msg">
                Job added successfully 🎉
              </p>
            )}

          </form>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default AddJob;