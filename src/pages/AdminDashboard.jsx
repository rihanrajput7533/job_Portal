import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import jobsData from "../data/JobsData";

const ADMIN_PASSWORD = "rihan";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    const [users, setUsers] = useState([]);
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);

    const [search, setSearch] = useState("");

    const [editType, setEditType] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({});

    const [viewData, setViewData] = useState(null);
    const [viewType, setViewType] = useState(null);

    /* LOAD DATA */
    useEffect(() => {
        if (authenticated) {
            setUsers(JSON.parse(localStorage.getItem("users")) || []);
            setApplications(JSON.parse(localStorage.getItem("applications")) || []);
            setJobs(JSON.parse(localStorage.getItem("jobs")) || jobsData);
        }
    }, [authenticated]);

    /* LOGIN */
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
        } else {
            alert("Wrong Password");
        }
    };

    const handleLogout = () => {
        setAuthenticated(false);
        navigate("/");
    };

    /* DELETE */
    const handleDeleteUser = (index) => {
        if (!window.confirm("Delete this user?")) return;
        const updated = users.filter((_, i) => i !== index);
        setUsers(updated);
        localStorage.setItem("users", JSON.stringify(updated));
    };

    const handleDeleteApplication = (index) => {
        if (!window.confirm("Delete application?")) return;
        const updated = applications.filter((_, i) => i !== index);
        setApplications(updated);
        localStorage.setItem("applications", JSON.stringify(updated));
    };

    const handleDeleteJob = (index) => {
        if (!window.confirm("Delete job?")) return;
        const updated = jobs.filter((_, i) => i !== index);
        setJobs(updated);
        localStorage.setItem("jobs", JSON.stringify(updated));
    };

    /* SAVE EDIT */
    const handleSave = () => {

        if (editType === "user") {
            const updated = [...users];
            updated[editIndex] = editData;
            setUsers(updated);
            localStorage.setItem("users", JSON.stringify(updated));
        }

        if (editType === "application") {
            const updated = [...applications];
            updated[editIndex] = editData;
            setApplications(updated);
            localStorage.setItem("applications", JSON.stringify(updated));
        }

        if (editType === "job") {
            const updated = [...jobs];
            updated[editIndex] = editData;
            setJobs(updated);
            localStorage.setItem("jobs", JSON.stringify(updated));
        }

        closeModal();
    };

    const closeModal = () => {
        setEditType(null);
        setEditIndex(null);
        setEditData({});
    };

    /* SEARCH */
    const filteredUsers = users.filter(user =>
        `${user.name} ${user.email}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const filteredApplications = applications.filter(app =>
        `${app?.name || ""} ${app?.jobTitle || ""}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    /* LOGIN UI */
    if (!authenticated) {
        return (
            <>
                <Header />
                <div className="admin-login">
                    <div className="login-card">
                        <h2>Admin Login</h2>
                        <form onSubmit={handleLogin}>
                            <input
                                type="password"
                                placeholder="Enter Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <div className="admin-dashboard">

                <div className="admin-hero">
                    <h1>Admin Dashboard</h1>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                <div className="admin-search">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* USERS */}
                <div className="admin-table">
                    <h2>Registered Users</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Profile</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>
                                        {user.image ? (
                                            <img
                                                src={user.image}
                                                alt="profile"
                                                style={{ width: "40px", borderRadius: "50%" }}
                                            />
                                        ) : (
                                            <div className="profile-avatar">
                                                {user.name?.charAt(0)}
                                            </div>
                                        )}
                                    </td>

                                    <td>{user.name}</td>
                                    <td>{user.email}</td>

                                    <td>
                                        <button className="view-btn" onClick={() => {
                                            setViewType("user");
                                            setViewData(user);
                                        }}>
                                            View
                                        </button>

                                        <button className="edit-btn" onClick={() => {
                                            setEditType("user");
                                            setEditIndex(index);
                                            setEditData(user);
                                        }}>
                                            Update
                                        </button>

                                        <button className="delete-btn" onClick={() => handleDeleteUser(index)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* APPLICATIONS */}
                <div className="admin-table">
                    <h2>Applications</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Job</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredApplications.map((app, index) => (
                                <tr key={index}>
                                    <td>{app.name}</td>
                                    <td>{app.email}</td>
                                    <td>{app.jobTitle}</td>

                                    <td>
                                        <select
                                            value={app.status || "pending"}
                                            onChange={(e) => {
                                                const updated = [...applications];
                                                updated[index].status = e.target.value;
                                                setApplications(updated);
                                                localStorage.setItem("applications", JSON.stringify(updated));
                                            }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </td>

                                    <td>
                                        <button className="view-btn" onClick={() => {
                                            setViewType("application");
                                            setViewData(app);
                                        }}>
                                            View
                                        </button>

                                        <button className="edit-btn" onClick={() => {
                                            setEditType("application");
                                            setEditIndex(index);
                                            setEditData(app);
                                        }}>
                                            Update
                                        </button>

                                        <button className="delete-btn" onClick={() => handleDeleteApplication(index)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* JOBS */}
                <div className="admin-table">
                    <h2>Jobs</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Title</th>
                                <th>Company</th>
                                <th>Location</th>
                                <th>Salary</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {jobs.map((job, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={job.image}
                                            alt="job"
                                            style={{ width: "50px", borderRadius: "8px" }}
                                        />
                                    </td>

                                    <td>{job.title}</td>
                                    <td>{job.company}</td>
                                    <td>{job.location}</td>
                                    <td>{job.salary}</td>

                                    <td>
                                        <button className="edit-btn" onClick={() => {
                                            setEditType("job");
                                            setEditIndex(index);
                                            setEditData(job);
                                        }}>
                                            Update
                                        </button>

                                        <button className="delete-btn" onClick={() => handleDeleteJob(index)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* EDIT MODAL */}
                {editType && (
                    <div className="job-modal">
                        <div className="job-modal-content">
                            <h2>Edit</h2>

                            {editType === "user" && (
                                <>
                                    <input value={editData.name || ""} onChange={(e) => setEditData({ ...editData, name: e.target.value })} placeholder="Name" />
                                    <input value={editData.email || ""} onChange={(e) => setEditData({ ...editData, email: e.target.value })} placeholder="Email" />
                                    <input value={editData.password || ""} onChange={(e) => setEditData({ ...editData, password: e.target.value })} placeholder="Password" />
                                </>
                            )}

                            {editType === "job" && (
                                <>
                                    <input value={editData.title || ""} onChange={(e) => setEditData({ ...editData, title: e.target.value })} placeholder="Title" />
                                    <input value={editData.company || ""} onChange={(e) => setEditData({ ...editData, company: e.target.value })} placeholder="Company" />
                                    <input value={editData.location || ""} onChange={(e) => setEditData({ ...editData, location: e.target.value })} placeholder="Location" />
                                    <input value={editData.salary || ""} onChange={(e) => setEditData({ ...editData, salary: e.target.value })} placeholder="Salary" />
                                    <input value={editData.image || ""} onChange={(e) => setEditData({ ...editData, image: e.target.value })} placeholder="Image URL" />
                                </>
                            )}

                            <button onClick={handleSave}>Save</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                )}

                {/* VIEW MODAL */}
                {viewType && viewData && (
                    <div className="job-modal">
                        <div className="job-modal-content">

                            <h2>Details</h2>

                            {viewType === "user" && (
                                <>
                                    {viewData.image ? (
                                        <img src={viewData.image} alt="profile" style={{ width: "80px", borderRadius: "50%" }} />
                                    ) : (
                                        <div className="profile-avatar">
                                            {viewData.name?.charAt(0)}
                                        </div>
                                    )}

                                    <p><b>Name:</b> {viewData.name}</p>
                                    <p><b>Email:</b> {viewData.email}</p>
                                </>
                            )}

                            {viewType === "application" && (
                                <>
                                    <p><b>Name:</b> {viewData.name}</p>
                                    <p><b>Email:</b> {viewData.email}</p>
                                    <p><b>Job:</b> {viewData.jobTitle}</p>

                                    {viewData.resume && (
                                        <a href={viewData.resume} target="_blank" rel="noreferrer">
                                            View Resume
                                        </a>
                                    )}
                                </>
                            )}

                            <button onClick={() => {
                                setViewType(null);
                                setViewData(null);
                            }}>
                                Close
                            </button>

                        </div>
                    </div>
                )}

            </div>

            <Footer />
        </>
    );
};

export default AdminDashboard;