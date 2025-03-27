import React, { useState, useEffect } from 'react';
import { useLocation, Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { useFormContext } from "../components/ContextProvider/Context";
import Header from "components/Header/Header";
import { IoPersonSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

export default function LoginForm() {

    const navigate = useNavigate();
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
        setServerError,
    } = useFormContext();

    const [role, setRole] = useState(null); // for tracking role name
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [errorMessageForOtp, setErrorMessageForOtp] = useState('');
    const [verifiedOtp, setVerifiedOtp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [invalidPasswordError, setInvalidPasswordError] = useState('');
    const [password, setPassword] = useState(''); // for tracking password value
    const [passwordShow, setPasswordShow] = useState(false);  // for toggle between password show and hide
    const [loginAttempts, setLoginAttempts] = useState(0);  // Track failed login attempts
    const [lockoutTime, setLockoutTime] = useState(null);  // Lockout time after too many attempts
    const [lockoutError, setLockoutError] = useState('');
    const [isLockedOut, setIsLockedOut] = useState(false);
    const [countdown, setCountdown] = useState(0); // Initialize countdown state

    useEffect(() => {
        console.log('Updated role in context:', role);
    }, [role]);

    // Check if the user is already logged in by looking for role in localStorage
    useEffect(() => {
        const storedRole = localStorage.getItem('role');

        if (storedRole) {
            // Set role in state if it exists in localStorage
            setRole(storedRole);
        }
    }, [setRole]);

    // Clear any error messages when the user starts typing
    const handleInputChange = (fieldName) => {
        setErrorMessage('');
        setServerError('');
        setInvalidPasswordError('');
        clearErrors(fieldName);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorMessage('');
        setServerError('');
        setInvalidPasswordError('');
        clearErrors('loginPassword');
        setValue('loginPassword', e.target.value);  // Ensure the value is tracked in form state
    }

    // for password visibility
    const handlePasswordVisibility = () => {
        setPasswordShow(!passwordShow);
    }

    // for login btn conditionally disabled
    const { loginEmail, loginPassword } = watch();  // Destructure the form values
    console.log('login email:', loginEmail);
    console.log('login password:', loginPassword);
    const isLoginDisabled = !loginEmail || !loginPassword || isLockedOut;

    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Handle form submission
    const handleFormSubmit = async (data) => {
        console.log('login credentials:', data);

        // If the user is locked out, prevent form submission
        if (isLockedOut) {
            return; // The lockout error message is already handled in the useEffect
        }

        const newPayload = {
            "email": data.loginEmail,
            "password": data.loginPassword
        }
        console.log("New Payload:", newPayload);
        try {
            const response = await axios.post('http://localhost:8081/api/public/login', newPayload);
            console.log('response:', response);
            const { roleName } = response.data.data;
            console.log('extracted role is:', roleName);

            if (response.data) {
                localStorage.setItem('token', response.data.data.token); // Store the token in localStorage
                console.log('token:', response.data.data.token);
                localStorage.setItem('role', roleName); // Store the role in localStorage to track the login status
                setRole(roleName);
                localStorage.setItem('userid', response.data.data.id); // store the user id from login response
                localStorage.setItem('name', response.data.data.fullName);  // store the user name from login response
                setLoginAttempts(0); // Reset failed login attempts on successful login
                // toast.success(response.data.message.includes('SUPER_ADMIN') ? "Superadmin logged in successfully!" : "HR Admin logged in successfully!");

                // to get the current time of login to show greetings on dashboard
                const currentTime = new Date();
                const currentFormattedTime = currentTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }).toLowerCase(); 
                console.log('time for login:', currentFormattedTime);
                localStorage.setItem("loggedintime", currentFormattedTime);

                const currentHour = currentTime.getHours();
                console.log('current hour of login:', currentHour);
                let greeting = "";
                if (currentHour >= 5 && currentHour < 12) {
                    greeting = "Good Morning";
                } else if (currentHour >= 12 && currentHour <= 18) {
                    greeting = "Good Afternoon";
                } else {
                    greeting = "Good Evening";
                }
                console.log("greeting:", greeting);
                // Store greeting message in sessionStorage
                localStorage.setItem('greetingMessage', greeting);

                reset();
                setPassword('');
                setServerError('');
                setErrorMessage('');
                setInvalidPasswordError('');
                navigate('/admin/Dashboard');
            } else {
                console.log('error in login:', response.status);
                setServerError('An error occurred in login');
            }
        } catch (error) {
            console.error('Error in login API call:', error);

            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;

                if (errorMessage.includes('Invalid password')) {
                    console.log('Invalid password error:', errorMessage);
                    setInvalidPasswordError('Invalid password');
                    setServerError(''); // Clear any general server error
                    setLoginAttempts((prev) => {
                        const newAttempt = prev + 1;
                        console.log('loginAttempts after failed attempt:', newAttempt);
                        if (newAttempt >= 3) {
                            const newLockoutTime = Date.now() + 15 * 60 * 1000; // Lockout for 15 minutes
                            setLockoutTime(newLockoutTime); // Lockout for 15 minutes
                            setCountdown(Math.floor((newLockoutTime - Date.now()) / 1000)); // Update countdown immediately
                            setIsLockedOut(true);
                        }
                        return newAttempt;

                    })
                } else if (errorMessage.includes('we are not able to find user details in our system')) {
                    console.log('Authentication error:', errorMessage);
                    setServerError('Invalid email or password');
                    setInvalidPasswordError(''); // Clear any invalid password error
                } else {
                    console.log('Other error:', errorMessage);
                    setServerError('An error occurred. Please try again later.');
                    setInvalidPasswordError(''); // Clear any invalid password error
                }
            } else {
                setServerError('Server error in login. Please try again later.');
                setInvalidPasswordError(''); // Clear any invalid password error
            }
        }

    };

    useEffect(() => {
        if (lockoutTime && Date.now() < lockoutTime) {
            const interval = setInterval(() => {
                const timeLeft = Math.max(0, Math.floor((lockoutTime - Date.now()) / 1000));
                setCountdown(timeLeft); // Update countdown every second

                // Convert timeLeft (in seconds) to minutes and seconds
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;

                // Format the time as MM:SS (e.g., 10:00)
                const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

                // Dynamically update lockout error message based on timeLeft
                if (timeLeft > 0) {
                    setLockoutError(`Too many failed attempts. Try again after ${formattedTime}s`);
                    reset();
                    setInvalidPasswordError('');
                    setPassword('');
                    setServerError('');
                    setErrorMessage('');
                } else {
                    setLockoutError(''); // Clear lockout error message when countdown is 0
                }

                if (timeLeft <= 0) {
                    clearInterval(interval);
                    setLoginAttempts(0);
                    setLockoutTime(null);
                    setIsLockedOut(false);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [lockoutTime]); // Re-run the effect when lockoutTime changes

    return (
        <div className="container-fluid">
            {/* logo header part */}
            <div className='main-logo'>
                <div className="logo-image">
                    <img src={require("assets/img/company_logo.png")} alt="..." />
                </div>
            </div>
            <div className="login-container">
                <div className="login-row">
                    <div className="col-6 left">
                        <div className="login-form">
                            {/* <div className="top-logo">
                                <img src={require("assets/img/company_logo.png")} alt="..." />
                            </div> */}
                            <div className="title">
                                <p className="welcome">LOGIN</p>
                            </div>
                            <div className="form">
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    {/* <p>LOGIN</p> */}
                                    <div className="form-detail">
                                        <div className={`input-text ${errors.loginEmail ? 'error' : ''}`}>
                                            <p className="logo-txt">Email ID</p>

                                            <div className="input-icons">
                                                <IoPersonSharp className="icon" />
                                                <input className="login-input-field" type="email" placeholder="Enter Email ID"  {...register("loginEmail", {
                                                    pattern: {
                                                        value: emailRegex,
                                                        message: "Please enter a valid email address"
                                                    }
                                                })}
                                                    onChange={(e) => {
                                                        handleInputChange('loginEmail');
                                                        setValue('loginEmail', e.target.value); // Track value change
                                                    }}
                                                />
                                                {errors.loginEmail && (
                                                    <p className="error-message">{errors.loginEmail.message}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p className="logo-txt">Password</p>
                                            <div className="input-icons">
                                                <RiLockPasswordFill className="icon" />
                                                <input class="login-input-field" type={passwordShow ? 'text' : 'password'} placeholder="Enter Password"  {...register("loginPassword")}
                                                    value={password} onChange={handlePasswordChange} />
                                                {password.length > 0 && (<button className='visibility-password' type='button' onClick={handlePasswordVisibility}>
                                                    {passwordShow ? <BiSolidHide /> : <BiSolidShow />}
                                                </button>)}
                                                {errors.loginPassword && (
                                                    <p className="error-message">{errors.loginPassword.message}</p>
                                                )}
                                                {invalidPasswordError && <p className="invalid-error-message">{invalidPasswordError}</p>}
                                            </div>
                                        </div>
                                        <Link className="forgot-password" to={'/forgotpassword'}>Forgot Password?</Link>
                                        <br />
                                        <br />
                                        <div>
                                            <div>
                                                <button className="login" type="submit"
                                                    disabled={isLoginDisabled}>
                                                    Login
                                                </button>
                                            </div>
                                        </div>
                                        {errorMessage && <p className="invalidLoginErrorMessage">{errorMessage}</p>}
                                        <br />
                                    </div>
                                </form>
                                {serverError && (<div className="invalidLoginErrorMessage">{serverError}</div>)}
                                {lockoutError && <p className="invalidLoginErrorMessage">{lockoutError}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
