import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'components/ContextProvider/Context';
import { ImSearch } from "react-icons/im";

export default function Users() {

    const navigate = useNavigate();
     const { role, setRole } = useFormContext();
     const [showCreateCredential, setShowCreateCredential] = useState(false); //state for visibility of create credential btn
     const showAddRoleBtn = role === 'SUPER_ADMIN' && location.pathname === '/admin/users';

    // to navigate to add new user page
    const handleAddNewClick = () => {
        navigate('/admin/addnewuser');
    }

    const handleCreateCredential = (e) => {
        e.preventDefault();
        navigate('/admin/signup');
        !setShowCreateCredential;
        console.log('create credential form reached', !showCreateCredential);
    }

    return (
        <div className='container-fluid'>
            <div class="section-body">
                <div class="container-fluid">
                    <div className=" d-flex justify-content-between align-items-center" style={{ flexDirection: "row-reverse" }}>
                        {/* <ul class="nav nav-tabs page-header-tab">
                            <li class="nav-item">
                                <a class='nav-link' id="user-list" data-toggle="tab" href="#user-list">List</a>
                            </li>
                        </ul> */}
                        {showAddRoleBtn && (
                            <div className="icons-list">
                                <div>
                                    <button type="button" className="add-btn" onClick={handleCreateCredential}>Add Admin</button>
                                </div>
                            </div>
                        )}
                        {/* <div class="header-action">
                            <button type="button" class="add-btn" fdprocessedid="g0g9qd" onClick={handleAddNewClick}>
                                <i class="fe fe-plus mr-2"></i>+Add New User
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* user list table */}
            <div className='section-body mt-4'>
                <div className='container-fluid'>
                    <div className='tab-content'>
                        <div className='tab-pane fade active show' id="Employee-list" role='tabpanel'>
                            <div className='card'>
                                <div class="card-header">
                                    <div className='employeelist-header'>
                                        {/* <h3 class="card-title mb-0 ml-4">User List  :</h3> */}
                                        <div class="header-action">
                                            <button type="button" class="add-btn ml-4" fdprocessedid="g0g9qd" onClick={handleAddNewClick}>
                                                <i class="fe fe-plus"></i>+Add New User
                                            </button>
                                        </div>
                                        <div >
                                            <form className="user-searchForm">
                                                     <input class="form-control me-2 search" type="search" placeholder="Search user" aria-label="Search" />
                                                     <i> <ImSearch className='searchIcon' /></i>
                                                   </form>
                                        </div>
                                    </div>
                                    <div className='card-body'>
                                        <div className='table-responsive'>
                                            <table className='table table-hover table-striped table-vcenter text-nowrap mb-0'>
                                                <thead>
                                                    <tr>
                                                        <th>S.No.</th>
                                                        <th class="name-column">Name</th>
                                                        <th>Role</th>
                                                        <th>Created Date</th>
                                                        <th>Designation</th>
                                                        <th class="action-column">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='w40'>1.</td>
                                                        {/* <td class="w40">
                                                            <label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label>
                                                        </td> */}
                                                        <td>Saurav Katiyar </td>
                                                        <td><span className="role">Super Admin</span></td>
                                                        <td>12-Jun-2015</td>
                                                        <td>CEO and Founder</td>
                                                        <td>
                                                            <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="tvsb17">
                                                                <img src={require("assets/img/edit.png")} alt="..." className='delete-icon' />
                                                            </button>
                                                            <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                                                <img src={require("assets/img/delete.png")} alt="..." className='delete-icon' />
                                                            </button>
                                                            <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                                                <img src={require("assets/img/enable.png")} alt="..." className='toggle-icon' />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="w40">2.
                                                            {/* <label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label> */}
                                                        </td>
                                                        <td>Gaurav Katiyar</td>
                                                        <td><span class="tag tag-danger role">Super Admin</span></td>
                                                        <td>28-July-2015</td>
                                                        <td>Director of Finance</td>
                                                        <td>
                                                            <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="b0za8">
                                                                <img src={require("assets/img/edit.png")} alt="..." className='delete-icon' />
                                                            </button>
                                                            <button type="button" class="btn btn-icon btn-sm js-sweetalert icons" title="Delete" data-type="confirm" fdprocessedid="5qdlk5">
                                                                <img src={require("assets/img/delete.png")} alt="..." className='delete-icon' />
                                                            </button>
                                                            <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                                                <img src={require("assets/img/enable.png")} alt="..." className='toggle-icon' />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="w40">3.
                                                            {/* <label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label> */}
                                                        </td>
                                                        <td>Avinash Gautam</td>
                                                        <td><span class="tag tag-danger admin-role">HR Admin</span></td>
                                                        <td>13-Jun-2015</td>
                                                        <td>HR Admin</td>
                                                        <td>
                                                            <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="2n2st">
                                                                <img src={require("assets/img/edit.png")} alt="..." className='delete-icon' />
                                                            </button>
                                                            <button type="button" class="btn btn-icon btn-sm js-sweetalert icons" title="Delete" data-type="confirm" fdprocessedid="y2m5v">
                                                                <img src={require("assets/img/delete.png")} alt="..." className='delete-icon' />
                                                            </button>
                                                            <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                                                <img src={require("assets/img/enable.png")} alt="..." className='toggle-icon' />
                                                            </button>
                                                        </td>
                                                    </tr>

                                                </tbody>

                                            </table>

                                        </div>


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
