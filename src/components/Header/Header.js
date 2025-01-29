import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ImSearch } from "react-icons/im";

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility


  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    console.log('Dropdown visibility before toggle:', dropdownVisible);
    setDropdownVisible(!dropdownVisible);
    console.log('Dropdown visibility after toggle:', !dropdownVisible);
  };

  return (
    <div className='container-fluid header-base'>
      <div className='header-logo'>
        <div className="header-logo-image">
          <img src={require("assets/img/company_logo.png")} alt="..." />
        </div>
        <form className="navbar-searchForm">
          <input class="form-control me-2 search" type="search" placeholder="Search" aria-label="Search" />
          <i> <ImSearch className='searchIcon' /></i>
        </form>
        {/* notification-icons */}
        <div className='d-flex mr-4'>
          <div class="dropdown d-flex">
            <a class="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown" aria-expanded="false">
              {/* bell-icon */}
              <i class="fa fa-bell" style={{ fontSize: '18px' }}></i>
              <span class="badge badge-primary nav-unread"></span></a>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow" x-placement="bottom-end"
              style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px' }}>
              <ul class="list-unstyled feeds_widget"><li><div class="feeds-left"><i class="fa fa-check"></i></div>
                <div class="feeds-body"><h4 class="title text-danger">Issue Fixed <small class="float-right text-muted">11:05</small></h4><small>WE have fix all Design bug with Responsive</small></div>
              </li>
                <li><div class="feeds-left">
                  <i class="fa fa-user"></i>
                </div><div class="feeds-body"><h4 class="title">New User <small class="float-right text-muted">10:45</small></h4><small>I feel great! Thanks team</small></div></li>
                <li><div class="feeds-left"><i class="fa fa-thumbs-o-up"></i></div><div class="feeds-body"><h4 class="title">7 New Feedback <small class="float-right text-muted">Today</small></h4><small>It will give a smart finishing to your site</small></div></li>
                <li><div class="feeds-left"><i class="fa fa-question-circle"></i></div><div class="feeds-body"><h4 class="title text-warning">Server Warning <small class="float-right text-muted">10:50</small></h4><small>Your connection is not private</small></div></li><li><div class="feeds-left"><i class="fa fa-shopping-cart"></i></div><div class="feeds-body"><h4 class="title">7 New Orders <small class="float-right text-muted">11:35</small></h4><small>You received a new oder from Tina.</small></div></li>
              </ul>
              <div class="dropdown-divider"></div><a href="fake_url" class="dropdown-item text-center text-muted-dark readall">Mark all as read</a></div>
          </div>
          {/* search bar */}
          {/* <div className='dropdown d-flex' style={{ marginRight: '-41px'}}>
           <form className="navbar-searchForm">
          <input class="form-control me-2 search" type="search" placeholder="Search" aria-label="Search" />
          <i> <ImSearch className='searchIcon' /></i>
        </form>
        </div> */}
          <div class="dropdown d-flex" style={{ display: 'flex', alignItems: 'center', position: 'relative', overflow: 'visible', visibility: 'visible', opacity: '1' }}>
            <button href="/#" class="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1 dropdown-toggle" type="button"
              onClick={toggleDropdown} style={{ display: 'flex', alignItems: 'center' }}>
              {/* profile icon */}
              <img
                src={require("assets/img/profile-img.webp")}
                alt="Profile"
                class="profile-img"
              />
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <h5 style={{ margin: 0, marginLeft: '9px' }}>Avinash Gautam</h5>
              </span>
            </button>
            <ul
              className="custom-dropdown-menu"
              style={{
                position: 'absolute',
                top: '100%',
                zIndex: 9999,
                backgroundColor: '#fff',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '10px',
                borderRadius: '5px',
                visibility: dropdownVisible ? 'visible' : 'hidden',
                opacity: dropdownVisible ? 1 : 0,
                transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
                listStyleType: 'none'
              }}
            >
              {/* // style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px' }}
             */}
              <li><a class="dropdown-item" style={{ textDecoration: 'none', cursor: "pointer" }}>Change Password</a></li>
              <li><a class="dropdown-item">Logout</a></li>
            </ul>
            {/* <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow" 
              style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px' }}>
              <a class="dropdown-item" href="/profile">
                <i class="dropdown-icon fe fe-user"></i> Profile</a>
              <a class="dropdown-item"><i class="dropdown-icon fe fe-settings"></i> Settings</a>
              <a class="dropdown-item"><span class="float-right"><span class="badge badge-primary">6</span></span><i class="dropdown-icon fe fe-mail"></i> Inbox</a><a class="dropdown-item"><i class="dropdown-icon fe fe-send"></i> Message</a><div class="dropdown-divider"></div><a class="dropdown-item"><i class="dropdown-icon fe fe-help-circle"></i> Need help?</a><a class="dropdown-item" href="/login"><i class="dropdown-icon fe fe-log-out"></i> Sign out</a>
              </div> */}
          </div>
        </div>
      </div>
    </div>

  )
}
