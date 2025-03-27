import React, { useState, useEffect } from "react";
import { useLocation, NavLink, navigate, useNavigate } from "react-router-dom";
import { useFormContext } from "../ContextProvider/Context";
import { Nav } from "react-bootstrap";
import logo from "assets/img/reactlogo.png";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import performanceIcon from "assets/img/performance-icon.png";
import offboardIcon from "assets/img/exit-icon.png";
import Offboard from "views/Offboard";
import { useOffboardPopupContext } from "components/ContextProvider/OffboardPopupContext";

function Sidebar({ color, image, routes }) {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    trigger,
    setValue,
    watch,
    reset,
    clearErrors,
    setError,
    serverError,
    setServerError
  } = useFormContext();

  const [roleBasedSection, setRoleBasedSection] = useState(null);
  const { isExitOpen, setExitOpen } = useOffboardPopupContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState("Dashboard");
  const [activeMenu, setActiveMenu] = useState(""); // Track active menu item

  useEffect(() => {
    // Directly read the role from localStorage
    const storedRole = localStorage.getItem("role");
    setRoleBasedSection(storedRole);
  }, []);

  // Update active menu on route change
  useEffect(() => {
    setActiveMenu(location.pathname); // Set active menu based on current URL
  }, [location]);

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const toggleSubmenu = (menuName, menuPath) => {
    if (menuName === "Offboard") {
      setExitOpen(true); // Show the pop-up instead of navigating
      navigate('/admin/Offboard');
      console.log("Exit popup should open");

      // Store Offboard selection in localStorage
      localStorage.setItem("selectedOffboardMenu", "Offboard");
      console.log("Selected offboard menu:", menuName);
      setActiveMenu(menuPath);

      return; // Prevent setting active menu for Offboard explicitly
    }
    if (menuName === "Offboarded") {
      navigate(menuPath); // Navigate properly
      console.log("Navigating to Offboarded Employees");

      // Store Offboarded Employees selection in localStorage
      localStorage.setItem("selectedOffboardMenu", "Offboarded Employees");
      setActiveMenu(menuPath);
      return;
    }

    if (["Employee", "Opportunities", "More"].includes(menuName)) {
      setOpenSubmenu(openSubmenu === menuName ? "" : menuName);
      setActiveMenu(menuPath);
    } else {
      navigate(menuPath); // Navigate directly if it's not a menu with a submenu
      setActiveMenu(menuPath);
    }
  };

  return (
    <div className="sidebar" data-image={image} >
      <div
        className="sidebar-background"

      // style={{
      //   backgroundImage: "url(" + image + ")"
      // }}
      />
      <div className="sidebar-wrapper">
        {/* <div className="logo">
          <div className="logo-img">
              <img src={require("assets/img/reactlogo.png")} alt="..." />
            </div>
          <h5 className="simple-text">HR PORTAL</h5>
        </div> */}
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect && prop.inSidebar) {
              const isActive = activeMenu === (prop.path); // Compare with activeMenu

              // Check if the role is "emp" and hide specific menus
              if (roleBasedSection === "EMPLOYEE" && "Employee".includes(prop.name)) {
                return null; // Skip rendering these menus
              }

              return (
                <React.Fragment key={key}>
                  <li className="nav-item">
                    {/* <p className={`${activeMenu === (prop.layout + prop.path) ? "active" : ""}`}></p> */}
                    {/* <li className={`nav-item ${activeMenu === (prop.layout + prop.path) ? "active" : ""}`}> */}
                    <div
                      className="nav-link"
                      onClick={() => toggleSubmenu(prop.name, prop.path)} // Toggle on click
                      style={{ cursor: "pointer" }} >
                      {/* Check if icon should have the dots inside */}
                      {prop.icon === "custom-circle" ? (
                        <i
                          className={prop.icon}
                          style={{
                            position: "relative",
                            fontSize: "24px",
                            color: "white",
                            width: "17px",
                            height: "17px",
                            textAlign: "center",
                            lineHeight: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                            border: '2px solid #14213D ',
                            backgroundColor: "transparent",
                            marginTop: '6px',
                            left: '7px',
                            marginRight: '24px'
                          }}
                        >
                          <span className="dots">...</span> {/* Dots inside the circle */}
                        </i>
                      ) : prop.icon === "fa fa-handshake" ? (
                        <i
                          className={prop.icon}
                          style={{ marginTop: "8px", fontSize: "15px", color: "transparent", webkitTextStroke: '1px #14213D', textShadow: 'none' }}
                        />) : prop.icon === "fa fa-users" ? (
                          <i
                            className={prop.icon}
                            style={{ marginTop: "7px", fontSize: "15px", color: "transparent", webkitTextStroke: '1px #14213D', textShadow: 'none' }}
                          />) : prop.icon === "fa fa-user" ? (
                            <i
                              className={prop.icon}
                              style={{ marginTop: "6px", fontSize: "15px", color: "transparent", webkitTextStroke: '1px #14213D', textShadow: 'none' }}
                            />) : prop.icon === "fa fa-file" ? (
                              <i
                                className={prop.icon}
                                style={{ marginTop: "7px", fontSize: "15px", color: "transparent", webkitTextStroke: '1px #14213D', textShadow: 'none' }}
                              />)
                        : prop.icon === performanceIcon ? (
                          <img
                            src={require("assets/img/performance-icon.png")}
                            alt="Performance Icon"
                            style={{ width: '22px', height: '22px', margin: '-7px 17px 0px 6px' }}
                          />) : prop.icon === offboardIcon ? (
                            <img
                              src={require("assets/img/exit-icon.png")}
                              alt="Performance Icon"
                              style={{ width: '17px', height: '17px', margin: '-3px 17px 0px 10px' }}
                            />) : (
                          <i
                            className={prop.icon}
                            style={{ color: "transparent", fontSize: "15px", marginTop: "6px", webkitTextStroke: '1px #14213D', textShadow: 'none' }}
                          />
                        )}
                      <p className={isActive ? "active" : ""}>
                        {prop.name}
                      </p>
                      {/* The icon will appear beside the menu item */}
                      {["Employee", "Opportunities", "More"].includes(prop.name) && (
                        <img src={require("assets/img/dropdown_icon.png")} alt="..." style={{ width: '10px', height: '10px', marginLeft: '10px', marginTop: '-3px' }} />
                      )}
                    </div>
                  </li>
                  {/* sub-options for employee */}
                  {prop.name === "Employee" && openSubmenu === prop.name && (
                    <ul className="subdropdown">
                      <li className='nav-item'>
                        <NavLink to="/admin/Registerpage"
                          className="nav-link"
                          isActive={(match) => match}>
                          <HiAdjustmentsHorizontal /> <p className={window.location.pathname === "/admin/Registerpage" ? "active" : ""}>Add Employee</p>
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink to="/admin/Employeepage"
                          className="nav-link"
                          isActive={(match) => match}>
                          <HiAdjustmentsHorizontal /> <p className={window.location.pathname === "/admin/Employeepage" ? "active" : ""}>Employee List</p>
                        </NavLink>
                      </li>
                    </ul>
                  )}

                  {/* Sub-options for Job Portal */}
                  {prop.name === "Opportunities" && openSubmenu === prop.name && (
                    <ul className="subdropdown">
                      <li className="nav-item">
                        <NavLink to="/admin/Jobdashboard" className="nav-link"
                          isActive={(match) => match}>
                          <HiAdjustmentsHorizontal /> <p className={window.location.pathname === "/admin/Jobdashboard" ? "active" : ""}>Career</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/Positions" className="nav-link"
                          isActive={(match) => match}>
                          <HiAdjustmentsHorizontal /> <p className={window.location.pathname === "/admin/Positions" ? "active" : ""}>Positions</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/Applicant" className="nav-link"
                          isActive={(match) => match}>
                          <HiAdjustmentsHorizontal /> <p className={window.location.pathname === "/admin/Applicant" ? "active" : ""}>Applicant</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/Resumes" className="nav-link"
                          isActive={(match) => match}>
                          <HiAdjustmentsHorizontal /> <p className={window.location.pathname === "/admin/Resumes" ? "active" : ""}>Resumes</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/Settings" className="nav-link"
                          isActive={(match) => match}>
                          <HiAdjustmentsHorizontal /> <p className={window.location.pathname === "/admin/Settings" ? "active" : ""}>Settings</p>
                        </NavLink>
                      </li>
                    </ul>
                  )}
                  {/* To render modal on menu click */}
                  {(roleBasedSection === "EMPLOYEE" || isExitOpen) && <Offboard />}
                </React.Fragment>
              );
            }
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
