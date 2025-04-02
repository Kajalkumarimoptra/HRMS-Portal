import { React, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useWatch } from "react-hook-form";
import { useFormContext } from "../components/ContextProvider/Context";
import Breadcrumb from './Breadcrumb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AssetRequestForm() {
    const {
        register, handleSubmit, onSubmit, reset, errors, serverError, setServerError, clearErrors, role, setRole, setValue, watch, getValues, control
    } = useFormContext();
    const navigate = useNavigate();
    const [selectApplyLeaveFromDateColor, setApplyLeaveFromDateColor] = useState("#d3d3d3"); // for giving diff color to date placeholder and option
    const [selectApplyLeaveToDateColor, setApplyLeaveToDateColor] = useState("#d3d3d3");
    const [selectApplyLeaveDateColor, setApplyLeaveDateColor] = useState("#d3d3d3");
    const [selectLeaveTypeColor, setLeaveTypeColor] = useState("#d3d3d3");
    const [selectApplyLeaveReportingManagerColor, setApplyLeaveReportingManagerColor] = useState("#d3d3d3");
    const [leaveDuration, setLeaveDuration] = useState("full"); // to track leave duration mode
    const [applyLeaveFromDate, setApplyLeaveFromDate] = useState(""); // to store from date values
    const [applyLeaveToDate, setApplyLeaveToDate] = useState(""); // to store to date values
    const [applyLeaveDate, setApplyLeaveDate] = useState(""); // to store half day leave date value
    const [fullDayLeaveData, setFullDayLeaveData] = useState({}); // State to preserve full day data
    const [halfDayLeaveData, setHalfDayLeaveData] = useState({}); // State to preserve half day data
    const [minToDate, setMinToDate] = useState("");
    const [isApplyLeaveDisabled, setIsApplyLeaveDisabled] = useState(true);
    const [isCancelLeaveDisabled, setIsCancelLeaveDisabled] = useState(true);

    const typeOfAsset =
        ["Laptop", "Desktop Computer", "Monitor", "Keyboard", "Mouse", "Printer", "Scanner", "External Hard Drive",
            "Headphone" ] ;

    // Get the current date in the required format (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    const watchedValues = useWatch({
        control,
        name: ["applyLeaveFromDate", "applyLeaveToDate", "applyLeaveType", "applyLeaveReason", "applyLeaveReportingManager", "applyLeaveDate"],
    });

    useEffect(() => {
        const [fromDate, toDate, leaveType, reason, reportingManager, applyLeaveDate] = watchedValues;

        console.log("From Date:", fromDate);
        console.log("To Date:", toDate);
        console.log("Leave Type:", leaveType);
        console.log("Reason:", reason);
        console.log("Reporting Manager:", reportingManager);
        console.log("Apply Leave Date:", applyLeaveDate); // Now it should log correctly

        const isHalfDay = leaveDuration === "half";
        const halfDayDate = getValues("applyLeaveDate");
        console.log("half day leave date:", halfDayDate);

        // Check if all required fields are filled
        const isDisabled = isHalfDay
            ? !leaveType || !reason?.trim() || !reportingManager || !halfDayDate
            : !leaveType || !reason?.trim() || !reportingManager || !fromDate || !toDate;
        console.log("Is Apply Button Disabled:", isDisabled);
        setIsApplyLeaveDisabled(isDisabled);

        // Check if any field is filled for Cancel button, considering the mode
        const isCancelDisabled = isHalfDay
            ? !(leaveType || reason?.trim() || reportingManager || halfDayDate)
            : !(leaveType || reason?.trim() || reportingManager || fromDate || toDate);
        console.log("Is Cancel Button Disabled:", isCancelDisabled);
        setIsCancelLeaveDisabled(isCancelDisabled);

    }, [watchedValues, leaveDuration]);

    // Function to check if a date is a holiday or weekend
    const isDisabledFromDate = (date) => {
        const day = new Date(date).getDay(); // 0 = Sunday, 6 = Saturday
        return formattedHolidays.includes(date) || day === 0 || day === 6;
    };

    const handleApplyLeaveFromDateColorChange = (e) => {
        const selectedApplyLeaveFromDateValue = e.target.value;
        setMinToDate(selectedApplyLeaveFromDateValue); // Update min value for "To Date"
        if (isDisabledFromDate(selectedApplyLeaveFromDateValue)) {
            alert("This date is a holiday or a weekend. Please select another date.");
            setValue("applyLeaveFromDate", ""); // Use setValue to update the form value
            setApplyLeaveFromDateColor("#d3d3d3");
        } else {
            setValue("applyLeaveFromDate", selectedApplyLeaveFromDateValue); // Use setValue
            setApplyLeaveFromDateColor("black");
            setValue("applyLeaveToDate", ""); // Reset "To" date when "From" date changes
            setApplyLeaveToDateColor("#d3d3d3");
        }
        clearErrors("applyLeaveFromDate");
    };


    const handleApplyLeaveToDateColorChange = (e) => {
        const selectedApplyLeaveToDateValue = e.target.value;
        if (isDisabledFromDate(selectedApplyLeaveToDateValue)) {
            alert("This date is a holiday or a weekend. Please select another date.");
            setValue("applyLeaveToDate", ""); // Use setValue to update the form value
            setApplyLeaveToDateColor("#d3d3d3");
        } else {
            setValue("applyLeaveToDate", selectedApplyLeaveToDateValue); // Use setValue
            setApplyLeaveToDateColor("black");
        }
        clearErrors("applyLeaveToDate");
    };

    const handleApplyLeaveDateColorChange = (e) => {
        console.log("Apply Leave Date Color Change Triggered", e.target.value);
        const selectedApplyLeaveDateValue = e.target.value;
        if (isDisabledFromDate(selectedApplyLeaveDateValue)) {
            alert("This date is a holiday or a weekend. Please select another date.");
            setValue("applyLeaveDate", ""); // Use setValue to update the form value
            setApplyLeaveDateColor("#d3d3d3");
        } else {
            setValue("applyLeaveDate", selectedApplyLeaveDateValue); // Use setValue
            setApplyLeaveDateColor("black");
        }
        clearErrors("applyLeaveDate");
        console.log("After setting value:", watch("applyLeaveDate")); // Check value directly
    };

    const handleLeaveTypeColorChange = (e) => {
        const selectedLeaveTypeValue = e.target.value;
        setValue("applyLeaveType", selectedLeaveTypeValue); // Set the value using setValue
        setLeaveTypeColor(selectedLeaveTypeValue ? "black" : "#d3d3d3");
        clearErrors('applyLeaveType');
    };

    const handleApplyLeaveReportingManagerColorChange = (e) => {
        const selectedApplyLeaveReportingManagerValue = e.target.value;
        setValue("applyLeaveReportingManager", selectedApplyLeaveReportingManagerValue); // Set the value using setValue
        setApplyLeaveReportingManagerColor(selectedApplyLeaveReportingManagerValue ? "black" : "#d3d3d3");
        clearErrors('applyLeaveReportingManager');
    };

    const handleLeaveCancel = () => {
        reset(); // Reset form fields
        setApplyLeaveFromDate(""); // Reset "From" date
        setApplyLeaveToDate(""); // Reset "To" date
        setApplyLeaveReportingManagerColor("#d3d3d3");
        setLeaveTypeColor("#d3d3d3");
        setApplyLeaveToDateColor("#d3d3d3");
        setApplyLeaveFromDateColor("#d3d3d3");
        clearErrors(); // Clear any validation errors
    };

    const handleFormSubmit = (data) => {
        // Force state update before form submission
        setLeaveDuration((prevDuration) => {
            console.log("Leave Duration before submitting:", prevDuration);

            // Create form data including leaveDuration
            const formData = {
                ...data,
                leaveDuration: prevDuration  // Use the updated value here
            };

            // Check the entire form data before submission
            console.log("Submitting data:", formData);

            onSubmit(formData);
            reset({
                applyLeaveType: '',
                applyLeaveReason: '',
                applyLeaveReportingManager: '',
                applyLeaveNotifyManager: ''
            });
            setTimeout(() => {
                navigate('/admin/Dashboard');
            }, 2000);
            setApplyLeaveFromDate("");
            setApplyLeaveToDate("");
            setServerError('');
            clearErrors();
            toast.success(toastMessage);
            setApplyLeaveReportingManagerColor("#d3d3d3");
            setLeaveTypeColor("#d3d3d3");
            setApplyLeaveToDateColor("#d3d3d3");
            setApplyLeaveFromDateColor("#d3d3d3");
            setApplyLeaveDateColor("#d3d3d3");

            return prevDuration;
        });
    };


    return (
        <div className='container-fluid'>
            <div className='row clearfix'>
                <div className='col-md-12'>
                    <Breadcrumb />
                    <div className='attendance-container' style={{ padding: '0', marginBottom: '45px' , marginTop:'35px'}}>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <h4 className='apply-leave-heading'>Asset Request Form</h4>
                            <div className='apply-leave-section'>
                            <div className="input-text">
                                        <p className='applyLeaveLabel'>Employee Name<span style={{ color: "red" }}>*</span></p>
                                        <div className="user-input-icons">
                                            <input className="input-field" type="text" 
                                                {...register("applyLeaveDate", {
                                                    required: true,
                                                })} 
                                                 />
                                            {errors.applyLeaveDate && (<div className="userErrorMessage">{errors.applyLeaveDate.message}</div>)}
                                        </div>
                                    </div>
                                    <div className="input-text">
                                    <p className='applyLeaveLabel'>Type Of Asset<span style={{ color: "red" }}>*</span></p>
                                    <div className="user-input-icons">
                                        <select className="input-field" {...register("applyLeaveType", { required: true })}
                                            onChange={(e) => handleLeaveTypeColorChange(e)} style={{ color: selectLeaveTypeColor }}>
                                            <option value="" hidden style={{ color: "#d3d3d3" }}>Choose the asset type</option>
                                            {typeOfAsset.map((option, index) => (
                                                <option key={index} style={{ color: 'black' }}>{option}</option>
                                            ))}
                                        </select>
                                        {errors.applyLeaveType && (<div className="userErrorMessage">{errors.applyLeaveType.message}</div>)}
                                    </div>
                                </div>
                                <div className="input-text">
                                        <p className='applyLeaveLabel'>Asset Name<span style={{ color: "red" }}>*</span></p>
                                        <div className="user-input-icons">
                                            <input className="input-field" type="text" 
                                                {...register("applyLeaveDate", {
                                                    required: true,
                                                })} 
                                                 />
                                            {errors.applyLeaveDate && (<div className="userErrorMessage">{errors.applyLeaveDate.message}</div>)}
                                        </div>
                                    </div>
                                <div className="input-text">
                                        <p className='applyLeaveLabel'>Request Date<span style={{ color: "red" }}>*</span></p>
                                        <div className="user-input-icons">
                                            <input className="input-field" type="date" 
                                                {...register("applyLeaveDate", {
                                                    required: true,
                                                })} onChange={(e) => handleApplyLeaveDateColorChange(e)} style={{ color: selectApplyLeaveDateColor, padding: '5px' }} />
                                            {errors.applyLeaveDate && (<div className="userErrorMessage">{errors.applyLeaveDate.message}</div>)}
                                        </div>
                                    </div>
                                <div className="input-text" style={{ marginTop: '5px' }}>
                                    <p className='applyLeaveLabel'>Reason Of Request <span style={{ color: "red" }}>*</span></p>
                                    <div className="user-input-icons">
                                        <textarea rows="4" className="input-field" {...register("applyLeaveReason", { required: true })}>
                                        </textarea>
                                        {errors.applyLeaveReason && (<div className="userErrorMessage">{errors.applyLeaveReason.message}</div>)}
                                    </div>
                                </div>
                                <div className="input-text" style={{ marginTop: '-6px' }}>
                                    <p className='applyLeaveLabel'>Attach doc(if any)</p>
                                    <div>
                                    <input className="input-field" type="file" 
                                                {...register("applyLeaveDate", {
                                                    required: true,
                                                })}  />
                                   {errors.applyLeaveReportingManager && (<div className="userErrorMessage">{errors.applyLeaveReportingManager.message}</div>)}
                                    </div>
                                </div>
                                <div className='edit-delete-btn-container' style={{ marginTop:'10px' }}>
                                    <button className="primary-btn" style={{ background: 'darkgray', width: '100px' }} disabled={isCancelLeaveDisabled} onClick={() => handleLeaveCancel()}>Cancel</button>
                                    <button className="primary-btn" type="submit" style={{ width: '100px' }} disabled={isApplyLeaveDisabled} >Apply</button>
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
