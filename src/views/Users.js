import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'components/ContextProvider/Context';
import { ImSearch } from "react-icons/im";
import { GrEdit } from "react-icons/gr";
import Breadcrumb from './Breadcrumb';
import axios from 'axios';

export default function Users() {

    const navigate = useNavigate();
    const { users, setUsers, setServerError } = useFormContext();
    const [getRoleForShowAddAdminBtn, setGetRoleForShowAddAdminBtn] = useState(localStorage.getItem('role'));  // Get role from local storage
    const [showCreateCredential, setShowCreateCredential] = useState(false); //state for visibility of create credential btn
    const showAddRoleBtn = getRoleForShowAddAdminBtn === 'SUPER_ADMIN' && location.pathname === '/admin/Users';

    //  navigating to the form page (for Add and Edit)
    const handleAddNewClick = () => {
        navigate('/admin/Users/Addnewuser');
    };

    // For the edit button
    const handleEditClick = (list) => {
        navigate(`/admin/Users/${list.name}`, { state: { users: list } });
    };

    // For the view details button
    const handleViewDetailsClick = () => {
        navigate('/admin/Profile');
    };

    const handleCreateCredential = (e) => {
        e.preventDefault();
        navigate('/admin/Users/Signup');
        !setShowCreateCredential;
        console.log('create credential form reached', !showCreateCredential);
    };

    useEffect(() => {
        const storedRoleForShowAddAdminBtn = localStorage.getItem('role');
        if (storedRoleForShowAddAdminBtn) {
            setGetRoleForShowAddAdminBtn(storedRoleForShowAddAdminBtn);  // Update state if role is found
        }
    }, []);

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
    const superAdminsAndAdmins = users.filter(user => user.roleName === "SUPER_ADMIN" || user.roleName === "ADMIN");
    const admins = users.filter(user => user.roleName === "ADMIN");
    const employees = users.filter(user => user.roleName === "EMPLOYEE");
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return (
        <div className='container-fluid'>
            <div className=" d-flex justify-content-between align-items-center" style={{ flexDirection: "row-reverse", marginBottom: '18px' }}>
                <div className="icons-list">
                    <Breadcrumb />
                    {showAddRoleBtn && (
                        <div>
                            <button type="button" className="primary-btn" onClick={handleCreateCredential}>Add Admin</button>
                        </div>
                    )}
                </div>
            </div>
            {/* user list table */}
            <div className='section-body'>
                <div className='container-fluid'>
                    <div className='tab-content'>
                        <div className='tab-pane fade active show' id="Employee-list" role='tabpanel'>
                            <div className='card'>
                                <div class="card-header">
                                    {(getRoleForShowAddAdminBtn === "SUPER_ADMIN" || getRoleForShowAddAdminBtn === "ADMIN") && (
                                        <div className='employeelist-header'>
                                            {/* <h3 class="card-title mb-0 ml-4">User List  :</h3> */}
                                            <div class="header-action">
                                                <button type="button" class="primary-btn ml-4" fdprocessedid="g0g9qd" onClick={() => handleAddNewClick()}>
                                                    <i class="fe fe-plus"></i>+ Add New User
                                                </button>
                                            </div>
                                            <div >
                                                <form className="user-searchForm">
                                                    <input class="form-control me-2 search" type="search" placeholder="Search user" aria-label="Search" />
                                                    <i> <ImSearch className='searchIcon' /></i>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                    <div className='card-body' style={getRoleForShowAddAdminBtn === "EMPLOYEE" ? { padding: "0px 15px 15px 15px" } : {}}>
                                        {/* Super Admins & HR Admins Table */}
                                        {(getRoleForShowAddAdminBtn === "SUPER_ADMIN" || getRoleForShowAddAdminBtn === "ADMIN") && (
                                            <>
                                                {/* Combined message when both are empty */}
                                                {superAdminsAndAdmins.length === 0 && employees.length === 0 ? (
                                                    <div className="no-records-found text-center">
                                                        <p>No record found for admins and employees</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {/* Admin table or 'no admin' message */}
                                                        {superAdminsAndAdmins.length > 0 ? (
                                                            <div className='user-table'>
                                                                <table className='table table-hover table-vcenter text-nowrap mb-0'>
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="name-column">Name</th>
                                                                            <th>Role</th>
                                                                            <th>Joining Date</th>
                                                                            <th>Designation</th>
                                                                            <th>Client</th>
                                                                            <th style={{ width: "16%" }}>Reporting Manager</th>
                                                                            <th>Edit</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {superAdminsAndAdmins.map((list, index) => (
                                                                            <tr key={index}>
                                                                                <td>{list.name}</td>
                                                                                <td>
                                                                                    <span className={
                                                                                        list.roleName === 'SUPER_ADMIN' ? 'superadmin-role' :
                                                                                            list.roleName === 'ADMIN' ? 'admin-role' : ''
                                                                                    }>
                                                                                        {capitalize(list.roleName.toLowerCase().replace('_', ' '))}
                                                                                    </span>
                                                                                </td>
                                                                                <td>{new Date(list.joiningDate).toLocaleDateString("en-GB").split("/").join("-")}</td>
                                                                                <td>{list.designation}</td>
                                                                                <td>{list.projects}</td>
                                                                                <td>{list.projectManager}</td>
                                                                                <td>
                                                                                    {(getRoleForShowAddAdminBtn !== "ADMIN" || list.roleName !== 'SUPER_ADMIN') && getRoleForShowAddAdminBtn !== 'EMPLOYEE' && (
                                                                                        <button type="button" className="btn btn-icon btn-sm icons" title="Edit">
                                                                                            <GrEdit className='delete-icon' onClick={() => handleEditClick(list)} />
                                                                                        </button>
                                                                                    )}
                                                                                    <button type="button" className="btn btn-icon btn-sm icons" title="View">
                                                                                        <img src={require("assets/img/view-icon.png")} alt="view" className='delete-icon' onClick={() => handleViewDetailsClick()} />
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        ) : (
                                                            <div className="no-records-found text-center">
                                                                <p>No record found for admins</p>
                                                            </div>
                                                        )}

                                                        {/* Employee table */}
                                                        {employees.length > 0 ? (
                                                            <div className='user-table'>
                                                                <table className='table table-hover table-vcenter text-nowrap mb-0'>
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="name-column">Name</th>
                                                                            <th>Role</th>
                                                                            <th>Joining Date</th>
                                                                            <th>Designation</th>
                                                                            <th>Client</th>
                                                                            <th style={{ width: "16%" }}>Reporting Manager</th>
                                                                            <th>Edit</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {employees.map((list, index) => (
                                                                            <tr key={index}>
                                                                                <td>{list.name}</td>
                                                                                <td><span className='user-role'>{capitalize(list.roleName.toLowerCase())}</span></td>
                                                                                <td>{new Date(list.joiningDate).toLocaleDateString("en-GB").split("/").join("-")}</td>
                                                                                <td>{list.designation}</td>
                                                                                <td>{list.projects}</td>
                                                                                <td>{list.projectManager}</td>
                                                                                <td>
                                                                                    {getRoleForShowAddAdminBtn !== 'EMPLOYEE' && (
                                                                                        <button type="button" className="btn btn-icon btn-sm icons" title="Edit">
                                                                                            <GrEdit className='delete-icon' onClick={() => handleEditClick(list)} />
                                                                                        </button>
                                                                                    )}
                                                                                    <button type="button" className="btn btn-icon btn-sm icons" title="View">
                                                                                        <img src={require("assets/img/view-icon.png")} alt="view" className='delete-icon' onClick={() => handleViewDetailsClick()} />
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        ) : (
                                                            <div className="no-records-found text-center" style={{marginTop: '10px'}}>
                                                                <p>No record found for employees</p>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )}

                                        {/* EMPLOYEE Role Only */}
                                        {getRoleForShowAddAdminBtn === "EMPLOYEE" && (
                                            <>
                                                {employees.length > 0 ? (
                                                    <div className='user-table'>
                                                        <table className='table table-hover table-vcenter text-nowrap mb-0'>
                                                            <thead>
                                                                <tr>
                                                                    <th className="name-column">Name</th>
                                                                    <th>Role</th>
                                                                    <th>Joining Date</th>
                                                                    <th>Designation</th>
                                                                    <th>Client</th>
                                                                    <th style={{ width: "16%" }}>Reporting Manager</th>
                                                                    <th>Edit</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {employees.map((list, index) => (
                                                                    <tr key={index}>
                                                                        <td>{list.name}</td>
                                                                        <td><span className='user-role'>{capitalize(list.roleName.toLowerCase())}</span></td>
                                                                        <td>{new Date(list.joiningDate).toLocaleDateString("en-GB").split("/").join("-")}</td>
                                                                        <td>{list.designation}</td>
                                                                        <td>{list.projects}</td>
                                                                        <td>{list.projectManager}</td>
                                                                        <td>
                                                                            <button type="button" className="btn btn-icon btn-sm icons" title="View">
                                                                                <img src={require("assets/img/view-icon.png")} alt="view" className='delete-icon' onClick={() => handleViewDetailsClick()} />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : (
                                                    <div className="no-records-found text-center" style={{marginTop: '10px'}}>
                                                        <p>No record found for employees</p>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
