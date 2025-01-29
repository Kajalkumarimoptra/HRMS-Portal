/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useRef } from "react";
import { useLocation, Route, Routes, Navigate, useNavigate } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import dashboardRoutes from "routes";
// import routes from "routes.js";
import Dashboard from "views/Dashboard";
import Signup from "views/Signup";

import sidebarImage from "assets/img/sidebar-3.jpg";
import Header from "components/Header/Header";
import EmployeePage from "views/EmployeePage";
import RegisterPage from "views/RegisterPage";
import ResendActivationLinkForm from "views/ResendActivationLinkForm";
import Users from "views/Users";
import AddNewUser from "views/AddNewUser";
import Department from "views/Department";
import Report from "views/Report";
import JobPortal from "views/JobPortal";
import JobDashboard from "views/JobDashboard";
import Leave from "views/Leave";
import Applicant from "views/Applicant";
import Positions from "views/Positions";
import Resumes from "views/Resumes";
import Settings from "views/Settings";
import Authentication from "views/Authentication";
import Documents from "views/Documents";
import Holidays from "views/Holidays";
import Activities from "views/Activities";
import Payroll from "views/Payroll";
import Accounts from "views/Accounts";
import Project from "views/Project";
import Language from "views/Language";

function Admin() {

  const navigate = useNavigate();

  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);
  const location = useLocation();
  const mainPanel = useRef(null);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            element={<prop.component />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  })

  return (
    <>
      <div className="wrapper">
        <Header />
        <Sidebar color={color} image={hasImage ? image : ""} routes={dashboardRoutes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Routes>
              {/* Render the dashboard component */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="signup" element={<Signup />} />
              <Route path="employeepage" element={<EmployeePage />} />
              <Route path="leave" element={<Leave />} />
              <Route path="resendactivationlink" element={<ResendActivationLinkForm />} />
              <Route path="registerpage" element={<RegisterPage />} />
              <Route path="users" element={<Users />} />
              <Route path="addnewuser" element={<AddNewUser />} />
              <Route path="project" element={<Project />} />
              <Route path="department" element={<Department />} />
              <Route path="report" element={<Report />} />
              <Route path="jobportal" element={<JobPortal />} />
              <Route path="jobdashboard" element={<JobDashboard />} />
              <Route path="applicant" element={<Applicant />} />
              <Route path="positions" element={<Positions />} />
              <Route path="resumes" element={<Resumes />} />
              <Route path="settings" element={<Settings />} />
              <Route path="authentication" element={<Authentication />} />
              <Route path="documents" element={<Documents />} />
              <Route path="activities" element={<Activities />} />
              <Route path="holidays" element={<Holidays />} />
              <Route path="payroll" element={<Payroll />} />
              <Route path="accounts" element={<Accounts/>} />
              <Route path="language" element={<Language/>} />
              
              {/* Dynamically generate all the routes from dashboardRoutes */}
              {getRoutes(dashboardRoutes)}

              {/* Redirect /admin to /admin/dashboard */}
              <Route path="/" element={<Navigate to="dashboard" />} />

            </Routes>
          </div>
        </div>
      </div>
      {/* <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      /> */}
    </>
  );
}

export default Admin;
