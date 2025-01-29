import React, { useRef, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useFormContext } from "../components/ContextProvider/Context";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEmail } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

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

    const [signupName, setSignupName] = useState('');
    const [signupMobNo, setSignupMobNo] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);  // for toggle between password show and hide
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);  // for toggle between password show and hide
    const [passwordCriteriaMessage, setPasswordCriteriaMessage] = useState(false);
    const [pattern, setPattern] = useState({
        signupName: '',
        signupMob: '',
        signupPassword: ''
    });

    const [customErrorForSignupInputs, setCustomErrorForSignupInputs] = useState({
        signupName: '',
        signupMob: '',
        signupPassword: ''
    });

    const handlePatternForSignup = (e, pattern, field) => {
        let value = e.target.value;
        setServerError('');

        setPattern(prev => ({ ...prev, [field]: value }))
        if (field === 'signupName') setSignupName(value);
        if (field === 'signupMob') setSignupMobNo(value);
        if (field === 'signupPassword') {
            setSignupPassword(value);
            signupPasswordRef.current = value; // Update the ref with the latest value
        }

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
            } else if (value.length !== 10) {
                patternErrorMessage = 'Mobile number must be of 10 digits';
            }
            // Update the value after applying the limit of 10 digits
            setSignupMobNo(value);
        } else if (field === 'signupPassword') {
            if (value && !pattern.test(value)) {
                patternErrorMessage = 'Password must be between 8 and 20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @$!%*?&)';
            }
        }
        setCustomErrorForSignupInputs(prev => ({ ...prev, [field]: patternErrorMessage }));

        // If there's no error, clear the error message for the field
        if (!patternErrorMessage) {
            setCustomErrorForSignupInputs(prev => ({ ...prev, [field]: '' }));
            clearErrors(field);
        }

        // Handle password criteria message visibility
        if (field === 'signupPassword') {
            if (value === '') {
                setPasswordCriteriaMessage(false);  // Hide message when password field is empty
            } else {
                setPasswordCriteriaMessage(true);  // Show message when password field is not empty
            }
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

    const clearErrorFields = () => {  // to clear the error msg on any input change

        clearErrors();
    }

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
            const token = sessionStorage.getItem('token');
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
                toast.success("Admin account is created successfully!");
                console.log("credentials created successfully:", response.data);
                reset();
                setPattern({ signupName: '', signupMob: '' }); // Clear patterns
                setCustomErrorForSignupInputs({ signupName: '', signupMob: '' }); // Clear errors
                setServerError('');
                setCustomErrorForSignupInputs('');
                setPasswordCriteriaMessage(false);
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
            <div className="signup-row">
                <div className="col-6 left">
                    <div className="login-form">
                        <div className="top-logo">
                            <img src={require("assets/img/company_logo.png")} alt="..." />
                        </div>
                        <div className="signup-title">
                            <p className="welcome">CREATE ROLE</p>
                        </div>
                        <div className="form">
                            <form onSubmit={handleSubmit(handleFormSubmit)}>
                                <p className="register-title">Add new Credentials</p>
                                <div className="form-detail">
                                    <div className={`input-text ${errors.signupName ? 'error' : ''}`}>
                                        <p className="logo-txt">Full Name</p>

                                        <div className="input-icons">
                                            <IoPersonSharp className="icon" />
                                            <input className="login-input-field" type="text" placeholder="Enter full name"  {...register("signupName", { required: "Full name is required", maxLength: 50 })}
                                                value={pattern.signupName} onChange={(e) => handlePatternForSignup(e, /^[A-Za-z\s]+$/, 'signupName')} />
                                            {errors.signupName && (<div className="error-message">{errors.signupName.message}</div>)}
                                            {customErrorForSignupInputs.signupName && (<div className='error-message'>{customErrorForSignupInputs.signupName}</div>)}
                                        </div>
                                    </div>
                                    <div className={`input-text ${errors.signupMob ? 'error' : ''}`}>
                                        <p className="logo-txt">Mobile No</p>

                                        <div className="input-icons">
                                            <IoPersonSharp className="icon" />
                                            <input className="login-input-field" type="text" placeholder="Enter mobile number"  {...register("signupMob", { required: "Mobile Number is required" })}
                                                value={pattern.signupMob} onChange={(e) => handlePatternForSignup(e, /^[0-9]+$/, 'signupMob')} />
                                            {errors.signupMob && (<div className="error-message">{errors.signupMob.message}</div>)}
                                            {customErrorForSignupInputs.signupMob && (<div className='error-message'>{customErrorForSignupInputs.signupMob}</div>)}
                                        </div>
                                    </div>
                                    <div className={`input-text ${errors.signupEmail ? 'error' : ''}`}>
                                        <p className="logo-txt">Email ID</p>

                                        <div className="input-icons">
                                            <MdEmail className="icon" />
                                            <input className="login-input-field" type="email" placeholder="Enter E-mail ID"  {...register("signupEmail", { required: "Email ID is required" })}
                                                onChange={clearErrorFields} />
                                            {errors.signupEmail && (
                                                <p className="error-message">{errors.signupEmail.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`input-text ${errors.signupPassword ? 'error' : ''}`}>
                                        <p className="logo-txt">Password</p>
                                        <div className="input-icons">
                                            <RiLockPasswordLine className="icon" />
                                            <input class="login-input-field" type={passwordShow ? 'text' : 'password'} placeholder="Create Password"  {...register("signupPassword", {
                                                required: "Password is required",
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                                                    message: 'Password must be between 8 and 20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @$!%*?&)'
                                                }
                                            })}
                                                value={pattern.signupPassword} onChange={(e) => { setPasswordCriteriaMessage(true); handlePatternForSignup(e, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, 'signupPassword'); clearErrorFields() }} />
                                            {signupPassword.length > 0 && (<button className='visibility-password' type='button' onClick={handlePasswordVisibility}>
                                                {passwordShow ? <BiSolidHide /> : <BiSolidShow />}
                                            </button>)}
                                            {!errors.signupPassword && passwordCriteriaMessage && <div className="password-criteria visible">Password must be between 8 and 20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @$!%*?&)</div>}
                                            {errors.signupPassword && (
                                                <p className="error-message">{errors.signupPassword.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`input-text ${errors.signupConfirmPassword ? 'error' : ''} confirm ${passwordCriteriaMessage ? 'with-criteria' : ''}`}>
                                        <p className="logo-txt confirm">Confirm Password</p>
                                        <div className="input-icons">
                                            <RiLockPasswordFill className="icon" />
                                            <input class="login-input-field" type={confirmPasswordShow ? 'text' : 'password'} placeholder="Confirm Password"  {...register("signupConfirmPassword", {
                                                required: "Password is required",
                                                validate: value => value === signupPasswordRef.current || "Password does not match"
                                            })} onChange={clearErrorFields} />
                                            {signupPasswordRef.current.length > 0 && (<button className='visibility-password' type='button' onClick={handleConfirmPasswordVisibility}>
                                                {confirmPasswordShow ? <BiSolidHide /> : <BiSolidShow />}
                                            </button>)}
                                            {errors.signupConfirmPassword && (
                                                <p className="error-message">{errors.signupConfirmPassword.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <div>
                                            <button className="login" type="submit">
                                                Create Credentials
                                            </button>
                                        </div>
                                    </div>
                                    {/* {errorMessage && <p className="invalidLoginErrorMessage">{errorMessage}</p>} */}

                                    {/* <div className="bottom-text">
                                        <p className="txt"><b>Already have an account?</b> <span> <Link to='/'> Log In </Link> </span></p>
                                    </div> */}
                                    <br />
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
    );
}

