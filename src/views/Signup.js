import React, { useRef, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useFormContext } from "../components/ContextProvider/Context";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import Breadcrumb from "./Breadcrumb";

export default function Signup() {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        trigger,
        setValue,
        watch,
        reset,
        clearErrors,
        setError,
        serverError,
        setServerError
    } = useFormContext();

    const navigate = useNavigate();
    const [signupName, setSignupName] = useState('');
    const [signupMobNo, setSignupMobNo] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);  // for toggle between password show and hide
    const [passwordShowIcon, setPasswordShowIcon] = useState(false); // to store password icon
    const [confirmPasswordShowIcon, setConfirmPasswordShowIcon] = useState(false); // to store confirm password icon
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);  // for toggle between password show and hide
    const [passwordCriteriaMessage, setPasswordCriteriaMessage] = useState(false);
    const [pattern, setPattern] = useState({
        signupName: '',
        signupMob: '',
        signupEmail: '',
        signupPassword: ''
    });

    const [customErrorForSignupInputs, setCustomErrorForSignupInputs] = useState({
        signupName: '',
        signupMob: '',
        signupEmail: '',
        signupPassword: ''
    });

    const handlePatternForSignup = (e, pattern, field) => {
        let value = e.target.value;
        setServerError('');
        clearErrors(field);

        setPattern(prev => ({ ...prev, [field]: value }))
        if (field === 'signupName') setSignupName(value);
        if (field === 'signupMob') setSignupMobNo(value);
        if(field === 'signupEmail') setSignupEmail(value);

        let patternErrorMessage = '';
        if (field === 'signupName' && value && !pattern.test(value)) {
            patternErrorMessage = 'No numbers or special characters are allowed';
        } else if (field === 'signupMob') {
            // If mobile number exceeds 10 digits, slice it to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10); // Slice to 10 digits
            }
            // Perform validation
            if (value && !pattern.test(value)) {
                patternErrorMessage = 'Only numbers are allowed';
            } 
            setSignupMobNo(value);
        }else if (field === 'signupEmail' && value && !pattern.test(value)){
            patternErrorMessage = 'Please enter the valid email address';
        }
        setCustomErrorForSignupInputs(prev => ({ ...prev, [field]: patternErrorMessage }));

        // If there's no error, clear the error message for the field
        if (!patternErrorMessage) {
            setCustomErrorForSignupInputs(prev => ({ ...prev, [field]: '' }));
            clearErrors(field);
        }
    };

    // for password visibility
    const handlePasswordVisibility = () => {
        setPasswordShow(!passwordShow);
    }
    const handleConfirmPasswordVisibility = () => {
        setConfirmPasswordShow(!confirmPasswordShow);
    }

    const signupPasswordRef = useRef({});
    signupPasswordRef.current = watch("signupPassword", "");

    const clearErrorFields = (field) => {  // to clear the error msg on any input change
         clearErrors(field);
         setServerError('');
    }

    // for conditionally showing passwordCriteriaMessage
    const handlePasswordCriteriaMessage = (e) => {
        const showPasswordCriteriaMessage = e.target.value;
        if (showPasswordCriteriaMessage) {
            setPasswordCriteriaMessage(true);
            setPasswordShowIcon(true);
            console.log('passwordCriteriaMessage is:', passwordCriteriaMessage);
        }else{
            setPasswordCriteriaMessage(false);
            setPasswordShowIcon(false);
            console.log('passwordCriteriaMessage is:', passwordCriteriaMessage);
        }
     }

     // for conditionally showing password icon
     const handleConfirmPasswordIcon = (e) => {
        const getConfirmPasswordIcon = e.target.value;
        if(getConfirmPasswordIcon){
            setConfirmPasswordShowIcon(true);
        }else{
            setConfirmPasswordShowIcon(false);
        }
     }

    useEffect(() => {
        console.log('passwordCriteriaMessage changed:', passwordCriteriaMessage);
    }, [passwordCriteriaMessage]);

    // Handle form submission
    const handleFormSubmit = async (data) => {

        console.log('credentials:', data);

        const newPayload = {
            "email": data.signupEmail,
            "password": signupPasswordRef.current,
            "fullName": data.signupName,
            "dateOfBirth": "",
            "mobileNumber": data.signupMob,
            "roleName": "ADMIN"
        }
        console.log("payload:", newPayload);

        try {

            // Retrieve the token from sessionStorage
            const token = localStorage.getItem('token');
            if (!token) {
                setServerError('User is not authenticated. Please log in again.');
                return; // Exit if token is not found
            }

            const response = await axios.post("http://localhost:8081/primaryDetails/create", newPayload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            });

            if (response && response.data) {
                // localStorage.setItem('token', response.data.token); // Store the token after registration
                toast.success("Admin account is created successfully, and their credentials have been sent to the respective email ID!");
                console.log("credentials created successfully:", response.data);
                reset({
                    signupPassword: '',
                    signupConfirmPassword: ''
                });
                setPattern({ signupName: '', signupMob: '',  signupEmail: '' }); // Clear patterns
                setCustomErrorForSignupInputs({ signupName: '', signupMob: '',  signupEmail: '' }); // Clear errors
                setServerError('');
                setCustomErrorForSignupInputs('');
                setPasswordCriteriaMessage(false);
                setPasswordShowIcon(false);
                setConfirmPasswordShowIcon(false);
                setTimeout(() => {
                    navigate('/admin/Users')
                }, 2000);
            } else {
                console.error("Unexpected response status:", result.status);
            }
        }

        catch (error) {
            console.log("Full Error Object:", error);
            if (error.response) {
                console.log("Error Response Data:", error.response.data);
                console.log("Error Status:", error.response.status);
                // Handle different status codes here
                if (error.response.status === 400) {
                    setServerError('Email already exists. Please use a different email');
                } else {
                    setServerError('An error occurred in creating credentials for admin');
                }
            } else if (error.request) {
                // The request was made but no response was received
                setServerError('No response from server. Please check your network connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setServerError(`Error: ${error.message}`);
            }
        }

    }

    return (
        <div className="container-fluid">
            <Breadcrumb/>
            <div className='register-container'>
                <div className="row Signup-row">
                    <div className="col-6 left">
                        <div className="Signup-form">
                            <div className="title">
                                <p className="name">Create Admin</p>
                                {/* <p className='signup-info-text'>Add new Credentials</p> */}
                            </div>
                            <br />
                            <div className="form">
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div>
                                        <div className={`input-text ${errors.signupName ? 'error' : ''}`}>
                                            <p>Full Name <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter full name"  {...register("signupName", { required: "Full name is required", maxLength: 50 })}
                                                    value={pattern.signupName} onChange={(e) => handlePatternForSignup(e, /^[A-Za-z\s]+$/, 'signupName')} />
                                                {errors.signupName && (<div className="userErrorMessage">{errors.signupName.message}</div>)}
                                                {customErrorForSignupInputs.signupName && (<div className='userErrorMessage'>{customErrorForSignupInputs.signupName}</div>)}
                                            </div>
                                        </div>
                                        <div className={`input-text ${errors.signupMob ? 'error' : ''}`}>
                                            <p className="logo-txt">Mobile No <span style={{ color: "red" }}>*</span></p>

                                            <div className="user-input-icons">
                                                <input className="input-field" type="text" placeholder="Enter mobile number"  {...register("signupMob", { required: "Mobile Number is required" ,
                                                     minLength: {
                                                        value: 10,
                                                        message: 'Mobile no. must be of ten digits'
                                                    }
                                                })}
                                                    value={pattern.signupMob} onChange={(e) => handlePatternForSignup(e, /^[0-9]+$/, 'signupMob')} />
                                                {errors.signupMob && (<div className="userErrorMessage">{errors.signupMob.message}</div>)}
                                                {customErrorForSignupInputs.signupMob && (<div className='userErrorMessage'>{customErrorForSignupInputs.signupMob}</div>)}
                                            </div>
                                        </div>
                                        <div className={`input-text ${errors.signupEmail ? 'error' : ''}`}>
                                            <p className="logo-txt">Email ID <span style={{ color: "red" }}>*</span></p>

                                            <div className="user-input-icons">
                                                <input className="input-field" type="email" placeholder="Enter E-mail ID"  {...register("signupEmail", { required: "Email ID is required" })}
                                                value={pattern.signupEmail} onChange={(e) => handlePatternForSignup(e, /^[a-zA-Z0-9._+-]+@moptra\.com$/, 'signupEmail')} />
                                                {errors.signupEmail && (
                                                    <div className="userErrorMessage">{errors.signupEmail.message}</div>
                                                )}
                                                {customErrorForSignupInputs.signupEmail && (<div className='userErrorMessage'>{customErrorForSignupInputs.signupEmail}</div>)}
                                            </div>
                                        </div>
                                        <div className={`input-text ${errors.signupPassword ? 'error' : ''}`}>
                                            <p className="logo-txt">Password <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input class="input-field" type={passwordShow ? 'text' : 'password'} placeholder="Create Password"  {...register("signupPassword", {
                                                    required: "Password is required",
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                                                        message: 'Password must be between 8 and 20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.(e.g., @$!%*?&)'
                                                    }
                                                })}
                                                    onChange={(e) => { handlePasswordCriteriaMessage(e); clearErrorFields("signupPassword") }} />
                                                { passwordShowIcon && <button className='visibility-password' type='button' onClick={handlePasswordVisibility}>
                                                    {passwordShow ? <BiSolidHide /> : <BiSolidShow />}
                                                </button>}
                                                {!errors.signupPassword && passwordCriteriaMessage && <div className="password-criteria visible">Password must be between 8 and 20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @$!%*?&)</div>}
                                                {errors.signupPassword && (
                                                    <div className="userErrorMessage">{errors.signupPassword.message}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`input-text ${errors.signupConfirmPassword ? 'error' : ''} confirm ${passwordCriteriaMessage ? 'with-criteria' : ''}`}>
                                            <p className="logo-txt confirm">Confirm Password <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input class="input-field" type={confirmPasswordShow ? 'text' : 'password'} placeholder="Confirm Password"  {...register("signupConfirmPassword", {
                                                    required: "Password is required",
                                                    validate: value => value === signupPasswordRef.current || (!errors.signupPassword && "Password does not match")
                                                })} onChange={(e) => {handleConfirmPasswordIcon(e); clearErrorFields("signupConfirmPassword")}} />
                                                {confirmPasswordShowIcon && <button className='confirm-visibility-password' type='button' onClick={handleConfirmPasswordVisibility}>
                                                    {confirmPasswordShow ? <BiSolidHide /> : <BiSolidShow />}
                                                </button>}
                                                {errors.signupConfirmPassword && (
                                                    <div className="userErrorMessage">{errors.signupConfirmPassword.message}</div>
                                                )}
                                            </div>
                                        </div>
                                        <br />
                                        <div>
                                            <div style={{textAlign: 'center'}}>
                                                <button className="primary-btn" type="submit">
                                                    Create Credentials
                                                </button>
                                            </div>
                                        </div>
                                        <br />
                                        {serverError && (<div className="signup-error-message">{serverError}</div>)}
                                        <ToastContainer />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

