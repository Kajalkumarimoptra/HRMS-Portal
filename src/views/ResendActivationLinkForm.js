import React from 'react';
import { useLocation, Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
import { useFormContext } from "../components/ContextProvider/Context";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoPersonSharp } from "react-icons/io5";
import axios from 'axios';

export default function ResendActivationLinkForm() {

    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        reset,
        serverError,
        setServerError
    } = useFormContext();

    const navigate = useNavigate();

    const handleFormSubmit = async(data) => {
        console.log('resend activation link email:', data);
        const { emailForResendActivationLink } = data;

        try{
            const response = await axios.post('http://localhost:8081/primaryDetails/resend-activation-link', {email: emailForResendActivationLink});
            console.log('response:', response.data);

            if(response.data){
                toast.success("Activation Link has been send to the given email id");
                console.log("link sent:", response.data);
                reset(); 
                setServerError(''); 
                setTimeout( ()=> {
                    navigate('/admin/Employeepage');
                }, 5000)
            }
            else{
                console.log("Unexpected response status:", response.status)
            }

        }catch(err){
            console.error("Full Error Object:", err);
            setServerError('server error');
        }
    }

    return (
        <div className="container-fluid">
            <div className="login-container">
                <div className="login-row">
                    <div className="col-6 left">
                        <div className="login-form">
                            <div className="top-logo">
                                <img src={require("assets/img/reactlogo.png")} alt="..." />
                            </div>
                            <br />
                            <br />
                            <div className="title">
                                <p className="welcome">Resend Activation Link</p>
                            </div>

                            <div className="form">
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <p className="forgot-title">Please enter the email address you'd like to send the resend activation link.</p>
                                    <div className="form-detail">
                                        <div className={`input-text ${errors.emailForResendActivationLink ? 'error' : ''}`}>
                                            <div className="input-icons">
                                                <IoPersonSharp className="icon" />
                                                <input className="login-input-field" type="email" placeholder="Enter email id"  {...register("emailForResendActivationLink", { required: "email is required for resend activation link" })}
                                                />
                                                {errors.emailForResendActivationLink && (
                                                    <p className="error-message">{errors.emailForResendActivationLink.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className='reset-btn'>
                                                <button className="login" type="submit">
                                                     Resend Activation Link
                                                </button>
                                            </div>
                                        </div>

                                        <br />
                                        {serverError && (<div className="invalidLoginErrorMessage">{serverError}</div>)}
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

