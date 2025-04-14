import { React, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useWatch } from "react-hook-form";
import { useFormContext } from "../components/ContextProvider/Context";
import { useHolidayListContext } from 'components/ContextProvider/HolidayListContext';
import Breadcrumb from './Breadcrumb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ScheduleMeeting() {
    const {
        register, handleSubmit, onSubmit, reset, watch, clearErrors, setValue, trigger, errors, setError, control, getValues
    } = useFormContext();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;
     useEffect(() => {
            console.log("Navigated from:", from);  
        }, [from]);
    const holidays = useHolidayListContext();
    const [scheduleDateColor, setScheduleDateColor] = useState("#d3d3d3");
    const [scheduleStartTimeColor, setScheduleStartTimeColor] = useState("#d3d3d3");
    const [scheduleEndTimeColor, setScheduleEndTimeColor] = useState("#d3d3d3");
    const [isProceedScheduleMeetingDisabled, setProceedScheduleMeetingDisabled] = useState(true);

    const [customErrorForScheduleMeetingInputs, setCustomErrorForrScheduleMeetingInputs] = useState({
        scheduleTitle: '',
        participantEmail: ''
    });

    // for post btn conditionally disabled
    const watchedValues = useWatch({
        control,
        name: ["scheduleTitle", "scheduleDate", "scheduleStartTime", "scheduleEndTime", "participantEmail"],
    });

    useEffect(() => {
        const [scheduleTitle, scheduleDate, scheduleStartTime, scheduleEndTime, participantEmail] = watchedValues;

        console.log("scheduleTitle:", scheduleTitle);
        console.log("scheduleDate:", scheduleDate);
        console.log("scheduleStartTime:", scheduleStartTime);
        console.log("scheduleEndTime:", scheduleEndTime);
        console.log("participantEmail:", participantEmail);
        
        const hasErrors = Object.keys(errors).length > 0;
        console.log('errors:', hasErrors);
        const isDisabled = !scheduleTitle || !scheduleDate || !scheduleStartTime ||!scheduleEndTime ||!participantEmail  || hasErrors;
        console.log("Is Apply Button Disabled:", isDisabled);
        setProceedScheduleMeetingDisabled(isDisabled);

    }, [watchedValues, errors]);

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

    const handleScheduleDateColorChange = (e) => {
        const scheduleDateValue = e.target.value;
        if (isDisabledFromDate(scheduleDateValue)) {
            alert("This date is a holiday or a weekend. Please select another date.");
            setValue("scheduleDate", "");
            setScheduleDateColor("#d3d3d3");
        } else {
            setValue("scheduleDate", scheduleDateValue);
            setScheduleDateColor("black");
        }
        clearErrors("scheduleDate");
    };

    const handleCancelScheduleMeeting = () => {
        const values = getValues();
        const isFormEmpty = Object.values(values).every(value => !value); // check if all fields are empty
    
        if (isFormEmpty) {
            navigate('/admin/PendingRequest/Offboarded'); // navigate back if all fields are empty
        } else {
            reset(); // otherwise, reset the form
            setScheduleDateColor("#d3d3d3");
            setScheduleStartTimeColor("#d3d3d3");
            setScheduleEndTimeColor("#d3d3d3");
            clearErrors();
            setCustomErrorForrScheduleMeetingInputs('');
        }
    };

    // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
    const handleScheduleStartTimeColorChange = (e) => {
        const selectedScheduleStartTimeValue = e.target.value;
        setValue("scheduleStartTime", selectedScheduleStartTimeValue);
        setScheduleStartTimeColor(selectedScheduleStartTimeValue ? "black" : "#d3d3d3");
    };
    const handleScheduleEndTimeColorChange = (e) => {
        const selectedEndTime = e.target.value;
        const selectedStartTime = getValues("scheduleStartTime");
    
        setValue("scheduleEndTime", selectedEndTime);
        setScheduleEndTimeColor(selectedEndTime ? "black" : "#d3d3d3");
    
        if (selectedStartTime && selectedEndTime && selectedEndTime <= selectedStartTime) {
            alert("End time must be after Start time");
            setValue("scheduleEndTime", ""); 
            setScheduleEndTimeColor("#d3d3d3");
        }
    };
    

    const handlePatternForScheduleMeetingInputs = (e, pattern, field) => {
        let value = e.target.value;
        clearErrors(field);
        setValue(field, value);

        let patternErrorMessage = '';

        if ((field === "scheduleTitle") && value && !pattern.test(value)) {
            patternErrorMessage = 'No special characters are allowed';
        } else if ((field === "participantEmail") && value && !pattern.test(value)) {
            patternErrorMessage = 'Please enter the valid email address';
        }
        else {
            clearErrors(field);
        }
        if (patternErrorMessage) {
            setError(field, { type: "pattern", message: patternErrorMessage });
            setCustomErrorForrScheduleMeetingInputs(prev => ({ ...prev, [field]: patternErrorMessage }));
        } else {
            clearErrors(field);
            setCustomErrorForrScheduleMeetingInputs(prev => ({ ...prev, [field]: '' }));
        }
    };

    useEffect(() => {
        if (errors.scheduleEndTime?.message) {
          alert(errors.scheduleEndTime.message);
        }
      }, [errors.scheduleEndTime]); 
      
    const handleFormSubmit = async (data) => {
        if (Object.keys(errors).length > 0) {
            console.log("Form has errors. Submission blocked.");
            return;
        }
        onSubmit(data);
        reset();
        setTimeout(() => {
            navigate('/admin/ScheduleMeeting/Checklist' , {state: { from: 'ScheduleMeeting', fromPath: location.pathname }});
        }, 2000);
        toast.success("Meeting link has been generated successfully!");
        setScheduleDateColor("#d3d3d3");
        setScheduleStartTimeColor("#d3d3d3");
        setScheduleEndTimeColor("#d3d3d3");
        clearErrors();
        setCustomErrorForrScheduleMeetingInputs('');
    };


    return (
        <div className='container-fluid'>
            <div className='row clearfix'>
                <div className='col-md-12'>
                    <Breadcrumb />
                    <div className='attendance-container' style={{ padding: '0', marginBottom: '45px', marginTop: '34px' }}>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <h4 className='apply-leave-heading'>Schedule Meeting</h4>
                            <div className='apply-leave-section'>
                                <div className="input-text">
                                    <p className='applyLeaveLabel'>Title<span style={{ color: "red" }}>*</span></p>
                                    <div className="user-input-icons">
                                        <input className="input-field" type="text" placeholder="Enter Your Full Name" {...register("scheduleTitle", {
                                            required: true,
                                            maxLength: {
                                                value: 50,
                                                message: 'Meeting Title cannot exceed 50 characters'
                                            },
                                            minLength: {
                                                value: 3,
                                                message: 'Meeting Title must be at least 3 characters'
                                            }
                                        })}
                                            onChange={(e) => handlePatternForScheduleMeetingInputs(e, /^[a-zA-Z0-9\s\-_:&().,'"]+$/, 'scheduleTitle')} />
                                        {errors.scheduleTitle?.message ? (
                                            <div className="userErrorMessage">{errors.scheduleTitle.message}</div>
                                        ) : customErrorForScheduleMeetingInputs.scheduleTitle ? (
                                            <div className="userErrorMessage">{customErrorForScheduleMeetingInputs.scheduleTitle}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="input-text">
                                    <p className='applyLeaveLabel'>Date<span style={{ color: "red" }}>*</span></p>
                                    <div className="user-input-icons">
                                        <input className="input-field" type="date"
                                            min={new Date().toISOString().split("T")[0]}
                                            {...register("scheduleDate", {
                                                required: true,
                                            })} onChange={(e) => handleScheduleDateColorChange(e)} style={{ color: scheduleDateColor, padding: '5px' }} />
                                    </div>
                                 </div>
                                <div className="input-text">
                                    <p className='applyLeaveLabel'>Start Time<span style={{ color: "red" }}>*</span></p>
                                    <div className="user-input-icons">
                                        <input className="input-field" type="time" {...register("scheduleStartTime", { required: true })}
                                            onChange={(e) => handleScheduleStartTimeColorChange(e)} style={{ color: scheduleStartTimeColor, padding: '4px' }} />
                                    </div>
                                </div>
                                <div className="input-text">
                                    <p className='applyLeaveLabel'>End Time<span style={{ color: "red" }}>*</span></p>
                                    <div className="user-input-icons">
                                        <input className="input-field" type="time" {...register("scheduleEndTime", { required: true })}
                                            onChange={(e) => handleScheduleEndTimeColorChange(e)} 
                                            style={{ color: scheduleEndTimeColor, padding: '4px' }} />
                                    </div>
                                </div>
                                <div className="input-text">
                                    <p className='applyLeaveLabel'>Participant<span style={{ color: "red" }}>*</span></p>
                                    <div className="user-input-icons">
                                        <input className="input-field" type="email" placeholder="Enter Participant's E-mail Address" {...register("participantEmail", { required: true })}
                                            onChange={(e) => handlePatternForScheduleMeetingInputs(e, /^[a-zA-Z0-9._+-]+@moptra\.com$/, 'participantEmail')} />
                                        {customErrorForScheduleMeetingInputs.participantEmail &&
                                            <div className="userErrorMessage">{customErrorForScheduleMeetingInputs.participantEmail}</div>}
                                    </div>
                                </div>
                                <div className='edit-delete-btn-container' style={{ marginTop: '20px' }}>
                                    <button className="primary-btn" style={{ background: 'darkgray', width: '100px' }} onClick={() => handleCancelScheduleMeeting()}>Cancel</button>
                                    <button className="primary-btn" type="submit" style={{ width: '100px' }} disabled={isProceedScheduleMeetingDisabled} >Schedule</button>
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
