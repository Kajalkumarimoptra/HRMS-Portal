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
import Dashboard from "views/Dashboard.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Signup from "views/Signup";
import EmployeePage from "views/EmployeePage";
import RegisterPage from "views/RegisterPage";
import Users from "views/Users";
import AddNewUser from "views/AddNewUser";
import Project from "views/Project";
import Document from "views/Document";
import Department from "views/Department";
import Performance from "views/Performance";
import performanceIcon from "assets/img/performance-icon.png";
import offboardIcon from "assets/img/exit-icon.png";
import Activities from "views/Activities";
import Events from "views/Events";
import Holidays from "views/Holidays";
import Report from "views/Report";
import JobPortal from "views/JobPortal";
import JobDashboard from "views/JobDashboard";
import Positions from "views/Positions";
import Applicant from "views/Applicant";
import Resumes from "views/Resumes";
import Settings from "views/Settings";
import OfferLetter from "views/OfferLetter";
import Authentication from "views/Authentication";
import ResendActivationLinkForm from "views/ResendActivationLinkForm";
import { Component, useState } from "react";
import Offboard from "views/Offboard";
import OffboardForAdmins from "views/OffboardForAdmins";
// const [roleForOffboardMenu, setRoleForOffboardMenu] = useState(null);

// useEffect(() => {
//     // Directly read the role from localStorage
//     const storedRole = localStorage.getItem("role");
//     setRoleForOffboardMenu(storedRole);
//     console.log("Role for conditional rendering of attendance page:", storedRole);
//   }, []); // fetch role for showing offboard menu

// Utility function to get role from localStorage
const getRole = () => {
  const storedRole = localStorage.getItem("role");
  console.log("Role for conditional rendering of offboard page:", storedRole);
  return storedRole;
};

// Get role at the time of file loading
const roleForOffboardMenu = getRole();

// Function to generate dashboard routes dynamically
const getDashboardRoutes = () => {
  const roleForOffboardMenu = getRole();

  return [
  {
    path: "/admin/Dashboard",
    name: "Dashboard",
    icon: "fa fa-home",
    component: Dashboard,
    inSidebar: true // Shows up in sidebar
  },
  {
    path: "/admin/Signup",
    component: Signup,
    inSidebar: false
  },
  {
    name: "Add New User",
    path: "/admin/Addnewuser",
    component: AddNewUser,
    inSidebar: false
  },
  {
    name: "Project",
    path: "/admin/Project",
    component: Project,
    inSidebar: false
  },
  {
    name: "",
    path: "/admin/Resendactivationlink",
    component: ResendActivationLinkForm,
    inSidebar: false
  },
  {
    path: "/admin/Registerpage",
    component: RegisterPage,
    inSidebar: false
  },
  {
    name: "Users",
    icon: "fa fa-users",
    component: Users,
    path: "/admin/Users",
    inSidebar: true
  },
  {
    name: "Department",
    icon: "fa fa-building",
    component: Department,
    path: "/admin/Department",
    inSidebar: true
  },
  {
    name: "Employee",
    icon: "fa fa-user",
    component: EmployeePage,
    inSidebar: true
  },
  {
    path: "/admin/Performance",
    name: "Performance",
    icon: performanceIcon,
    component: Performance,
    inSidebar: true 
  },
  {
    name: "Opportunities",
    icon: "fa fa-handshake",
    inSidebar: true
  },
  {
    path: "/admin/Jobdashboard",
    name: "Job Dashboard",
    icon: "nc-icon nc-circle-09",
    component: JobDashboard,
    inSidebar: false
  },
  {
    path: "/admin/Positions",
    name: "Job Positions",
    icon: "nc-icon nc-circle-09",
    component: Positions,
    inSidebar: false
  },
  {
    path: "/admin/Applicant",
    name: "Job Applicants",
    icon: "nc-icon nc-circle-09",
    component: Applicant,
    inSidebar: false
  },
  {
    path: "/admin/Resumes",
    name: "Job Resumes",
    icon: "nc-icon nc-circle-09",
    component: Resumes,
    inSidebar: false
  },
  {
    path: "/admin/Setting",
    name: "Job Settings",
    icon: "nc-icon nc-circle-09",
    component: Settings,
    inSidebar: false
  },
  {
    path: "/admin/Report",
    name: "Documents",
    component: Document,
    icon: "fa fa-file",
    inSidebar: true
  },
  // Conditional rendering based on the role
  ...(roleForOffboardMenu === "SUPER_ADMIN" || roleForOffboardMenu === "ADMIN"
    ? [
        {
          path: "/admin/Offboarded",
          name: "Offboarded",
          icon: offboardIcon,
          component: OffboardForAdmins,
          inSidebar: true,
        },
      ]
    : [
        {
          path: "/admin/Offboard",
          name: "Offboard",
          icon: offboardIcon,
          component: Offboard,
          inSidebar: true,
        },
      ]),
  // {
  //     path: "/admin/Offboarded",
  //     name: "Offboarded",
  //     icon: offboardIcon,
  //     Component: OffboardForAdmins,
  //     inSidebar: false
  //   } ,
  //   {
  //       path: "/admin/Offboard",
  //       name: "Offboard",
  //       icon: offboardIcon,
  //       Component: Offboard,
  //       inSidebar: true
  //     } 
 
]};
export default getDashboardRoutes;
