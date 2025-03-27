import { React, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useWatch } from "react-hook-form";
import { useFormContext } from "../components/ContextProvider/Context";
import Breadcrumb from './Breadcrumb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Post() {
    const {
        register, handleSubmit, onSubmit, reset, watch, clearErrors
    } = useFormContext();

    const navigate = useNavigate();
    const [postTitleColor, setPostTitleColor] = useState("#d3d3d3"); 

    // for post btn conditionally disabled
    const { postTitle, postDescription } = watch();  // Destructure the form values
    const isPostDisabled = !postTitle || !postDescription
    const isCancelPostDisabled = !postTitle && !postDescription
    const handlePostCancel = () => {
        reset(); // Reset form fields
    };

    // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
    const handlePostTitleColorChange = (e) => {
        const selectedValue = e.target.value;
        setPostTitleColor(selectedValue ? "black" : "#d3d3d3");
        clearErrors('postTitle');
    };

    const handleFormSubmit = (data) => {
        onSubmit(data);
        reset();
        setTimeout(() => {
            navigate('/admin/Dashboard');
        }, 2000);
        toast.success("Post submitted successfully! ");
        setPostTitleColor("#d3d3d3");

    };


    return (
        <div className='container-fluid'>
            <div className='row clearfix'>
                <div className='col-md-12'>
                    <Breadcrumb />
                    <div className='attendance-container' style={{ padding: '0', marginBottom: '45px' }}>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <h4 className='apply-leave-heading'>Post</h4>
                            <div className='apply-leave-section'>
                                <div className="input-text">
                                    <p className='applyLeaveLabel'>Title<span style={{ color: "red" }}>*</span></p>
                                    <div className="user-input-icons">
                                        <select className="input-field" name='newUserRole' {...register("postTitle", { required: 'Please choose the job role' })}
                                                    onChange={handlePostTitleColorChange} style={{ color: postTitleColor }}>
                                                    <option value="" hidden style={{ color: "#d3d3d3" }}>Select the post title</option>
                                                    <option style={{ color: 'black' }}>Announcement</option>
                                                    <option style={{ color: 'black' }}>Warm wishes</option>
                                                    <option style={{ color: 'black' }}>Notice</option>
                                                    <option style={{ color: 'black' }}>Exciting Updates</option> 
                                                    <option style={{ color: 'black' }}>Fun Activity Alert</option>
                                                </select>
                                    </div>
                                </div>
                                <div className="input-text" style={{ marginTop: '5px' }}>
                                    <p className='applyLeaveLabel'>Description<span style={{ color: "red" }}>*</span></p>
                                    <div className="user-input-icons">
                                        <textarea rows="4" className="input-field" {...register("postDescription", { required: true })}>
                                        </textarea>
                                    </div>
                                </div>
                                <div className='edit-delete-btn-container' style={{marginTop: '0'}}>
                                    <button className="primary-btn" style={{ background: 'darkgray', width: '100px' }} disabled={isCancelPostDisabled} onClick={() => handlePostCancel()}>Cancel</button>
                                    <button className="primary-btn" type="submit" style={{ width: '100px' }} disabled={isPostDisabled} >Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div >
    )
}
