import React, { useState, useEffect, useContext, useRef } from 'react';
import EmploymentHistoryForm from './EmploymentHistoryForm';
import Navbar from './Navbar';
import { useFormContext } from 'components/ContextProvider/Context';
import { useRegistrationContext } from 'components/ContextProvider/RegistrationDataContext';
import { useAddressHistoryContext } from 'components/ContextProvider/AddressHistoryContext.js';
import { EmploymentHistoryContext } from 'components/ContextProvider/EmploymentHistoryContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReusableProgessBar from 'layouts/ReusableProgessBar';
import DatePicker from 'react-datepicker';

export default function EducationalDetailsForm() {

    const { employmentHistoryDetails } = useContext(EmploymentHistoryContext);

    const navigate = useNavigate();
    const {
        register, handleSubmit, errors, onSubmit, watch, setValue, reset, clearErrors, showAddBtn, setShowAddBtn, showMinusBtn, setShowMinusBtn, getValues, trigger
    } = useFormContext();
    const { registrationData } = useRegistrationContext();  // Access registration data from context
    const { addressHistoryDetails, rowsOfAddressHistory } = useAddressHistoryContext();
    const [expYr, setExpYr] = useState(''); // for storing no. of exp. in yrs
    const [showEmpHistory, setEmpHistory] = useState([]); // shows emp history in array as much required
    const [selectedDegree, setSelectedDegree] = useState(""); // state for holding degree name
    const [nestedOptions, setNestedOptions] = useState([]); // state for taking values from object 'educationOptions'
    const [selectedCertificate, setSelectedCertificate] = useState({}); // to keep track of the selected certificate
    const [optionSelected, setOptionSelected] = useState(false); // State to track if an option is selected
    const [degreeNames, setDegreeNames] = useState([]); // initialize the state to track all the degree names invaid input in array
    const [collegeNames, setCollegeNames] = useState([]);
    const [collegeLocation, setCollegeLocation] = useState([]);
    const [subjects, setSubjects] = useState([]); // initialize the state to track all the subjects invaid input in array
    const [degreeStartDuration, setdegreeStartDuration] = useState([]); // initialize the state to track all the passing year invaid input in array
    const [degreeEndDuration, setdegreeEndDuration] = useState([]);
    const [rollNo, setRollNo] = useState([]); // initialize the state to track all the roll no. invaid input in array
    const [grade, setGrade] = useState([]); // initialize the state to track all the grade invaid input in array
    const [eduDocs, setEduDocs] = useState([]);
    const [isValid, setIsValid] = useState(true); // To track whether input is valid for length validation
    const [eduRows, setEduRows] = useState([{}, {}, {}, {}]); // 4 default rows in table
    const educationalDatePickerRef = useRef([]);
    const [educationalDateRanges, seteducationalDateRanges] = useState([
        [null, null],
        [null, null],
        [null, null],
        [null, null],
    ]);

    const [educationalDegreeDoc, setEducationalDegreeDoc] = useState({}); // state for holding degree document file
    const [educationalFileUploaded, setEducationalFileUploaded] = useState({}); // Tracks if files have been uploaded
    const fileInputRefs = useRef({});
    const [inputKeys, setInputKeys] = useState({});
    const [year, setYear] = useState(0);
    const empHistoryDatePickerRef = useRef([]);
    const [empHistoryDateRanges, setempHistoryDateRanges] = useState([
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null]
    ]);

    // to render attachment section
    const educationOptions = {     // options of degree which contains options for certificates
        Highschool: ['Degree Certificate', 'Passing Certificate'],
        Intermediate: ['Degree Certificate', 'Passing Certificate'],
        Graduation: ['Degree Certificate', 'Final Year Marksheet'],
        PostGraduation: ['Degree Certificate', 'Final Year Marksheet'],
        others: ['Degree Certificate', 'Final Year Marksheet']
    };

    const changeSelectOptionHandler = (event) => {
        const value = event.target.value;
        setSelectedDegree(value);
        const options = educationOptions[value] || []; // to show certificates list or nothing
        setNestedOptions(options);
        setSelectedCertificate((prev) => ({
            ...prev,
            [value]: prev[value] || []
        })); // to reset the input type file for certificates
        setOptionSelected(true); // Set option selected state to true when an option is selected

    };

    const changeNestedOptionHandler = (e) => {
        const { value, checked } = e.target;
        setSelectedCertificate((prev) => {
            const prevForDegree = prev[selectedDegree] || [];
            const updatedForDegree = checked
                ? [...prevForDegree, value]
                : prevForDegree.filter(cert => cert !== value);
            return { ...prev, [selectedDegree]: updatedForDegree };
        });
    };

    const addTableForNextEducationDetail = () => {
        if (eduRows.length < 5) { // Allow adding only up to 5 rows total (3 default + 2 added)
            const newRows = [...eduRows, {}]; // Add one more row
            setEduRows(newRows);

            // Manage button visibility
            if (newRows.length === 5) {
                setShowAddBtn(false);  // Hide "Add Row" button when there are exactly 5 rows
                setShowMinusBtn(true); // Show "Remove Row" button when there are exactly 5 rows
            } else {
                setShowAddBtn(true); // Show "Add Row" button if there are less than 5 rows
                setShowMinusBtn(false); // Hide "Remove Row" button until 5 rows are reached
            }
        }
    };

    const removeTableForNextEducationDetail = () => {
        if (eduRows.length > 3) { // Allow removing only if there are more than 3 rows
            const newRows = eduRows.slice(0, -1); // Remove one row
            setEduRows(newRows);

            // Manage button visibility
            if (newRows.length < 5) {
                setShowAddBtn(true); // Show "Add Row" button again when there are fewer than 5 rows
            }

            if (newRows.length === 3) {
                setShowMinusBtn(false); // Hide "Remove Row" button when only 3 rows remain
            } else {
                setShowMinusBtn(true); // Keep "Remove Row" button visible when more than 3 rows
                setShowAddBtn(false);
            }
        }
    };

    useEffect(() => {
        setValue('yrOfExp', year); // update form state
        const count = Math.min(5, Math.max(0, year));
        setEmpHistory(Array.from({ length: count }, () => ({})));
    }, [year, setValue]);

    // const yrOfExp = watch("yrOfExp", "");  // to monitor changes in the yrOfExp field.
    // const setExp = (e) => {
    //     const value = e.target.value;
    //     setValue('yrOfExp', year);  // Update the form state with the selected value
    //     setExpYr(value);
    // };
    // useEffect(() => {  // for showing emp history component as many times as the no. of exp. in yrs given
    //     if (yrOfExp <= 5) {
    //         setEmpHistory(Array.from({ length: yrOfExp }, () => ({})));
    //     } else if (yrOfExp > 5) {
    //         setEmpHistory(Array.from({ length: 5 }, () => ({})));
    //     } else {
    //         setEmpHistory([]);
    //     }
    // }, [yrOfExp]);

    // file type for degree document upload
    const handleFileForEduDocs = (e, field, index) => {
        const file = e.target.files[0]; // Get the first file from the input
        const dynamicField = `${field}_${index}`;
        console.log(`Selected file for ${dynamicField}:`, file);
        // Clear error messages immediately upon file selection
        setEducationalFileUploaded(prev => ({ ...prev, [dynamicField]: false })); // Reset file uploaded state

        if (file) {
            const fileType = file.type;
            const allowedFileTypes = ["application/pdf"];  // file type allowed
            if (!allowedFileTypes.includes(fileType)) {
                window.alert("Only PDF files are supported");
                e.target.value = ''; // Reset the input field
                return;
            }
            const fileSize = file.size;
            if (fileSize / 1024 > 20) {
                window.alert("File Size should be less than or upto 20kb"); // file size validation
                e.target.value = '';
                return;
            }
            setEducationalDegreeDoc(prev => ({
                ...prev,
                [dynamicField]: { file },
            }));

            // ✅ Now call upload AFTER setting state
            setTimeout(() => {
                handleFileUpload(dynamicField, file); // Pass file directly
            }, 0); // Defer until after state updates
        }
    }

    // handle file upload
    const handleFileUpload = async (field, file) => {
        console.log("Field passed to handleFileUpload:", field);
        console.log(file);
        if (!file) {
            console.log(`No file found for ${field}, setting error`);
            alert('Please select a file to upload');
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

            if (response.data.data?.url) {
                const fileUrl = response.data.data.url; // Extract the file URL from the respons
                console.log(`File uploaded successfully for ${field}:`, fileUrl);
                setEducationalDegreeDoc(prev => ({
                    ...prev,
                    [field]: {
                        ...prev[field],
                        url: fileUrl // attach the uploaded file URL
                    }
                }));
                setEducationalFileUploaded(prev => ({ ...prev, [field]: true }));
                alert('Uploaded successfully');
                setValue(field, fileUrl, { shouldValidate: true });
                console.log(`✅ After setValue -> ${field}:`, getValues(field));
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
                    alert('This file is already uploaded');
                    setEducationalFileUploaded(prev => ({ ...prev, [field]: false }));
                    return;
                } else {
                    console.log('common error:', errorMessage);
                    alert('Upload failed, Please try again');
                    setEducationalFileUploaded(prev => ({ ...prev, [field]: false }));
                }
            }
            else {
                // Handle generic errors
                alert('Upload failed, Please try again');
                setEducationalFileUploaded(prev => ({ ...prev, [field]: false }));
            }
        }
    };

    const handleRemoveFile = (field) => {
        setEducationalDegreeDoc(prev => ({ ...prev, [field]: null }));
        setEducationalFileUploaded(prev => ({ ...prev, [field]: false }));


        // Reset the input field visually by updating its key
        setInputKeys(prev => ({
            ...prev,
            [field]: (prev[field] || 0) + 1, // increment key to force re-render
        }));
    };

    // for pattern validation of educational document inputs
    const handlePatternChangeForEduDoc = (index, pattern, field, e) => {
        const value = e.target.value;

        if (field.includes('DegreeName')) {
            // Create a copy of the degree names array to update the specific index
            const newDegreeNames = [...degreeNames]; // to ensure that the original state is not mutated

            // Validate the input value
            if (value && !pattern.test(value)) {
                console.log(`${field} is invalid at index ${index}`); // Log if the value is invalid
                alert('No numbers or special characters are allowed');
                // Update only the part that is invalid
                const validValue = value.slice(0, -1); // Removing the last entered invalid character
                newDegreeNames[index] = validValue; // Set the value minus the invalid character
                setDegreeNames(newDegreeNames);
                return;
            }
            newDegreeNames[index] = value; // Updates the copied array at the specified index with the new value
            setDegreeNames(newDegreeNames);
        }
        else if (field.includes('DegreeSubject')) {
            const newSubjects = [...subjects];

            if (value && !pattern.test(value)) {
                alert('No special characters are allowed');
                const validValue = value.slice(0, -1);
                newSubjects[index] = validValue;
                setSubjects(newSubjects);
                return;
            }
            newSubjects[index] = value;
            setSubjects(newSubjects);
        }
        else if (field.includes('CollegeName')) {
            const newCollegeNames = [...collegeNames];

            if (value && !pattern.test(value)) {
                alert('No special characters are allowed');
                const validValue = value.slice(0, -1);
                newCollegeNames[index] = validValue;
                setCollegeNames(newCollegeNames);
                return;
            }
            newCollegeNames[index] = value;
            setCollegeNames(newCollegeNames);
        }
        else if (field.includes('collegeLocation')) {
            const newCollegeLocation = [...collegeLocation];

            if (value && !pattern.test(value)) {
                alert('No special characters are allowed');
                const validValue = value.slice(0, -1);
                newCollegeLocation[index] = validValue;
                setCollegeLocation(newCollegeLocation);
                return;
            }
            newCollegeLocation[index] = value;
            setCollegeLocation(newCollegeLocation);
        }
        // else if (field.includes('DegreePassingYr')) {
        //     const newPassingYr = [...passingYr];
        //     // Restrict to 4 digits by slicing the value
        //     let validValue = value.slice(0, 4);

        //     if (validValue && !pattern.test(validValue)) {
        //         alert('No alphabets or special characters are allowed');
        //         validValue = validValue.slice(0, -1); // Remove the last invalid character
        //         newPassingYr[index] = validValue;
        //         setPassingYr(newPassingYr);
        //         setIsValid(false);
        //         return;
        //     }

        //     newPassingYr[index] = validValue;
        //     setPassingYr(newPassingYr);
        //     setIsValid(true);
        // }
        else if (field.includes('DegreeRollNo')) {
            const newRollNo = [...rollNo];

            if (value && !pattern.test(value)) {
                alert('No special characters are allowed');
                const validValue = value.slice(0, -1);
                newRollNo[index] = validValue;
                setRollNo(newRollNo);
                return;
            }
            newRollNo[index] = value;
            setRollNo(newRollNo);
        }
        else if (field.includes('DegreeGrade')) {
            const newGrade = [...grade];

            if (value && !pattern.test(value)) {
                alert('No special characters are allowed');
                const validValue = value.slice(0, -1);
                newGrade[index] = validValue;
                setGrade(newGrade);
                return;
            }
            newGrade[index] = value;
            setGrade(newGrade);
        }
    }

    // for backward navigation
    const backToContactPage = () => {
        navigate("/contactdetailsform");
    }

    useEffect(() => {
        console.log("Validation Errors:", errors);
    }, [errors]);

    // for handle submit
    const handleFormSubmit = async (data) => {
        console.log("Submitted data:", data);
        console.log("Errors during submission:", errors);
        if (Object.keys(errors).length > 0) {
            console.error("Form has errors:", errors);
            return;
        }

        // Dynamically extract educational qualifications from the form data
        const educationalQualifications = eduRows.map((_, index) => ({
            "degreeName": data[`higherDegreeName_${index}`] || "",
            "subject": data[`higherDegreeSubject_${index}`] || "",
            "passingYear": data[`higherDegreePassingYr_${index}`] || "",
            "rollNumber": data[`higherDegreeRollNo_${index}`] || "",
            "gradeOrPercentage": data[`higherDegreeGrade_${index}`] || ""
        }));

        // Dynamically generate the documents array from form data
        console.log("Raw form data keys (for docs):", Object.keys(data));
        console.log("Raw form data values:", data);

        const documents = Object.keys(data)
            .filter(key => key.endsWith("Doc")) // Filter keys that represent documents
            .reduce((acc, key) => {
                const documentType = key.split("-")[0].toUpperCase(); // Extract and format the degree name as the document type

                const keyNormalized = key.replace(/\s/g, "").toLowerCase(); // remove spaces and lower case
                const isDegreeCertificate = keyNormalized.includes("degreecertificate");
                const isPassingCertificate = keyNormalized.includes("passingcertificate") || keyNormalized.includes("finalyearmarksheet");

                const existingDocument = acc.find(doc => doc.documentType === documentType);

                if (existingDocument) {
                    if (isDegreeCertificate) {
                        existingDocument.degreeCertificate = true;
                        existingDocument.degreeCertificateUrl = data[key] || "";
                    } else if (isPassingCertificate) {
                        existingDocument.passingCertificate = true;
                        existingDocument.passingCertificateUrl = data[key] || "";
                    }
                } else {
                    const newDocument = {
                        documentType: documentType,
                        degreeCertificate: isDegreeCertificate,
                        degreeCertificateUrl: isDegreeCertificate ? data[key] || "" : "",
                        passingCertificate: isPassingCertificate,
                        passingCertificateUrl: isPassingCertificate ? data[key] || "" : ""
                    };
                    acc.push(newDocument);
                }

                return acc;
            }, []);

        console.log("Generated Documents Array:", documents);


        const employmentHistories = Object.keys(employmentHistoryDetails.PrevEmpName || {}).map((index) => ({
            "previousEmployerName": employmentHistoryDetails.PrevEmpName?.[index] || "",
            "employerAddress": employmentHistoryDetails.PrevEmpAddress?.[index] || "",
            "telephoneNumber": employmentHistoryDetails.telephoneNo?.[index] || "",
            "employeeCode": employmentHistoryDetails.employeeCode?.[index] || "",
            "designation": employmentHistoryDetails.designation?.[index] || "",
            "department": employmentHistoryDetails.department?.[index] || "",
            "managerName": employmentHistoryDetails.managerName?.[index] || "",
            "managerContactNo": employmentHistoryDetails.managerContactNo?.[index] || "",
            "managerEmail": employmentHistoryDetails.managerEmailId?.[index] || "",
            "reasonsForLeaving": employmentHistoryDetails.leaveReason?.[index] || "",
            "employmentStartDate": employmentHistoryDetails.empPeriodFrom?.[index] || "",
            "employmentEndDate": employmentHistoryDetails.empPeriodTo?.[index] || "",
            "employmentType": employmentHistoryDetails.position?.[index] || "",
            "experienceCertificateUrl": employmentHistoryDetails.expCertFile?.[index] || "",
            "relievingLetterUrl": employmentHistoryDetails.relievingLetterFile?.[index] || "",
            "lastMonthSalarySlipUrl": employmentHistoryDetails.lastSalarySlip?.[index] || "",
            "appointmentLetterUrl": employmentHistoryDetails.offerLetter?.[index] || "",
        }));

        const newPayload = {
            "primaryId": registrationData.primaryId || "",
            "educationalQualifications": educationalQualifications,
            "documents": documents,
            "employmentHistories": employmentHistories
        }
        console.log("Payload of educational page :", newPayload);

        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('tokenForFormsValidation');
            console.log('token needed:', token);
            if (!token) {
                setServerError('Authentication issue');
                return; // Exit if token is not found
            }

            const response = await axios.post('http://localhost:8081/primary/createEducational', newPayload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response && response.data) {
                console.log("Form submitted successfully:", response.data);
                sessionStorage.setItem('educationalDetails', JSON.stringify(response.data));
                sessionStorage.setItem('newPayload', JSON.stringify(newPayload));
                navigate("/professionalrefform");
                reset();
            } else {
                console.error("Error submitting form:", response);
                console.error("Error submitting form. Status:", response.status);
                console.error("Error details:", response.data);
            }
        } catch (error) {
            if (error.response) {
                console.error("Error response:", error.response);
                console.error("Response status:", error.response.status);
                console.error("Response data:", error.response.data);
            } else if (error.request) {
                console.error("Error request:", error.request);
            } else {
                console.error("General error:", error.message);
            }
        }
    };

    // for saving filled data in local storage
    const saveInLocalStorage = () => {
        const data = watch();
        localStorage.setItem('data', JSON.stringify(data))
        console.log('saved educational details data:', data);
    }

    useEffect(() => {
        educationalDatePickerRef.current = eduRows.map(
            (el, index) => educationalDatePickerRef.current[index] || React.createRef()
        );
    }, [eduRows]);

    useEffect(() => {
        // Initialize or resize refs
        empHistoryDatePickerRef.current = Array.from({ length: year }, (_, i) =>
            empHistoryDatePickerRef.current[i] || React.createRef()
        );

        // Initialize or resize date ranges
        setempHistoryDateRanges((prev) => {
            const updated = [...prev];
            while (updated.length < year) updated.push([null, null]);
            return updated.slice(0, year);
        });
    }, [year]);

    return (
        <div className='container-fluid form-navbar'>
            <Navbar />
            <div className='personaldetail-form'>
                <ReusableProgessBar>
                    {/* <div className='UniversalHeadline'>
                    <h6 className='mainHeading'>PRE-ONBOARDING FORM</h6>
                </div> */}
                    {/* <div className='noteHeading'>
                    <h5 className='noteContent'>Note:<span className='noteDescription'>Please update all cells with correct and relevant data. The information provided in this document
                        will form part of your official records in the Company<br /> and is subjected to verification.</span></h5>
                </div> */}
                    {/* educational detail */}
                    <div className='personalDetailForm'>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className='edu-form-container'>
                            <div>
                                <div className='personalDetailHeading'> <h6 className='educationalHeadline'>EDUCATIONAL QUALIFICATION <span className='required'>*</span></h6></div>
                            </div>
                            {/* table content */}
                            <table className='table tableWidth table-bordered'>
                                <thead>
                                    <tr>
                                        <th scope="col" className='tableHead' >S.No.</th>
                                        <th scope="col" className='tableHead'>Degree / Qualification Name</th>
                                        <th scope="col" className='tableHead'>College / Institute Name</th>
                                        <th scope="col" className='tableHead'>Location</th>
                                        <th scope="col" className='tableHead'>Field Of Study</th>
                                        <th scope="col" className='tableHead'>Duration</th>
                                        <th scope="col" className='tableHead'>Roll Number </th>
                                        <th scope="col" className='tableHead'>Grade / Cgpa</th>
                                        <th scope="col" className='tableHead'>Attachments</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eduRows.map((_, index) => (
                                        <tr key={index}>
                                            <td className='tableBody'>{index + 1}.</td>
                                            <td className='tableBody'>
                                                {/* <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`higherDegreeName_${index}`] ? 'invalid' : ''}`}> */}
                                                <input type='text' className='addressTableInput'
                                                    {...register(`higherDegreeName_${index}`, {
                                                        required: true,
                                                        minLength: {
                                                            value: 2,
                                                            message: "Minimum length is 2 characters",
                                                        },
                                                        maxLength: {
                                                            value: 50,
                                                            message: "Maximum length is 50 characters",
                                                        }
                                                    })}
                                                    onChange={(e) => handlePatternChangeForEduDoc(index, /^[A-Za-z0-9.\-\s()]+$/, `higherDegreeName_${index}`, e)} value={degreeNames[index] || ''}
                                                />
                                            </td>
                                            <td className='tableBody'>
                                                <input type='text' className='addressTableInput'
                                                    {...register(`higherCollegeName_${index}`, {
                                                        required: true,
                                                        minLength: {
                                                            value: 3,
                                                            message: "Minimum length is 3 characters",
                                                        },
                                                        maxLength: {
                                                            value: 50,
                                                            message: "Maximum length is 50 characters",
                                                        }
                                                    })}
                                                    onChange={(e) => handlePatternChangeForEduDoc(index, /^[A-Za-z\s.,()'\-]+$/, `higherCollegeName_${index}`, e)} value={collegeNames[index] || ''}
                                                />
                                            </td>
                                            <td className='tableBody'>
                                                <input type='text' className='addressTableInput'
                                                    {...register(`collegeLocation_${index}`, {
                                                        required: true,
                                                        minLength: {
                                                            value: 3,
                                                            message: "Minimum length is 3 characters",
                                                        },
                                                        maxLength: {
                                                            value: 50,
                                                            message: "Maximum length is 50 characters",
                                                        }
                                                    })}
                                                    onChange={(e) => handlePatternChangeForEduDoc(index, /^[A-Za-z0-9\s.,()'-]+$/, `collegeLocation_${index}`, e)} value={collegeLocation[index] || ''}
                                                />
                                            </td>
                                            <td className='tableBody'>
                                                <input type='text' className='addressTableInput'
                                                    {...register(`higherDegreeSubject_${index}`, {
                                                        required: true,
                                                        minLength: {
                                                            value: 3,
                                                            message: "Minimum length is 3 characters",
                                                        },
                                                        maxLength: {
                                                            value: 50,
                                                            message: "Maximum length is 50 characters",
                                                        }
                                                    })}
                                                    onChange={(e) => handlePatternChangeForEduDoc(index, /^[A-Za-z\s.,()'-]+$/, `higherDegreeSubject_${index}`, e)} value={subjects[index] || ''}
                                                />
                                            </td>
                                            <td className='tableBody'>
                                                {/* <input type='text' className='addressTableInput'
                                                {...register(`higherDegreePassingYr_${index}`, { required: true, minLength: 4 })}
                                                onChange={(e) => {
                                                    const currentYear = new Date().getFullYear(); // Get current year
                                                    const enteredYear = parseInt(e.target.value, 10); // Convert input to number

                                                    if (enteredYear > currentYear) {
                                                        alert("Future years are not allowed!");
                                                        e.target.value = ''; // Clear input
                                                        return;
                                                    }

                                                    handlePatternChangeForEduDoc(index, /^[0-9]+$/, `higherDegreePassingYr_${index}`, e);
                                                }} value={passingYr[index] || ''}
                                            /> */}
                                                <div className='datepicker-container'>
                                                    <DatePicker ref={educationalDatePickerRef.current[index]}
                                                        selectsRange
                                                        startDate={educationalDateRanges[index]?.[0]}
                                                        endDate={educationalDateRanges[index]?.[1]}
                                                        onChange={(update) => {
                                                            const newRanges = [...educationalDateRanges];
                                                            newRanges[index] = update;
                                                            seteducationalDateRanges(newRanges);

                                                            // Update React Hook Form values if using register
                                                            setValue(`degreeStartDuration[${index}]`, update[0]);
                                                            setValue(`degreeEndDuration[${index}]`, update[1]);
                                                            trigger([`degreeStartDuration[${index}]`, `degreeEndDuration[${index}]`]);
                                                        }}
                                                        maxDate={new Date()} // Prevent future dates
                                                        className={`addressTableInput  ${errors[`degreeStartDuration[${index}]`] || errors[`degreeEndDuration[${index}]`] ? 'invalid' : ''}`}
                                                        isClearable
                                                    />
                                                    <input type="hidden" {...register(`degreeStartDuration[${index}]`, { required: true })} />
                                                    <input type="hidden" {...register(`degreeEndDuration[${index}]`, { required: true })} />
                                                    {/* <img src={require("assets/img/calendar-icon.png")} alt="calendar" className="calendar-icon" onClick={() => educationalDatePickerRef.current[index].current.setFocus()} /> */}
                                                </div>
                                            </td>
                                            <td className='tableBody'>
                                                <input type='text' className='addressTableInput'
                                                    {...register(`higherDegreeRollNo_${index}`, {
                                                        required: true,
                                                        maxLength: {
                                                            value: 20,
                                                            message: "Maximum length is 20 characters",
                                                        }
                                                    })}
                                                    onChange={(e) => handlePatternChangeForEduDoc(index, /^[A-Za-z0-9\-\s]+$/, `higherDegreeRollNo_${index}`, e)} value={rollNo[index] || ''}
                                                />
                                            </td>
                                            <td className='tableBody'>
                                                <input type='text' className='addressTableInput'
                                                    {...register(`higherDegreeGrade_${index}`, {
                                                        required: true,
                                                        maxLength: {
                                                            value: 20,
                                                            message: "Maximum length is 20 characters",
                                                        }
                                                    })}
                                                    onChange={(e) => handlePatternChangeForEduDoc(index, /^[A-Za-z0-9\-\.\%\s]+$/, `higherDegreeGrade_${index}`, e)} value={grade[index] || ''}
                                                />
                                            </td>
                                            <td className='tableBody'>
                                                <input key={inputKeys[`eduDocs_${index}`] || 0} type='file' className='addressTableInput'
                                                    {...register(`eduDocs_${index}`, { required: true })}
                                                    onChange={(e) => handleFileForEduDocs(e, 'eduDocs', index)}
                                                    ref={(el) => (fileInputRefs.current[`eduDocs_${index}`] = el)}
                                                />
                                                {/* {educationalDegreeDoc[`eduDocs_${index}`]?.file && (<img src={require("assets/img/file-cut-icon.png")} alt="..." className='cross-icon' onClick={() => handleRemoveFile(`eduDocs_${index}`)} />)} */}
                                                {educationalFileUploaded[`eduDocs_${index}`] === true && (<img
                                                    src={require("assets/img/success-icon.png")}
                                                    alt="..."
                                                    className='cross-icon'
                                                />)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* <div className='btns'>
                            <div className='eduAddRowButtonContainer'>
                                {showAddBtn && (
                                     <button type="button" className="primary-btn" onClick={addTableForNextEducationDetail} style={{ borderRadius: '0.25rem', fontSize: '18px', width: '30px', height: '30px', padding: '0' }}>
                                     +
                                   </button>
                                )}
                            </div>
                            <div className='eduAddRowButtonContainer'>
                                {showMinusBtn &&
                                    (<input type='button' className='eduAddRowButton' value='- Add Row' onClick={removeTableForNextEducationDetail} />
                                    )}
                            </div>
                        </div> */}
                            {/* attachment section */}
                            {/* <div className='docsAttachmentContainer'>
                            <div className='attachmentLabel'>
                                <h6 className='attachmentHeadline'>Attachment :</h6>
                            </div>
                            <div className='nestedDropDownContainer'>
                                <select onChange={changeSelectOptionHandler}>
                                    <option hidden='hidden'>Choose degree</option>
                                    {Object.keys(educationOptions).map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>

                                {nestedOptions.length > 0 && (
                                    <div className='nestedOptionsList'>
                                        <h6>Choose</h6>
                                        {nestedOptions.map(option => (
                                            <div key={option}>
                                                <input
                                                    type='checkbox'
                                                    className='checkForDegree'
                                                    id={option}
                                                    name='certificate'
                                                    value={option}
                                                    checked={selectedCertificate[selectedDegree]?.includes(option) || false}
                                                    onChange={changeNestedOptionHandler}
                                                />
                                                <label style={{ verticalAlign: 'sub' }} htmlFor={option}>
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* ✅ FIX: Loop through selectedCertificate instead of nestedOptions */}
                            {/* {selectedCertificate[selectedDegree]?.length > 0 && (
                                    <div className='selectedCertificatesList'>
                                        {selectedCertificate[selectedDegree].map((certificate, index) => (
                                            <div className='certificateContainer' key={certificate}>
                                                <div className='fileUploadContainer'>
                                                    <input
                                                        type='file'
                                                        key={inputKeys[`${selectedDegree}-${certificate}Doc`] || 0}
                                                        className={`eduUploadFileInput ${errors[`${selectedDegree}-${certificate}Doc`] ? 'invalid' : ''}`}
                                                        ref={(el) => (fileInputRefs.current[`${selectedDegree}-${certificate}Doc`] = el)}
                                                        onChange={(e) => handleFileForDegreeDoc(e, `${selectedDegree}-${certificate}Doc`)}
                                                    />
                                                    {/* Hidden input with register */}
                            {/* <input
                                                        type="hidden"
                                                        {...register(`${selectedDegree}-${certificate}Doc`)}
                                                    />
                                                    {/* ✅ Display file name inside the loop */}
                            {/* {educationalDegreeDoc[`${selectedDegree}-${certificate}Doc`] && (
                                                        <div className="uploadedFileName">
                                                            {educationalDegreeDoc[`${selectedDegree}-${certificate}Doc`].file?.name}
                                                        </div>
                                                    )} */}

                            {/* <button
                                                        type="button"
                                                        className="eduUpload"
                                                        onClick={() => handleFileUpload(`${selectedDegree}-${certificate}Doc`)}
                                                    >
                                                        Upload
                                                    </button> */}
                            {/* {customErrorForEducationalDocUpload[`${selectedDegree}-${certificate}Doc`] && (
                                                        <div className="docUploadErrorMessage">
                                                            {customErrorForEducationalDocUpload[`${selectedDegree}-${certificate}Doc`]}
                                                        </div>
                                                    )} */}
                            {/* {successfulEducationalFileUploadMsg[`${selectedDegree}-${certificate}Doc`] && (
                                                        <div className="docUploadSuccessMessage">
                                                            {successfulEducationalFileUploadMsg[`${selectedDegree}-${certificate}Doc`]}
                                                        </div>
                                                    )} */}
                            {/* {educationalDegreeDoc[`${selectedDegree}-${certificate}Doc`] && (<img src={require("assets/img/file-cut-icon.png")} alt="..." className='cross-icon' onClick={() => handleRemoveFile(`${selectedDegree}-${certificate}Doc`)} />)}
                                                </div>
                                            </div> */}
                            {/* ))}
                                    </div>
                                )} */}
                            {/* </div>
                        </div> */}

                            {/* experience yrs input*/}
                            <div className='attachmentContainer'>
                                <div className='attachmentLabel'> <h6 className='attachmentHeadline'>Total experienced Companies :</h6>
                                </div>
                                <div className="customCounter">
                                    <button type="button" onClick={() => setYear((prev) => Math.max(0, prev - 1))}>−</button>
                                    <span>{year}</span>
                                    <button type="button" onClick={() => setYear((prev) => Math.min(5, prev + 1))}>+</button>
                                    <input type="hidden" value={year} {...register("yrOfExp")} />
                                </div>
                            </div>

                            {/* employment history */}

                            {showEmpHistory?.map((_, index) => (
                                <EmploymentHistoryForm key={index} index={index}
                                    empHistoryDateRanges={empHistoryDateRanges}
                                    setempHistoryDateRanges={setempHistoryDateRanges}
                                    empHistoryDatePickerRef={empHistoryDatePickerRef} />
                            ))}

                            {/* save buttons */}
                            <div className='educationSaveButtons'>
                                <button type="button" className="contactBackBtn" onClick={backToContactPage}>Back</button>
                                <button type="button" className="saveBtn" onClick={saveInLocalStorage}>Save Draft</button>
                                <button type="submit" className="saveNextBtn" onClick={() => console.log("buttonclicked")}>Save And Next </button>
                            </div>
                        </form>
                    </div>
                </ReusableProgessBar>
            </div>
        </div>
    )
}

