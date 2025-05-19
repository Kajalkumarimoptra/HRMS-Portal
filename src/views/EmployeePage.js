import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from "../components/ContextProvider/Context";
import { toast, ToastContainer } from 'react-toastify';
import Breadcrumb from './Breadcrumb';
import { ImPodcast, ImSearch } from "react-icons/im";
import { GrEdit } from "react-icons/gr";
import axios from 'axios';

export default function EmployeePage() {

    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        reset,
        serverError,
        setServerError,
        clearErrors, role, setRole, users, setUsers
    } = useFormContext();
    const [getRoleForShowResendActivationLinkBtn, setGetRoleForShowResendActivationLinkBtn] = useState(localStorage.getItem('role'));  // Get role from local storage
    const showResendActivationLinkBtn = getRoleForShowResendActivationLinkBtn === 'ADMIN' && location.pathname === '/admin/Employeepage';

    useEffect(() => {
        reset();
    }, []); // Reset after render

    // For the edit button
    const handleEditClick = (list) => {
        navigate(`/admin/Users/${list.name}`, { state: { users: list } });
    };

    // For the view details button
    const handleViewDetailsClick = () => {
        navigate('/admin/Profile');
    };

    // for resend activation link form
    const handleResendActivationLink = () => {
        navigate('/admin/Resendactivationlink')
    }

    const navigate = useNavigate();

    const handleRegisterPage = (e) => {
        e.preventDefault();
        navigate('/admin/Registerpage');
    }

    const handleEditEmpDetailsClick = () => {
        navigate("/admin/Editempdetails");
    }

    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                // Retrieve the token from sessionStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    setServerError('User is not authenticated. Please log in again.');
                    return; // Exit if token is not found
                }

                const response = await axios.get('http://localhost:8081/users/allUsers', {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                });
                if (response && response.data) {
                    console.log('all users list:', response.data);
                    setUsers(response.data); // Set existing users
                }
            } catch (error) {
                if (error.response) {
                    console.error("Error response:", error.response.data);
                    setServerError('Server error');
                } else if (error.request) {
                    console.error("Error request:", error.request);
                    setServerError("No response from server. Please check your network connection.");
                } else {
                    console.error("General error:", error.message);
                    setServerError(`Error: ${error.message}`);
                }
            }

        }
        fetchUsersList();
    }, []);

    //  filter the user list for users and employee table
    const employees = users.filter(user => user.roleName === "EMPLOYEE");

    return (
        <div className='container-fluid' style={{ marginBottom: '30px' }}>
            <Breadcrumb />
            <div class="d-flex justify-content-between align-items-center flex-row-reverse mb-3">
                {/* <ul class="nav nav-tabs page-header-tab">
                    <li class="nav-item">
                        <a class={`nav-link ${activeList === 'all' ? 'active' : ''}`} id="Employee-list-tab" onClick={() => handleListView('all')} data-toggle="tab" href="#Employee-list">All</a>
                    </li>
                    <li class="nav-item">
                        <a class={`nav-link ${activeList === 'leave' ? 'active' : ''}`} id="Employee-request-tab" onClick={() => handleListView('leave')} data-toggle="tab" href="#Employee-request">Leave Request</a>
                    </li>
                </ul> */}
                <div class="header-action">
                    {showResendActivationLinkBtn && (
                        <button type="button" class="add-btn" data-toggle="resendActivationLink" data-target="#resendActivationLink" fdprocessedid="av3mdeg" onClick={handleResendActivationLink}>
                            Resend Activation Link
                        </button>)}

                    <button type="button" class="primary-btn" data-toggle="empReg" data-target="#empRegForm" fdprocessedid="av3mdpe" onClick={handleRegisterPage} style={{ marginLeft: '5px' }}>
                        + Add Employees
                    </button>
                </div>
            </div>

            {/* employee list page */}
            <div className='section-body'>
                <div className='container-fluid'>
                    <div class="row">
                        <div class="col-lg-3 col-md-6">
                            <div class="card">
                                <div class="card-body w_sparkline">
                                    <div class="details">
                                        <span>Total Employee</span>
                                        <h3 class="mb-0 mt-0">
                                            <span class="counter"> <span className='counter-digits' > <CountUp end={614} duration={2} /></span></span>
                                        </h3>
                                    </div>
                                    <div class="w_chart">
                                        <div id="mini-bar-chart1" class="mini-bar-chart">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="card">
                                <div class="card-body w_sparkline">
                                    <div class="details">
                                        <span>New Employee</span>
                                        <h3 class="mb-0 mt-0"><span className='counter-digits'> <CountUp end={124} duration={2} /></span></h3>
                                    </div>
                                    <div class="w_chart">
                                        <span id="mini-bar-chart2" class="mini-bar-chart"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="card">
                                <div class="card-body w_sparkline">
                                    <div class="details">
                                        <span>Male</span>
                                        <h3 class="mb-0 mt-0 counter">
                                            <span className='counter-digits'><CountUp end={504} duration={2} /></span>
                                        </h3>
                                    </div>
                                    <div class="w_chart">
                                        <span id="mini-bar-chart3" class="mini-bar-chart"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="card">
                                <div class="card-body w_sparkline">
                                    <div class="details">
                                        <span>Female</span>
                                        <h3 class="mb-0 mt-0 counter"> <span className='counter-digits'> <CountUp end={100} duration={2} /></span></h3>
                                    </div>
                                    <div class="w_chart">
                                        <span id="mini-bar-chart4" class="mini-bar-chart"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='tab-content'>
                        <div className='tab-pane fade active show' id="Employee-list" role='tabpanel'>
                            <div className='card'>
                                <div class="card-header">
                                    {/* filter blocks */}
                                    <div className='employeelist-header'>
                                        <div>
                                            <h3 class="card-title mb-0 ml-4">Filter  :</h3>
                                        </div>
                                        {/* <div class="header-action">
                                                    <button type="button" class="add-btn" data-toggle="resendActivationLink" data-target="#resendActivationLink" fdprocessedid="av3mdeg" >
                                                    All Employees
                                                    </button>

                                                <button type="button" class="add-btn" data-toggle="empReg" data-target="#empRegForm" fdprocessedid="av3mdpe" style={{ marginLeft: '5px' }}>
                                                    Active Employees
                                                </button>
                                                <button type="button" class="add-btn" data-toggle="empReg" data-target="#empRegForm" fdprocessedid="av3mdpe" style={{ marginLeft: '5px' }}>
                                                    Pending Employees
                                                </button>
                                                <button type="button" class="add-btn" data-toggle="empReg" data-target="#empRegForm" fdprocessedid="av3mdpe" style={{ marginLeft: '5px' }}>
                                                    Exit Employees
                                                </button>
                                            </div> */}
                                        <div>
                                            <form>
                                                <div class="d-flex align-items-center">
                                                    <select class="custom-select" fdprocessedid="dvwj5t">
                                                        <option>All Employees</option>
                                                        <option>Active Employees</option>
                                                        <option>Pending Employees</option>
                                                        <option>Exit Employees</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                        <div >
                                            <form className="user-searchForm">
                                                <input class="form-control me-2 search" type="search" placeholder="Search employee" aria-label="Search" />
                                                <i> <ImSearch className='searchIcon' /></i>
                                            </form>
                                        </div>
                                    </div>
                                    <div className='card-body'>
                                        {employees.length > 0 ? (
                                            <div className='user-table'>
                                                <table className='table table-hover table-vcenter text-nowrap mb-0' style={{ tableLayout: 'auto' }}>
                                                    <thead>
                                                        <tr>
                                                            <th className='serialNo'>S.No.</th>
                                                            <th>Employee Name</th>
                                                            <th>Employee ID</th>
                                                            <th>Official Email Address</th>
                                                            <th>Mobile No.</th>
                                                            <th>Joining Date</th>
                                                            <th>Designation</th>
                                                            <th>Status</th>
                                                            <th class="action-column">Edit Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {employees.map((list, index) => (
                                                            <tr key={index}>
                                                                 <td className='serialColumn'>{index + 1}.</td>
                                                                <td className='nameColumn'>{list.name}</td>
                                                                <td>
                                                                    {list.employeeId}</td>
                                                                <td> {list.email} </td>
                                                                <td>{list.mobileNumber}</td>
                                                                <td>{new Date(list.joiningDate)
                                                                            .toLocaleDateString("en-GB", {
                                                                                year: "numeric",
                                                                                month: "2-digit",
                                                                                day: "2-digit",
                                                                            })
                                                                            .split("/")
                                                                            .join("-")}</td>
                                                                <td>{list.designation}</td>
                                                                <td style={{ backgroundColor: '#00800052', paddingLeft: '11px' }}>Completed</td>
                                                                <td>
                                                                    <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="tvsb17">
                                                                        <GrEdit className='delete-icon' onClick={() => handleEditClick(list)} />
                                                                    </button>
                                                                    <button type="button" class="btn btn-icon btn-sm icons" title="View" data-type="confirm" fdprocessedid="f7knyq">
                                                                        <img src={require("assets/img/view-icon.png")} alt="..." className='delete-icon' onClick={() => handleViewDetailsClick()} />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className="no-records-found text-center">
                                                <p>No record found for employees</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* pagination */}
                            {/* <ul class="pagination mt-2">
                                <li class="page-item"><a class="page-link" href="fake_url;">Previous</a></li>
                                <li class="page-item"><a class="page-link" href="fake_url;">Next</a></li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}
