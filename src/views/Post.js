import { React, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useWatch } from "react-hook-form";
import { useFormContext } from "../components/ContextProvider/Context";
import Breadcrumb from './Breadcrumb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Post() {
    const {
        register, handleSubmit, onSubmit, reset, watch, clearErrors, setValue, trigger, errors, setError, control
    } = useFormContext();

    const navigate = useNavigate();
    const [postTitleColor, setPostTitleColor] = useState("#d3d3d3");
    const [isApplyPostDisabled, setIsApplyPostDisabled] = useState(true);
    const [isCancelPostDisabled, setIsCancelPostDisabled] = useState(true);

    const [customErrorForPostDescInput, setCustomErrorForPostDescInput] = useState('');
    // for post btn conditionally disabled
    const watchedValues = useWatch({
        control,
        name: ["postTitle", "postDescription"],
    });

    useEffect(() => {
        const [postTitle, postDescription] = watchedValues;

        console.log("postTitle:", postTitle);
        console.log("postDescription:", postDescription);

        const hasErrors = Object.keys(errors).length > 0;
        const isDisabled = !postTitle || !postDescription || hasErrors;
        console.log("Is Apply Button Disabled:", isDisabled);
        setIsApplyPostDisabled(isDisabled);

        const isCancelDisabled = !postTitle && !postDescription;
        console.log("Is Cancel Button Disabled:", isCancelDisabled);
        setIsCancelPostDisabled(isCancelDisabled);

    }, [watchedValues, errors]);

    const handlePostCancel = () => {
        reset();
        setPostTitleColor("#d3d3d3");
        clearErrors("postDescription");
    };

    // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
    const handlePostTitleColorChange = (e) => {
        const selectedValue = e.target.value;
        setValue("postTitle", selectedValue);
        setPostTitleColor(selectedValue ? "black" : "#d3d3d3");
    };

    const handlePatternForPostDescInput = (e) => {
        let value = e.target.value;
        clearErrors("postDescription");
        setValue("postDescription", value);

        let patternErrorMessage = '';
        const postDescRegex = /^[a-zA-Z0-9\s.,!?'"()&-]+$/;

        if (value && !postDescRegex.test(value)) {
            patternErrorMessage = 'No special characters are allowed';
            setError("postDescription", { type: "pattern", message: patternErrorMessage });
        } else {
            clearErrors("postDescription");
        }

        setCustomErrorForPostDescInput(prev => ({ ...prev, postDescription: patternErrorMessage }));

        // If there's no error, clear the error message for the field
        if (!patternErrorMessage) {
            setCustomErrorForPostDescInput(prev => ({ ...prev, postDescription: '' }));
            clearErrors("postDescription");
        }
    };

    const handleFormSubmit = async (data) => {
        if (Object.keys(errors).length > 0) {
            console.log("Form has errors. Submission blocked.");
            return;
        }

        onSubmit(data);
        reset();
        setTimeout(() => {
            navigate('/admin/Dashboard');
        }, 2000);
        toast.success("Posted successfully! ");
        setPostTitleColor("#d3d3d3");

    };


    return (
        <div className='container-fluid'>
            <div className='row clearfix'>
                <div className='col-md-12'>
                    <Breadcrumb />
                    <div className='attendance-container' style={{ padding: '0', marginBottom: '45px', marginTop: '34px' }}>
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
                                        <textarea rows="4" className="input-field" {...register("postDescription", {
                                            required: true,
                                            minLength: { value: 3, message: "Description must be at least three characters" },
                                            maxLength: { value: 100, message: "Description must not exceed hundred characters" },
                                        })}
                                            onChange={(e) => handlePatternForPostDescInput(e)} >
                                        </textarea>
                                        {errors.postDescription?.message ? (
                                            <div className="errorMessage" style={{ marginTop: '-8px', marginBottom: '22px' }}>{errors.postDescription.message}</div>
                                        ) : customErrorForPostDescInput.postDescription ? (
                                            <div className="errorMessage" style={{ marginTop: '-8px', marginBottom: '22px' }}>{customErrorForPostDescInput.postDescription}</div>
                                        ) : null}
                                    </div>
                                    <div className='edit-delete-btn-container' style={{ marginTop: '0' }}>
                                        <button className="primary-btn" style={{ background: 'darkgray', width: '100px' }} disabled={isCancelPostDisabled} onClick={() => handlePostCancel()}>Cancel</button>
                                        <button className="primary-btn" type="submit" style={{ width: '100px' }} disabled={isApplyPostDisabled} >Submit</button>
                                    </div>
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
