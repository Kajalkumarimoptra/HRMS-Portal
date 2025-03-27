import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormContext } from "../components/ContextProvider/Context";

export default function AddNewUser() {
    const {
        register, handleSubmit, onSubmit, reset, errors, serverError, setServerError, clearErrors, role, setRole, setValue
    } = useFormContext();
    const [userFullName, setUserFullName] = useState(''); // state for holding fullname
    const [userDesg, setUserDesg] = useState(''); // state for holding desg
    const [userProjectName, setUserProjectName] = useState(''); // state for holding project name
    const [userProjectManagerName, setUserProjectManagerName] = useState(''); // state for holding project manager name
    const [isSubmitted, setIsSubmitted] = useState(false); // State for submission status
    const [selectColor, setSelectColor] = useState("#d3d3d3"); // for giving diff color to select placeholder and option
    const [selectDateColor, setDateSelectColor] = useState("#d3d3d3"); // for giving diff color to date placeholder and option

    const [pattern, setPattern] = useState({
        newUserName: '',
        newUserDesg: '',
        newUserProject: '',
        newUserProjectManager: ''
    }); // state for overall handling of pattern

    const [customErrorForAddNewUserInputs, setCustomErrorForAddNewUserInputs] = useState({
        newUserName: '',
        newUserDesg: '',
        newUserProject: '',
        newUserProjectManager: ''
    }); // error msg for its pattern failure

    const navigate = useNavigate();

    // pattern failure validation 
    const handlePatternForAddNewUserInputs = (e, pattern, field) => {
        let value = e.target.value;
        // Clear server error when the user starts typing again
        setServerError('');
        clearErrors(field);
        setPattern(prev => ({ ...prev, [field]: value }))
        if (field === 'newUserName') setUserFullName(value);
        if (field === 'newUserDesg') setUserDesg(value);
        if(field === 'newUserProject') setUserProjectName(value);
        if(field === 'newUserProjectManager') setUserProjectManagerName(value);

        let patternErrorMessage = '';
        if (field === 'newUserName' && value && !pattern.test(value)) {
            patternErrorMessage = 'No numbers or special characters are allowed';
        } else if (field === 'newUserDesg' && value && !pattern.test(value) || field === 'newUserProject' && value && !pattern.test(value) || field === 'newUserProjectManager' && value && !pattern.test(value)) {
            patternErrorMessage = 'No special characters are allowed';
        }
        setCustomErrorForAddNewUserInputs(prev => ({ ...prev, [field]: patternErrorMessage }));

        // If there's no error, clear the error message for the field
        if (!patternErrorMessage) {
            setCustomErrorForAddNewUserInputs(prev => ({ ...prev, [field]: '' }));
            clearErrors(field);  // This will clear the react-hook-form error for the field
        }
    };

    // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
    const handleColorChange = (e) => {
        const selectedValue = e.target.value;
        setSelectColor(selectedValue ? "black" : "#d3d3d3");
        clearErrors('newUserRole');
    };

    // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
    const handleDateColorChange = (e) => {
        const selectedDateValue = e.target.value;
        setDateSelectColor(selectedDateValue ? "black" : "#d3d3d3");
        clearErrors('newUserJoiningDate');
    };

    const handleFormSubmit = (data) => {
        onSubmit(data);
        reset();
        setUserFullName('');
        setUserDesg('');
        setPattern({ newUserName: '', newUserDesg: '' }); // Reset pattern state
        setCustomErrorForAddNewUserInputs({ newUserName: '', newUserDesg: '' }); // Clear custom errors
        setServerError('');
        setSelectColor("#d3d3d3");
        setDateSelectColor("#d3d3d3");
        console.log("Submitting data:", data);
    }

    // 🔥 Fix: Ensure placeholder is selected first
    useEffect(() => {
        setValue("newUserRole", "");  // Reset to placeholder on mount
    }, [setValue]);

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
                                                <input className="input-field" type="text" placeholder="Enter Your Full Name" {...register("newUserName", { required: 'Please enter your name', 
                                                maxLength: {
                                                    value: 50,
                                                    message: 'Name cannot exceed 50 characters'
                                                } , 
                                                minLength: {
                                                    value: 3,
                                                    message: 'Name must be at least 3 characters'
                                                }  })}
                                                    value={pattern.newUserName} onChange={(e) => handlePatternForAddNewUserInputs(e, /^[A-Za-z\s]+$/, 'newUserName')} />
                                                {errors.newUserName && (<div className="userErrorMessage">{errors.newUserName.message}</div>)}
                                                {customErrorForAddNewUserInputs.newUserName && (<div className='userErrorMessage'>{customErrorForAddNewUserInputs.newUserName}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Department Name</p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter Your Department Name" {...register("newUserDesg", { required: 'Please enter your designation',
                                                    maxLength: {
                                                        value: 50,
                                                        message: 'Designation cannot exceed 50 characters'
                                                    } , 
                                                    minLength: {
                                                        value: 2,
                                                        message: 'Designation must be at least 2 characters'
                                                    }
                                                 })}
                                                    value={pattern.newUserDesg} onChange={(e) => handlePatternForAddNewUserInputs(e, /^[A-Za-z0-9\s-]+(?:\s[A-Za-z0-9\s-]+)*(\s([IVXLCDM]+))?$/, 'newUserDesg')} />
                                                {errors.newUserDesg && (<div className="userErrorMessage">{errors.newUserDesg.message}</div>)}
                                                {customErrorForAddNewUserInputs.newUserDesg && (<div className='userErrorMessage'>{customErrorForAddNewUserInputs.newUserDesg}</div>)}
                                            </div>
                                        </div>
                                        <br />
                                        <div className='edit-delete-btn-container'>
                                                <button className="primary-btn" type="submit">Update</button>
                                                <button className="primary-btn" style={{ background: 'indianred' }} type="button">Delete</button>
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
