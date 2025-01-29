import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'components/ContextProvider/Context';
import { toast, ToastContainer } from 'react-toastify';

export default function Leave() {
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
    
    const [showLeave, setShowLeave] = useState(false); // state variable to control the modal's visibility
    
    // for handling leave table
    const handleLeave = () => {
        setShowLeave(true);
    }
    const handleCloseLeave = () => {
        setShowLeave(false);
    }

    return (
        <div className='section-body'>
            <div className='container-fluid'>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="header-action">
                        <button type="button" class="add-btn" fdprocessedid="av3mde"
                            onClick={handleLeave}>
                            <i class="plus-sign mr-2">&#43;</i>
                            Add Leave
                        </button>
                    </div>

                    {/* Modal */}
                    <Modal show={showLeave} onHide={handleCloseLeave} className="modal-dialog-centered"
                        backdrop="static" // Prevent close on clicking outside
                        keyboard={false}  // Prevent close on pressing "Escape"
                    >
                        <Modal.Header>
                            <Modal.Title>Add Leave Details</Modal.Title>
                            <i class="fa fa-times" aria-hidden="true" onClick={handleCloseLeave}></i>
                        </Modal.Header>
                        <Modal.Body>
                            <Form
                            // onSubmit={handleSubmit(handleFormSubmit)}
                            >
                                <Form.Group controlId="empNameForLeave">
                                    <Form.Label>Employee Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        // className={`${errors.empNameForLeave ? 'invalid' : ''}`}
                                        placeholder="Enter employee name"
                                    // {...register("empNameForLeave", { required: 'Employee Name is required', minLength: 3 })}
                                    // onChange={(e) => handlePatternForLeaveInputs(e, /^[A-Za-z\s]+$/, 'empNameForLeave')} 
                                    />
                                    {/* {errors.empNameForLeave && <div className="dept-error-message">{errors.empNameForLeave.message}</div>}
                                                {customErrorForPattern.empNameForLeave ? <div className='dept-error-message'>{customErrorForPattern.empNameForLeave}</div> : ''} */}
                                </Form.Group>
                                <Form.Group controlId="empIDForLeave">
                                    <Form.Label>Employee ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        //  className={`${errors.empIDForLeave ? 'invalid' : ''}`}
                                        placeholder="Enter employee ID"
                                    // {...register("empIDForLeave", { required: 'Employee ID is required', minLength: 6 })}
                                    // onChange={(e) => handlePatternForLeaveInputs(e, /^[0-9]+$/, 'empIDForLeave')}
                                    />
                                    {/* {errors.empIDForLeave && <div className="dept-error-message">{errors.empIDForLeave.message}</div>}
                                                {customErrorForPattern.empIDForLeave ? <div className='dept-error-message'>{customErrorForPattern.empIDForLeave}</div> : ''} */}
                                </Form.Group>
                                <Form.Group controlId="dateForLeave">
                                    <Form.Label>Date of Leave</Form.Label>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Label>From</Form.Label>
                                            <Form.Control
                                                type="date"
                                            // className={`${errors.empLeaveFromDate ? 'invalid' : ''}`}
                                            // {...register("empLeaveFromDate", { required: 'Leave date is required' })}
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Label>To</Form.Label>
                                            <Form.Control
                                                type="date"
                                            // className={`${errors.empLeaveToDate ? 'invalid' : ''}`}
                                            // {...register("empLeaveToDate", { required: 'Leave date is required' })}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group controlId="empLeaveReason">
                                    <Form.Label>Leave Reason</Form.Label>
                                    <Form.Control
                                        type="text"
                                        //  className={`${errors.empLeaveReason ? 'invalid' : ''}`}
                                        placeholder="Enter the leave reason"
                                    //  {...register("empLeaveReason", { required: 'Leave Reason is required', minLength: 3 })}

                                    // onChange={(e) => handlePatternForLeaveInputs(e, /^[A-Za-z\s]+$/, 'empLeaveReason')} 
                                    />
                                    {/* {errors.empLeaveReason && <div className="dept-error-message">{errors.empLeaveReason.message}</div>}
                                                {customErrorForPattern.empLeaveReason ? <div className='dept-error-message'>{customErrorForPattern.empLeaveReason}</div> : ''} */}
                                </Form.Group>
                                <div className="mt-5">
                                    <Button variant="primary" type="submit" className='dept-btn'
                                    // onClick={() => console.log(errors)}
                                    >
                                        Save Leave Details
                                    </Button>
                                </div>
                                <ToastContainer />
                            </Form>
                        </Modal.Body>
                    </Modal>
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
                                    <div class="card-options">
                                        <form>
                                            <div class="d-flex align-items-center">
                                                {/* <label className="year-label mb-2 ">Month  :</label> */}
                                                <select class="custom-select" fdprocessedid="dvwj5t" style={{ width: '73px' }} >
                                                    <option value="" disabled hidden selected>
                                                        Month
                                                    </option>
                                                    <option>Jan</option>
                                                    <option>Feb</option>
                                                    <option>Mar</option>
                                                    <option>Apr</option>
                                                </select>
                                                {/* <label className="year-label mb-2 ">Year  :</label> */}
                                                <span class="input-group-btn ml-2">
                                                    <select class="custom-select select-year" fdprocessedid="dvwj5t" style={{ width: '76px' }}>
                                                        <option value="" disabled hidden selected>
                                                            2024
                                                        </option>
                                                        <option>2023</option>
                                                        <option>2022</option>
                                                        <option>2021</option>
                                                    </select>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                    {/* <div class="header-action">
                    <button type="button" class="add-btn" fdprocessedid="av3mde"
                        // onClick={handleLeave} 
                        style={{ marginLeft: '5px' }}>
                        <i class="plus-sign mr-2">&#43;</i>
                        Add Leave
                    </button>
                </div> */}
                                </div>
                                <div className='card-body'>
                                    <div className='table-responsive'>
                                        <table className='table table-hover table-striped table-vcenter text-nowrap mb-0'>
                                            <thead>
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>Name</th>
                                                    <th>Employee ID</th>
                                                    <th>Leave Type</th>
                                                    <th>Date</th>
                                                    <th>Reason</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="w40">1.</td>
                                                    <td class="d-flex align-items-center">
                                                        {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                                                        <div>
                                                            <h6 class="name-data">Marshall Nichols</h6>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span>50212</span>
                                                    </td>
                                                    <td>
                                                        <span>Casual Leave</span>
                                                    </td>
                                                    <td>12-June-2015 to 19-june-2015</td>
                                                    <td>Going to family function</td>
                                                    <td>
                                                        <button type="button" class="btn btn-icon btn-sm icons" title="View" fdprocessedid="4mga3">
                                                            <i class="fa fa-plus-circle" aria-hidden="true" style={{ color: 'green' }}></i>
                                                        </button>
                                                        <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                                            <img src={require("assets/img/delete.png")} alt="..." className='delete-icon' />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="w40">2.</td>
                                                    <td class="d-flex">
                                                        {/* <img class="avatar" src="../assets/images/xs/avatar2.jpg" data-toggle="tooltip" data-original-title="Avatar Name" alt="fake_url" /> */}
                                                        {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">PN</span> */}
                                                        <div>
                                                            <h6 class="name-data">Debra Stewart</h6>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span>50266</span>
                                                    </td>
                                                    <td>
                                                        <span>Casual Leave</span>
                                                    </td>
                                                    <td>
                                                        <span>18-June-2015 to 19-june-2015</span>
                                                    </td>
                                                    <td>Going to Holiday</td>
                                                    <td>
                                                        <button type="button" class="btn btn-icon btn-sm icons" title="View" fdprocessedid="4mga3">
                                                            <i class="fa fa-plus-circle" aria-hidden="true" style={{ color: 'green' }}></i>
                                                        </button>
                                                        <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                                            <img src={require("assets/img/delete.png")} alt="..." className='delete-icon' />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="w40">3.</td>
                                                    <td class="d-flex">
                                                        {/* <span class="avatar avatar-green" data-toggle="tooltip" data-original-title="Avatar Name">JH</span> */}
                                                        <div>
                                                            <h6 class="name-data">Jane Hunt</h6>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span>50277</span>
                                                    </td>
                                                    <td>
                                                        <span>Medical Leave</span>
                                                    </td>
                                                    <td>
                                                        <span>18-June-2015 to 19-june-2015</span>
                                                    </td>
                                                    <td>Going to development</td>
                                                    <td>
                                                        <button type="button" class="btn btn-icon btn-sm icons" title="View" fdprocessedid="4mga3">
                                                            <i class="fa fa-plus-circle" aria-hidden="true" style={{ color: 'green' }}></i>
                                                        </button>
                                                        <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                                            <img src={require("assets/img/delete.png")} alt="..." className='delete-icon' />
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="w4">4.</td>
                                                    <td class="d-flex">
                                                        {/* <img class="avatar" src="../assets/images/xs/avatar3.jpg" data-toggle="tooltip" data-original-title="Avatar Name" alt="fake_url" /> */}
                                                        {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">DB</span> */}
                                                        <div>
                                                            <h6 class="name-data">Susie Willis</h6>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span>50212</span>
                                                    </td>
                                                    <td>
                                                        <span>Casual Leave</span>
                                                    </td>
                                                    <td>12-June-2015 to 19-june-2015</td>
                                                    <td>Health Emergency</td>
                                                    <td>
                                                        <button type="button" class="btn btn-icon btn-sm icons" title="View" fdprocessedid="4mga3">
                                                            <i class="fa fa-plus-circle" aria-hidden="true" style={{ color: 'green' }}></i>
                                                        </button>
                                                        <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                                            <img src={require("assets/img/delete.png")} alt="..." className='delete-icon' />
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
    )
}
