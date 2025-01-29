import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { useFormContext } from "../components/ContextProvider/Context";
import Header from "components/Header/Header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoPersonSharp } from "react-icons/io5";

export default function ForgotPassword() {

    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        reset,
        serverError,
        setServerError
    } = useFormContext();

    const handleFormSubmit = async (data) => {
        const { emailForPasswordReset } = data;
        console.log('Form email:', emailForPasswordReset);
        

        try {
            console.log('Attempting API call to:', `http://localhost:8081/api/public/forgot-password?email=${emailForPasswordReset}`);

            const response = await axios.post(`http://localhost:8081/api/public/forgot-password`, null, {
                params: { email: emailForPasswordReset } // Pass email as a query parameter
            });
            console.log('Response data:', response.data);
            console.log('Response status:', response.status);

            if (response.data) {
               toast.success("Password Reset link has been sent successfully to your email!");
               console.log('Password reset link sent successfully');
               reset({ emailForPasswordReset: '' });
               setServerError('');
            } else {
                console.log('Response not received as expected');
                setServerError('Error occurred in sending password reset link');
            }
        } catch (error) {
            console.log('Error occurred during the API call:', error);
            console.log('Error details:', error.response ? error.response.data : 'No response data');
            setServerError('Failed to send password reset link. Please try again later.');
        }
    };

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
                                <p className="welcome">Forgot Password</p>
                            </div>

                            <div className="form" style={{ marginTop: '10px'}}>
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <p className="forgot-title" style={{ color: '#5A5A5A'}}>Enter your email and we'll send you a link to reset your password</p>
                                    <div className="form-detail">
                                        <div className={`input-text ${errors.emailForPasswordReset ? 'error' : ''}`}>
                                            <div className="input-icons">
                                                <IoPersonSharp className="icon" />
                                                <input className="login-input-field" type="email" placeholder="Enter email id"  {...register("emailForPasswordReset", { required: "email is required for reset password link" })}
                                                />
                                                {errors.emailForPasswordReset && (
                                                    <p className="error-message">{errors.emailForPasswordReset.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className='reset-btn'>
                                                <button className="login" type="submit">
                                                    Request Reset Link
                                                </button>
                                            </div>
                                            <div className='backtologin'>
                                                <button className="backtologin-btn" type="button">
                                                    <Link className='bk' to={'/'}>Back To Login</Link>
                                                </button>
                                            </div>
                                        </div>

                                        <br />
                                        {serverError && (<div className="reset-error-message">{serverError}</div>)}
                                        <br />
                                        <ToastContainer />
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
