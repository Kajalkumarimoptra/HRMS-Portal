import React, { useState, useEffect } from "react";
import { useLocation, NavLink, navigate, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "assets/img/reactlogo.png";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";

function Sidebar({ color, image, routes }) {

  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState("Dashboard");
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  const toggleSubmenu = (menuName, menuPath) => {
    if (openSubmenu === menuName) {
      setOpenSubmenu("");
      navigate(menuPath); // Navigate to the parent page when closing submenu
    } else {
      setOpenSubmenu(menuName);
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
              const isActive = activeRoute(prop.layout + prop.path);

              return (
                <React.Fragment key={key}>
                  <li className={`${prop.upgrade ? "active active-pro" : isActive}`}>
                    <div
                      className="nav-link"
                      onClick={() => toggleSubmenu(prop.name, prop.layout + prop.path)} // Toggle on click
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
                            marginTop: '4px',
                            left: '4px',
                            marginRight: '24px'
                          }}
                        >
                          <span className="dots">...</span> {/* Dots inside the circle */}
                        </i>
                      ) : prop.icon === "fa fa-handshake" ? (
                        <i
                          className={prop.icon}
                          style={{ marginTop: "6px", fontSize: "16px", color: "transparent", webkitTextStroke: '1px #14213D', textShadow: 'none' }}
                        />)
                        : (
                          <i
                            className={prop.icon}
                            style={{ color: "transparent", fontSize: "16px", marginTop: "5px", webkitTextStroke: '1px #14213D', textShadow: 'none' }}
                          />
                        )}
                      <p
                        style={
                          prop.name === "Dashboard"
                            ? { color: '#14213D' }  // Inline styles for Dashboard
                            : {}
                        }
                      >{prop.name}</p>
                      {/* The icon will appear beside the menu item */} 
                      {["Employee", "Opportunities", "Documents", "More"].includes(prop.name) &&(
                        <RiArrowDropDownLine  style={{ fontSize: '24px', marginLeft: '10px', marginTop: '-3px'}}/> 
                      )}
                    </div>
                  </li>
                  {/* Sub-options for Dashboard */}
                  {prop.name === "Dashboard" && openSubmenu === prop.name && (
                    <ul className="subdropdown">
                      {/* <li className="nav-item">
                        <NavLink to="/admin/report"
                          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Report</p>
                        </NavLink>
                      </li> */}
                    </ul>
                  )}
                  {/* sub-options for users */}
                  {/* {prop.name === "Users" && openSubmenu === prop.name && (
                    <ul className="subdropdown">
                      <li className="nav-item">
                        <NavLink to="/admin/users"
                          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>User List</p>
                        </NavLink>
                      </li>
                     
                    </ul>
                  )} */}
                  {/* sub-options for dept. */}
                  {/* {prop.name === "Department" && openSubmenu === prop.name && (
                    <ul className="subdropdown">
                      <li className='nav-item'>
                        <NavLink to="/admin/department"
                          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Dept. List</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/dept"
                          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} >
                          <HiAdjustmentsHorizontal /> <p>Add Dept.</p>
                        </NavLink>
                      </li>
                    </ul>
                  )} */}

                  {/* sub-options for employee */}
                  {prop.name === "Employee" && openSubmenu === prop.name && (
                    <ul className="subdropdown">
                      <li className='nav-item'>
                        <NavLink to="/admin/registerpage"
                          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Add Employee</p>
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink to="/admin/employeepage"
                          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Employee Details</p>
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink to="/admin/leave"
                          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Leave Request</p>
                        </NavLink>
                      </li>
                    </ul>
                  )}

                  {/* Sub-options for Job Portal */}
                  {prop.name === "Opportunities" && openSubmenu === prop.name && (
                    <ul className="subdropdown">
                      <li className="nav-item">
                        <NavLink to="/admin/jobdashboard" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Career</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/positions" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Positions</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/applicant" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Applicant</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/resumes" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Resumes</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/settings" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Settings</p>
                        </NavLink>
                      </li>
                    </ul>
                  )}

                  {/* Sub-options for Authentication */}
                  {prop.name === "Documents" && openSubmenu === prop.name && (
                    <ul className="subdropdown">
                      <li className="nav-item">
                        <NavLink to="/admin/documents" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Offer Letter</p>
                        </NavLink>
                      </li>
                    </ul>
                  )}

                  {/* Sub-options for More */}
                  {prop.name === "More" && openSubmenu === prop.name && (
                    <ul className="subdropdown">
                      <li className="nav-item">
                        <NavLink to="/admin/activities" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Activities</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/holidays" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Holidays</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/events" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Events</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/payroll" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Payroll</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/accounts" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Accounts</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/admin/language" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                          <HiAdjustmentsHorizontal /> <p>Language</p>
                        </NavLink>
                      </li>
                    </ul>
                  )}
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
