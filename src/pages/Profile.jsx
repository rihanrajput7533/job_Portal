import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Profile.css";

const Profile = () => {

const navigate = useNavigate();

const [user,setUser] = useState(null);
const [applications,setApplications] = useState([]);
const [savedJobs,setSavedJobs] = useState([]);
const [activeTab,setActiveTab] = useState("profile");
const [password,setPassword] = useState("");


/* LOAD USER DATA */

useEffect(()=>{

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if(!loggedUser){
navigate("/login");
return;
}

setUser(loggedUser);

const storedApps =
JSON.parse(localStorage.getItem("applications")) || [];

setApplications(
storedApps.filter(app=>app.userId === loggedUser.id)
);

const storedSaved =
JSON.parse(localStorage.getItem("savedJobs")) || [];

setSavedJobs(
storedSaved.filter(job=>job.userId === loggedUser.id)
);

},[navigate]);


/* SAVE PROFILE */

const handleSaveProfile = ()=>{

localStorage.setItem("loggedUser",JSON.stringify(user));

/* update users list */

let users =
JSON.parse(localStorage.getItem("users")) || [];

users = users.map(u =>
u.id === user.id ? user : u
);

localStorage.setItem("users",JSON.stringify(users));

alert("Profile Updated Successfully");

};


/* LOGOUT */

const handleLogout = ()=>{

localStorage.removeItem("loggedUser");

navigate("/");

};


/* DELETE ACCOUNT */

const handleDeleteAccount = ()=>{

if(!window.confirm("Delete your account?")) return;

let users =
JSON.parse(localStorage.getItem("users")) || [];

users = users.filter(u => u.id !== user.id);

localStorage.setItem("users",JSON.stringify(users));

localStorage.removeItem("loggedUser");

alert("Account Deleted");

navigate("/");

};


/* REMOVE SAVED JOB */

const removeSavedJob = (id)=>{

const updated = savedJobs.filter(job=>job.id !== id);

setSavedJobs(updated);

const allSaved =
JSON.parse(localStorage.getItem("savedJobs")) || [];

const filtered = allSaved.filter(job=>job.id !== id);

localStorage.setItem("savedJobs",JSON.stringify(filtered));

};


/* RESUME UPLOAD */

const handleResumeUpload = (e)=>{

const file = e.target.files[0];

if(!file) return;

const updatedUser = {...user,resume:file.name};

setUser(updatedUser);

localStorage.setItem("loggedUser",JSON.stringify(updatedUser));

};


/* PROFILE IMAGE */

const handleImageUpload = (e)=>{

const file = e.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onloadend = ()=>{

const updatedUser = {...user,profileImage:reader.result};

setUser(updatedUser);

localStorage.setItem("loggedUser",JSON.stringify(updatedUser));

};

reader.readAsDataURL(file);

};


/* PASSWORD CHANGE */

const handleChangePassword = ()=>{

if(!password) return alert("Enter new password");

const updatedUser = {...user,password};

setUser(updatedUser);

localStorage.setItem("loggedUser",JSON.stringify(updatedUser));

alert("Password Updated");

setPassword("");

};


/* PROFILE COMPLETION */

const profileCompletion = ()=>{

let fields = ["name","email","mobile","location","skills","resume"];

let count = fields.filter(f=>user?.[f]).length;

return Math.floor((count / fields.length) * 100);

};


if(!user) return null;


return(

<>

<Header/>

<div className="profile-wrapper">

{/* SIDEBAR */}

<div className="sidebar">

<h2>My Account</h2>

<button onClick={()=>setActiveTab("profile")}>Profile</button>
<button onClick={()=>setActiveTab("applications")}>Applied Jobs</button>
<button onClick={()=>setActiveTab("saved")}>Saved Jobs</button>
<button onClick={()=>setActiveTab("settings")}>Settings</button>

</div>


{/* CONTENT */}

<div className="content-area">

{/* PROFILE TAB */}

{activeTab==="profile" && (

<div className="glass-card">

{/* PROFILE HEADER */}

<div className="profile-header">

<div className="avatar">

{user.profileImage ? (
<img src={user.profileImage} alt="profile"/>
) : (
user.name?.charAt(0).toUpperCase()
)}

<input
type="file"
accept="image/*"
onChange={handleImageUpload}
/>

</div>

<div>

<h2>{user.name}</h2>
<p>{user.email}</p>

</div>

</div>


{/* ADMIN STATUS MESSAGE */}

<div className={`profile-status ${user.profileStatus || "pending"}`}>

{user.profileStatus==="approved" && (
<p style={{color:"green"}}>
✅ Your profile has been approved by admin
</p>
)}

{user.profileStatus==="rejected" && (
<p style={{color:"red"}}>
❌ Your profile was rejected. Please update details.
</p>
)}

{(!user.profileStatus || user.profileStatus==="pending") && (
<p style={{color:"orange"}}>
🕒 Your profile is pending admin approval
</p>
)}

</div>


{/* PROFILE PROGRESS */}

<div className="progress-bar">
<div
className="progress-fill"
style={{width:`${profileCompletion()}%`}}
></div>
</div>

<p className="progress-text">
{profileCompletion()}% Profile Completed
</p>


<h3>Basic Info</h3>

<input
placeholder="Mobile"
value={user.mobile || ""}
onChange={(e)=>setUser({...user,mobile:e.target.value})}
/>

<input
placeholder="Location"
value={user.location || ""}
onChange={(e)=>setUser({...user,location:e.target.value})}
/>

<textarea
placeholder="Bio"
value={user.bio || ""}
onChange={(e)=>setUser({...user,bio:e.target.value})}
/>


<h3>Professional</h3>

<input
placeholder="Job Title"
value={user.jobTitle || ""}
onChange={(e)=>setUser({...user,jobTitle:e.target.value})}
/>

<input
placeholder="Company"
value={user.company || ""}
onChange={(e)=>setUser({...user,company:e.target.value})}
/>

<input
placeholder="Skills"
value={user.skills || ""}
onChange={(e)=>setUser({...user,skills:e.target.value})}
/>


<h3>Resume</h3>

{user.resume && <p>📄 {user.resume}</p>}

<input type="file" onChange={handleResumeUpload}/>

<button onClick={handleSaveProfile}>
Save Changes
</button>

</div>

)}


{/* APPLICATIONS */}

{activeTab==="applications" && (

<div className="glass-card">

<h2>Applied Jobs</h2>

{applications.map((app,index)=>(

<div key={index} className="job-card">

<div>
<h4>{app.jobTitle}</h4>
<p>{app.company}</p>
<small>{app.date}</small>
</div>

<span className={`status ${app.status}`}>
{app.status}
</span>

</div>

))}

</div>

)}


{/* SAVED JOBS */}

{activeTab==="saved" && (

<div className="glass-card">

<h2>Saved Jobs</h2>

{savedJobs.map(job=>(

<div key={job.id} className="job-card">

<div>
<h4>{job.title}</h4>
<p>{job.company}</p>
</div>

<button onClick={()=>removeSavedJob(job.id)}>
Remove
</button>

</div>

))}

</div>

)}


{/* SETTINGS */}

{activeTab==="settings" && (

<div className="glass-card">

<h2>Settings</h2>

<input
type="password"
placeholder="New Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleChangePassword}>
Change Password
</button>

<button onClick={handleLogout}>
Logout
</button>

<button
className="danger"
onClick={handleDeleteAccount}
>
Delete Account
</button>

</div>

)}

</div>

</div>

<Footer/>

</>

);

};

export default Profile;