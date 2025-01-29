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
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import routes from "routes.js";
import { useFormContext } from "../ContextProvider/Context";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const { role, setRole } = useFormContext();
  useEffect(() => {
    const storedRole = sessionStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // const [showSignup, setShowSignup] = useState(false);
  // const notificationIcons = role === 'SUPER_ADMIN' ? 'create-admin-btn' : 'without-btn'; //for adjust styling based on button render
  // const showCreateUserBtn = role === 'SUPER_ADMIN' && location.pathname === '/admin/users';

  // const handleSignupClick = (e) => {
  //   e.preventDefault();
  //   navigate('/admin/signup');
  //   !setShowSignup;
  //   console.log('create credential form reached', !showSignup);

  // }

  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  // const getBrandText = () => {
  //   for (let i = 0; i < routes.length; i++) {
  //     if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
  //       return routes[i].name;
  //     }
  //   }
  //   return "Brand";
  // };

  return (
    // <Navbar bg="light" expand="lg">
    //   <Container fluid>
    //     <div className="d-flex justify-content-center align-items-center ml-2 mt-4 ml-lg-0">
    //       <Button
    //         variant="dark"
    //         className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
    //         onClick={mobileSidebarToggle}
    //       >
    //         <i className="fas fa-ellipsis-v"></i>
    //       </Button>
    //       <Navbar.Brand
    //         href="#home"
    //         onClick={(e) => e.preventDefault()}
    //         className="mr-2"
    //       >
    //         {/* {getBrandText()} */}
    //       </Navbar.Brand>
    //     </div>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
    //       <span className="navbar-toggler-bar burger-lines"></span>
    //       <span className="navbar-toggler-bar burger-lines"></span>
    //       <span className="navbar-toggler-bar burger-lines"></span>
    //     </Navbar.Toggle>
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="nav mr-auto" navbar>
    //         <Nav.Item>
    //           <Nav.Link
    //             data-toggle="dropdown"
    //             href="#pablo"
    //             onClick={(e) => e.preventDefault()}
    //             className="m-0">
    //             {/* <i className="nc-icon nc-palette"></i> */}
    //             <span className="d-lg-none ml-1">Dashboard</span>
    //           </Nav.Link>
    //         </Nav.Item>
    //         {/* <Dropdown as={Nav.Item}>
    //           <Dropdown.Toggle
    //             as={Nav.Link}
    //             data-toggle="dropdown"
    //             id="dropdown-67443507"
    //             variant="default"
    //             className="m-0"
    //           >
    //             <i className="nc-icon nc-planet"></i>
    //             <span className="notification">5</span>
    //             <span className="d-lg-none ml-1">Notification</span>
    //           </Dropdown.Toggle>
    //           <Dropdown.Menu>
    //             <Dropdown.Item
    //               href="#pablo"
    //               onClick={(e) => e.preventDefault()}
    //             >
    //               Notification 1
    //             </Dropdown.Item>
    //             <Dropdown.Item
    //               href="#pablo"
    //               onClick={(e) => e.preventDefault()}
    //             >
    //               Notification 2
    //             </Dropdown.Item>
    //             <Dropdown.Item
    //               href="#pablo"
    //               onClick={(e) => e.preventDefault()}
    //             >
    //               Notification 3
    //             </Dropdown.Item>
    //             <Dropdown.Item
    //               href="#pablo"
    //               onClick={(e) => e.preventDefault()}
    //             >
    //               Notification 4
    //             </Dropdown.Item>
    //             <Dropdown.Item
    //               href="#pablo"
    //               onClick={(e) => e.preventDefault()}
    //             >
    //               Another notification
    //             </Dropdown.Item>
    //           </Dropdown.Menu>
    //         </Dropdown> */}
    //         {/* year filter */}
    //         {/* <select class="custom-select" fdprocessedid="dvwj5t">
    //           <option>Year</option>
    //           <option>Month</option>
    //           <option>Week</option>
    //         </select> */}
            
    //       </Nav>
    //       <Nav className="ml-auto mb-0 p-0 d-flex align-items-center" navbar>
    //         {/* {navbar icons} */}
    //         <div className={notificationIcons}>
    //           <div class="dropdown d-flex">
    //             <a href="/#" class="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown" aria-expanded="false">
    //             {/* email icon */}
    //               <i class="fa fa-envelope" style={{ fontSize:'18px'}}></i>
    //               <span class="badge badge-success nav-unread"></span></a>
    //             <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow" x-placement="bottom-end"
    //               style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(38px, 26px, 0px)' }}>
    //               <ul class="right_chat list-unstyled w250 p-0">
    //                 <li class="online">
    //                   <a href="fake_url"><div class="media"><img class="media-object " src="../assets/images/xs/avatar4.jpg" alt="fake_url" />
    //                     <div class="media-body"><span class="name">Donald Gardner</span><span class="message">Designer, Blogger</span><span class="badge badge-outline status"></span></div>
    //                   </div>
    //                   </a>
    //                 </li>
    //                 <li class="online"><a href="fake_url"><div class="media"><img class="media-object " src="../assets/images/xs/avatar5.jpg" alt="fake_url" />
    //                   <div class="media-body"><span class="name">Wendy Keen</span><span class="message">Java Developer</span><span class="badge badge-outline status"></span></div>
    //                 </div>
    //                 </a>
    //                 </li>
    //                 <li class="offline"><a href="fake_url"><div class="media"><img class="media-object " src="../assets/images/xs/avatar2.jpg" alt="fake_url" />
    //                   <div class="media-body"><span class="name">Matt Rosales</span><span class="message">CEO, Epic Theme</span><span class="badge badge-outline status"></span></div>
    //                 </div>
    //                 </a>
    //                 </li>
    //                 <li class="online"><a href="fake_url"><div class="media"><img class="media-object " src="../assets/images/xs/avatar3.jpg" alt="fake_url" />
    //                   <div class="media-body"><span class="name">Phillip Smith</span><span class="message">Writter, Mag Editor</span><span class="badge badge-outline status"></span></div>
    //                 </div>
    //                 </a>
    //                 </li>
    //               </ul>
    //               <div class="dropdown-divider"></div><a class="dropdown-item text-center text-muted-dark readall">Mark all as read</a></div>
    //           </div>
    //           <div class="dropdown d-flex"><a href="/#" class="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown" aria-expanded="false">
    //           {/* notification-icon */}
    //           <i class="fa fa-bell" style={{ fontSize:'18px'}}></i>
    //           <span class="badge badge-primary nav-unread"></span></a>
    //             <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow" x-placement="bottom-end"
    //               style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(38px, 26px, 0px)' }}>
    //               <ul class="list-unstyled feeds_widget"><li><div class="feeds-left"><i class="fa fa-check"></i></div>
    //                 <div class="feeds-body"><h4 class="title text-danger">Issue Fixed <small class="float-right text-muted">11:05</small></h4><small>WE have fix all Design bug with Responsive</small></div>
    //               </li>
    //                 <li><div class="feeds-left">
    //                   <i class="fa fa-user"></i>
    //                 </div><div class="feeds-body"><h4 class="title">New User <small class="float-right text-muted">10:45</small></h4><small>I feel great! Thanks team</small></div></li>
    //                 <li><div class="feeds-left"><i class="fa fa-thumbs-o-up"></i></div><div class="feeds-body"><h4 class="title">7 New Feedback <small class="float-right text-muted">Today</small></h4><small>It will give a smart finishing to your site</small></div></li>
    //                 <li><div class="feeds-left"><i class="fa fa-question-circle"></i></div><div class="feeds-body"><h4 class="title text-warning">Server Warning <small class="float-right text-muted">10:50</small></h4><small>Your connection is not private</small></div></li><li><div class="feeds-left"><i class="fa fa-shopping-cart"></i></div><div class="feeds-body"><h4 class="title">7 New Orders <small class="float-right text-muted">11:35</small></h4><small>You received a new oder from Tina.</small></div></li>
    //               </ul>
    //               <div class="dropdown-divider"></div><a href="fake_url" class="dropdown-item text-center text-muted-dark readall">Mark all as read</a></div>
    //           </div>
    //           <div class="dropdown d-flex"><a href="/#" class="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown" aria-expanded="false">
    //             {/* profile icon */}
    //             <img
    //              src={require("assets/img/profile-img.webp")}
    //               alt="Profile"
    //               class="profile-img"
    //             />
    //           </a>
    //             <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow" x-placement="top-end"
    //               style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(38px, 26px, 0px)' }}>
    //               <a class="dropdown-item" href="/profile">
    //                 <i class="dropdown-icon fe fe-user"></i> Profile</a>
    //               <a class="dropdown-item"><i class="dropdown-icon fe fe-settings"></i> Settings</a>
    //               <a class="dropdown-item"><span class="float-right"><span class="badge badge-primary">6</span></span><i class="dropdown-icon fe fe-mail"></i> Inbox</a><a class="dropdown-item"><i class="dropdown-icon fe fe-send"></i> Message</a><div class="dropdown-divider"></div><a class="dropdown-item"><i class="dropdown-icon fe fe-help-circle"></i> Need help?</a><a class="dropdown-item" href="/login"><i class="dropdown-icon fe fe-log-out"></i> Sign out</a></div></div>
    //         </div>
    //         <Nav.Item>
    //           <Nav.Link
    //             className="m-0"
    //             href="#pablo"
    //             onClick={(e) => e.preventDefault()}
    //           >
    //             {showCreateUserBtn && (
    //               <div className="icons-list" style={{ marginTop: '21px'}}>
    //                 <div>
    //                   <button type="button" className="add-btn" onClick={handleSignupClick}>Create User</button>
    //                 </div>
    //               </div>
    //             )}

    //           </Nav.Link>
    //         </Nav.Item>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <div></div>
  );
}

export default Header;
