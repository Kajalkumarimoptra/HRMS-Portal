import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'components/ContextProvider/Context';
import { ImSearch } from "react-icons/im";
import { GrEdit } from "react-icons/gr";
import Breadcrumb from './Breadcrumb';
import axios from 'axios';

export default function Employees() {

    const navigate = useNavigate();
    const { users, setUsers, setServerError } = useFormContext();
    const [getRoleForShowAddAdminBtn, setGetRoleForShowAddAdminBtn] = useState(localStorage.getItem('role'));  // Get role from local storage

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
    const employees = users.filter(user => user.roleName === "EMPLOYEE");
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return (
        <div className='container-fluid'>
           <Breadcrumb/>
             {/* user list table */}
            <div className='section-body'>
                <div className='container-fluid'>
                    <div className='tab-content'>
                        <div className='tab-pane fade active show' id="Employee-list" role='tabpanel'>
                            <div className='card'>
                                <div class="card-header">
                                    <div className='card-body' style={{ padding: "0px 15px 17px 15px"}}>
                                                {/* table for employee */}
                                                {employees.length > 0 ? (
                                                    <div className='user-table'>
                                                        <table className='table table-hover table-vcenter text-nowrap mb-0'>
                                                            <thead>
                                                                <tr>
                                                                    <th class="name-column">Name</th>
                                                                    <th>Role</th>
                                                                    <th>Joining Date</th>
                                                                    <th>Designation</th>
                                                                    <th>Client</th>
                                                                    <th style={{ width: "16%" }}>Reporting Manager</th>
                                                                    <th>View Details</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {employees.map((list, index) => (
                                                                    <tr key={index}>
                                                                        <td>{list.name}</td>
                                                                        <td>
                                                                            <span className='user-role'> {capitalize(list.roleName.toLowerCase())}</span></td>
                                                                        <td> {new Date(list.joiningDate)
                                                                            .toLocaleDateString("en-GB", {
                                                                                year: "numeric",
                                                                                month: "2-digit",
                                                                                day: "2-digit",
                                                                            })
                                                                            .split("/")
                                                                            .join("-")}</td>
                                                                        <td>{list.designation}</td>
                                                                        <td>{list.projects}</td>
                                                                        <td>{list.projectManager}</td>
                                                                        <td>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
