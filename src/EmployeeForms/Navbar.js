import React from 'react';
import { Link } from 'react-router-dom';
import { ImSearch } from "react-icons/im";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPerson } from "react-icons/io5";

export default function Navbar() {
    return (
        <nav className="employee-form-navbar">
            <div className="container-fluid">

                <div className="nav-logo">
                    <img src={require("assets/img/reactlogo.png")} alt="..." />
                </div>

                {/* <form class="navbar-searchForm">
                    <input class="form-control me-2 search" type="search" placeholder="Search Employee" aria-label="Search" />
                    <i><ImSearch className='searchIcon' /></i>
                </form> */}
                {/* <div className='registerButtons'>
                    <button className="notificationButton">
                        <IoIosNotificationsOutline className='notificationIcon' />
                    </button>
                    <h6 className='hradmin'>HR Admin</h6>
                    <span><IoPerson /></span>
                    <i></i>
                </div> */}
            </div>
        </nav>
    )
}
