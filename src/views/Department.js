import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormContext } from "../components/ContextProvider/Context";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ImSearch } from "react-icons/im";

export default function Department() {

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    serverError,
    setServerError,
    clearErrors
  } = useFormContext();
  const [show, setShow] = useState(false); // state variable to control the modal's visibility
  const [patternForNewEmpName, setPatternFornewEmpName] = useState(''); // pattern for new emp name
  const [patternForDeptName, setPatternForDeptName] = useState(''); // pattern for dept name
  const [patternForDeptHead, setPatternForDeptHead] = useState(''); // pattern for dept head
  const [pattern, setPattern] = useState({
    newEmpName: '',
    deptName: '',
    deptHead: ''
  }); // state for overall handling of pattern

  const [customErrorForPattern, setCustomErrorForPattern] = useState({
    newEmpName: '',
    deptName: '',
    deptHead: ''
  }); // error msg for its failure

  // for toggle the modal visibility
  const handleClose = () =>
    setShow(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    reset();
  }, []); // Reset after render


  // for pattern handling
  const handlePatternForDeptInputs = (e, field) => {
    const value = e.target.value;
    const pattern = /^[A-Za-z\s]+$/;
    setPattern(prev => ({ ...prev, [field]: value }));
    if (field === 'newEmpName') setPatternFornewEmpName(value);
    if (field === 'deptName') setPatternForDeptName(value);
    if (field === 'deptHead') setPatternForDeptHead(value);

    let patternErrorMessage = '';
    if (value && !pattern.test(value)) {
      patternErrorMessage = 'No numbers or special characters are allowed';
    }
    setCustomErrorForPattern(prev => ({ ...prev, [field]: patternErrorMessage }));
    // Clear error if input is valid
    if (patternErrorMessage === '') {
      clearErrors(field);
    }
  }

  // form submission
  const handleFormSubmit = (data) => {
    console.log('data submitted:', data);
    toast.success("Department of Employee gets added successfully");
    reset();
  }

  return (
    <div className='container-fluid'>
      <div class="section-body">
        <div class="container-fluid">
          <div class="d-flex justify-content-between align-items-center" style={{ flexDirection: 'row-reverse' }}>
            {/* <ul class="nav nav-tabs page-header-tab">
              <li class="nav-item">
                <a class= "nav-link" id="user-list" data-toggle="tab" href="#user-list">List View</a>
              </li>
            </ul> */}
            {/* <div class="header-action">
              <button type="button" class="add-btn" fdprocessedid="g0g9qd" onClick={handleShow}>
                <i class="fe fe-plus mr-2"></i>+Add Department
              </button>
            </div> */}

            {/* Modal */}
            <Modal show={show} onHide={handleClose} className="modal-dialog-centered"
              backdrop="static" // Prevent close on clicking outside
              keyboard={false}  // Prevent close on pressing "Escape"
            >
              <Modal.Header>
                <Modal.Title>Add Department</Modal.Title>
                <i class="fa fa-times" aria-hidden="true" onClick={handleClose}></i>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                  <Form.Group controlId="departmentName">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control
                      type="text" className={`${errors.newEmpName ? 'invalid' : ''}`}
                      placeholder="Enter employee name" {...register("newEmpName", { required: 'Employee Name is required', minLength: 3 })}
                      onChange={(e) => handlePatternForDeptInputs(e, 'newEmpName')} />
                    {errors.newEmpName && <div className="dept-error-message">{errors.newEmpName.message}</div>}
                    {customErrorForPattern.newEmpName ? <div className='dept-error-message'>{customErrorForPattern.newEmpName}</div> : ''}
                  </Form.Group>
                  <Form.Group controlId="departmentHead">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control
                      type="text" className={`${errors.deptName ? 'invalid' : ''}`}
                      placeholder="Enter department name" {...register("deptName", { required: 'Department Name is required', minLength: 3 })}
                      onChange={(e) => handlePatternForDeptInputs(e, 'deptName')} />
                    {errors.deptName && <div className="dept-error-message">{errors.deptName.message}</div>}
                    {customErrorForPattern.deptName ? <div className='dept-error-message'>{customErrorForPattern.deptName}</div> : ''}
                  </Form.Group>
                  <Form.Group controlId="departmentDescription">
                    <Form.Label>Department Head</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter department head" className={`${errors.deptHead ? 'invalid' : ''}`}
                      {...register("deptHead", { required: 'Department Head is required', minLength: 3 })}
                      onChange={(e) => handlePatternForDeptInputs(e, 'deptHead')} />
                    {errors.deptHead && <div className="dept-error-message">{errors.deptHead.message}</div>}
                    {customErrorForPattern.deptHead ? <div className='dept-error-message'>{customErrorForPattern.deptHead}</div> : ''}
                  </Form.Group>
                  <div className="mt-5">
                    <Button variant="primary" type="submit" className='dept-btn'>
                      Save Department
                    </Button>
                  </div>
                  <ToastContainer />
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>

      {/* user list table */}
      <div className='section-body mt-1'>
        <div className='container-fluid'>
          <div className='tab-content'>
            <div className='tab-pane fade active show' id="Employee-list" role='tabpanel'>
              <div className='card'>
                <div class="card-header">
                  <div className='employeelist-header ml-3'>
                    <div class="header-action">
                      <button type="button" class="add-btn" fdprocessedid="g0g9qd" onClick={handleShow}>
                        <i class="fe fe-plus"></i>+Add Department
                      </button>
                    </div>
                    {/* <h3 class="card-title  ml-4">DEPARTMENTS LIST :</h3> */}
                    <div >
                      <form className="user-searchForm">
                        <input class="form-control me-2 search" type="search" placeholder="Search department" aria-label="Search" />
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
                            <th>Department Name</th>
                            <th>Total Employees</th>
                            <th>Action</th>
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
                            <td>Web Development</td>
                            <td>102</td>
                            <td>
                              <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="tvsb17">
                                <img src={require("assets/img/edit.png")} alt="..." className='delete-icon' />
                              </button>
                              <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                <img src={require("assets/img/delete.png")} alt="..." className='delete-icon' />
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
                            <td>App Development</td>
                            <td>50</td>
                            <td>
                              <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="b0za8">
                                <img src={require("assets/img/edit.png")} alt="..." className='delete-icon' />
                              </button>
                              <button type="button" class="btn btn-icon btn-sm js-sweetalert icons" title="Delete" data-type="confirm" fdprocessedid="5qdlk5">
                                <img src={require("assets/img/delete.png")} alt="..." className='delete-icon' />
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
                            <td>Marketing</td>
                            <td>200</td>
                            <td>
                              <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="2n2st">
                                <img src={require("assets/img/edit.png")} alt="..." className='delete-icon' />
                              </button>
                              <button type="button" class="btn btn-icon btn-sm js-sweetalert icons" title="Delete" data-type="confirm" fdprocessedid="y2m5v">
                                <img src={require("assets/img/delete.png")} alt="..." className='delete-icon' />
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td class="w40">4.
                              {/* <label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label> */}
                            </td>
                            <td>Support</td>
                            <td>70</td>
                            <td>
                              <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="2n2st">
                                <img src={require("assets/img/edit.png")} alt="..." className='delete-icon' />
                              </button>
                              <button type="button" class="btn btn-icon btn-sm js-sweetalert icons" title="Delete" data-type="confirm" fdprocessedid="y2m5v">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
