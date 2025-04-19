import React, { useState, useRef, useContext } from 'react';
import { useFormContext } from 'components/ContextProvider/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EmploymentHistoryContext } from 'components/ContextProvider/EmploymentHistoryContext';

export default function EmploymentHistoryForm({ index }) {

    const { setEmploymentHistoryDetails } = useContext(EmploymentHistoryContext);
    const fileInputRefs = useRef({});  // Store refs dynamically for each field
    const [selectEmpPeriodFromDateColor, setEmpPeriodFromDateColor] = useState("#d3d3d3");
    const [selectEmpPeriodToDateColor, setEmpPeriodToDateColor] = useState("#d3d3d3"); // for giving diff color to date placeholder and option
    const [empPeriodFromStayDates, setEmpPeriodFromStayDates] = useState({});

    // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
    const handleEmpPeriodFromDateColorChange = (e, index) => {
        const selectedValue = e.target.value;
        setEmpPeriodFromDateColor(selectedValue ? "black" : "#d3d3d3");
        clearErrors(`empPeriodFrom[${index}]`);
    };
    // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
    const handleEmpPeriodToDateColorChange = (e, index) => {
        const selectedValue = e.target.value;
        setEmpPeriodToDateColor(selectedValue ? "black" : "#d3d3d3");
        clearErrors(`empPeriodTo[${index}]`);
    };
    const handleDynamicEmpPeriodFromStayDatesChange = (index, e) => {
        let value = e.target.value;
        setEmpPeriodFromStayDates((prev) => ({
            ...prev,
            [index]: value,
        }))
    };

    const numberToWords = (num) => {
        if (isNaN(num) || num === undefined) return ''; // Handle NaN cases
        const words = ['first', 'second', 'third'];
        return words[num - 1] || num;
    }
    const wordIndex = numberToWords(index + 1); // for converting no. to words

    const navigate = useNavigate();
    const {
        register, handleSubmit, errors, onSubmit, clearErrors, setValue
    } = useFormContext();

    // state for overall handling of pattern
    const [pattern, setPattern] = useState({});

    // error msg for its failure
    const [customErrorForPattern, setCustomErrorForPattern] = useState({});

    // state for overall handling of documents validation

    const [empHistoryDoc, setEmpHistoryDoc] = useState({}); // state for holding degree document file
    const [empHistoryFileUploaded, setEmpHistoryFileUploaded] = useState({}); // Tracks if files have been uploaded
    // const [customErrorForEmpHistoryDocUpload, setCustomErrorForEmpHistoryDocUpload] = useState({}); // error msg on not uploading the file
    const [successfulEmpHistoryFileUploadMsg, setSuccessfulEmpHistoryFileUploadMsg] = useState({}); // state for displaying successful upload msg

    // pattern failure validation 
    const handlePatternForPrevEmp = (e, pattern, field, index) => {
        let value = e.target.value;
        const fieldKey = `${field}[${index}]`; // Create a dynamic key like "PrevEmpName[0]"
        // Update pattern state dynamically
        setPattern(prev => ({ ...prev, [fieldKey]: value }));

        let patternErrorMessage = '';
        if ((field === 'PrevEmpName' || field === 'managerName') && value && !pattern.test(value)) {
            patternErrorMessage = 'No numbers or special characters are allowed';
        }
        else if (field === 'telephoneNo' || field === 'managerContactNo') {
            if (value.length > 10) {
                value = value.slice(0, 10); // Slice to 10 digits
                e.target.value = value;  // Update the input value directly
            }
            if (value && !pattern.test(value)) {
                patternErrorMessage = 'Only numbers are allowed';
            }
        }
        else if (field === 'employeeCode') {
            // If emp id exceeds 6 digits, slice it to 6 digits
            if (value.length > 6) {
                value = value.slice(0, 6);
                e.target.value = value;  // Update the input value directly
            }
            // perform validation
            if (value && !pattern.test(value)) {
                patternErrorMessage = 'Only numbers are allowed';
            }
        }
        else if (field === 'designation' || field === 'department') {
            if (value && !pattern.test(value)) {
                patternErrorMessage = 'Please write as per the correct format';
            }
        } else if (field === "managerEmailId") {
            if (value && !pattern.test(value)) {
                patternErrorMessage = 'Please write the valid email address';
            }
        }
        // Update error state dynamically
        setCustomErrorForPattern(prev => ({ ...prev, [fieldKey]: patternErrorMessage }));

        // Clear error if validation passes
        if (patternErrorMessage === '') {
            clearErrors(fieldKey);
        }
    }

    // file type for certificates upload
    const handleFileForDocs = (e, field) => {
        const file = e.target.files[0]; // Get the first file from the input
        console.log(`Selected file for ${field}:`, file);

        // Clear error messages immediately upon file selection
        //  setCustomErrorForEmpHistoryDocUpload(prev => ({ ...prev, [field]: '' })); // Clear any upload errors
        setSuccessfulEmpHistoryFileUploadMsg(prev => ({ ...prev, [field]: '' })); // Clear success message
        setEmpHistoryFileUploaded(prev => ({ ...prev, [field]: false })); // Reset file uploaded state

        if (file) {
            const fileType = file.type;
            const allowedFileTypes = ["application/pdf"];  // file type allowed
            if (!allowedFileTypes.includes(fileType)) {
                window.alert("Only PDF files are supported");
                fileInputRefs.current[field].value = ""; // Clear file input
                return;
            }
            setEmpHistoryDoc(prevState => ({
                ...prevState,
                [field]: file, // Store file with dynamic field name
            }));
            clearErrors(field);
            const fileSize = file.size;
            if (fileSize / 1024 > 20) {
                window.alert("File should be less than or upto 20kb");  // file size validation
                fileInputRefs.current[field].value = ""; // Clear file input
                return;
            }
        }
    }

    // handle file upload
    const handleFileUpload = async (field) => {

        const file = empHistoryDoc[field];
        console.log('Uploading file for field:', field);
        console.log('File:', file);
        if (!file) {
            console.log(`No file found for ${field}, setting error`);
            // setCustomErrorForEmpHistoryDocUpload(prev => ({ ...prev, [field]: 'Please select a file to upload' }));
            window.alert("Please select a file to upload");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        console.log('FormData being sent:', formData);

        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                setServerError('Authentication issue');
                return; // Exit if token is not found
            }
            const response = await axios.post('http://localhost:8081/api/files/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log('file upload response:', response.data); // Check the response

            if (response.data.data && response.data.data.url) {
                const fileUrl = response.data.data.url; // Extract the file URL from the respons
                console.log(`File uploaded successfully for ${field}:`, fileUrl);

                setEmploymentHistoryDetails((prev) => {
                    const updatedDetails = {
                    ...prev,
                    [field.split(".")[0]]: {
                        ...prev[field.split(".")[0]],
                        [field.split(".")[1]]: fileUrl,
                    }
                }
                    console.log("Updated Employment History Details after upload:", JSON.stringify(updatedDetails, null, 2));
                    return updatedDetails;
                });
                setValue(field, fileUrl);  // This tells the form that the file exists
                clearErrors(field);           
                setEmpHistoryFileUploaded(prev => ({ ...prev, [field]: true }));
                setSuccessfulEmpHistoryFileUploadMsg(prev => ({ ...prev, [field]: 'Uploaded' }));
                return fileUrl;
            } else {
                throw new Error('No file URL returned in the response');
            }
        } catch (error) {
            console.error('File upload failed with error: ', error); // Log the entire error object
            console.error('Error response:', error.response); // Log the response object if available
            console.error('Error message:', error.message); // Log the specific error message

            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;
                if (errorMessage.includes('File already exists')) {
                    console.log('file already exist error:', errorMessage);
                    // setCustomErrorForEmpHistoryDocUpload(prev => ({ ...prev, [field]: 'This file is already uploaded' }));
                    window.alert("This file is already uploaded");
                    fileInputRefs.current[field].value = ""; // Clear file input
                    setEmpHistoryDoc(prev => ({ ...prev, [field]: null }));
                    setEmpHistoryFileUploaded(prev => ({ ...prev, [field]: false }));
                    setSuccessfulEmpHistoryFileUploadMsg(prev => ({ ...prev, [field]: '' }));
                    return;
                } else {
                    console.log('common error:', errorMessage);
                    // setCustomErrorForEmpHistoryDocUpload(prev => ({ ...prev, [field]: 'Upload failed, Please try again' }));
                    window.alert("Upload failed, Please try again");
                    fileInputRefs.current[field].value = ""; // Clear file input
                    setEmpHistoryDoc(prev => ({ ...prev, [field]: null }));
                    setEmpHistoryFileUploaded(prev => ({ ...prev, [field]: false }));
                    setSuccessfulEmpHistoryFileUploadMsg(prev => ({ ...prev, [field]: '' }));
                }
            }
            else {
                // Handle generic errors
                // setCustomErrorForEmpHistoryDocUpload(prev => ({ ...prev, [field]: 'Upload failed, Please try again' }));
                window.alert("Upload failed, Please try again");
                fileInputRefs.current[field].value = ""; // Clear file input
                setEmpHistoryDoc(prev => ({ ...prev, [field]: null }));
                setEmpHistoryFileUploaded(prev => ({ ...prev, [field]: false }));
                setSuccessfulEmpHistoryFileUploadMsg(prev => ({ ...prev, [field]: '' }));
            }
        }
    };

    const handleRemoveFile = (field) => {
        setEmpHistoryDoc(prev => ({ ...prev, [field]: null }));
        setEmpHistoryFileUploaded(prev => ({ ...prev, [field]: false }));
        setSuccessfulEmpHistoryFileUploadMsg(prev => ({ ...prev, [field]: '' }));
    
    
        // Reset the file input field using React ref
        if (fileInputRefs.current[field]) { 
          fileInputRefs.current[field].value = ""; 
        }
      };

    // to store theese fields in context
    const handleInputChange = (field, index, value) => {
        setEmploymentHistoryDetails((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                [index]: value,  // Store values under their respective index
            },
        }));
    };


    return (
        <div className='empHistoryContainer' key={index}>
            <div>
                <div className='empHistoryDetailHeading'> <h6 className='educationalHeadline'>EMPLOYMENT HISTORY -</h6><span><p className='educationalNote'>
                    Previous {wordIndex} employment history</p></span> </div>
            </div>
            {/* employment history form */}
            <form onSubmit={handleSubmit(onSubmit)} className='empHistoryForm'>
                <div className='PrevEmpNameContainer'>
                    <label>Previous Employer Name <span className='required'>*</span> <span className='separatorForPrevEmpName'>:</span></label>
                    <input type='text' placeholder='Previous Employer Name' className={`PrevEmpNameInput ${errors?.[`PrevEmpName[${index}]`] ? 'invalid' : ''}`} {...register(`PrevEmpName[${index}]`, {
                        required: true,
                        minLength: {
                            value: 3,
                            message: 'Name must be at least 3 characters'
                        },
                        maxLength: {
                            value: 50,
                            message: 'Name cannot exceed 50 characters'
                        }
                    })}
                        value={pattern[`PrevEmpName[${index}]`]} onChange={(e) => { handlePatternForPrevEmp(e, /^[A-Za-z\s]+$/, "PrevEmpName", index); handleInputChange("PrevEmpName", index, e.target.value) }} />
                    {customErrorForPattern[`PrevEmpName[${index}]`] ? <div className='empErrorMessage'>{customErrorForPattern[`PrevEmpName[${index}]`]}</div> : ''}
                    {errors[`PrevEmpName[${index}]`] && (<div className="empErrorMessage">{errors[`PrevEmpName[${index}]`].message}</div>)}
                </div>
                <div className='PrevEmpNameContainer'>
                    <label>Address <span className='required'>*</span> <span className='separatorForPrevEmpAdd'>:</span></label>
                    <input type='text' placeholder='Previous Employer Address' className={`PrevEmpAddressInput ${errors?.[`PrevEmpAddress[${index}]`] ? 'invalid' : ''}`} {...register(`PrevEmpAddress[${index}]`, { required: true, maxLength: 100 })}
                        onChange={(e) => handleInputChange("PrevEmpAddress", index, e.target.value)} />
                </div>
                <div className='noCodeContainer'>
                    <div>
                        <label>Telephone No. <span className='required'>*</span> <span className='separationForTelephone'> : </span></label>
                        <input type='telephone' placeholder='Mobile No.' className={`teleInput ${errors?.[`telephoneNo[${index}]`] ? 'invalid' : ''}`}  {...register(`telephoneNo[${index}]`, {
                            required: true,
                            minLength: {
                                value: 10,
                                message: 'Telephone no. must be of ten digits only'
                            }
                        })}
                            value={pattern[`telephoneNo[${index}]`]} onChange={(e) => { handlePatternForPrevEmp(e, /^[0-9]+$/, "telephoneNo", index); handleInputChange("telephoneNo", index, e.target.value) }} />
                        {customErrorForPattern[`telephoneNo[${index}]`] ? <div className='empErrorMessage'>{customErrorForPattern[`telephoneNo[${index}]`]}</div> : ''}
                        {errors[`telephoneNo[${index}]`] && (<div className="empErrorMessage">{errors[`telephoneNo[${index}]`].message}</div>)}
                    </div>
                    <div className='codeContainer'>
                        <label>Employee Code <span className='required'>*</span> <span className='separationForEmpCode'> : </span></label>
                        <input type='text' placeholder='Employee Code' className={`empCodeInput ${errors?.[`employeeCode[${index}]`] ? 'invalid' : ''} `}  {...register(`employeeCode[${index}]`, {
                            required: true,
                            minLength: {
                                value: 6,
                                message: 'Employee Code must be of six digits only'
                            }
                        })}
                            onChange={(e) => { handleInputChange("employeeCode", index, e.target.value); handlePatternForPrevEmp(e, /^[0-9]+$/, "employeeCode", index) }} />
                        {customErrorForPattern[`employeeCode[${index}]`] ? <div className='empErrorMessage'>{customErrorForPattern[`employeeCode[${index}]`]}</div> : ''}
                        {errors[`employeeCode[${index}]`] && (<div className="empErrorMessage">{errors[`employeeCode[${index}]`].message}</div>)}
                    </div>
                </div>
                <div className='noCodeContainer'>
                    <div>
                        <label>Designation<span className='required'>*</span> <span className='separationForDesg'> : </span></label>
                        <input type='text' placeholder='Designation' className={`desgInput ${errors?.[`designation[${index}]`] ? 'invalid' : ''} `} {...register(`designation[${index}]`, { required: true, maxLength: 50 })}
                            value={pattern[`designation[${index}]`]} onChange={(e) => { handlePatternForPrevEmp(e, /^[A-Za-z0-9-\s]+$/, "designation", index); handleInputChange("designation", index, e.target.value) }} />
                        {customErrorForPattern[`designation[${index}]`] ? <div className='empErrorMessage'>{customErrorForPattern[`designation[${index}]`]}</div> : ''}
                    </div>
                    <div className='codeContainer'>
                        <label>Department <span className='required'>*</span> <span className='separationForDept'> : </span></label>
                        <input type='text' placeholder='Department' className={`deptInput ${errors?.[`department[${index}]`] ? 'invalid' : ''}`} {...register(`department[${index}]`, { required: true, maxLength: 50 })}
                            value={pattern[`department[${index}]`]} onChange={(e) => { handlePatternForPrevEmp(e, /^[A-Za-z0-9-\s]+$/, "department", index); handleInputChange("department", index, e.target.value) }} />
                        {customErrorForPattern[`department[${index}]`] ? <div className='empHistoryErrorMessage'>{customErrorForPattern[`department[${index}]`]}</div> : ''}
                    </div>
                </div>
                <div className='noCodeContainer'>
                    <div>
                        <label>Manager's Name <span className='required'>*</span> <span className='separationForManagerName'> : </span></label>
                        <input type='text' placeholder='Manager Name' className={`managerNameInput ${errors?.[`managerName[${index}]`] ? 'invalid' : ''}`} {...register(`managerName[${index}]`, {
                            required: true,
                            minLength: {
                                value: 3,
                                message: 'Name must be at least 3 characters'
                            },
                            maxLength: {
                                value: 50,
                                message: 'Name cannot exceed 50 characters'
                            }
                        })}
                            value={pattern[`managerName[${index}]`]} onChange={(e) => { handlePatternForPrevEmp(e, /^[A-Za-z\s]+$/, "managerName", index); handleInputChange("managerName", index, e.target.value) }} />
                        {customErrorForPattern[`managerName[${index}]`] ? <div className='empErrorMessage'>{customErrorForPattern[`managerName[${index}]`]}</div> : ''}
                        {errors[`managerName[${index}]`] && (<div className="empErrorMessage">{errors[`managerName[${index}]`].message}</div>)}
                    </div>
                    <div className='codeContainer'>
                        <label>Manager's Contact No. <span className='required'>*</span> <span className='separationForManagerNo'> : </span></label>
                        <input type='telephone' placeholder='Contact No.' className={`managerContactInput ${errors?.[`managerContactNo[${index}]`] ? 'invalid' : ''}`}  {...register(`managerContactNo[${index}]`, {
                            required: true,
                            minLength: {
                                value: 10,
                                message: 'Contact no. must be of ten digits only'
                            }
                        })}
                            value={pattern[`managerContactNo[${index}]`]} onChange={(e) => { handlePatternForPrevEmp(e, /^[0-9]+$/, "managerContactNo", index); handleInputChange("managerContactNo", index, e.target.value) }} />
                        {customErrorForPattern[`managerContactNo[${index}]`] ? <div className='empHistoryErrorMessage'>{customErrorForPattern[`managerContactNo[${index}]`]}</div> : ''}
                        {errors[`managerContactNo[${index}]`] && (<div className="empErrorMessage">{errors[`managerContactNo[${index}]`].message}</div>)}
                    </div>
                </div>
                <div className='PrevEmpNameContainer'>
                    <label>Manager's Email ID <span className='required'>*</span> <span className='separatorForManagerEmail'>:</span></label>
                    <input type='text' placeholder='Email ID' className={`managerEmailInput ${errors?.[`managerEmailId[${index}]`] ? 'invalid' : ''}`} {...register(`managerEmailId[${index}]`, { required: true })}
                        onChange={(e) => { handleInputChange("managerEmailId", index, e.target.value); handlePatternForPrevEmp(e, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "managerEmailId", index) }} />
                    {customErrorForPattern[`managerEmailId[${index}]`] ? <div className='empHistoryErrorMessage'>{customErrorForPattern[`managerEmailId[${index}]`]}</div> : ''}
                </div>
                <div className='PrevEmpNameContainer'>
                    <label>Reasons for Leaving <span className='required'>*</span> <span className='separatorForLeaveReason'>:</span></label>
                    <input type='text' placeholder='Leaving Reason' className={`leaveReasonInput  ${errors?.[`leaveReason[${index}]`] ? 'invalid' : ''}`} {...register(`leaveReason[${index}]`, { required: true, maxLength: 100 })}
                        onChange={(e) => handleInputChange("leaveReason", index, e.target.value)} />
                </div>
                <div className='PrevEmpFromToContainer'>
                    <label>Employment Period <span className='required'>*</span> <span className='separatorForStayEmpFrom'>:</span></label>
                    <div>
                        <label>From <span className='required'>*</span> </label>
                        <input type='date' placeholder='Select Date' className={`empFromInput ${errors?.[`empPeriodFrom[${index}]`] ? 'invalid' : ''}`} {...register(`empPeriodFrom[${index}]`, { required: true })}
                            onChange={(e) => { handleInputChange("empPeriodFrom", index, e.target.value); handleEmpPeriodFromDateColorChange(e, index); handleDynamicEmpPeriodFromStayDatesChange(index, e) }}
                            style={{ color: selectEmpPeriodFromDateColor }} />
                    </div>
                    <div className='empToContainer'>
                        <label className='empToLabel'>To<span className='required'>*</span> </label>
                        <input type='date' placeholder='Select Date' className={`empToInput ${errors?.[`empPeriodTo[${index}]`] ? 'invalid' : ''}`} {...register(`empPeriodTo[${index}]`, { required: true })}
                            onChange={(e) => { handleInputChange("empPeriodTo", index, e.target.value); handleEmpPeriodToDateColorChange(e, index) }}
                            style={{ color: selectEmpPeriodToDateColor }} min={empPeriodFromStayDates[index]} />
                    </div>
                </div>
                <div className='PrevEmpNameContainer'>
                    <label>Was this Position? <span className='required'>*</span> </label>
                    <span className='separatorForPosition'>:</span>

                    <label>Permanent
                        <input type='radio' name="position" className='radioCheck'
                            {...register(`position[${index}]`, { required: true })}
                            value="permanent" onChange={(e) => handleInputChange("position", index, e.target.value)}
                        />
                    </label>

                    <label>Temporary
                        <input type='radio' name="position" className='radioCheck'
                            {...register(`position[${index}]`, { required: true })}
                            value="temporary" onChange={(e) => handleInputChange("position", index, e.target.value)}
                        />
                    </label>

                    <label>Contractual
                        <input type='radio' name="position" className='radioCheck'
                            {...register(`position[${index}]`, { required: true })}
                            value="contractual" onChange={(e) => handleInputChange("position", index, e.target.value)}
                        />
                    </label>
                </div>

                {errors[`position[${index}]`] && <div className='errorMessage'>Please select the position type</div>}

                <div>
                    <h6 className='prevDoc'>Please submit a scan copy of your previous relevant documents-</h6>
                </div>
                <div className='docGrpContainer'>
                    <label>Experience Certificate</label><span className='required'>*</span><span className='separatorForExpCert'>:</span>
                    <div className='emp-file-container'>
                        <input type='file' className={`uploadFileOfExpCert ${errors?.[`expCertFile.${index}`] ? 'invalid' : ''}`} {...register(`expCertFile.${index}`, { required: true })}
                            ref={(el) => fileInputRefs.current[`expCertFile.${index}`] = el}  // Assign ref dynamically 
                            onChange={(e) =>  handleFileForDocs(e, `expCertFile.${index}`) } />
                        {/* {customErrorForEmpHistoryDocUpload[`expCertFile[${index}]`] && (<div className="docErrorMessage">{customErrorForEmpHistoryDocUpload[`expCertFile[${index}]`]}</div>)} */}
                        <button type="button" className="uploadEmp" onClick={() => handleFileUpload(`expCertFile.${index}`)}>upload</button>
                        {successfulEmpHistoryFileUploadMsg[`expCertFile.${index}`] ? <div className="docUploadSuccessMessage">{successfulEmpHistoryFileUploadMsg[`expCertFile.${index}`]}</div> : ''}
                        {empHistoryDoc[`expCertFile.${index}`] && (<img src={require("assets/img/file-cut-icon.png")} alt="..." className='cross-icon' onClick={() => handleRemoveFile(`expCertFile.${index}`)} />)}
                    </div>
                    <div style={{ marginLeft: '-95px' }}>
                        <label className='relievingLabel'>Relieving Letter</label><span className='required'>*</span><span className='separatorForExpCert'>:</span>
                        <div className='emp-relieving-file-container'>
                            <input type='file' className={`uploadFileOfExpCert ${errors?.[`relievingLetterFile.${index}`] ? 'invalid' : ''}`} {...register(`relievingLetterFile.${index}`, { required: true })}
                                ref={(el) => fileInputRefs.current[`relievingLetterFile.${index}`] = el}  // Assign ref dynamically
                                onChange={(e) =>  handleFileForDocs(e, `relievingLetterFile.${index}`) } />
                            {/* {customErrorForEmpHistoryDocUpload[`relievingLetterFile[${index}]`] ? <div className="docErrorMessage">{customErrorForEmpHistoryDocUpload[`relievingLetterFile[${index}]`]}</div> : ''} */}
                            <button type="button" className="uploadEmp" onClick={() => handleFileUpload(`relievingLetterFile.${index}`)}>upload</button>
                            {successfulEmpHistoryFileUploadMsg[`relievingLetterFile.${index}`] ? <div className="docUploadSuccessMessage">{successfulEmpHistoryFileUploadMsg[`relievingLetterFile.${index}`]}</div> : ''}
                            {empHistoryDoc[`relievingLetterFile.${index}`] && (<img src={require("assets/img/file-cut-icon.png")} alt="..." className='cross-icon' onClick={() => handleRemoveFile(`relievingLetterFile.${index}`)} />)}
                        </div>
                    </div>
                </div>
                <div className='lastDocGrpContainer'>
                    <label>Last month Salary Slip</label><span className='required'>*</span><span className='separatorForExpCert'>:</span>
                    <div className='emp-file-container'>
                        <input type='file' className={`uploadFileOfExpCert ${errors?.[`lastSalarySlip.${index}`] ? 'invalid' : ''}`} {...register(`lastSalarySlip.${index}`, { required: true })}
                            ref={(el) => fileInputRefs.current[`lastSalarySlip.${index}`] = el}  // Assign ref dynamically
                            onChange={(e) =>  handleFileForDocs(e, `lastSalarySlip.${index}`) } />
                        {/* {customErrorForEmpHistoryDocUpload[`lastSalarySlip[${index}]`] ? <div className="docErrorMessage">{customErrorForEmpHistoryDocUpload[`lastSalarySlip[${index}]`]}</div> : ''} */}
                        <button type="button" className="uploadEmp" onClick={() => handleFileUpload(`lastSalarySlip.${index}`)}>upload</button>
                        {successfulEmpHistoryFileUploadMsg[`lastSalarySlip.${index}`] ? <div className="docUploadSuccessMessage">{successfulEmpHistoryFileUploadMsg[`lastSalarySlip.${index}`]}</div> : ''}
                        {empHistoryDoc[`lastSalarySlip.${index}`] && (<img src={require("assets/img/file-cut-icon.png")} alt="..." className='cross-icon' onClick={() => handleRemoveFile(`lastSalarySlip.${index}`)} />)}
                    </div>
                    <div style={{ marginLeft: '-95px' }}>
                        <label className='relievingLabel'>Appointment Letter</label><span className='required'>*</span><span style={{ margin: '21px' }}>:</span>
                        <div className='emp-relieving-file-container'>
                            <input type='file' className={`uploadFileOfExpCert ${errors?.[`offerLetter.${index}`] ? 'invalid' : ''}`} {...register(`offerLetter.${index}`, { required: true })}
                                ref={(el) => fileInputRefs.current[`offerLetter.${index}`] = el}  // Assign ref dynamically
                                onChange={(e) =>  handleFileForDocs(e, `offerLetter.${index}`) } />
                            {/* {customErrorForEmpHistoryDocUpload[`offerLetter[${index}]`] ? <div className="docErrorMessage">{customErrorForEmpHistoryDocUpload[`offerLetter[${index}]`]}</div> : ''} */}
                            <button type="button" className="uploadEmp" onClick={() => handleFileUpload(`offerLetter.${index}`)}>upload</button>
                            {successfulEmpHistoryFileUploadMsg[`offerLetter.${index}`] ? <div className="docUploadSuccessMessage">{successfulEmpHistoryFileUploadMsg[`offerLetter.${index}`]}</div> : ''}
                            {empHistoryDoc[`offerLetter.${index}`] && (<img src={require("assets/img/file-cut-icon.png")} alt="..." className='cross-icon' onClick={() => handleRemoveFile(`offerLetter.${index}`)} />)}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

