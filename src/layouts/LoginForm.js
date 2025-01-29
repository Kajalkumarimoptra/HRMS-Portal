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
        role,
        setRole
    } = useFormContext();

    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [errorMessageForOtp, setErrorMessageForOtp] = useState('');
    const [verifiedOtp, setVerifiedOtp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [invalidPasswordError, setInvalidPasswordError] = useState('');
    const [password, setPassword] = useState(''); // for tracking password value
    const [passwordShow, setPasswordShow] = useState(false);  // for toggle between password show and hide

    useEffect(() => {
        console.log('Updated role in context:', role);
    }, [role]);

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
    const isLoginDisabled = !loginEmail || !loginPassword ;

    // Handle form submission
    const handleFormSubmit = async (data) => {
        console.log('login credentials:', data);

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
                sessionStorage.setItem('token', response.data.data.token); // Store the token in sessionStorage
                console.log('token:', response.data.data.token);
                sessionStorage.setItem('role', roleName); // Store the role in sessionStorage
                setRole(roleName);
                // toast.success(response.data.message.includes('SUPER_ADMIN') ? "Superadmin logged in successfully!" : "HR Admin logged in successfully!");
                reset();
                setPassword('');
                setServerError('');
                setErrorMessage('');
                setInvalidPasswordError('');
                navigate('/admin/dashboard');
                
                // setTimeout(() => {
                //     navigate('/admin/dashboard');
                // }, 1000);


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
                } else if (errorMessage.includes('we are not able to find user details in our system')) {
                    console.log('Authentication error:', errorMessage);
                    setServerError('User not authenticated. Please check your email and password.');
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
                    {/* <div className="col-6 right">
            <img src="/assets/sideimg.png" alt="Logo" />
        </div> */}
                    <div className="col-6 left">
                        <div className="login-form">
                            {/* <div className="top-logo">
                                <img src={require("assets/img/company_logo.png")} alt="..." />
                            </div> */}
                            {/* <br />
                            <br /> */}
                            <div className="title">
                                <p className="welcome">LOGIN</p>
                                {/* <p className='direction'>Please enter your login details below</p> */}
                            </div>

                            <div className="form">
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    {/* <p>LOGIN</p> */}
                                    <div className="form-detail">
                                        <div className={`input-text ${errors.loginEmail ? 'error' : ''}`}>
                                            <p className="logo-txt">Email ID</p>

                                            <div className="input-icons">
                                                <IoPersonSharp className="icon" />
                                                <input className="login-input-field" type="email" placeholder="Enter Email ID"  {...register("loginEmail", { required: "Email id/Mobile No. is required" })}
                                                    onChange={(e) => { handleInputChange('loginEmail');
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
                                                <input class="login-input-field" type={ passwordShow ? 'text' : 'password'} placeholder="Enter Password"  {...register("loginPassword", { required: "Password is required" })}
                                                 value={password}  onChange={handlePasswordChange} />
                                                { password.length > 0 && (<button className='visibility-password' type='button' onClick={handlePasswordVisibility}>
                                                    {passwordShow ? <BiSolidHide /> : <BiSolidShow />}
                                                </button> )}
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
                                                disabled={isLoginDisabled} 
                                                >
                                                    Login
                                                </button>
                                            </div>
                                        </div>
                                        {errorMessage && <p className="invalidLoginErrorMessage">{errorMessage}</p>}

                                        {/* <div className="bottom-text">
                                <p className="txt"><b>First time login</b>: If you are logging in for the first time, click <span> <Link to='/admin/signup'> here </Link> </span> to sign up first.</p>
                             </div> */}
                                        <br />

                                        {/* <ToastContainer /> */}
                                    </div>
                                </form>
                                {serverError && (<div className="invalidLoginErrorMessage">{serverError}</div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
