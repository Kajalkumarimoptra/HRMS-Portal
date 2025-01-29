import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from "../components/ContextProvider/Context";
import { toast, ToastContainer } from 'react-toastify';
import { ImSearch } from "react-icons/im";

export default function EmployeePage() {

    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        reset,
        serverError,
        setServerError,
        clearErrors, role, setRole
    } = useFormContext();

    useEffect(() => {
        const storedRole = sessionStorage.getItem('role');
        if (storedRole) {
            setRole(storedRole);
        }
    }, []);

    // const [activeList, setActiveList] = useState('all'); // by default,list view is all
    // const [showLeave, setShowLeave] = useState(false); // state variable to control the modal's visibility
    // const [patternForEmpNameForLeave, setPatternForEmpNameForLeave] = useState(''); // pattern for emp name
    // const [patternForEmpIDForLeave, setPatternForEmpIDForLeave] = useState(''); // pattern for emp id
    // const [patternForEmpLeaveReason, setPatternForEmpLeaveReason] = useState(''); // pattern for emp leave reason

    // const [pattern, setPattern] = useState({
    //     empNameForLeave: '',
    //     empIDForLeave: '',
    //     empLeaveReason: ''
    // }); // state for overall handling of pattern

    // const [customErrorForPattern, setCustomErrorForPattern] = useState({
    //     empNameForLeave: '',
    //     empIDForLeave: '',
    //     empLeaveReason: ''
    // }); // error msg for its failure

    // for handling view
    // const handleListView = (tab) => {
    //     setActiveList(tab);
    // }

    // for handling leave table
    // const handleLeave = () => {
    //     setShowLeave(true);
    // }
    // const handleCloseLeave = () => {
    //     setShowLeave(false);
    // }

    useEffect(() => {
        reset();
    }, []); // Reset after render


    // for resend activation link form
    const handleResendActivationLink = () => {
        navigate('/admin/resendactivationlink')
    }

    const navigate = useNavigate();

    const handleRegisterPage = (e) => {
        e.preventDefault();
        navigate('/admin/registerpage');
    }

    // for pattern handling
    // const handlePatternForLeaveInputs = (e, pattern, field) => {
    //     const value = e.target.value;
    //     setPattern(prev => ({ ...prev, [field]: value }));
    //     if (field === 'empNameForLeave') setPatternForEmpNameForLeave(value);
    //     if (field === 'empIDForLeave') setPatternForEmpIDForLeave(value);
    //     if (field === 'empLeaveReason') setPatternForEmpLeaveReason(value);

    //     let patternErrorMessage = '';
    //     if ((field === 'empNameForLeave' || field === 'empLeaveReason') && value && !pattern.test(value)) {
    //         patternErrorMessage = 'No numbers or special characters are allowed';
    //     }
    //     else if (field === 'empIDForLeave') {
    //         if (value && !pattern.test(value)) {
    //             patternErrorMessage = 'Only numbers are allowed';
    //         } else if (value.length !== 6) {
    //             patternErrorMessage = 'Employee ID must be of 6 digits';
    //         }
    //     }

    //     setCustomErrorForPattern(prev => ({ ...prev, [field]: patternErrorMessage }));
    //     // Clear error if input is valid
    //     if (patternErrorMessage === '') {
    //         clearErrors(field);
    //     }
    // }

    // form submission
    // const handleFormSubmit = (data) => {
    //     console.log('form initiated');
    //     console.log('data submitted:', data);
    //     toast.success("Leave details of Employee gets added successfully");
    //     reset();
    // }

    return (
        <div className='container-fluid' style={{ marginTop: '-10px' }}>
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
                    {role === 'ADMIN' && (
                        <button type="button" class="add-btn" data-toggle="resendActivationLink" data-target="#resendActivationLink" fdprocessedid="av3mdeg" onClick={handleResendActivationLink}>
                            Resend Activation Link
                        </button>)}

                    <button type="button" class="add-btn" data-toggle="empReg" data-target="#empRegForm" fdprocessedid="av3mdpe" onClick={handleRegisterPage} style={{ marginLeft: '5px' }}>
                        <i class="plus-sign mr-2">&#43;</i>
                        Add Employees
                    </button>
                </div>
                {/* <div class="header-action">
                    <button type="button" class="add-btn" fdprocessedid="av3mde"
                        onClick={handleLeave} style={{ marginLeft: '5px' }}>
                        <i class="plus-sign mr-2">&#43;</i>
                        Add Leave
                    </button>
                </div> */}
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
                                    <div className='table-responsive'>
                                        <table className='table table-hover table-striped table-vcenter text-nowrap mb-0'>
                                            <thead>
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>Employee Name</th>
                                                    <th>Employee ID</th>
                                                    <th>Official Email Address</th>
                                                    <th>Mobile No.</th>
                                                    <th>Joining Date</th>
                                                    <th>Designation</th>
                                                    <th>Status</th>
                                                    <th class="action-column">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="w40">1.
                                                        {/* <label class="custom-control custom-checkbox">
                                                                    <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" />
                                                                    <span class="custom-control-label">&nbsp;</span>
                                                                </label> */}
                                                    </td>
                                                    <td>Marshall Nichols</td>
                                                    <td>526895</td>
                                                    <td>
                                                        <span>Marshall@gmail.com</span>
                                                    </td>
                                                    <td>
                                                        <span>9126455625</span>
                                                    </td>
                                                    <td>12-Jun-2015</td>
                                                    <td>Web Designer</td>
                                                    <td style={{ backgroundColor: '#00800052', paddingLeft: '11px' }}>Completed</td>
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
                                                    <td class="w40">2.</td>
                                                    <td>Debra Stewart</td>
                                                    <td>568963</td>
                                                    <td>
                                                        <span>marshall-n@gmail.com</span>
                                                    </td>
                                                    <td>
                                                        <span>9126462545</span>
                                                    </td>
                                                    <td>28-July-2015</td>
                                                    <td>Web Developer</td>
                                                    <td style={{ backgroundColor: '#00800052', paddingLeft: '11px' }}>Completed</td>
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
                                                    <td class="w40">3.</td>
                                                    <td>Jane Hunt</td>
                                                    <td>589632</td>
                                                    <td>
                                                        <span>jane-hunt@gmail.com</span>
                                                    </td>
                                                    <td>
                                                        <span>9126465512</span>
                                                    </td>
                                                    <td>13-Jun-2015</td>
                                                    <td>Web Designer</td>
                                                    <td style={{ backgroundColor: 'rgb(251 189 8 / 36%)', paddingLeft: '11px' }}>Pending</td>
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
                                                <tr>
                                                    <td class="w40">4.</td>
                                                    <td>Susie Willis</td>
                                                    <td>521346</td>
                                                    <td>
                                                        <span>sussie-w@gmail.com</span>
                                                    </td>
                                                    <td>
                                                        <span>9126462152</span>
                                                    </td>
                                                    <td>9-May-2016</td>
                                                    <td>Web Developer</td>
                                                    <td style={{ backgroundColor: '#ff000059', paddingLeft: '11px' }}>Exit</td>
                                                    <td>
                                                        <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="9cfz1">
                                                            <img src={require("assets/img/edit.png")} alt="..." className='delete-icon' />
                                                        </button>
                                                        <button type="button" class="btn btn-icon btn-sm js-sweetalert icons" title="Delete" data-type="confirm" fdprocessedid="4htghd">
                                                            <img src={require("assets/img/delete.png")} alt="..." className='delete-icon' />
                                                        </button>
                                                        <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                                            <img src={require("assets/img/enable.png")} alt="..." className='toggle-icon' />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="w40">5.</td>
                                                    <td>Nancy Willis</td>
                                                    <td>528846</td>
                                                    <td>
                                                        <span>nancy-w@gmail.com</span>
                                                    </td>
                                                    <td>
                                                        <span>9126462152</span>
                                                    </td>
                                                    <td>5-May-2016</td>
                                                    <td>Web Developer</td>
                                                    <td style={{ backgroundColor: '#ff000059', paddingLeft: '11px' }}>Exit</td>
                                                    <td>
                                                        <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="9cfz1">
                                                            <img src={require("assets/img/edit.png")} alt="..." className='delete-icon' />
                                                        </button>
                                                        <button type="button" class="btn btn-icon btn-sm js-sweetalert icons" title="Delete" data-type="confirm" fdprocessedid="4htghd">
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
                        {/* pagination */}
                        <ul class="pagination mt-2">
                            <li class="page-item"><a class="page-link" href="fake_url;">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="fake_url;">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
                
        </div >
    )
}
