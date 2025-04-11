import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormContext } from "../components/ContextProvider/Context";
import Breadcrumb from './Breadcrumb';
import { toast, ToastContainer } from 'react-toastify';
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import axios from 'axios';
import { useHolidayListContext } from 'components/ContextProvider/HolidayListContext';

export default function AddNewUser() {
    const {
        register, handleSubmit, onSubmit, reset, errors, serverError, setServerError, clearErrors,
        role, setRole, setValue, watch, setUsers
    } = useFormContext();
    const holidays = useHolidayListContext();
    const [userFullName, setUserFullName] = useState(''); // state for holding fullname
    const [userLastName, setUserLastName] = useState(''); // state for holding last name
    const [userEmpID, setUserEmpID] = useState(''); // state for holding emp id
    const [userDesg, setUserDesg] = useState(''); // state for holding desg
    const [userEmail, setUserEmail] = useState(''); // state for holding email
    const [userMobNo, setUserMobNo] = useState(''); // state for holding mob no.
    const [newUserPasswordShow, setNewUserPasswordShow] = useState(false);  // for toggle between password show and hide
    const [newUserPasswordShowIcon, setNewUserPasswordShowIcon] = useState(false); // to store password icon
    const [newUserConfirmPasswordShowIcon, setNewUserConfirmPasswordShowIcon] = useState(false); // to store confirm password icon
    const [newUserConfirmPasswordShow, setNewUserConfirmPasswordShow] = useState(false);  // for toggle between password show and hide
    const [newUserPasswordCriteriaMessage, setNewUserPasswordCriteriaMessage] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false); // State for submission status
    const [selectColor, setSelectColor] = useState("#d3d3d3"); // for giving diff color to select placeholder and option
    const [selectDateColor, setDateSelectColor] = useState("#d3d3d3"); // for giving diff color to date placeholder and option
    const [selectAddClientNameColor, setAddClientNameColor] = useState("#d3d3d3");
    const [selectAddProjectManagerNameColor, setAddProjectManagerNameColor] = useState("#d3d3d3");
    const [isModalForAddingManualClientName, setModalForAddingManualClientName] = useState(false); // for tracking the modal for adding client name
    const [newOtherClientName, setNewOtherClientName] = useState(""); // For storing new other client name
    const [selectedClientName, setSelectedClientName] = useState('');
    const [clientNames, setClientNames] = useState(['Petco', 'React Project']);

    // Convert holiday dates to YYYY-MM-DD format
    const formattedHolidays = holidays.map((holiday) => {
        const [month, day] = holiday.date.split(" ");
        const monthMap = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
            Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
        };
        const year = new Date().getFullYear(); // Get current year
        return `${year}-${monthMap[month]}-${day.padStart(2, "0")}`;
    });

    // Function to check if a date is a holiday or weekend
    const isDisabledJoiningDate = (date) => {
        const day = new Date(date).getDay(); // 0 = Sunday, 6 = Saturday
        return formattedHolidays.includes(date) || day === 0 || day === 6;
    };

    const [pattern, setPattern] = useState({
        newUserName: '',
        newUserLastName: '',
        newUserEmpId: '',
        newUserDesg: '',
        newUserEmailId: '',
        newUserMobNo: ''

    }); // state for overall handling of pattern

    const [customErrorForAddNewUserInputs, setCustomErrorForAddNewUserInputs] = useState({
        newUserName: '',
        newUserLastName: '',
        newUserEmpId: '',
        newUserDesg: '',
        newUserEmailId: '',
        newUserMobNo: ''
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
        if (field === 'newUserLastName') setUserLastName(value);
        if (field === 'newUserEmpId') setUserEmpID(value);
        if (field === 'newUserDesg') setUserDesg(value);
        if (field === 'newUserEmailId') setUserEmail(value);
        if (field === 'newUserMobNo') setUserMobNo(value);

        let patternErrorMessage = '';
        if ((field === 'newUserName' || field === "newUserLastName") && value && !pattern.test(value)) {
            patternErrorMessage = 'No numbers or special characters are allowed';
        } else if (field === 'newUserEmpId') {
            // If emp id exceeds 6 digits, slice it to 6 digits
            if (value.length > 6) {
                value = value.slice(0, 6);
            }
            // perform validation
            if (value && !pattern.test(value)) {
                patternErrorMessage = 'Only numbers are allowed';
            }
            setUserEmpID(value);
        }
        else if (field === 'newUserDesg' && value && !pattern.test(value)) {
            patternErrorMessage = 'No special characters are allowed';
        } else if (field === 'newUserEmailId' && value && !pattern.test(value)) {
            patternErrorMessage = 'Please enter the valid email address';
        } else if (field === 'newUserMobNo') {  // If mobile number exceeds 10 digits, slice it to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10); // Slice to 10 digits
            }
            // Perform validation
            if (value && !pattern.test(value)) {
                patternErrorMessage = 'Only numbers are allowed';
            }
            setUserMobNo(value);
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
        if (isDisabledJoiningDate(selectedDateValue)) {
            alert("This date is a holiday or a weekend. Please select another joining date.");
            e.target.value = "";
            setDateSelectColor("#d3d3d3");
            return;
        }
        else {
            setDateSelectColor("black");
        }
        clearErrors('newUserJoiningDate');
    };
    const handleAddClientNameColorChange = (e) => {
        const selectedAddClientNameColorValue = e.target.value;
        setAddClientNameColor(selectedAddClientNameColorValue ? "black" : "#d3d3d3");
        clearErrors("newUserProject");

        if (selectedAddClientNameColorValue === "other") {
            console.log('other option selected')
            setModalForAddingManualClientName(true);
        } else {
            setSelectedClientName(selectedAddClientNameColorValue); // Update the selected client name
        }
    };

    const handleAddingOtherClientName = (e) => {
        e.preventDefault();  // Prevent page reload
        console.log("other client name is added:", newOtherClientName);
    
        if (newOtherClientName.trim() !== "") {
            const updatedClientNames = [...clientNames, newOtherClientName]; // ✅ Define it first
            setClientNames(updatedClientNames);
    
            localStorage.setItem("clientNames", JSON.stringify(updatedClientNames));
            setSelectedClientName(newOtherClientName);
            setValue("newUserProject", newOtherClientName);  // Update form value
        }
    
        setModalForAddingManualClientName(false); // Close modal
        setNewOtherClientName("");                // Clear input field
    };    



    // handl closing the pop up
    const handelCancelOtherClientName = () => {
        setModalForAddingManualClientName(false);
    }

    const handleAddProjectManagerNameColorChange = (e) => {
        const selectedAddManagerNameColorValue = e.target.value;
        setAddProjectManagerNameColor(selectedAddManagerNameColorValue ? "black" : "#d3d3d3");
        clearErrors("newUserProjectManager");
    };

    // for password visibility
    const handleNewUserPasswordVisibility = () => {
        setNewUserPasswordShow(!newUserPasswordShow);
    }
    const handleNewUserConfirmPasswordVisibility = () => {
        setNewUserConfirmPasswordShow(!newUserConfirmPasswordShow);
    }

    const newUserPasswordRef = useRef({});
    newUserPasswordRef.current = watch("newUserPassword", "");

    const clearErrorFields = (field) => {  // to clear the error msg on any input change
        clearErrors(field);
        setServerError('');
    }

    // for conditionally showing passwordCriteriaMessage
    const handleNewUserPasswordCriteriaMessage = (e) => {
        const showNewUserPasswordCriteriaMessage = e.target.value;
        if (showNewUserPasswordCriteriaMessage) {
            setNewUserPasswordCriteriaMessage(true);
            setNewUserPasswordShowIcon(true);
            console.log('passwordCriteriaMessage is:', newUserPasswordCriteriaMessage);
        } else {
            setNewUserPasswordCriteriaMessage(false);
            setNewUserPasswordShowIcon(false);
            console.log('passwordCriteriaMessage is:', newUserPasswordCriteriaMessage);
        }
    }

    // for conditionally showing password icon
    const handleNewUserConfirmPasswordIcon = (e) => {
        const getNewUserConfirmPasswordIcon = e.target.value;
        if (getNewUserConfirmPasswordIcon) {
            setNewUserConfirmPasswordShowIcon(true);
        } else {
            setNewUserConfirmPasswordShowIcon(false);
        }
    }

    const handleFormSubmit = async (data) => {
        // Map role names to the required format
        const roleMapping = {
            "Super Admin": "SUPER_ADMIN",
            "HR Admin": "ADMIN",
            "Employee": "EMPLOYEE"
        };
        const payload = {
            "employeeId": data.newUserEmpId,
            "name": data.newUserName,
            "roleName": roleMapping[data.newUserRole] || data.newUserRole,
            "joiningDate": new Date(data.newUserJoiningDate).toISOString(),
            "designation": data.newUserDesg,
            "projects": data.newUserProject,
            "projectManager": data.newUserProjectManager,
            "email": data.newUserEmailId,
            "mobileNumber": data.newUserMobNo,
            "password": data.newUserPassword
        }
        console.log('payload for add user:', payload);

        try {
            // Retrieve the token from sessionStorage
            const token = localStorage.getItem('token');
            if (!token) {
                setServerError('User is not authenticated. Please log in again.');
                return; // Exit if token is not found
            }

            const response = await axios.post('http://localhost:8081/users/save', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response && response.data) {
                console.log("new user form:", response.data);
                // Add new user to the users array state
                setUsers((prevUsers) => [...prevUsers, response.data]);
                toast.success("A new user has been added successfully, and their credentials have been sent to the respective email ID!");
                reset({
                    newUserPassword: '',
                    newUserConfirmPassword: '',
                    newUserRole: '',
                    newUserJoiningDate: '',
                    newUserProject: '',
                    newUserProjectManager: ''
                });
                setUserFullName('');
                setUserDesg('');
                setPattern({ newUserName: '', newUserEmpId: '', newUserDesg: '', newUserEmailId: '', newUserMobNo: '' }); // Reset pattern state
                setCustomErrorForAddNewUserInputs({ newUserName: '', newUserEmpId: '', newUserDesg: '', newUserEmailId: '', newUserMobNo: '' }); // Clear custom errors
                setServerError('');
                setSelectColor("#d3d3d3");
                setDateSelectColor("#d3d3d3");
                setAddClientNameColor("#d3d3d3");
                setAddProjectManagerNameColor("#d3d3d3");
                setTimeout(() => {
                    navigate('/admin/Users');
                }, 2000)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;

                if (error.response && error.response.status === 400 && errorMessage.includes('user already register')) {
                    console.error("Error response:", error.response.data);
                    setServerError('This email ID is already registered, please use a different one.');
                }

            } else if (error.request) {
                console.error("Error request:", error.request);
                setServerError("No response from server. Please check your network connection.");
            } else {
                console.error("General error:", error.message);
                setServerError(`Error: ${error.message}`);
            }
        }
    }

    // 🔥 Fix: Ensure placeholder is selected first
    useEffect(() => {
        setValue("newUserRole", "");  // Reset to placeholder on mount
    }, [setValue]);

    return (
        <div className="container-fluid">
            <Breadcrumb />
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
                                    New User
                                </p>
                            </div>
                            <br />
                            <div className="form">
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="form-detail">
                                        <div className="input-text">
                                            <p>First Name <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter the first name" {...register("newUserName", {
                                                    required: 'Please enter the first name',
                                                    maxLength: {
                                                        value: 50,
                                                        message: 'Name cannot exceed 50 characters'
                                                    },
                                                    minLength: {
                                                        value: 3,
                                                        message: 'Name must be at least 3 characters'
                                                    }
                                                })}
                                                    value={pattern.newUserName} onChange={(e) => handlePatternForAddNewUserInputs(e, /^[A-Za-z\s]+$/, 'newUserName')} />
                                                {errors.newUserName && (<div className="userErrorMessage">{errors.newUserName.message}</div>)}
                                                {customErrorForAddNewUserInputs.newUserName && (<div className='userErrorMessage'>{customErrorForAddNewUserInputs.newUserName}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Last Name (optional)</p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter the last name" {...register("newUserLastName", {
                                                    maxLength: {
                                                        value: 50,
                                                        message: 'Name cannot exceed 50 characters'
                                                    },
                                                    minLength: {
                                                        value: 3,
                                                        message: 'Name must be at least 3 characters'
                                                    }
                                                })}
                                                    value={pattern.newUserLastName} onChange={(e) => handlePatternForAddNewUserInputs(e, /^[A-Za-z\s]+$/, 'newUserLastName')} />
                                                {errors.newUserLastName && (<div className="userErrorMessage">{errors.newUserLastName.message}</div>)}
                                                {customErrorForAddNewUserInputs.newUserLastName && (<div className='userErrorMessage'>{customErrorForAddNewUserInputs.newUserLastName}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Employee ID <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter the employee id" {...register("newUserEmpId", {
                                                    required: 'Please enter the employee id',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Employee ID must be of six digits'
                                                    }
                                                })}
                                                    value={pattern.newUserEmpId} onChange={(e) => handlePatternForAddNewUserInputs(e, /^[0-9]+$/, 'newUserEmpId')} />
                                                {errors.newUserEmpId && (<div className="userErrorMessage">{errors.newUserEmpId.message}</div>)}
                                                {customErrorForAddNewUserInputs.newUserEmpId && (<div className='userErrorMessage'>{customErrorForAddNewUserInputs.newUserEmpId}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Email Id <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="email" placeholder="Enter the official email id" {...register("newUserEmailId", {
                                                    required: 'Please enter the official email id'
                                                })}
                                                    value={pattern.newUserEmailId} onChange={(e) => handlePatternForAddNewUserInputs(e, /^[a-zA-Z0-9._+-]+@moptra\.com$/, 'newUserEmailId')} />
                                                {errors.newUserEmailId && (<div className="userErrorMessage">{errors.newUserEmailId.message}</div>)}
                                                {customErrorForAddNewUserInputs.newUserEmailId && (<div className='userErrorMessage'>{customErrorForAddNewUserInputs.newUserEmailId}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Mobile No. <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter the mobile no." {...register("newUserMobNo", {
                                                    required: 'Please enter the mobile no.',
                                                    minLength: {
                                                        value: 10,
                                                        message: 'Mobile no. must be of ten digits'
                                                    }
                                                })}
                                                    value={pattern.newUserMobNo} onChange={(e) => handlePatternForAddNewUserInputs(e, /^[0-9]+$/, 'newUserMobNo')} />
                                                {errors.newUserMobNo && (<div className="userErrorMessage">{errors.newUserMobNo.message}</div>)}
                                                {customErrorForAddNewUserInputs.newUserMobNo && (<div className='userErrorMessage'>{customErrorForAddNewUserInputs.newUserMobNo}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Role <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <select className="input-field" name='newUserRole' {...register("newUserRole", { required: 'Please choose the job role' })}
                                                    onChange={handleColorChange} style={{ color: selectColor }}>
                                                    <option value="" hidden style={{ color: "#d3d3d3" }}>Choose the job role</option>
                                                    <option style={{ color: 'black' }}>Super Admin</option>
                                                    <option style={{ color: 'black' }}>HR Admin</option>
                                                    <option style={{ color: 'black' }}>Employee</option>
                                                </select>
                                                {errors.newUserRole && (<div className="userErrorMessage">{errors.newUserRole.message}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Joining Date <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="date" min="2015-12-22" placeholder="Enter the joining date in DD/MM/YYYY" {...register("newUserJoiningDate", { required: 'Please enter the joining date' })}
                                                    onChange={handleDateColorChange} style={{ color: selectDateColor }} />
                                                {errors.newUserJoiningDate && (<div className="userErrorMessage">{errors.newUserJoiningDate.message}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Designation <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter the designation" {...register("newUserDesg", {
                                                    required: 'Please enter the designation',
                                                    maxLength: {
                                                        value: 50,
                                                        message: 'Designation cannot exceed 50 characters'
                                                    },
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
                                        <div className="input-text">
                                            <p>Client <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <select className="input-field" {...register("newUserProject", { required: 'Please select the client' })}
                                                    onChange={handleAddClientNameColorChange} style={{ color: selectAddClientNameColor }} value={selectedClientName} >
                                                    <option value='' hidden>Select the client</option>
                                                    {clientNames.map((name, index) => (
                                                        <option key={index} value={name} style={{ color: 'black' }}>
                                                            {name}
                                                        </option>
                                                    ))}
                                                    <option value='other' style={{ color: 'black' }}>Add Client Name</option>
                                                </select>
                                                {errors.newUserProject && (<div className="userErrorMessage">{errors.newUserProject.message}</div>)}
                                            </div>
                                        </div>
                                        {isModalForAddingManualClientName && (
                                            <div className="popup-add-overlay">
                                                <div className="popup">
                                                    <form>
                                                        <div className='user-input-icons'>
                                                            <p> Add Client Name <span style={{ color: "red" }}>*</span></p>
                                                            <input type='text' className='input-field' value={newOtherClientName} onChange={(e) => setNewOtherClientName(e.target.value)} required />
                                                            <div className='edit-delete-btn-container' style={{ marginTop: '12px' }}>
                                                                <button className='primary-btn' onClick={(e) => handleAddingOtherClientName(e)}>Add</button>
                                                                <button className="primary-btn" type="reset" style={{ background: 'darkgray' }} onClick={() => handelCancelOtherClientName()}>Close</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                        <div className="input-text">
                                            <p>Reporting Manager <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <select className="input-field" {...register("newUserProjectManager", { required: 'Please select the reporting manager' })}
                                                    onChange={handleAddProjectManagerNameColorChange} style={{ color: selectAddProjectManagerNameColor }}>
                                                    <option value='' hidden>Select the reporting manager</option>
                                                    <option style={{ color: 'black' }}>Anup Mangla</option>
                                                    <option style={{ color: 'black' }}>Shaurya</option>
                                                </select>
                                                {errors.newUserProjectManager && (<div className="userErrorMessage">{errors.newUserProjectManager.message}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Password <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type={newUserPasswordShow ? 'text' : 'password'} placeholder="Create the password"  {...register("newUserPassword", {
                                                    required: "Password is required",
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                                                        message: 'Password must be between 8 and 20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.(e.g., @$!%*?&)'
                                                    }
                                                })}
                                                    onChange={(e) => { handleNewUserPasswordCriteriaMessage(e); clearErrorFields("newUserPassword") }} />
                                                {newUserPasswordShowIcon && <button className='visibility-password' type='button' onClick={handleNewUserPasswordVisibility}>
                                                    {newUserPasswordShow ? <BiSolidHide /> : <BiSolidShow />}
                                                </button>}
                                                {!errors.newUserPassword && newUserPasswordCriteriaMessage && <div className="password-criteria visible">Password must be between 8 and 20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @$!%*?&)</div>}
                                                {errors.newUserPassword && (
                                                    <div className="userErrorMessage">{errors.newUserPassword.message}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Confirm Password <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input class="input-field" type={newUserConfirmPasswordShow ? 'text' : 'password'} placeholder="Confirm the password"  {...register("newUserConfirmPassword", {
                                                    required: "Password needs to get confirmed",
                                                    validate: value => value === newUserPasswordRef.current || (!errors.newUserPassword && "Password does not match")
                                                })} onChange={(e) => { handleNewUserConfirmPasswordIcon(e); clearErrorFields("newUserConfirmPassword") }} />
                                                {newUserConfirmPasswordShowIcon && <button className='confirm-visibility-password' type='button' onClick={handleNewUserConfirmPasswordVisibility}>
                                                    {newUserConfirmPasswordShow ? <BiSolidHide /> : <BiSolidShow />}
                                                </button>}
                                                {errors.newUserConfirmPassword && (
                                                    <div className="userErrorMessage">{errors.newUserConfirmPassword.message}</div>
                                                )}
                                            </div>
                                        </div>
                                        <br />
                                        <div style={{ textAlign: 'center' }}>
                                            <button className="primary-btn" type="submit">Add New User</button>
                                        </div>
                                        {serverError && (<div className="serverErrorMessage">{serverError}</div>)}
                                        <ToastContainer />
                                        <br />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
