import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormContext } from "../components/ContextProvider/Context";
import { toast, ToastContainer } from 'react-toastify';
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import axios from 'axios';
import Breadcrumb from './Breadcrumb';
import { useHolidayListContext } from 'components/ContextProvider/HolidayListContext';

export default function AddNewUser() {
    const {
        register, handleSubmit, onSubmit, reset, errors, serverError, setServerError, clearErrors, role, setRole, watch, setValue
    } = useFormContext();
    const holidays = useHolidayListContext();
    const [editUserFullName, setEditUserFullName] = useState(''); // state for holding fullname
    const [editUserEmpId, setEditUserEmpId] = useState(''); // state for holding emp id
    const [editUserDesg, setEditUserDesg] = useState(''); // state for holding desg
    const [editUserEmail, setEditUserEmail] = useState(''); // state for holding email
    const [editUserMobNo, setEditUserMobNo] = useState(''); // state for holding mob no.
    const [editUserPasswordShow, setEditUserPasswordShow] = useState(false);  // for toggle between password show and hide
    const [editUserPasswordShowIcon, setEditUserPasswordShowIcon] = useState(false); // to store password icon
    const [editUserConfirmPasswordShowIcon, setEditUserConfirmPasswordShowIcon] = useState(false); // to store confirm password icon
    const [editUserConfirmPasswordShow, setEditUserConfirmPasswordShow] = useState(false);  // for toggle between password show and hide
    const [editUserPasswordCriteriaMessage, setEditUserPasswordCriteriaMessage] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false); // State for submission status
    const [selectEditColor, setSelectEditColor] = useState("#d3d3d3"); // for giving diff color to select placeholder and option
    const [selectEditDateColor, setSelectDateEditColor] = useState("#d3d3d3"); // for giving diff color to date placeholder and option
    const [selectClientNameColor, setClientNameColor] = useState("#d3d3d3");
    const [selectProjectManagerNameColor, setProjectManagerNameColor] = useState("#d3d3d3");
    const [isModalForEditingManualClientName, setModalForEditingManualClientName] = useState(false); // for tracking the modal for adding client name
    const [editOtherClientName, setEditOtherClientName] = useState(""); // For storing new other client name
    const [selectedEditClientName, setSelectedEditClientName] = useState('');
    const [editClientList, setEditClientList] = useState(['Petco', 'React Project']);

    const [pattern, setPattern] = useState({
        editUserName: '',
        editUserEmpId: '',
        editUserDesg: '',
        editUserEmailId: '',
        editUserMobNo: ''
    }); // state for overall handling of pattern

    const [customErrorForEditUserInputs, setCustomErrorForEditUserInputs] = useState({
        editUserName: '',
        editUserEmpId: '',
        editUserDesg: '',
        editUserEmailId: '',
        editUserMobNo: ''
    }); // error msg for its pattern failure

    const navigate = useNavigate();
    const { id } = useParams(); // Get userId from URL params
    console.log("User ID from URL:", id);
    const location = useLocation();
    const { users } = location.state || {}; // Retrieve user data from navigation state
    const utcDate = new Date(users.joiningDate);
    const year = utcDate.getFullYear();
    const month = String(utcDate.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month
    const day = String(utcDate.getDate()).padStart(2, "0"); // Ensure 2-digit day

    const formattedDate = `${year}-${month}-${day}`;
    console.log("Formatted Date:", formattedDate); // Debugging log


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
    const isDisabledEditJoiningDate = (date) => {
        const day = new Date(date).getDay(); // 0 = Sunday, 6 = Saturday
        return formattedHolidays.includes(date) || day === 0 || day === 6;
    };


    // Populate the form fields with existing user data
    useEffect(() => {
        if (users) {
            setPattern({
                editUserName: users.name || "",
                editUserEmpId: users.employeeId || "",
                editUserEmailId: users.email || "",
                editUserMobNo: users.mobileNumber || "",
                editUserDesg: users.designation || "",
            });

            // Handle client name and check if it's in the list
            if (users.projects) {
                if (!editClientList.includes(users.projects)) {
                    setEditClientList((prev) => [...prev, users.projects]);
                }
                setSelectedEditClientName(users.projects);
                setValue("editUserClientName", users.projects);  // Update the form field
            }

            // Map role names to the required format
            const roleMapping = {
                "SUPER_ADMIN": "Super Admin",
                "ADMIN": "HR Admin",
                "EMPLOYEE": "Employee"
            };

            // Also update react-hook-form fields
            setValue("editUserName", users.name || "");
            setValue("editUserEmpId", users.employeeId || "");
            setValue("editUserEmailId", users.email || "");
            setValue("editUserMobNo", users.mobileNumber || "");
            setValue("editUserRole", roleMapping[users.roleName] || users.roleName);
            setValue("editUserJoiningDate", formattedDate || "");
            setValue("editUserDesg", users.designation || "");
            setValue("editUserProjectManagerName", users.projectManager || "");
            setValue("editUserPassword", "");
            setValue("editUserConfirmPassword", "");

            // ✅ Only force color change for the date input
            if (users.joiningDate) {
                setSelectDateEditColor("black");
            }
        }
    }, [users, setValue]);

    // pattern failure validation 
    const handlePatternForEditUserInputs = (e, pattern, field) => {
        let value = e.target.value;
        // Clear server error when the user starts typing again
        setServerError('');
        clearErrors(field);
        setPattern(prev => ({ ...prev, [field]: value }))
        if (field === 'editUserName') setEditUserFullName(value);
        if (field === 'editUserEmpId') setEditUserEmpId(value);
        if (field === 'editUserDesg') setEditUserDesg(value);
        if (field === 'editUserEmailId') setEditUserEmail(value);
        if (field === 'editUserMobNo') setEditUserMobNo(value);

        let patternErrorMessage = '';
        if (field === 'editUserName' && value && !pattern.test(value)) {
            patternErrorMessage = 'No numbers or special characters are allowed';
        } else if (field === 'editUserEmpId') {
            // If emp id exceeds 6 digits, slice it to 6 digits
            if (value.length > 6) {
                value = value.slice(0, 6);
            }
            // perform validation
            if (value && !pattern.test(value)) {
                patternErrorMessage = 'Only numbers are allowed';
            }
            setEditUserEmpId(value);
        } else if (field === 'editUserDesg' && value && !pattern.test(value)) {
            patternErrorMessage = 'No special characters are allowed';
        } else if (field === 'editUserEmailId' && value && !pattern.test(value)) {
            patternErrorMessage = 'Please enter the valid email address';
        } else if (field === 'editUserMobNo') {  // If mobile number exceeds 10 digits, slice it to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10); // Slice to 10 digits
            }
            // Perform validation
            if (value && !pattern.test(value)) {
                patternErrorMessage = 'Only numbers are allowed';
            }
            setEditUserMobNo(value);
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
        if (isDisabledEditJoiningDate(selectedEditDateValue)) {
            alert("This date is a holiday or a weekend. Please select another joining date.");
            e.target.value = "";
            setSelectDateEditColor("#d3d3d3");
            return;
        }
        else {
            setSelectDateEditColor("black");
        }
        clearErrors('editUserJoiningDate');
    };
    const handleClientNameColorChange = (e) => {
        const selectedClientNameColorValue = e.target.value;
        setClientNameColor(selectedClientNameColorValue ? "black" : "#d3d3d3");
        clearErrors("editUserClientName");

        if (selectedClientNameColorValue === "other") {
            console.log('other option selected')
            setModalForEditingManualClientName(true);
        } else {
            setSelectedEditClientName(selectedClientNameColorValue); // Update the selected client name
        }
    };

    const handleEditingOtherClientName = (e) => {
        e.preventDefault();  // Prevent page reload
        console.log("other client name is added:", editOtherClientName);

        if (editOtherClientName.trim() !== "") {
            // Add the new client name to the list
            setEditClientList([...editClientList, editOtherClientName]);
            // Set the selected client name immediately
            setSelectedEditClientName(editOtherClientName);
            setValue("editUserClientName", editOtherClientName);  // Update form value
        }

        setModalForEditingManualClientName(false); // Close modal
        setEditOtherClientName("");                // Clear input field
    };

    // handl closing the pop up
    const handelCancelEditOtherClientName = () => {
        setModalForEditingManualClientName(false);
    }

    const handleProjectManagerNameColorChange = (e) => {
        const selectedManagerNameColorValue = e.target.value;
        setProjectManagerNameColor(selectedManagerNameColorValue ? "black" : "#d3d3d3");
        clearErrors("editUserProjectManagerName");
    };

    // for password visibility
    const handleEditUserPasswordVisibility = () => {
        setEditUserPasswordShow(!editUserPasswordShow);
    }
    const handleEditUserConfirmPasswordVisibility = () => {
        setEditUserConfirmPasswordShow(!editUserConfirmPasswordShow);
    }

    const editUserPasswordRef = useRef({});
    editUserPasswordRef.current = watch("editUserPassword", "");

    const clearErrorFields = (field) => {  // to clear the error msg on any input change
        clearErrors(field);
        setServerError('');
    }

    // for conditionally showing passwordCriteriaMessage
    const handleEditUserPasswordCriteriaMessage = (e) => {
        const showEditUserPasswordCriteriaMessage = e.target.value;
        if (showEditUserPasswordCriteriaMessage) {
            setEditUserPasswordCriteriaMessage(true);
            setEditUserPasswordShowIcon(true);
            console.log('passwordCriteriaMessage is:', editUserPasswordCriteriaMessage);
        } else {
            setEditUserPasswordCriteriaMessage(false);
            setEditUserPasswordShowIcon(false);
            console.log('passwordCriteriaMessage is:', editUserPasswordCriteriaMessage);
        }
    }

    // for conditionally showing password icon
    const handleEditUserConfirmPasswordIcon = (e) => {
        const getEditUserConfirmPasswordIcon = e.target.value;
        if (getEditUserConfirmPasswordIcon) {
            setEditUserConfirmPasswordShowIcon(true);
        } else {
            setEditUserConfirmPasswordShowIcon(false);
        }
    }

    const handleFormSubmit = async (data) => {

        // Ensure ID is retrieved correctly
        const userIdToUpdate = id || users?.usersId;  // Use ID from URL or state

        // Map role names to the required format
        const roleMapping = {
            "Super Admin": "SUPER_ADMIN",
            "HR Admin": "ADMIN",
            "Employee": "EMPLOYEE"
        };

        const payload = {
            "usersId": userIdToUpdate,
            "employeeId": data.editUserEmpId,
            "name": data.editUserName,
            "roleName": roleMapping[data.editUserRole] || data.editUserRole,
            "joiningDate": new Date(data.editUserJoiningDate).toISOString(),
            "designation": data.editUserDesg,
            "projects": data.editUserClientName,
            "projectManager": data.editUserProjectManagerName,
            "email": data.editUserEmailId,
            "mobileNumber": data.editUserMobNo,
            "password": data.editUserPassword
        }
        console.log('payload for edit user:', payload);
        try {
            // Retrieve the token from sessionStorage
            const token = localStorage.getItem('token');
            if (!token) {
                setServerError('User is not authenticated. Please log in again.');
                return; // Exit if token is not found
            }

            const response = await axios.put(`http://localhost:8081/users/update/${userIdToUpdate}`, payload, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            if (response && response.data) {
                console.log('from is edited:', response.data);
                toast.success("User details has been updated successfully, and their credentials have been sent to the respective email ID!");
                reset({
                    editUserRole: '',
                    editUserJoiningDate: '',
                    editUserClientName: '',
                    editUserProjectManagerName: '',
                    editUserPassword: '',
                    editUserConfirmPassword: ''
                });
                setEditUserFullName('');
                setEditUserDesg('');
                setPattern({ editUserName: '', editUserEmpId: '', editUserDesg: '', editUserEmailId: '', editUserMobNo: '' }); // Reset pattern state
                setCustomErrorForEditUserInputs({ editUserName: '', editUserEmpId: '', editUserDesg: '', editUserEmailId: '', editUserMobNo: '' }); // Clear custom errors
                setServerError('');
                setSelectEditColor("#d3d3d3");
                setSelectDateEditColor("#d3d3d3");
                setClientNameColor("#d3d3d3");
                setProjectManagerNameColor("#d3d3d3");
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
                                    Edit User
                                </p>
                            </div>
                            <br />
                            <div className="form">
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="form-detail">
                                        <div className="input-text">
                                            <p>Employee Name <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter the name" {...register("editUserName", {
                                                    required: 'Please enter the name',
                                                    maxLength: {
                                                        value: 50,
                                                        message: 'Name cannot exceed 50 characters'
                                                    },
                                                    minLength: {
                                                        value: 3,
                                                        message: 'Name must be at least 3 characters'
                                                    }
                                                })}
                                                    value={pattern.editUserName} onChange={(e) => handlePatternForEditUserInputs(e, /^[A-Za-z\s]+$/, 'editUserName')} />
                                                {errors.editUserName && (<div className="userErrorMessage">{errors.editUserName.message}</div>)}
                                                {customErrorForEditUserInputs.editUserName && (<div className='userErrorMessage'>{customErrorForEditUserInputs.editUserName}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Employee ID <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter the employee id" {...register("editUserEmpId", {
                                                    required: 'Please enter the employee id',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Employee ID must be of six digits'
                                                    }
                                                })}
                                                    value={pattern.editUserEmpId} onChange={(e) => handlePatternForEditUserInputs(e, /^[0-9]+$/, 'editUserEmpId')} />
                                                {errors.editUserEmpId && (<div className="userErrorMessage">{errors.editUserEmpId.message}</div>)}
                                                {customErrorForEditUserInputs.editUserEmpId && (<div className='userErrorMessage'>{customErrorForEditUserInputs.editUserEmpId}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Email Id <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="email" placeholder="Enter the official email id" {...register("editUserEmailId", {
                                                    required: 'Please enter the official email id'
                                                })}
                                                    value={pattern.editUserEmailId} onChange={(e) => handlePatternForEditUserInputs(e, /^[a-zA-Z0-9._+-]+@moptra\.com$/, 'editUserEmailId')} />
                                                {errors.editUserEmailId && (<div className="userErrorMessage">{errors.editUserEmailId.message}</div>)}
                                                {customErrorForEditUserInputs.editUserEmailId && (<div className='userErrorMessage'>{customErrorForEditUserInputs.editUserEmailId}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Mobile No. <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter the mobile no." {...register("editUserMobNo", {
                                                    required: 'Please enter the mobile no.',
                                                    minLength: {
                                                        value: 10,
                                                        message: 'Mobile no. must be of ten digits'
                                                    }
                                                })}
                                                    value={pattern.editUserMobNo} onChange={(e) => handlePatternForEditUserInputs(e, /^[0-9]+$/, 'editUserMobNo')} />
                                                {errors.editUserMobNo && (<div className="userErrorMessage">{errors.editUserMobNo.message}</div>)}
                                                {customErrorForEditUserInputs.editUserMobNo && (<div className='userErrorMessage'>{customErrorForEditUserInputs.editUserMobNo}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Role <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <select className="input-field" name='newUserRole' {...register("editUserRole", { required: 'Please choose the job role' })}
                                                    onChange={handleEditSelectColorChange} style={{ color: selectEditColor }}>
                                                    <option value='' hidden>Choose the job role</option>
                                                    <option style={{ color: 'black' }}>Super Admin</option>
                                                    <option style={{ color: 'black' }}>HR Admin</option>
                                                    <option style={{ color: 'black' }}>Employee</option>
                                                </select>
                                                {errors.editUserRole && (<div className="userErrorMessage">{errors.editUserRole.message}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Joining Date <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="date" min="2015-12-22" placeholder="Enter the joining date in DD/MM/YYYY" {...register("editUserJoiningDate", { required: 'Please enter the joining date' })}
                                                    onChange={handleEditDateColorChange} style={{ color: selectEditDateColor }} />
                                                {errors.editUserJoiningDate && (<div className="userErrorMessage">{errors.editUserJoiningDate.message}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Designation <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter the designation" {...register("editUserDesg", {
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
                                                    value={pattern.editUserDesg} onChange={(e) => handlePatternForEditUserInputs(e, /^[A-Za-z0-9\s-]+(?:\s[A-Za-z0-9\s-]+)*(\s([IVXLCDM]+))?$/, 'editUserDesg')} />
                                                {errors.editUserDesg && (<div className="userErrorMessage">{errors.editUserDesg.message}</div>)}
                                                {customErrorForEditUserInputs.editUserDesg && (<div className='userErrorMessage'>{customErrorForEditUserInputs.editUserDesg}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Client <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <select className="input-field" {...register("editUserClientName", { required: 'Please select the client' })}
                                                    value={selectedEditClientName} onChange={handleClientNameColorChange} style={{ color: selectClientNameColor }}>
                                                    <option value='' hidden>Select the client</option>
                                                    {editClientList.map((name, index) => (
                                                        <option key={index} value={name} style={{ color: 'black' }}>
                                                            {name}
                                                        </option>
                                                    ))}
                                                    <option value='other' style={{ color: 'black' }}>Add Client Name</option>
                                                </select>
                                                {errors.editUserClientName && (<div className="userErrorMessage">{errors.editUserClientName.message}</div>)}
                                            </div>
                                        </div>
                                        {isModalForEditingManualClientName && (
                                            <div className="popup-add-overlay">
                                                <div className="popup">
                                                    <form>
                                                        <div className='user-input-icons'>
                                                            <p> Add Client Name <span style={{ color: "red" }}>*</span></p>
                                                            <input type='text' className='input-field' value={editOtherClientName} onChange={(e) => setEditOtherClientName(e.target.value)} required />
                                                            <div className='edit-delete-btn-container' style={{ marginTop: '12px' }}>
                                                                <button className='primary-btn' onClick={(e) => handleEditingOtherClientName(e)}>Add</button>
                                                                <button className="primary-btn" type="reset" style={{ background: 'darkgray' }} onClick={() => handelCancelEditOtherClientName()}>Close</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                        <div className="input-text">
                                            <p>Reporting Manager <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <select className="input-field" {...register("editUserProjectManagerName", { required: 'Please select the reporting manager' })}
                                                    onChange={handleProjectManagerNameColorChange} style={{ color: selectProjectManagerNameColor }}>
                                                    <option value='' hidden>Select the reporting manager</option>
                                                    <option style={{ color: 'black' }}>Anup Mangla</option>
                                                    <option style={{ color: 'black' }}>Shaurya</option>
                                                </select>
                                                {errors.editUserProjectManagerName && (<div className="userErrorMessage">{errors.editUserProjectManagerName.message}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Password <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type={editUserPasswordShow ? 'text' : 'password'} placeholder="Create the password"  {...register("editUserPassword", {
                                                    required: "Password is required",
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                                                        message: 'Password must be between 8 and 20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.(e.g., @$!%*?&)'
                                                    }
                                                })}
                                                    onChange={(e) => { handleEditUserPasswordCriteriaMessage(e); clearErrorFields("editUserPassword") }} />
                                                {editUserPasswordShowIcon && <button className='visibility-password' type='button' onClick={handleEditUserPasswordVisibility}>
                                                    {editUserPasswordShow ? <BiSolidHide /> : <BiSolidShow />}
                                                </button>}
                                                {!errors.editUserPassword && editUserPasswordCriteriaMessage && <div className="password-criteria visible">Password must be between 8 and 20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @$!%*?&)</div>}
                                                {errors.editUserPassword && (
                                                    <div className="userErrorMessage">{errors.editUserPassword.message}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Confirm Password <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input class="input-field" type={editUserConfirmPasswordShow ? 'text' : 'password'} placeholder="Confirm the password"  {...register("editUserConfirmPassword", {
                                                    required: "Password needs to get confirmed",
                                                    validate: value => value === editUserPasswordRef.current || (!errors.editUserPassword && "Password does not match")
                                                })} onChange={(e) => { handleEditUserConfirmPasswordIcon(e); clearErrorFields("editUserConfirmPassword") }} />
                                                {editUserConfirmPasswordShowIcon && <button className='confirm-visibility-password' type='button' onClick={handleEditUserConfirmPasswordVisibility}>
                                                    {editUserConfirmPasswordShow ? <BiSolidHide /> : <BiSolidShow />}
                                                </button>}
                                                {errors.editUserConfirmPassword && (
                                                    <div className="userErrorMessage">{errors.editUserConfirmPassword.message}</div>
                                                )}
                                            </div>
                                        </div>
                                        <br />
                                        <div>
                                            <div className='edit-delete-btn-container'>
                                                <button className="primary-btn" type="submit">Update</button>
                                                {/* <button className="primary-btn" style={{ background: 'indianred' }} type="button">Delete</button> */}
                                            </div>
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
            </div>
        </div>
    )
}
