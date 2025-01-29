import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Route, Routes, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useFormContext } from "../components/ContextProvider/Context";
import Header from "components/Header/Header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";

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

    const resetPassword = useRef("");
    resetPassword.current = watch("resetPassword", "");
    
    useEffect(() => {
        console.log('Resetpassword component is mounted');
    }, []);
    
    const handleFormSubmit = async (data) => {
        const storedToken = sessionStorage.getItem('token'); // Retrieve token from sessionStorage

        if (!storedToken) {
            console.error('No token found for resetting password');
            setServerError('Token missing or invalid.');
            return;
        }

        console.log('password reset:', data);

        const { resetPassword } = data;
        console.log('new password to set:', resetPassword);

        try {
            const response = await axios.post(`http://localhost:8081/api/public/reset-password?token=${storedToken}&newPassword=${resetPassword}`)
            console.log(response.data);

            if (response.data) {
                toast.success("Password has been reset successfully!");
                reset();
                setServerError('');
                setTimeout(() => {
                    navigate('/')
                }, 5000);
            }else{
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
                            <div className="top-logo">
                            <img src={require("assets/img/company_logo.png")} alt="..." />
                            </div>
                            <div className="title">
                                <p className="welcome">Reset Password</p>
                            </div>

                            <div className="form" style={{ marginTop:'-14px'}}>
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <p className="login-title" style={{ color: '#5A5A5A', textAlign:'center'}}>Create a new password for login</p>
                                    <div className="form-detail">
                                        <div className={`input-text ${errors.resetPassword ? 'error' : ''}`}>
                                            <p className="logo-txt" style={{ color: '#5A5A5A'}}>New Password</p>

                                            <div className="input-icons">
                                                <RiLockPasswordLine className="icon" />
                                                <input className="login-input-field" type="password" placeholder="Enter a new password"  {...register("resetPassword", { required: "password is required" })}
                                                // onChange={handleEmailChange}
                                                />
                                                {errors.resetPassword && (
                                                    <p className="error-message">{errors.resetPassword.message}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p className="logo-txt">Confirm Password</p>
                                            <div className="input-icons">
                                                <RiLockPasswordFill className="icon" />
                                                <input class="login-input-field" type="password" placeholder=" Confirm your Password"  {...register("resetConfirmPassword", {
                                                    required: "Password is required",
                                                    validate: value => value === resetPassword.current || "Password does not match"
                                                })} />
                                                {errors.resetConfirmPassword && (
                                                    <p className="error-message">{errors.resetConfirmPassword.message}</p>
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

                                        <br />
                                        <br />
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

