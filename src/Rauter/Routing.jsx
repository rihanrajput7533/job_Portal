import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";

import AddJob from "../pages/AddJob";
import CompanyProfile from "../pages/CompanyProfile";
import JobDetails from "../pages/JobDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";

import Profile from "../pages/Profile";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* JOBS */}
        
        <Route path="/jobDetails/:id" element={<JobDetails />} />
        

        {/* COMPANY */}
        <Route path="/addJob" element={<AddJob />} />
        <Route path="/companyProfile" element={<CompanyProfile />} />

        {/* AUTH */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* USER PROFILE */}
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Routing;