import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormContext } from "../components/ContextProvider/Context";

export default function AddNewUser() {
    const {
        register, handleSubmit, onSubmit, reset, errors, serverError, setServerError, clearErrors, role, setRole
    } = useFormContext();
    const [editUserFullName, setEditUserFullName] = useState(''); // state for holding fullname
    const [editUserDesg, setEditUserDesg] = useState(''); // state for holding desg
    const [editUserProjectName, setEditUserProjectName] = useState(''); // state for holding project name
    const [editUserProjectManagerName, setEditUserProjectManagerName] = useState(''); // state for holding project manager nam
    const [isSubmitted, setIsSubmitted] = useState(false); // State for submission status
    const [selectEditColor, setSelectEditColor] = useState("#d3d3d3"); // for giving diff color to select placeholder and option
    const [selectEditDateColor, setSelectDateEditColor] = useState("#d3d3d3"); // for giving diff color to date placeholder and option


    const [pattern, setPattern] = useState({
        editUserName: '',
        editUserDesg: '',
        editUserProjectName: '',
        editUserProjectManagerName: ''

    }); // state for overall handling of pattern

    const [customErrorForEditUserInputs, setCustomErrorForEditUserInputs] = useState({
        editUserName: '',
        editUserDesg: '',
        editUserProjectName: '',
        editUserProjectManagerName: ''
    }); // error msg for its pattern failure

    const navigate = useNavigate();

    // pattern failure validation 
    const handlePatternForEditUserInputs = (e, pattern, field) => {
        let value = e.target.value;
        // Clear server error when the user starts typing again
        setServerError('');
        clearErrors(field);
        setPattern(prev => ({ ...prev, [field]: value }))
        if (field === 'editUserName') setEditUserFullName(value);
        if (field === 'editUserDesg') setEditUserDesg(value);
        if (field === 'editUserProjectName') setEditUserProjectName(value);
        if (field === 'editUserProjectManagerName') setEditUserProjectManagerName(value);

        let patternErrorMessage = '';
        if (field === 'editUserName' && value && !pattern.test(value)) {
            patternErrorMessage = 'No numbers or special characters are allowed';
        } else if (field === 'editUserDesg' && value && !pattern.test(value) || field === 'editUserProjectName' && value && !pattern.test(value) || field === 'editUserProjectManagerName' && value && !pattern.test(value)) {
            patternErrorMessage = 'No special characters are allowed';
        }
        setCustomErrorForEditUserInputs(prev => ({ ...prev, [field]: patternErrorMessage }));

        // If there's no error, clear the error message for the field
        if (!patternErrorMessage) {
            setCustomErrorForEditUserInputs(prev => ({ ...prev, [field]: '' }));
            clearErrors(field);  // This will clear the react-hook-form error for the field
        }
    };

    // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
    const handleEditSelectColorChange = (e) => {
        const selectedEditValue = e.target.value;
        setSelectEditColor(selectedEditValue ? "black" : "#d3d3d3");
        clearErrors('editUserRole');
    };
    // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
    const handleEditDateColorChange = (e) => {
        const selectedEditDateValue = e.target.value;
        setSelectDateEditColor(selectedEditDateValue ? "black" : "#d3d3d3");
        clearErrors('editUserJoiningDate');
    };

    const handleFormSubmit = (data) => {
        onSubmit(data);
        reset();
        setEditUserFullName('');
        setEditUserDesg('');
        setPattern({ editUserName: '', editUserDesg: '' }); // Reset pattern state
        setCustomErrorForEditUserInputs({ editUserName: '', editUserDesg: '' }); // Clear custom errors
        setServerError('');
        setSelectEditColor("#d3d3d3");
        setSelectDateEditColor("#d3d3d3");
        console.log("Submitting data:", data);
    }

    return (
        <div className="container-fluid">
            <div className='register-container'>
                <div className="row Signup-row">
                    <div className="col-6 left">
                        <div className="Signup-form">
                            {/* <div className="top-logo">
                                        <img src={require("assets/img/company_logo.png")} alt="..." />
                                    </div> */}
                            <div className="title">
                                {/* <p className='name'>Welcome !</p> */}
                                <p className='info-text'>
                                    All fields are mandatory
                                </p>
                            </div>
                            <br />
                            <div className="form">
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="form-detail">
                                        <div className="input-text">
                                            <p>Employee Name</p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter Employee Name" {...register("editUserName", { required: 'Please enter your name', 
                                                maxLength: {
                                                    value: 50,
                                                    message: 'Name cannot exceed 50 characters'
                                                } , 
                                                minLength: {
                                                    value: 3,
                                                    message: 'Name must be at least 3 characters'
                                                } })}
                                                    value={pattern.editUserName} onChange={(e) => handlePatternForEditUserInputs(e, /^[A-Za-z\s]+$/, 'editUserName')} />
                                                {errors.editUserName && (<div className="userErrorMessage">{errors.editUserName.message}</div>)}
                                                {customErrorForEditUserInputs.editUserName && (<div className='userErrorMessage'>{customErrorForEditUserInputs.editUserName}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Employee ID</p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter Employee ID" {...register("editUserDesg", { required: 'Please enter your designation',
                                                     maxLength: {
                                                        value: 50,
                                                        message: 'Designation cannot exceed 50 characters'
                                                    } , 
                                                    minLength: {
                                                        value: 2,
                                                        message: 'Designation must be at least 2 characters'
                                                    }
                                                 })}
                                                    value={pattern.editUserDesg} onChange={(e) => handlePatternForEditUserInputs(e, /^[A-Za-z0-9\s-]+(?:\s[A-Za-z0-9\s-]+)*(\s([IVXLCDM]+))?$/, 'editUserDesg')} />
                                                {errors.editUserDesg && (<div className="userErrorMessage">{errors.editUserDesg.message}</div>)}
                                                {customErrorForEditUserInputs.editUserDesg && (<div className='userErrorMessage'>{customErrorForEditUserInputs.editUserDesg}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Official Email Address</p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter Official Email Address" {...register("editUserProjectName", { required: 'Please enter your project name',
                                                    maxLength: {
                                                        value: 50,
                                                        message: 'Project name cannot exceed 50 characters'
                                                    } , 
                                                    minLength: {
                                                        value: 2,
                                                        message: 'Project name must be at least 2 characters'
                                                    }
                                                 })}
                                                    value={pattern.editUserProjectName} onChange={(e) => handlePatternForEditUserInputs(e, /^[a-zA-Z0-9-_.,&\s]+$/, 'editUserProjectName')} />
                                                {errors.editUserProjectName && (<div className="userErrorMessage">{errors.editUserProjectName.message}</div>)}
                                                {customErrorForEditUserInputs.editUserProjectName && (<div className='userErrorMessage'>{customErrorForEditUserInputs.editUserProjectName}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Mobile No</p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter Mobile No." {...register("editUserProjectManagerName", { required: 'Please enter your project manager name',
                                                    maxLength: {
                                                        value: 50,
                                                        message: 'Project Manager name cannot exceed 50 characters'
                                                    } , 
                                                    minLength: {
                                                        value: 2,
                                                        message: 'Project Manager name must be at least 2 characters'
                                                    }
                                                 })}
                                                    value={pattern.editUserProjectManagerName} onChange={(e) => handlePatternForEditUserInputs(e, /^[a-zA-Z0-9-_.,&\s]+$/, 'editUserProjectManagerName')} />
                                                {errors.editUserProjectManagerName && (<div className="userErrorMessage">{errors.editUserProjectManagerName.message}</div>)}
                                                {customErrorForEditUserInputs.editUserProjectManagerName && (<div className='userErrorMessage'>{customErrorForEditUserInputs.editUserProjectManagerName}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Joining Date</p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="date" min="2015-12-22" placeholder="Enter joining date in DD/MM/YYYY" {...register("editUserJoiningDate", { required: 'Please enter your joining date' })}
                                                    onChange={handleEditDateColorChange} style={{ color: selectEditDateColor }} />
                                                {errors.editUserJoiningDate && (<div className="userErrorMessage">{errors.editUserJoiningDate.message}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Designation</p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter Employee Designation" {...register("editUserProjectName", { required: 'Please enter your project name',
                                                    maxLength: {
                                                        value: 50,
                                                        message: 'Project name cannot exceed 50 characters'
                                                    } , 
                                                    minLength: {
                                                        value: 2,
                                                        message: 'Project name must be at least 2 characters'
                                                    }
                                                 })}
                                                    value={pattern.editUserProjectName} onChange={(e) => handlePatternForEditUserInputs(e, /^[a-zA-Z0-9-_.,&\s]+$/, 'editUserProjectName')} />
                                                {errors.editUserProjectName && (<div className="userErrorMessage">{errors.editUserProjectName.message}</div>)}
                                                {customErrorForEditUserInputs.editUserProjectName && (<div className='userErrorMessage'>{customErrorForEditUserInputs.editUserProjectName}</div>)}
                                            </div>
                                        </div>

                                        <br />


                                        {/* <div className="Signup-btn">
                                                    <button className='registerSubmitBtn' type='submit' onClick={console.log(errors)}>Submit</button>
                                                </div> */}
                                        <div>

                                            <div className='edit-delete-btn-container'>
                                                <button className="primary-btn" type="submit">Update</button>
                                                <button className="primary-btn" style={{ background: 'indianred' }} type="button">Delete</button>
                                            </div>

                                        </div>
                                        <br />

                                        {serverError && (<div className="serverErrorMessage">{serverError}</div>)}
                                        <br />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
