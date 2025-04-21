import { React, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useWatch } from "react-hook-form";
import { useFormContext } from "../components/ContextProvider/Context";
import Breadcrumb from './Breadcrumb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHolidayListContext } from 'components/ContextProvider/HolidayListContext';

export default function ApplyLeave() {
    const {
        register, handleSubmit, onSubmit, reset, errors, serverError, setServerError, clearErrors, role, setRole, setValue, watch, getValues, control
    } = useFormContext();
    const navigate = useNavigate();
    const holidays = useHolidayListContext();
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

    // Convert holiday dates to YYYY-MM-DD format
    const formattedHolidays = holidays.map((holiday) => {
        const [month, day] = holiday.date.split(" ");
        const monthMap = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
            Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
        };
        const year = new Date().getFullYear(); // Get current year
        return `${year}-${monthMap[month]}-${day.padStart(2, "0")}`;
    });

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

    // for changing the leave duration mode
    const handleLeaveDurationChange = (type) => {
        if (type === "half") {
            // Preserve current full day data before switching
            const currentFullDayData = {
                applyLeaveType: getValues("applyLeaveType"),
                applyLeaveReason: getValues("applyLeaveReason"),
                applyLeaveReportingManager: getValues("applyLeaveReportingManager"),
                applyLeaveNotifyManager: getValues("applyLeaveNotifyManager"),
            };
            setFullDayLeaveData(currentFullDayData);

            // Restore previously saved half day data
            setValue("applyLeaveDate", halfDayLeaveData.applyLeaveDate || "");
            setValue("applyLeaveType", halfDayLeaveData.applyLeaveType || "");
            setValue("applyLeaveReason", halfDayLeaveData.applyLeaveReason || "");
            setValue("applyLeaveReportingManager", halfDayLeaveData.applyLeaveReportingManager || "");
            setValue("applyLeaveNotifyManager", halfDayLeaveData.applyLeaveNotifyManager || "");
            setLeaveTypeColor(halfDayLeaveData.applyLeaveType ? "black" : "#d3d3d3");
            setApplyLeaveReportingManagerColor(halfDayLeaveData.applyLeaveReportingManager ? "black" : "#d3d3d3");
        } else if (type === "full") {
            // Preserve current half day data before switching
            const currentHalfDayData = {
                applyLeaveDate: getValues("applyLeaveDate"),
                applyLeaveType: getValues("applyLeaveType"),
                applyLeaveReason: getValues("applyLeaveReason"),
                applyLeaveReportingManager: getValues("applyLeaveReportingManager"),
                applyLeaveNotifyManager: getValues("applyLeaveNotifyManager"),
            };
            setHalfDayLeaveData(currentHalfDayData);

            // Restore previously saved full day data
            setValue("applyLeaveType", fullDayLeaveData.applyLeaveType || "");
            setValue("applyLeaveReason", fullDayLeaveData.applyLeaveReason || "");
            setValue("applyLeaveReportingManager", fullDayLeaveData.applyLeaveReportingManager || "");
            setValue("applyLeaveNotifyManager", fullDayLeaveData.applyLeaveNotifyManager || "");
            setLeaveTypeColor(fullDayLeaveData.applyLeaveType ? "black" : "#d3d3d3");
            setApplyLeaveReportingManagerColor(fullDayLeaveData.applyLeaveReportingManager ? "black" : "#d3d3d3");
        }

        setLeaveDuration(type); // Update the leave duration state
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

    // for showing the options conditionally
    const leaveTypeOptions =
        leaveDuration === 'full' ? ["Earn Leave (5)", "Sick Leave (2)", "Loss Of Pay Leave (0)", "Maternity Leave (2)", "Marriage Leave (2)"] :
            ["Earn Leave (5)", "Sick Leave (2)", "Loss Of Pay Leave (0)"];

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

            const toastMessage = (
                <div>
                    <strong>Leave applied successfully!</strong>
                    <div>{data.applyLeaveNotifyManager ? "Your reporting manager has been notified" : ""}</div>
                </div>
            );

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
                    <div className='attendance-container' style={{ padding: '0', marginBottom: '45px' , marginTop:'35px' }}>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <h4 className='apply-leave-heading'>Apply Leave</h4>
                            <div className='leave-type'>
                                <button className={`full-day-btn ${leaveDuration === 'full' ? "active" : ""}`}
                                    style={{ background: leaveDuration === 'full' ? '#76157B' : 'darkgray', color: 'white' }} onClick={() => handleLeaveDurationChange("full")}
                                    type='button' >Full Day</button>
                                <button className={`half-day-btn ${leaveDuration === 'half' ? "active" : ""}`}
                                    style={{ background: leaveDuration === 'half' ? '#76157B' : 'darkgray', color: 'white' }} onClick={() => handleLeaveDurationChange("half")} type='button'>Half Day</button>
                            </div>
                            <div className='apply-leave-section'>
                                {leaveDuration === "full" ? (
                                    <>
                                        <div className="input-text">
                                            <p className='applyLeaveLabel'>From <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="date"
                                                    min={today}
                                                    {...register("applyLeaveFromDate", {
                                                        required: true,
                                                    })} onChange={(e) => handleApplyLeaveFromDateColorChange(e)} style={{ color: selectApplyLeaveFromDateColor, padding: '5px' }} />
                                                {errors.applyLeaveFromDate && (<div className="userErrorMessage">{errors.applyLeaveFromDate.message}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p className='applyLeaveLabel'>To <span style={{ color: "red" }}>*</span></p>
                                            <div className="user-input-icons">
                                                <input className="input-field" type="date" min={minToDate}
                                                    {...register("applyLeaveToDate", {
                                                        required: true,
                                                    })} onChange={(e) => handleApplyLeaveToDateColorChange(e)} style={{ color: selectApplyLeaveToDateColor, padding: '5px' }} />
                                                {errors.applyLeaveToDate && (<div className="userErrorMessage">{errors.applyLeaveToDate.message}</div>)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="input-text">
                                        <p className='applyLeaveLabel'>Date<span style={{ color: "red" }}>*</span></p>
                                        <div className="user-input-icons">
                                            <input className="input-field" type="date" min={today}
                                                {...register("applyLeaveDate", {
                                                    required: true,
                                                })} onChange={(e) => handleApplyLeaveDateColorChange(e)} style={{ color: selectApplyLeaveDateColor, padding: '5px' }} />
                                            {errors.applyLeaveDate && (<div className="userErrorMessage">{errors.applyLeaveDate.message}</div>)}
                                        </div>
                                    </div>
                                )}

                                <div className="input-text">
                                    <p className='applyLeaveLabel'>Leave Type <span style={{ color: "red" }}>*</span></p>
                                    <div className="user-input-icons">
                                        <select className="input-field" {...register("applyLeaveType", { required: true })}
                                            onChange={(e) => handleLeaveTypeColorChange(e)} style={{ color: selectLeaveTypeColor }}>
                                            <option value="" hidden style={{ color: "#d3d3d3" }}>Choose your leave type</option>
                                            {leaveTypeOptions.map((option, index) => (
                                                <option key={index} style={{ color: 'black' }}>{option}</option>
                                            ))}
                                        </select>
                                        {errors.applyLeaveType && (<div className="userErrorMessage">{errors.applyLeaveType.message}</div>)}
                                    </div>
                                </div>
                                <div className="input-text" style={{ marginTop: '5px' }}>
                                    <p className='applyLeaveLabel'>Reason For Leave <span style={{ color: "red" }}>*</span></p>
                                    <div className="user-input-icons">
                                        <textarea rows="4" className="input-field" {...register("applyLeaveReason", { required: true })}>
                                        </textarea>
                                        {errors.applyLeaveReason && (<div className="userErrorMessage">{errors.applyLeaveReason.message}</div>)}
                                    </div>
                                </div>
                                <div className="input-text" style={{ marginTop: '-6px' }}>
                                    <p className='applyLeaveLabel'>Reporting Manager <span style={{ color: "red" }}>*</span></p>
                                    <div className="user-input-icons">
                                        <select className="input-field" {...register("applyLeaveReportingManager", { required: true })}
                                            onChange={(e) => handleApplyLeaveReportingManagerColorChange(e)} style={{ color: selectApplyLeaveReportingManagerColor }}>
                                            <option value="" hidden style={{ color: "#d3d3d3" }}>Choose Your Reporting Manager</option>
                                            <option style={{ color: 'black' }}>Anup Mangla</option>
                                            <option style={{ color: 'black' }}>Shaurya</option>
                                        </select>
                                        {errors.applyLeaveReportingManager && (<div className="userErrorMessage">{errors.applyLeaveReportingManager.message}</div>)}
                                    </div>
                                </div>
                                <div className="input-text" style={{ marginTop: '-5px' }}>
                                    {/* <p>Notify Your Manager</p> */}
                                    <div className="user-input-checkbox-icons">
                                        <label>
                                            <input className="input-field" type="checkbox" style={{width: '15px', marginRight: '0'}}{...register("applyLeaveNotifyManager")} />
                                            <span>Notify Your Manager</span>
                                        </label>
                                        {errors.applyLeaveNotifyManager && (<div className="userErrorMessage">{errors.applyLeaveNotifyManager.message}</div>)}
                                    </div>
                                </div>
                                <div className='edit-delete-btn-container'>
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
