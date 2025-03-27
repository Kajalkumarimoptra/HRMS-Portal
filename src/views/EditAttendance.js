import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormContext } from "../components/ContextProvider/Context";
import Breadcrumb from './Breadcrumb';


export default function EditAttendance() {
    const {
        register, handleSubmit, onSubmit, reset, errors, serverError, setServerError, clearErrors, role, setRole, watch, setValue
    } = useFormContext();
    const [selectEditTimeInColor, setEditTimeInColor] = useState("#d3d3d3"); // for giving diff color to date placeholder and option to time in
    const [selectEditTimeOutColor, setEditTimeOutColor] = useState("#d3d3d3");

    const location = useLocation();
    const { allAttendance } = location.state || {}; // Retrieve attendance list data from navigation state

    // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray for time input
    const handleEditTimeInColorChange = (e) => {
        const selectedTimeInValue = e.target.value;
        clearErrors("editTimeIn");
        setEditTimeInColor(selectedTimeInValue ? "black" : "#d3d3d3");
    };

    const handleEditTimeOutColorChange = (e) => {
        const selectedTimeOutValue = e.target.value;
        clearErrors("editTimeOut");
        setEditTimeOutColor(selectedTimeOutValue ? "black" : "#d3d3d3");
    };

    const handleFormSubmit = (data) => {
        onSubmit(data);
        reset();
        setServerError('');
        clearErrors("editTimeIn");
        clearErrors("editTimeOut");
        setEditTimeOutColor("#d3d3d3");
        setEditTimeInColor("#d3d3d3");
        console.log("Submitting data:", data);
    }

    // Format date for input field (YYYY-MM-DD)
    const formattedDate = allAttendance?.punchInTime
        ? new Date(allAttendance.punchInTime).toISOString().split("T")[0]
        : "";

        const formattedTimeIn = allAttendance?.punchInTime
        ? new Date(allAttendance.punchInTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
        : "";
    const formattedTimeOut = allAttendance?.punchOutTime
        ? new Date(allAttendance.punchOutTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
        : "";    

        // Populate the form fields with existing user data
            useEffect(() => {
                if (allAttendance) {
        
                    // Also update react-hook-form fields
                    setValue("attendanceDate", formattedDate || "");
                    setValue("editTimeIn", formattedTimeIn || "");
                    setValue("editTimeOut", formattedTimeOut || "");
                }
                // ✅ Only force color change for the date input
            if (formattedTimeIn){
                setEditTimeInColor("black");
            } 
            if(formattedTimeOut) {
                setEditTimeOutColor("black");
            }
            }, [allAttendance]);

    return (
        <div className="container-fluid">
            <Breadcrumb />
            <div className='register-container'>
                <div className="row Signup-row">
                    <div className="col-6 left">
                        <div className="Signup-form">
                            <div className="title">
                                <p className='info-text'>
                                    Edit Details
                                </p>
                            </div>
                            <br />
                            <div className="form" style={{ marginTop: '20px' }}>
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="form-detail">
                                        <div className="input-text">
                                            <p>Date</p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="date" placeholder="Enter Your joining date in DD/MM/YYYY" {...register("attendanceDate")}
                                                   disabled />
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Time In <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="time" {...register("editTimeIn", { required: 'Please select the time in' })}
                                                    onChange={handleEditTimeInColorChange} style={{ color: selectEditTimeInColor }} />
                                                {errors.editTimeIn && (<div className="userErrorMessage">{errors.editTimeIn.message}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Time Out <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="time" {...register("editTimeOut", { required: 'Please select the time out' })}
                                                    onChange={handleEditTimeOutColorChange} style={{ color: selectEditTimeOutColor }} />
                                                {errors.editTimeOut && (<div className="userErrorMessage">{errors.editTimeOut.message}</div>)}
                                            </div>
                                        </div>
                                        <br />
                                        <div>
                                            <div className='edit-delete-btn-container'>
                                                <button className="primary-btn" type="submit">Update</button>
                                            </div>
                                        </div>
                                        <br />
                                        {serverError && (<div className="serverErrorMessage">{serverError}</div>)}
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
