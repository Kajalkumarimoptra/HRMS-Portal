import React, { useState, useRef } from 'react';
import { useFormContext } from 'components/ContextProvider/Context';
import { useNavigate } from 'react-router-dom';

export default function EmploymentHistoryForm() {
    const navigate = useNavigate();
    const {
        register, handleSubmit, errors, onSubmit, index, clearErrors, setValue
    } = useFormContext();

    const [patternForPrevEmpName, setPatternForPrevEmpName] = useState(''); // pattern for previous employee name
    const [patternForPrevEmpTeleNo, setPatternForPrevEmpTeleNo] = useState(''); // pattern for previous employee telephone no.
    const [patternForPrevEmpDesg, setPatternForPrevEmpDesg] = useState(''); // pattern for previous employee Desg
    const [patternForPrevEmpDept, setPatternForPrevEmpDept] = useState(''); // pattern for previous employee Dept
    const [patternForPrevManagerName, setPatternForPrevManagerName] = useState(''); // pattern for previous employee's Manager Name
    const [patternForPrevManagerNo, setPatternForPrevManagerNo] = useState(''); // pattern for previous employee ManagerNo.
    const [customErrorForCheckbox, setCustomErrorForCheckbox] = useState(false);
    const [expCertDoc, setExpCertDoc] = useState(''); // state for holding experience certificate  file
    const [errorForExpCertFileSize, setErrorForExpCertFileSize] = useState(''); // error for wrong file size
    const [relievingLetterDoc, setRelievingLetterDoc] = useState(''); // state for holding relievin letter  file
    const [errorForRelievingLetterFileSize, setErrorForRelievingLetterFileSize] = useState(''); // error for wrong file size
    const [lastMonthSalarySlipDoc, setLastMonthSalarySlipDoc] = useState(''); // state for holding last month salary slip  file
    const [errorForLastMonthSalarySlipFileSize, setErrorForLastMonthSalarySlipFileSize] = useState(''); // error for wrong file size
    const [appointmentLetterDoc, setAppointmentLetterDoc] = useState(''); // state for holding appointment letter  file
    const [errorForAppointmentLetterFileSize, setErrorForAppointmentLetterFileSize] = useState(''); // error for wrong file size

    const fileRefs = useRef({
        expCertRef: null,
        relievingLetterRef: null,
        lastSalarySlipRef: null,
        offerLetterRef: null
    })

    const [pattern, setPattern] = useState({
        PrevEmpName: '',
        telephoneNo: '',
        designation: '',
        department: '',
        managerName: '',
        managerContactNo: ''
    }); // state for overall handling of pattern
    const [customErrorForPattern, setCustomErrorForPattern] = useState({
        PrevEmpName: '',
        telephoneNo: '',
        designation: '',
        department: '',
        managerName: '',
        managerContactNo: ''
    }); // error msg for its failure

    const [doc, setDoc] = useState({
        expCertFile: '',
        relievingLetterFile: '',
        lastSalarySlip: '',
        offerLetter: ''
    }) // state for overall handling of documents validation
    // const [fileUploadedLocal, setFileUploadedLocal] = useState({
    //     expCertFile: false,
    //     relievingLetterFile: false,
    //     lastSalarySlip: false,
    //     offerLetter: false
    // }); // Tracks if files have been uploaded
    const [customErrorForDoc, setCustomErrorForDoc] = useState({
        expCertFile: '',
        relievingLetterFile: '',
        lastSalarySlip: '',
        offerLetter: ''
    }) // error msg for its failure
    // const [customErrorForDocUpload, setCustomErrorForDocUpload] = useState({
    //     expCertFile: '',
    //     relievingLetterFile: '',
    //     lastSalarySlip: '',
    //     offerLetter: ''
    //   }); // error msg on not uploading the file
    const [successfulUploadMsg, setSuccessfulUploadMsg] = useState({
        expCertFile: '',
        relievingLetterFile: '',
        lastSalarySlip: '',
        offerLetter: ''
    }); // state for displaying successful upload msg

    // pattern failure validation 
    const handlePatternForPrevEmp = (e, pattern, field) => {
        const value = e.target.value;
        setPattern(prev => ({ ...prev, [field]: value }))
        if (field === 'PrevEmpName') setPatternForPrevEmpName(value);
        if (field === 'telephoneNo') setPatternForPrevEmpTeleNo(value);
        if (field === 'designation') setPatternForPrevEmpDesg(value);
        if (field === 'department') setPatternForPrevEmpDept(value);
        if (field === 'managerName') setPatternForPrevManagerName(value);
        if (field === 'managerContactNo') setPatternForPrevManagerNo(value);
        let patternErrorMessage = '';
        if ((field === 'PrevEmpName' || field === 'managerName') && value && !pattern.test(value)) {
            patternErrorMessage = 'No numbers or special characters are allowed';
        }
        else if (field === 'telephoneNo' || field === 'managerContactNo') {
            if (value && !pattern.test(value)) {
                patternErrorMessage = 'Only numbers are allowed';
            } else if (value.length !== 10) {
                patternErrorMessage = 'Contact No. must be of 10 digits';
            }
        }
        else if (field === 'designation' || field === 'department') {
            if (value && !pattern.test(value)) {
                patternErrorMessage = 'Please write as per the correct format';
            }
        }
        setCustomErrorForPattern(prev => ({ ...prev, [field]: patternErrorMessage }));
        if (patternErrorMessage === '') {
            clearErrors(field);
        }
    }

    // const dispatch = useDispatch();
    // file type for certificates upload
    const handleFileForDocs = (e, field) => {
        const file = e.target.files[0]; // Get the first file from the input
        console.log('Selected file:', file); // Log the selected file
        if (file) {
            const fileType = file.type;
            const allowedFileTypes = ["application/pdf"];  // file type allowed
            if (!allowedFileTypes.includes(fileType)) {
                window.alert("Only PDF files are supported");
                fileRefs.current[field].value = ''; // Use ref to clear the input field
                // dispatch(setFileUploaded({ field, value: false })); // Mark the file as not uploaded on invalid file type
                return;
            }
            const fileSize = file.size;
            if (fileSize / 1024 > 20) {
                setCustomErrorForDoc(prev => ({ ...prev, [field]: "File should be less than or upto 20kb" }));  // file size validation
                fileRefs.current[field].value = '';
                // dispatch(setFileUploaded({ field, value: false })); // Mark the file as not uploaded on invalid file type
                return;
            }
            // Clear previous file and upload state if a new file is selected
            setDoc(prev => ({ ...prev, [field]: file })) // set all the files in their state
            console.log('document saved:', doc[field])
            setCustomErrorForDoc(prev => ({ ...prev, [field]: '' }));
            // dispatch(setFileUploaded({ field, value: false })); // Mark the new file as not uploaded until being uploaded
            setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' }));
        }
        else {
            // Reset file and errors if no file selected
            setDoc(prev => ({ ...prev, [field]: null }));
            // dispatch(setFileUploaded({ field, value: false }));
            setCustomErrorForDoc(prev => ({ ...prev, [field]: '' }));
            setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' }));
        }
    }

    // const { customErrorForDocUpload } = useSelector((state) => {
    //     console.log('Current file upload state:', state.fileUpload); // Log the current Redux state
    //     return state.fileUpload;
    // })
    // console.log('setCustomErrorForDocUpload function:', setCustomErrorForDocUpload); // Check if it's defined
    const handleFileUpload = (field) => {
        if (doc[field]) {
            setValue(field, doc[field]); // Manually set the file in React Hook Form on upload button click
            // dispatch(setFileUploaded({ field: field, value: true })); // Dispatch Redux action to mark file as uploaded
            setSuccessfulUploadMsg(prev => ({ ...prev, [field]: 'Uploaded successfully' }));
            // dispatch(setCustomErrorForDocUpload({ [field]: '' })); // Clear any previous error messages
        }
        else {
           
            // Dispatch error if file not uploaded
            setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' }));
        }
    };

    const numberToWords = (num) => {
        const words = ['first', 'second', 'third'];
        return words[num - 1] || num;
    }
    const wordIndex = numberToWords(index + 1); // for converting no. to words

    return (
        <div className='empHistoryContainer' key={index}>
            <div>
                <div className='empHistoryDetailHeading'> <h6 className='educationalHeadline'>EMPLOYMENT HISTORY-</h6><span><p className='educationalNote'>
                    Previous {wordIndex} employment history</p></span> </div>
            </div>
            {/* employment history form */}
            <form onSubmit={handleSubmit(onSubmit)} className='empHistoryForm'>
                <div className='PrevEmpNameContainer'>
                    <label>Previous Employer Name <span className='required'>*</span> <span className='separatorForPrevEmpName'>:</span></label>
                    <input type='text' placeholder='Previous Employer Name' className={`PrevEmpNameInput ${errors.PrevEmpName ? 'invalid' : ''}`} {...register("PrevEmpName", { required: true, maxLength: 50 })}
                        value={pattern.PrevEmpName} onChange={(e) => handlePatternForPrevEmp(e, /^[A-Za-z\s]+$/, 'PrevEmpName')} />
                    {customErrorForPattern.PrevEmpName ? <div className='empErrorMessage'>{customErrorForPattern.PrevEmpName}</div> : ''}
                </div>
                <div className='PrevEmpNameContainer'>
                    <label>Address <span className='required'>*</span> <span className='separatorForPrevEmpAddress'>:</span></label>
                    <input type='text' placeholder='Previous Employer Address' className={`PrevEmpAddressInput ${errors.PrevEmpAddress ? 'invalid' : ''}`} {...register("PrevEmpAddress", { required: true, maxLength: 100 })} />
                </div>
                <div className='noCodeContainer'>
                    <div>
                        <label>Telephone No. <span className='required'>*</span> <span className='separationForTelephone'> : </span></label>
                        <input type='telephone' placeholder='Mobile No.' className={`teleInput ${errors.telephoneNo ? 'invalid' : ''}`}  {...register("telephoneNo", { required: true })}
                            value={pattern.telephoneNo} onChange={(e) => handlePatternForPrevEmp(e, /^[0-9]+$/, 'telephoneNo')} />
                        {customErrorForPattern.telephoneNo ? <div className='empErrorMessage'>{customErrorForPattern.telephoneNo}</div> : ''}
                    </div>
                    <div className='codeContainer'>
                        <label>Employee Code <span className='required'>*</span> <span className='separationForEmpCode'> : </span></label>
                        <input type='text' placeholder='Employee Code' className={`empCodeInput ${errors.employeeCode ? 'invalid' : ''} `}  {...register("employeeCode", { required: true })} />
                    </div>
                </div>
                <div className='noCodeContainer'>
                    <div>
                        <label>Designation<span className='required'>*</span> <span className='separationForDesg'> : </span></label>
                        <input type='text' placeholder='Designation' className={`desgInput ${errors.designation ? 'invalid' : ''} `} {...register("designation", { required: true, maxLength: 50 })}
                            value={pattern.designation} onChange={(e) => handlePatternForPrevEmp(e, /^[A-Za-z0-9-\s]+$/, 'designation')} />
                        {customErrorForPattern.designation ? <div className='empErrorMessage'>{customErrorForPattern.designation}</div> : ''}
                    </div>
                    <div className='codeContainer'>
                        <label>Department <span className='required'>*</span> <span className='separationForDept'> : </span></label>
                        <input type='text' placeholder='Department' className={`deptInput ${errors.department ? 'invalid' : ''}`} {...register("department", { required: true, maxLength: 50 })}
                            value={pattern.department} onChange={(e) => handlePatternForPrevEmp(e, /^[A-Za-z0-9-\s]+$/, 'department')} />
                        {customErrorForPattern.department ? <div className='empHistoryErrorMessage'>{customErrorForPattern.department}</div> : ''}
                    </div>
                </div>
                <div className='noCodeContainer'>
                    <div>
                        <label>Manager's Name <span className='required'>*</span> <span className='separationForManagerName'> : </span></label>
                        <input type='text' placeholder='Manager Name' className={`managerNameInput ${errors.managerName ? 'invalid' : ''}`} {...register("managerName", { required: true, maxLength: 50 })}
                            value={pattern.managerName} onChange={(e) => handlePatternForPrevEmp(e, /^[A-Za-z\s]+$/, 'managerName')} />
                        {customErrorForPattern.managerName ? <div className='empErrorMessage'>{customErrorForPattern.managerName}</div> : ''}
                    </div>
                    <div className='codeContainer'>
                        <label>Manager's Contact No. <span className='required'>*</span> <span className='separationForManagerNo'> : </span></label>
                        <input type='telephone' placeholder='Contact No.' className={`managerContactInput ${errors.managerContactNo ? 'invalid' : ''}`}  {...register("managerContactNo", { required: true })}
                            value={pattern.managerContactNo} onChange={(e) => handlePatternForPrevEmp(e, /^[0-9]+$/, 'managerContactNo')} />
                        {customErrorForPattern.managerContactNo ? <div className='empHistoryErrorMessage'>{customErrorForPattern.managerContactNo}</div> : ''}
                    </div>
                </div>
                <div className='PrevEmpNameContainer'>
                    <label>Manager's Email ID <span className='required'>*</span> <span className='separatorForManagerEmail'>:</span></label>
                    <input type='text' placeholder='Email ID' className={`managerEmailInput ${errors.managerEmailId ? 'invalid' : ''}`} {...register("managerEmailId", { required: true })} />
                </div>
                <div className='PrevEmpNameContainer'>
                    <label>Reasons for Leaving <span className='required'>*</span> <span className='separatorForLeaveReason'>:</span></label>
                    <input type='text' placeholder='Leaving Reason' className={`leaveReasonInput  ${errors.leaveReason ? 'invalid' : ''}`} {...register("leaveReason", { required: true, maxLength: 100 })} />
                </div>
                <div className='PrevEmpFromToContainer'>
                    <label>Employment Period <span className='required'>*</span> <span className='separatorForStayEmpFrom'>:</span></label>
                    <div>
                        <label>From <span className='required'>*</span> </label>
                        <input type='date' placeholder='Select Date' className={`empFromInput ${errors.empPeriodFrom ? 'invalid' : ''}`} {...register("empPeriodFrom", { required: true })} />
                    </div>
                    <div className='empToContainer'>
                        <label className='empToLabel'>To<span className='required'>*</span> </label>
                        <input type='date' placeholder='Select Date' className={`empToInput ${errors.empPeriodTo ? 'invalid' : ''}`} {...register("empPeriodTo", { required: true })} />
                    </div>
                </div>
                <div className='PrevEmpNameContainer'>
                    <label>Was this Position? <span className='required'>*</span> </label><span className='separatorForPosition'>:</span>
                    Permanent<input type='radio' name="position" className='radioCheck'  {...register("position", { required: true })} value="permanent" />
                    Temporary<input type='radio' name="position" className='radioCheck'  {...register("position", { required: true })} value="temporary" />
                    Contractual<input type='radio' name="position" className='radioCheck' {...register("position", { required: true })} value="contractual" />
                </div>
                {errors.position && <div className='errorMessage'>Please select the position type</div>}
                <div>
                    <h6 className='prevDoc'>Please submit a scan copy of your previous relevant documents-</h6>
                </div>
                <div className='docGrpContainer'>
                    <div>
                        <label>Experience Certificate</label><span className='required'>*</span><span className='separatorForExpCert'>:</span>
                        <input type='file' className={`uploadFileOfExpCert ${errors.expCertFile ? 'invalid' : ''}`} {...register("expCertFile", { required: true })}
                            ref={(el) => (fileRefs.current.expCertRef = el)} // store DOM reference for direct access
                            onChange={(e) => handleFileForDocs(e, "expCertFile")} />
                        {customErrorForDoc.expCertFile && (<div className="docErrorMessage">{customErrorForDoc.expCertFile}</div>)}
                        <div className='expCertErrorMessage'>{errorForExpCertFileSize}</div>
                        <button type="button" className="uploadEmp" onClick={() => handleFileUpload('expCertFile')}>upload</button>
                        {customErrorForDocUpload.expCertFile ? <div className="docUploadErrorMessage">{customErrorForDocUpload.expCertFile}</div> : ''}
                        {successfulUploadMsg.expCertFile ? <div className="docUploadSuccessMessage">{successfulUploadMsg.expCertFile}</div> : ''}
                    </div>
                    <div>
                        <label className='relievingLabel'>Relieving Letter</label><span className='required'>*</span><span className='separatorForRelievingLetter'>:</span>
                        <input type='file' className={`uploadFileOfRelievingLetter ${errors.relievingLetterFile ? 'invalid' : ''}`} {...register("relievingLetterFile", { required: true })}
                            ref={(el) => (fileRefs.current.relievingLetterRef = el)} onChange={(e) => handleFileForDocs(e, "relievingLetterFile")} />
                        {customErrorForDoc.relievingLetterFile ? <div className="docErrorMessage">{customErrorForDoc.relievingLetterFile}</div> : ''}
                        <div className='relievingLetterErrorMessage'>{errorForRelievingLetterFileSize}</div>
                        <button type="button" className="uploadEmp" onClick={() => handleFileUpload('relievingLetterFile')}>upload</button>
                        {customErrorForDocUpload.relievingLetterFile ? <div className="docUploadErrorMessage">{customErrorForDocUpload.relievingLetterFile}</div> : ''}
                        {successfulUploadMsg.relievingLetterFile ? <div className="docUploadSuccessMessage">{successfulUploadMsg.relievingLetterFile}</div> : ''}
                    </div>
                </div>
                <div className='docGrpContainer'>
                    <div>
                        <label>Last month Salary Slip</label><span className='required'>*</span><span className='separatorForSalarySlip'>:</span>
                        <input type='file' className={`uploadFileOfExpCert ${errors.lastSalarySlip ? 'invalid' : ''}`} {...register("lastSalarySlip", { required: true })}
                            ref={(el) => (fileRefs.current.lastSalarySlipRef = el)} onChange={(e) => handleFileForDocs(e, "lastSalarySlip")} />
                        {customErrorForDoc.lastSalarySlip ? <div className="docErrorMessage">{customErrorForDoc.lastSalarySlip}</div> : ''}
                        <div className='lastMonthSalarySlipErrorMessage'>{errorForLastMonthSalarySlipFileSize}</div>
                        <button type="button" className="uploadEmp" onClick={() => handleFileUpload('lastSalarySlip')}>upload</button>
                        {customErrorForDocUpload.lastSalarySlip ? <div className="docUploadErrorMessage">{customErrorForDocUpload.lastSalarySlip}</div> : ''}
                        {successfulUploadMsg.lastSalarySlip ? <div className="docUploadSuccessMessage">{successfulUploadMsg.lastSalarySlip}</div> : ''}
                    </div>
                    <div>
                        <label className='relievingLabel'>Appointment Letter</label><span className='required'>*</span><span className='separatorForOfferLetter'>:</span>
                        <input type='file' className={`uploadFileOfRelievingLetter ${errors.offerLetter ? 'invalid' : ''}`} {...register("offerLetter", { required: true })}
                            ref={(el) => (fileRefs.current.relievingLetterRef = el)} onChange={(e) => handleFileForDocs(e, "offerLetter")} />
                        {customErrorForDoc.offerLetter ? <div className="docErrorMessage">{customErrorForDoc.offerLetter}</div> : ''}
                        <div className='appointmentLetterErrorMessage'>{errorForAppointmentLetterFileSize}</div>
                        <button type="button" className="uploadEmp" onClick={() => handleFileUpload('offerLetter')}>upload</button>
                        {customErrorForDocUpload.offerLetter ? <div className="docUploadErrorMessage">{customErrorForDocUpload.offerLetter}</div> : ''}
                        {successfulUploadMsg.offerLetter ? <div className="docUploadSuccessMessage">{successfulUploadMsg.offerLetter}</div> : ''}
                    </div>
                </div>
            </form>
        </div>
    )
}

