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
import Department from "views/Department";
import Activities from "views/Activities";
import Events from "views/Events";
import Payroll from "views/Payroll";
import Holidays from "views/Holidays";
import Report from "views/Report";
import JobPortal from "views/JobPortal";
import Accounts from "views/Accounts";
import JobDashboard from "views/JobDashboard";
import Positions from "views/Positions";
import Applicant from "views/Applicant";
import Resumes from "views/Resumes";
import Settings from "views/Settings";
import Documents from "views/Documents";
import Authentication from "views/Authentication";
import ResendActivationLinkForm from "views/ResendActivationLinkForm";
import Language from "views/Language";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fa fa-home",
    component: Dashboard,
    layout: "/admin",
    inSidebar: true // Shows up in sidebar
  },
  {
    path: "/signup",
    component: Signup,
    layout: "/admin",
    inSidebar: false
  },
  {
    name: "Add New User",
    path: "/addnewuser",
    component: AddNewUser,
    layout: "/admin",
    inSidebar: false
  },
  {
    name: "Project",
    path: "/project",
    component: Project,
    layout: "/admin",
    inSidebar: false
  },
  {
    name: "",
    path: "/resendactivationlink",
    component: ResendActivationLinkForm,
    layout: "/admin",
    inSidebar: false
  },
  {
    path: "/registerpage",
    component: RegisterPage,
    layout: "/admin",
    inSidebar: false
  },
  {
    name: "Users",
    icon: "fa fa-users",
    // icon: "nc-icon nc-circle-09",
    component: Users,
    layout: "/admin",
    path: "/users",
    inSidebar: true
  },
  {
    name: "Department",
    icon: "fa fa-building",
    component: Department,
    layout: "/admin",
    path: "/department",
    inSidebar: true
  },
  {
    name: "Employee",
    icon: "fa fa-user",
    component: EmployeePage,
    inSidebar: true
  },
  {
    name: "Opportunities",
    icon: "fa fa-handshake",
    inSidebar: true
  },
  {
    path: "/jobdashboard",
    name: "Job Dashboard",
    icon: "nc-icon nc-circle-09",
    component: JobDashboard,
    layout: "/admin",
    inSidebar: false
  },
  {
    path: "/positions",
    name: "Job Positions",
    icon: "nc-icon nc-circle-09",
    component: Positions,
    layout: "/admin",
    inSidebar: false
  },
  {
    path: "/applicant",
    name: "Job Applicants",
    icon: "nc-icon nc-circle-09",
    component: Applicant,
    layout: "/admin",
    inSidebar: false
  },
  {
    path: "/resumes",
    name: "Job Resumes",
    icon: "nc-icon nc-circle-09",
    component: Resumes,
    layout: "/admin",
    inSidebar: false
  },
  {
    path: "/setting",
    name: "Job Settings",
    icon: "nc-icon nc-circle-09",
    component: Settings,
    layout: "/admin",
    inSidebar: false
  },
  {
    name: "Reports",
    icon: "fas fa-chart-line",
    path: "/report",
    component: Report,
    layout: "/admin",
    inSidebar: true
  },
  {
    name: "Documents",
    icon: "fa fa-file",
    inSidebar: true
  },
  {
    path: "/typography",
    name: "More",
    icon: "custom-circle",
    component: Typography,
    layout: "/admin",
    inSidebar: true
  },
  {
    name: "Activities",
    path: "/activities",
    component: Activities,
    layout: "/admin",
    inSidebar: false
  },
  {
    name: "Holidays",
    path: "/holidays",
    component: Holidays,
    layout: "/admin",
    inSidebar: false
  },
  {
    name: "Events",
    path: "/events",
    component: Events,
    layout: "/admin",
    inSidebar: false
  },
  {
    name: "Payroll",
    path: "/payroll",
    component: Payroll,
    layout: "/admin",
    inSidebar: false
  },
 
  {
    name: "Accounts",
    path: "/accounts",
    component: Accounts,
    layout: "/admin",
    inSidebar: false
  },
  {
    name: "Language",
    path: "/language",
    component: Language,
    layout: "/admin",
    inSidebar: false
  },
];

export default dashboardRoutes;
