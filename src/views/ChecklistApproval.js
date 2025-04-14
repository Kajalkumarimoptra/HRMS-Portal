import { React, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useWatch } from "react-hook-form";
import { useFormContext } from "../components/ContextProvider/Context";
import { useHolidayListContext } from 'components/ContextProvider/HolidayListContext';
import Breadcrumb from './Breadcrumb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChecklistApproval() {
    const {
        register, handleSubmit, onSubmit, reset, watch, clearErrors, setValue, trigger, errors, setError, control, getValues
    } = useFormContext();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;
    useEffect(() => {
        console.log("Navigated from:", from);
    }, [from]);
    const [agreed, setAgreed] = useState(false);
    const [isProceedChecklistDisabled, setProceedChecklistDisabled] = useState(true);
    const [formKey, setFormKey] = useState(0);

    const checklist = ["Assets Return", "VPN Access Removed", "Finance Clearance", "Project Handover", "Resignation Approval From Manager"]

    // // for post btn conditionally disabled
    const checkboxValues = useWatch({
        control,
        name: checklist.map(item => `checkboxApprovalForResignation.${item}`),
    });

    useEffect(() => {
        const hasErrors = Object.keys(errors).length > 0;

        // Check if all checklist items are checked (true)
        const allChecked = checkboxValues?.every(val => val === true);
    
        setProceedChecklistDisabled(!allChecked || hasErrors);
    }, [checkboxValues, errors]);

    const handleFormSubmit = async (data) => {
        if (Object.keys(errors).length > 0) {
            console.log("Form has errors. Submission blocked.");
            return;
        }
        onSubmit(data);
        reset();
        setTimeout(() => {
            navigate('/admin/Checklist/FinalClearance', { state: { from: 'Checklist', fromPath: location.pathname } });
        }, 2000);
        toast.success("Checklist submitted successfully.Proceeding to the next step...");
    };

    const handleCancelChecklist = () => {
        const { checkboxApprovalForResignation = {} } = getValues();
        const isFormEmpty = Object.values(checkboxApprovalForResignation).every(val => !val);
    
        if (isFormEmpty) {
            navigate('/admin/Offboarded/ScheduleMeeting'); // navigate if empty
        } else {
            reset();
            setFormKey(prev => prev + 1);
        }
    };    
 
      return (
        <div className='container-fluid'>
            <div className='row clearfix'>
                <div className='col-md-12'>
                    <Breadcrumb />
                    <div className='attendance-container' style={{ padding: '0', marginBottom: '45px', marginTop: '34px' }}>
                        <form key={formKey} onSubmit={handleSubmit(handleFormSubmit)}>
                            <h4 className='apply-leave-heading'>Checklist</h4>
                            <p style={{ marginTop: '-13px' }}>Ensure all checklist items are completed before proceeding</p>
                            <div className='apply-leave-section' style={{ marginBottom: '15px' }}>
                                <div className="input-text">
                                    <div className="user-input-icons">
                                        {checklist.map((item, index) => (
                                            <div key={index} style={{ marginBottom: '8px' }}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        {...register(`checkboxApprovalForResignation.${item}`)} />
                                                    {item}
                                                </label>
                                            </div>
                                        ))}
                                        <div style={{ display: 'flex', justifyContent:'center', gap: '15px' }}>
                                            <button className="primary-btn" type='button' style={{ background: 'darkgray', width: '100px' }} onClick={() => handleCancelChecklist()}>Cancel</button>
                                            <button className="primary-btn" type="submit" style={{ width: '100px' }}
                                                disabled={isProceedChecklistDisabled}
                                            >Next</button>
                                        </div>
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
