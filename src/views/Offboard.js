import React, { useState, useEffect } from 'react';
import { useFormContext } from 'components/ContextProvider/Context';
import { toast, ToastContainer } from 'react-toastify';
import { useOffboardPopupContext } from 'components/ContextProvider/OffboardPopupContext';

export default function Offboard() {
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
    const { isExitOpen, toggleExitPopup } = useOffboardPopupContext();
    const [selectLeaveReasonColor, setLeaveReasonColor] = useState("#d3d3d3"); // for giving diff color to date placeholder and option
    const [isModalForAddingOtherLeaveReasonOption, setModalForAddingOtherLeaveReasonOption] = useState(false); // for tracking the modal for adding other leave reason 
    const [otherLeaveReasonOption, setOtherLeaveReasonOption] = useState(""); // For storing other leave reason 
    const [selectedLeaveReason, setLeaveReason] = useState('');
    const [leaveReasons, setLeaveReasons] = useState(['Lack of growth Opportunities', 'Getting better Opportunity', 'Lack of recognition', 'Poor job flexibility', 'Shifting to other location', 'Poor benefits']);
    const [isManualReason, setIsManualReason] = useState(false); // Track if manually added
      
    const closeExitPopup = () => {
        toggleExitPopup(false); 
        reset({ exitLeaveReason: '' });
        setLeaveReasonColor("#d3d3d3");
    };

    // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
    const handleExitLeaveReasonColorChange = (e) => {
        const selectedLeaveReasonValue = e.target.value;
        setLeaveReason(selectedLeaveReasonValue); // Update the selected reason
        setValue("exitLeaveReason", selectedLeaveReasonValue); // Update form value
        setLeaveReasonColor(selectedLeaveReasonValue ? "black" : "#d3d3d3");
        clearErrors('exitLeaveReason');

        if (selectedLeaveReasonValue === "other") {
            console.log('other add leave reason option selected')
            setModalForAddingOtherLeaveReasonOption(true);
        }
    };

    // handle adding on pop up form
    // const handleAddingOtherLeaveReason = (e) => {
    //     e.preventDefault();  // Prevent page reload

    //     console.log("other leave reason is added:", otherLeaveReasonOption);

    //     if (otherLeaveReasonOption.trim() !== "") {
    //         setLeaveReasons([...leaveReasons, otherLeaveReasonOption]);
    //         setLeaveReason(otherLeaveReasonOption);
    //         setValue("exitLeaveReason", otherLeaveReasonOption);  // Update form value
    //     }

    //     setModalForAddingOtherLeaveReasonOption(false); // Close modal
    //     setOtherLeaveReasonOption(""); // Clear input field
    // };

    // handle closing the pop up
    const handelCancelOtherLeaveReason = () => {
        setModalForAddingOtherLeaveReasonOption(false);
    }

    // submit the exit form
    const handleExitSubmit = (data) => {
        console.log('form submitted');
        console.log('exit form data:', data);
        console.log("Form Errors:", errors);

        reset({
            exitLeaveReason: '',
            exitNotifyManager: false
        });
        setTimeout(() => {
            toast.success("Offboarding process has been initialized!");
        },1000);
        setModalForAddingOtherLeaveReasonOption(false);
        clearErrors();
        setLeaveReasonColor("#d3d3d3");
    }

    return (
        <>
            {isExitOpen && (
                <div className="popup-overlay">
                    <div className="popup">
                        <form onSubmit={handleSubmit(handleExitSubmit)}>
                            <div className="exit-heading">
                                <p> Do you really want to leave?</p>
                            </div>
                            <div className="leave-reason-container">
                                <p>Reason for leaving</p>
                                <div>
                                    <select className="exit-select-field" {...register("exitLeaveReason", { required: 'Please choose your leave reason' })}
                                        onChange={handleExitLeaveReasonColorChange}
                                        style={{ color: selectLeaveReasonColor, width: '400px' }} value={selectedLeaveReason}>
                                        <option value='' hidden>Choose the leave reason</option>
                                        {leaveReasons.map((name, index) => (
                                            <option key={index} value={name} style={{ color: 'black' }}>
                                                {name}
                                            </option>
                                        ))}
                                        {isManualReason && (
        <option value={selectedLeaveReason} hidden>
            {selectedLeaveReason}
        </option>
    )}
                                         
                                        <option style={{ color: 'black' }} value="other" >Add Other reason</option>
                                    </select>
                                    {errors.exitLeaveReason && (<div className="userErrorMessage">{errors.exitLeaveReason.message}</div>)}
                                </div>
                            </div>
                            {isModalForAddingOtherLeaveReasonOption && (
                                <div className='addOtherLeaveReasonForm'>
                                    <div className="textarea-wrapper">
                                        <textarea rows="2" cols="29" className='input-field' value={otherLeaveReasonOption}
                                            placeholder='Add reason here...' onChange={(e) => setOtherLeaveReasonOption(e.target.value)} required />
                                    </div>
                                </div>
                            )}
                            <div className="notify-container">
                                <label>
                                    <input className="input-field" type="checkbox" {...register("exitNotifyManager")} />
                                    <span>Notify Reporting Manager</span>
                                </label>
                            </div>
                            <div className='exit-leave-btn-container'>
                                <button className="primary-btn" type="reset" style={{ background: 'darkgray' }} onClick={closeExitPopup}>Cancel</button>
                                <button className="primary-btn" type="submit" style={{ width: '75px' }}
                                 onClick={() => {
                                    // If adding a manual reason
                                    if (isModalForAddingOtherLeaveReasonOption && otherLeaveReasonOption.trim() !== "") {
                                        setLeaveReason(otherLeaveReasonOption); // Set as the selected value
                                        setIsManualReason(true); // Mark it as manually added
                                        setValue("exitLeaveReason", otherLeaveReasonOption); // Update form value
                                        clearErrors("exitLeaveReason"); // Clear validation errors
                                        setModalForAddingOtherLeaveReasonOption(false); // Close modal
                                        setOtherLeaveReasonOption(""); // Clear modal input
                                    } else if (!selectedLeaveReason) {
                                        // Handle case when no reason is selected at all
                                        setError("exitLeaveReason", {
                                            type: "manual",
                                            message: "Please choose your leave reason",
                                        });
                                    }
                                }}
                                >Apply</button>
                            </div>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            )}
        </>
        
    )
}
