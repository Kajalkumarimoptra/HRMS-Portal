import { React, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useWatch } from "react-hook-form";
import { useFormContext } from "../components/ContextProvider/Context";
import Breadcrumb from './Breadcrumb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHolidayListContext } from 'components/ContextProvider/HolidayListContext';

export default function AssetRequestForm() {
    const {
        register, handleSubmit, onSubmit, reset, errors, serverError, setServerError, clearErrors, role, setRole, setValue, watch, getValues, control, setError
    } = useFormContext();
    const navigate = useNavigate();
    const holidays = useHolidayListContext();
    const [assetEmpName, setAssetEmpName] = useState('');
    const [assetName, setAssetName] = useState('');
    const [assetRequestDateColor, setAssetRequestDateColor] = useState("#d3d3d3");
    const [assetTypeColor, setAssetTypeColor] = useState("#d3d3d3");
    const [isApplyAssetRequestDisabled, setIsApplyAssetRequestDisabled] = useState(true);
    const [isCancelAssetRequestDisabled, setIsCancelAssetRequestDisabled] = useState(true);

    const typeOfAsset =
        ["Laptop", "Desktop Computer", "Monitor", "Keyboard", "Mouse", "Printer", "Scanner", "External Hard Drive",
            "Headphone"];

    const [customErrorForAssetInputs, setCustomErrorForAssetInputs] = useState({
        assetEmpName: '',
        assetName: '',
        requestReason: ''
    });

    // Get the current date in the required format (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    const watchedValues = useWatch({
        control,
        name: ["assetEmpName", "assetName", "assetRequestDate", "assetType", "requestReason"],
    });

    useEffect(() => {
        const [assetEmpName, assetName, assetRequestDate, assetType, requestReason] = watchedValues;

        console.log("assetEmpName:", assetEmpName);
        console.log("assetName:", assetName);
        console.log("assetRequestDate:", assetRequestDate);
        console.log("assetType:", assetType);
        console.log("requestreason:", requestReason);
        
        const hasErrors = Object.keys(errors).length > 0; // Check if errors exist
        // Check if all required fields are filled
        const isDisabled = !assetEmpName || !assetName || !assetRequestDate || !assetType || !requestReason || hasErrors;
        console.log("Is Apply Button Disabled:", isDisabled);
        setIsApplyAssetRequestDisabled(isDisabled);

        // Check if any field is filled for Cancel button, considering the mode
        const isCancelDisabled = !assetEmpName && !assetName && !assetRequestDate && !assetType && !requestReason;
        console.log("Is Cancel Button Disabled:", isCancelDisabled);
        setIsCancelAssetRequestDisabled(isCancelDisabled);

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

    // pattern failure validation 
    const handlePatternForAssetInputs = (e, pattern, field) => {
        let value = e.target.value;
        // Clear server error when the user starts typing again
        setServerError('');
        clearErrors(field);
        setValue(field, value); 

        let patternErrorMessage = '';
        if (field === 'assetEmpName' && value && !pattern.test(value)) {
            patternErrorMessage = 'No numbers or special characters are allowed';
            setError(field, { type: "pattern", message: patternErrorMessage }); // Set error in React Hook Form
        } else if (field === 'assetName' && value && !pattern.test(value)) {
            patternErrorMessage = 'No special characters are allowed';
            setError(field, { type: "pattern", message: patternErrorMessage });
        } else if (field === 'requestReason' && value && !pattern.test(value)) {
            patternErrorMessage = 'No special characters are allowed';
            setError(field, { type: "pattern", message: patternErrorMessage });
        } else {
            clearErrors(field); // Clear error if valid
        }
    
        setCustomErrorForAssetInputs(prev => ({ ...prev, [field]: patternErrorMessage }));
    
        // If there's no error, clear the error message for the field
        if (!patternErrorMessage) {
            setCustomErrorForAssetInputs(prev => ({ ...prev, [field]: '' }));
            clearErrors(field);
        }
    };

    const handleAssetRequestDateColorChange = (e) => {
        const selectedAssetRequestDateValue = e.target.value;
        if (isDisabledFromDate(selectedAssetRequestDateValue)) {
            alert("This date is a holiday or a weekend. Please select another date.");
            setValue("assetRequestDate", "");
            setAssetRequestDateColor("#d3d3d3");
        } else {
            setValue("assetRequestDate", selectedAssetRequestDateValue);
            setAssetRequestDateColor("black");
        }
        clearErrors("assetRequestDate");
    };

    const handleAssetTypeColorChange = (e) => {
        const selectedAssetTypeValue = e.target.value;
        setValue("assetType", selectedAssetTypeValue);
        setAssetTypeColor(selectedAssetTypeValue ? "black" : "#d3d3d3");
        clearErrors('assetType');
    };

    const handleCancelAssetRequest = () => {
        reset();
        setAssetEmpName("");
        setAssetName("");
        setAssetTypeColor("#d3d3d3");
        setAssetRequestDateColor("#d3d3d3");
        clearErrors();
    };

    const handleFormSubmit = (data) => {
        if (Object.keys(errors).length > 0) {
            console.log("Form has errors. Submission blocked.");
            return;
        }
        console.log("Submitting data:", data);
        onSubmit(data);
        reset();
        setTimeout(() => {
            navigate('/admin/Dashboard');
        }, 2000);
        toast.success("Your request for asset has been submitted");
        setServerError('');
        clearErrors();
        setAssetTypeColor("#d3d3d3");
        setAssetRequestDateColor("#d3d3d3");
};

return (
    <div className='container-fluid'>
        <div className='row clearfix'>
            <div className='col-md-12'>
                <Breadcrumb />
                <div className='attendance-container' style={{ padding: '0', marginBottom: '45px', marginTop: '35px' }}>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <h4 className='apply-leave-heading'>Asset Request Form</h4>
                        <div className='apply-leave-section'>
                            <div className="input-text">
                                <p className='applyLeaveLabel'>Employee Name<span style={{ color: "red" }}>*</span></p>
                                <div className="user-input-icons">
                                    <input className="input-field" type="text"
                                        {...register("assetEmpName", {
                                            required: true,
                                            maxLength: {
                                                value: 50,
                                                message: 'Name cannot exceed 50 characters'
                                            } , 
                                            minLength: {
                                                value: 3,
                                                message: 'Name must be at least 3 characters'
                                            }
                                        })}
                                        onChange={(e) => handlePatternForAssetInputs(e, /^[A-Za-z\s]+$/, 'assetEmpName')} />
                                         {errors.assetEmpName?.message ? (
                                            <div className="errorMessage">{errors.assetEmpName.message}</div>
                                        ) : customErrorForAssetInputs.assetEmpName ? (
                                            <div className="errorMessage">{customErrorForAssetInputs.assetEmpName}</div>
                                        ) : null}
                            
                                </div>
                            </div>
                            <div className="input-text">
                                <p className='applyLeaveLabel'>Type Of Asset<span style={{ color: "red" }}>*</span></p>
                                <div className="user-input-icons">
                                    <select className="input-field" {...register("assetType", { required: true })}
                                        onChange={(e) => handleAssetTypeColorChange(e)} style={{ color: assetTypeColor }}>
                                        <option value="" hidden style={{ color: "#d3d3d3" }}>Choose the asset type</option>
                                        {typeOfAsset.map((option, index) => (
                                            <option key={index} style={{ color: 'black' }}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="input-text">
                                <p className='applyLeaveLabel'>Asset Name<span style={{ color: "red" }}>*</span></p>
                                <div className="user-input-icons">
                                    <input className="input-field" type="text"
                                        {...register("assetName", {
                                            required: true,
                                            maxLength: {
                                                value: 100,
                                                message: 'Asset name cannot exceed 100 characters'
                                            } , 
                                            minLength: {
                                                value: 3,
                                                message: 'Asset name must be at least 3 characters'
                                            }
                                        })}
                                        onChange={(e) => handlePatternForAssetInputs(e, /^[a-zA-Z0-9 _-\s]+$/, 'assetName')} />
                                    {errors.assetName?.message ? (
                                            <div className="errorMessage">{errors.assetName.message}</div>
                                        ) : customErrorForAssetInputs.assetName ? (
                                            <div className="errorMessage">{customErrorForAssetInputs.assetName}</div>
                                        ) : null}
                                </div>
                            </div>
                            <div className="input-text">
                                <p className='applyLeaveLabel'>Request Date<span style={{ color: "red" }}>*</span></p>
                                <div className="user-input-icons">
                                    <input className="input-field" type="date"
                                        {...register("assetRequestDate", {
                                            required: true,
                                        })} onChange={(e) => handleAssetRequestDateColorChange(e)} style={{ color: assetRequestDateColor, padding: '5px' }} />
                                </div>
                            </div>
                            <div className="input-text" style={{ marginTop: '5px' }}>
                                <p className='applyLeaveLabel'>Reason Of Request <span style={{ color: "red" }}>*</span></p>
                                <div className="user-input-icons">
                                    <textarea rows="4" className="input-field" {...register("requestReason", { required: true,
                                        maxLength: {
                                            value: 100,
                                            message: 'Reason Of request cannot exceed 100 characters'
                                        } , 
                                        minLength: {
                                            value: 3,
                                            message: 'Reason Of request must be at least 3 characters'
                                        }
                                     })}  onChange={(e) => handlePatternForAssetInputs(e, /^[a-zA-Z0-9\s.,!'"()&-]+$/, 'requestReason')}>
                                    </textarea>
                                    {errors.requestReason?.message ? (
                                            <div className="errorMessage" style={{marginTop: '-5px', marginBottom:'15px'}}>{errors.requestReason.message}</div>
                                        ) : customErrorForAssetInputs.requestReason ? (
                                            <div className="errorMessage" style={{marginTop: '-5px', marginBottom:'15px'}}>{customErrorForAssetInputs.requestReason}</div>
                                        ) : null}
                                </div>
                            </div>
                            <div className="input-text" style={{ marginTop: '-6px' }}>
                                <p className='applyLeaveLabel'>Attach doc(if any)</p>
                                <div>
                                    <input className="input-field" type="file"
                                        {...register("assetDoc", {
                                            required: true,
                                        })} />
                                    {errors.assetDoc && (<div className="userErrorMessage">{errors.assetDoc.message}</div>)}
                                </div>
                            </div>
                            <div className='edit-delete-btn-container' style={{ marginTop: '10px' }}>
                                <button className="primary-btn" style={{ background: 'darkgray', width: '100px' }} disabled={isCancelAssetRequestDisabled} onClick={() => handleCancelAssetRequest()}>Cancel</button>
                                <button className="primary-btn" type="submit" style={{ width: '100px' }} disabled={isApplyAssetRequestDisabled} >Apply</button>
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
