import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Route, Routes, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useFormContext } from "../components/ContextProvider/Context";
import Header from "components/Header/Header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

export default function Resetpassword() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // To read URL parameters
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

    const [resetPasswordShow, setResetPasswordShow] = useState(false);  // for toggle between password show and hide
    const [storeResetPasswordShowIcon, setStoreResetPasswordShowIcon] = useState(false); // to store password icon
    const [storeResetConfirmPasswordShowIcon, setstoreResetConfirmPasswordShowIcon] = useState(false); // to store confirm password icon
    const [resetConfirmPasswordShow, setResetConfirmPasswordShow] = useState(false);  // for toggle between password show and hide
    const [resetPasswordCriteriaMessage, setResetPasswordCriteriaMessage] = useState(false);
    const resetPassword = useRef("");
    resetPassword.current = watch("resetPassword", "");

    useEffect(() => {
        console.log('Resetpassword component is mounted');
    }, []);

    // for password visibility
    const handleResetPasswordVisibility = () => {
        setResetPasswordShow(!resetPasswordShow);
    }
    const handleResetConfirmPasswordVisibility = () => {
        setResetConfirmPasswordShow(!resetConfirmPasswordShow);
    }

     // for conditionally showing passwordCriteriaMessage
     const handleResetPasswordCriteriaMessage = (e) => {
        const showResetPasswordCriteriaMessage = e.target.value;
        if (showResetPasswordCriteriaMessage) {
            setResetPasswordCriteriaMessage(true);
            setStoreResetPasswordShowIcon(true);
            console.log('passwordCriteriaMessage is:', resetPasswordCriteriaMessage);
        }else{
            setResetPasswordCriteriaMessage(false);
            setStoreResetPasswordShowIcon(false);
            console.log('passwordCriteriaMessage is:', resetPasswordCriteriaMessage);
        }
     }

     // for conditionally showing password icon
     const handleResetConfirmPasswordIcon = (e) => {
        const getResetConfirmPasswordIcon = e.target.value;
        if(getResetConfirmPasswordIcon){
            setstoreResetConfirmPasswordShowIcon(true);
        }else{
            setstoreResetConfirmPasswordShowIcon(false);
        }
     }

     const clearErrorFields = (field) => {  // to clear the error msg on any input change
        clearErrors(field);
        setServerError('');
   }

    const handleFormSubmit = async (data) => {
        const storedUrlToken = sessionStorage.getItem('urltoken'); // Retrieve token from sessionStorage

        if (!storedUrlToken) {
            console.error('No token found for resetting password');
            setServerError('Token missing or invalid.');
            return;
        }

        console.log('password reset:', data);

        const { resetPassword } = data;
        console.log('new password to set:', resetPassword);

        try {
            const response = await axios.post(`http://localhost:8081/api/public/reset-password?token=${storedUrlToken}&newPassword=${resetPassword}`)
            console.log(response.data);

            if (response.data) {
                toast.success("Password has been reset successfully!");
                reset();
                setServerError('');
                setResetPasswordCriteriaMessage(false);
                setStoreResetPasswordShowIcon(false);
                setstoreResetConfirmPasswordShowIcon(false);
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            } else {
                console.log('password not set');
                setServerError('New Password has not been reset');
            }
        } catch (error) {
            console.log('server error in reset password:', error);
            setServerError('Failed to reset password. Please try again later.')
        }

    }

    return (
        <div className="container-fluid">
            <div className='main-logo'>
                <div className="logo-image">
                    <img src={require("assets/img/company_logo.png")} alt="..." />
                </div>
            </div>
            <div className="login-container">
                <div className="login-row">
                    <div className="col-6 left">
                        <div className="login-form">
                            <div className="title">
                                <p className="welcome">Reset Password</p>
                            </div>

                            <div className="form" style={{ marginTop: '-42px' }}>
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <p className="login-title" style={{ color: '#5A5A5A', textAlign: 'center' }}>Create a new password for login</p>
                                    <div className="form-detail">
                                        <div className={`input-text ${errors.resetPassword ? 'error' : ''}`}>
                                            <p className="logo-txt" style={{ color: '#5A5A5A' }}>New Password</p>

                                            <div className="input-icons">
                                                <RiLockPasswordLine className="icon" />
                                                <input className="login-input-field" type={resetPasswordShow ? 'text' : 'password'} placeholder="Enter a new password"  {...register("resetPassword", { required: "New Password is required",
                                                     pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                                                        message: 'Password must be between 8 and 20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.(e.g., @$!%*?&)'
                                                    }
                                                 })} 
                                                onChange={(e) => {handleResetPasswordCriteriaMessage(e); clearErrorFields("resetPassword") }}/>
                                                {storeResetPasswordShowIcon && (<button className='visibility-password' type='button' onClick={() => handleResetPasswordVisibility()}>
                                                    {resetPasswordShow ? <BiSolidHide /> : <BiSolidShow />}
                                                </button>)}
                                                {!errors.resetPassword && resetPasswordCriteriaMessage && <div className="password-criteria visible">Password must be between 8 and 20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @$!%*?&)</div>}
                                                {errors.resetPassword && (
                                                    <p className="reset-error-msg">{errors.resetPassword.message}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`input-text ${errors.resetConfirmPassword ? 'error' : ''} confirm ${resetPasswordCriteriaMessage ? 'with-reset-criteria' : ''}`}>
                                            <p className="logo-txt confirm">Confirm Password</p>
                                            <div className="input-icons">
                                                <RiLockPasswordFill className="icon" />
                                                <input class="login-input-field" type={resetConfirmPasswordShow ? 'text' : 'password'} placeholder=" Confirm your Password"  {...register("resetConfirmPassword", {
                                                    required: "Confirm Password is required",
                                                    validate: value => value === resetPassword.current || (!errors.resetPassword && "Password does not match")
                                                })} onChange={(e) => {handleResetConfirmPasswordIcon(e); clearErrorFields("resetConfirmPassword") }} />
                                                {storeResetConfirmPasswordShowIcon && <button className='reset-confirm-visibility-password' type='button' onClick={handleResetConfirmPasswordVisibility}>
                                                                                                    {resetConfirmPasswordShow ? <BiSolidHide /> : <BiSolidShow />}
                                                                                                </button>}
                                                {errors.resetConfirmPassword && (
                                                    <p className="reset-error-msg">{errors.resetConfirmPassword.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className='reset-btn'>
                                                <button className="login" type="submit">
                                                    Reset password
                                                </button>
                                            </div>
                                        </div>
                                        <ToastContainer />
                                    </div>
                                </form>
                                {serverError && (<div className="reset-error-message">{serverError}</div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

