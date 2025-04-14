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
import Leaves from "views/Leaves";
import sidebarImage from "assets/img/sidebar-3.jpg";
import Header from "components/Header/Header";
import EmployeePage from "views/EmployeePage";
import EditEmpDetails from "views/EditEmpDetails";
import RegisterPage from "views/RegisterPage";
import ResendActivationLinkForm from "views/ResendActivationLinkForm";
import Users from "views/Users";
import AddNewUser from "views/AddNewUser";
import EditUser from "views/EditUser";
import Department from "views/Department";
import AddNewDept from "views/AddNewDept";
import EditDept from "views/EditDept"
import Performance from "views/Performance";
import Report from "views/Report";
import Document from "views/Document";
import JobPortal from "views/JobPortal";
import JobDashboard from "views/JobDashboard";
import Applicant from "views/Applicant";
import Positions from "views/Positions";
import Resumes from "views/Resumes";
import Settings from "views/Settings";
import Authentication from "views/Authentication";
import OfferLetter from "views/OfferLetter";
import AppointmentLetter from "views/AppointmentLetter";
import RelievingLetter from "views/RelievingLetter";
import ExperienceLetter from "views/ExperienceLetter";
import ConfirmationLetter from "views/ConfirmationLetter";
import Project from "views/Project";
import Holidays from "views/Holidays";
import Appraisal from "views/Appraisal";
import Banner from "views/Banner";
import Attendance from "views/Attendance";
import EditAttendance from "views/EditAttendance";
import ApplyLeave from "views/ApplyLeave";
import Faq from "views/Faq";
import Profile from "views/Profile";
import OffboardForAdmins from "views/OffboardForAdmins";
import Offboard from "views/Offboard";
import Policies from "views/Policies";
import Events from "views/Events";
import EmpAttendance from "views/EmpAttendance";
import EmpReport from "views/EmpReport";
import Post from "views/Post";
import AssetRequestForm from "views/AssetRequestForm";
import Pendingrequest from "views/Pendingrequest";
import LeaveRequestList from "views/LeaveRequestList";
import DocumentRequestList from "views/DocumentRequestList";
import AssetRequestList from "views/AssetRequestList";
import ScheduleMeeting from "views/ScheduleMeeting";
import ChecklistApproval from "views/ChecklistApproval";
import FinalClearance from "views/FinalClearance";

function Admin() {

  const navigate = useNavigate();
  const location = useLocation();

  // Hide Sidebar when the user is on the Events page
  const shouldShowSidebar = location.pathname !== "/admin/Events";

  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);
  const mainPanel = useRef(null);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.path}
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
       {shouldShowSidebar && <Sidebar color={color} image={hasImage ? image : ""} routes={dashboardRoutes()} /> }
        <div className={`main-panel ${shouldShowSidebar ? "" : "full-width"}`} ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Routes>
              {/* Render the dashboard component */}
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Leaves" element={<Leaves />} />
              <Route path="Applyleave" element={<ApplyLeave />} />
              <Route path="Attendance" element={<Attendance />} />
              <Route path="PendingRequest/Attendance" element={<Attendance />} />
              <Route path="EmployeeAttendance" element={<EmpAttendance />} />
              <Route path="Attendance/:name" element={<EditAttendance />} />
              <Route path="Banner" element={<Banner/>} />
              <Route path="Profile" element={<Profile/>} />
              <Route path="FAQ" element={<Faq/>} />
              <Route path="Post" element={<Post/>} />
              <Route path="AssetRequest" element={<AssetRequestForm/>} />
              <Route path="PendingRequest" element={<Pendingrequest/>} />
              <Route path="PendingRequest/LeaveRequestList" element={<LeaveRequestList/>} />
              <Route path="PendingRequest/DocumentRequestList" element={<DocumentRequestList/>} />
              <Route path="PendingRequest/AssetRequestList" element={<AssetRequestList/>} />
              <Route path="Users" element={<Users />} />
              <Route path="Users/Addnewuser" element={<AddNewUser />} />
              <Route path="Users/:name" element={<EditUser />} />
              <Route path="Events" element={<Events />} />
              <Route path="Department" element={<Department />} />
              <Route path="Addnewdept" element={<AddNewDept />} />
              <Route path="Editdept" element={<EditDept />} />
              <Route path="Users/Signup" element={<Signup />} />
              <Route path="Employeepage" element={<EmployeePage />} />
              <Route path="Editempdetails" element={<EditEmpDetails />} />
              <Route path="Resendactivationlink" element={<ResendActivationLinkForm />} />
              <Route path="Registerpage" element={<RegisterPage />} />
              <Route path="Performance" element={<Performance />} />
              <Route path="Project" element={<Project />} />
              <Route path="Report" element={<Report />} />
              <Route path="FinalClearance/Report" element={<Report />} />
              <Route path="EmployeeReport" element={<EmpReport />} />
              <Route path="Report" element={<Document />} />
              <Route path="Jobportal" element={<JobPortal />} />
              <Route path="Jobdashboard" element={<JobDashboard />} />
              <Route path="Applicant" element={<Applicant />} />
              <Route path="Positions" element={<Positions />} />
              <Route path="Resumes" element={<Resumes />} />
              <Route path="Settings" element={<Settings />} />
              <Route path="Authentication" element={<Authentication />} />
              <Route path="Offerletter" element={<OfferLetter />} />
              <Route path="Relievingletter" element={<RelievingLetter />} />
              <Route path="Experienceletter" element={<ExperienceLetter />} />
              <Route path="Appointmentletter" element={<AppointmentLetter />} />
              <Route path="Confirmationletter" element={<ConfirmationLetter />} />
              <Route path="Holidays" element={<Holidays />} />
              <Route path="Appraisal" element={<Appraisal/>} />
              <Route path="Policies" element={<Policies/>} />
              <Route path="Offboarded/Policies" element={<Policies/>} />
              <Route path="Offboard" element={<Offboard/>} />
              <Route path="Offboarded" element={<OffboardForAdmins/>} />
              <Route path="PendingRequest/Offboarded" element={<OffboardForAdmins/>} />
              <Route path="Offboarded/ScheduleMeeting" element={<ScheduleMeeting/>} />
              <Route path="ScheduleMeeting/Checklist" element={<ChecklistApproval/>} />
              <Route path="Checklist/FinalClearance" element={<FinalClearance/>} />
              
              {/* Dynamically generate all the routes from dashboardRoutes */}
              {getRoutes(dashboardRoutes())}

              {/* Redirect /admin to /admin/dashboard */}
              <Route path="/" element={<Navigate to="Dashboard" />} />

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
