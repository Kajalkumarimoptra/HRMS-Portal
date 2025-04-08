import React, { useState, useEffect, useContext } from 'react';
import EmploymentHistoryForm from './EmploymentHistoryForm';
import Navbar from './Navbar';
import { useFormContext } from 'components/ContextProvider/Context';
import { useRegistrationContext } from 'components/ContextProvider/RegistrationDataContext';
import { useAddressHistoryContext } from 'components/ContextProvider/AddressHistoryContext.js';
import { EmploymentHistoryContext } from 'components/ContextProvider/EmploymentHistoryContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EducationalDetailsForm() {

    const { employmentHistoryDetails } = useContext(EmploymentHistoryContext);

    const navigate = useNavigate();
    const {
        register, handleSubmit, errors, onSubmit, watch, setValue, reset, clearErrors, showAddBtn, setShowAddBtn, showMinusBtn, setShowMinusBtn
    } = useFormContext();
    const { registrationData } = useRegistrationContext();  // Access registration data from context
    const { addressHistoryDetails, rowsOfAddressHistory } = useAddressHistoryContext();
    const [expYr, setExpYr] = useState(''); // for storing no. of exp. in yrs
    const [showEmpHistory, setEmpHistory] = useState([]); // shows emp history in array as much required
    const [selectedDegree, setSelectedDegree] = useState(""); // state for holding degree name
    const [nestedOptions, setNestedOptions] = useState([]); // state for taking values from object 'educationOptions'
    const [selectedCertificatesByDegree, setSelectedCertificatesByDegree] = useState({}); // to keep track of the selected certificate
    const [optionSelected, setOptionSelected] = useState(false); // State to track if an option is selected
    const [degreeNames, setDegreeNames] = useState([]); // initialize the state to track all the degree names invaid input in array
    const [subjects, setSubjects] = useState([]); // initialize the state to track all the subjects invaid input in array
    const [passingYr, setPassingYr] = useState([]); // initialize the state to track all the passing year invaid input in array
    const [rollNo, setRollNo] = useState([]); // initialize the state to track all the roll no. invaid input in array
    const [grade, setGrade] = useState([]); // initialize the state to track all the grade invaid input in array
    const [isValid, setIsValid] = useState(true); // To track whether input is valid for length validation
    const [eduRows, setEduRows] = useState([{}, {}, {}]); // 3 default rows in table

    const [educationalDegreeDoc, setEducationalDegreeDoc] = useState({}); // state for holding degree document file
    const [educationalFileUploaded, setEducationalFileUploaded] = useState({}); // Tracks if files have been uploaded
    const [customErrorForEducationalDocUpload, setCustomErrorForEducationalDocUpload] = useState({}); // error msg on not uploading the file
    const [successfulEducationalFileUploadMsg, setSuccessfulEducationalFileUploadMsg] = useState({}); // state for displaying successful upload msg

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
        setSelectedCertificate([]); // to reset the input type file for certificates
        setOptionSelected(true); // Set option selected state to true when an option is selected

    };

    const changeNestedOptionHandler = (e) => {
        const { value, checked } = e.target;
        setSelectedCertificatesByDegree(prev => {
            const current = prev[selectedDegree] || [];
            const updated = checked
                ? [...current, value]
                : current.filter(cert => cert !== value);
            return {
                ...prev,
                [selectedDegree]: updated
            };
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

    const yrOfExp = watch("yrOfExp", "");  // to monitor changes in the yrOfExp field.
    const setExp = (e) => {
        const value = e.target.value;
        setValue('yrOfExp', value);  // Update the form state with the selected value
        setExpYr(value);
    };
    useEffect(() => {  // for showing emp history component as many times as the no. of exp. in yrs given
        if (yrOfExp <= 3) {
            setEmpHistory(Array.from({ length: yrOfExp }, () => ({})));
        } else if (yrOfExp > 3) {
            setEmpHistory(Array.from({ length: 3 }, () => ({})));
        } else {
            setEmpHistory([]);
        }
    }, [yrOfExp]);

    // file type for degree document upload
    const handleFileForDegreeDoc = (e, field) => {
        const file = e.target.files[0]; // Get the first file from the input
        console.log(`Selected file for ${field}:`, file);

        // Clear error messages immediately upon file selection
        setCustomErrorForEducationalDocUpload(prev => ({ ...prev, [field]: '' })); // Clear any upload errors
        setSuccessfulEducationalFileUploadMsg(prev => ({ ...prev, [field]: '' })); // Clear success message
        setEducationalFileUploaded(prev => ({ ...prev, [field]: false })); // Reset file uploaded state

        if (file) {
            const fileType = file.type;
            const allowedFileTypes = ["application/pdf"];  // file type allowed
            if (!allowedFileTypes.includes(fileType)) {
                window.alert("Only PDF files are supported");
                e.target.value = ''; // Reset the input field
                return;
            }
            setEducationalDegreeDoc(prevState => ({
                ...prevState,
                [field]: file, // Store file with dynamic field name
            }));
            const fileSize = file.size;
            if (fileSize / 1024 > 20) {
                window.alert("File Size should be less than or upto 20kb"); // file size validation
                e.target.value = '';
                return;
            }
        }
    }

    // handle file upload
    const handleFileUpload = async (field) => {

        const file = educationalDegreeDoc[field];
        if (!file) {
            console.log(`No file found for ${field}, setting error`);
            setCustomErrorForEducationalDocUpload(prev => ({ ...prev, [field]: 'Please select a file to upload' }));
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
                setEducationalDegreeDoc(prev => ({ ...prev, [field]: fileUrl }));
                setEducationalFileUploaded(prev => ({ ...prev, [field]: true }));
                setSuccessfulEducationalFileUploadMsg(prev => ({ ...prev, [field]: 'Uploaded successfully' }));

                // Clear any previous error for this field
                setCustomErrorForEducationalDocUpload(prev => ({ ...prev, [field]: '' }));
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
                    setCustomErrorForEducationalDocUpload(prev => ({ ...prev, [field]: 'This file is already uploaded' }));
                    setEducationalFileUploaded(prev => ({ ...prev, [field]: false }));
                    setSuccessfulEducationalFileUploadMsg(prev => ({ ...prev, [field]: '' }));
                    return;
                } else {
                    console.log('common error:', errorMessage);
                    setCustomErrorForEducationalDocUpload(prev => ({ ...prev, [field]: 'Upload failed, Please try again' }));
                    setEducationalFileUploaded(prev => ({ ...prev, [field]: false }));
                    setSuccessfulEducationalFileUploadMsg(prev => ({ ...prev, [field]: '' }));
                }
            }
            else {
                // Handle generic errors
                setCustomErrorForEducationalDocUpload(prev => ({ ...prev, [field]: 'Upload failed, Please try again' }));
                setEducationalFileUploaded(prev => ({ ...prev, [field]: false }));
                setSuccessfulEducationalFileUploadMsg(prev => ({ ...prev, [field]: '' }));
            }
        }
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
        else if (field.includes('DegreePassingYr')) {
            const newPassingYr = [...passingYr];
            // Restrict to 4 digits by slicing the value
            let validValue = value.slice(0, 4);

            if (validValue && !pattern.test(validValue)) {
                alert('No alphabets or special characters are allowed');
                validValue = validValue.slice(0, -1); // Remove the last invalid character
                newPassingYr[index] = validValue;
                setPassingYr(newPassingYr);
                setIsValid(false);
                return;
            }

            newPassingYr[index] = validValue;
            setPassingYr(newPassingYr);
            setIsValid(true);
        }
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
         alert("Form submitted!");
        console.log("Submitted data:", data);
    console.log("Errors during submission:", errors);
        if (Object.keys(errors).length > 0) {
            console.error("Form has errors:", errors);
            return;
        }
        console.log("Form submission triggered");
        console.log("Form data before submission:", data);

        const addressDetails = [
            {
                "stayFrom": addressHistoryDetails.firstAddressFrom,
                "stayTo": addressHistoryDetails.firstAddressTo,
                "addressLine": addressHistoryDetails.firstFullAddress,
                "pincode": addressHistoryDetails.firstAddressZipcode,
                "country": addressHistoryDetails.firstAddressCountry,
                "contactNumberWithRelationship": addressHistoryDetails.firstAddressRtnContact
            }
        ];

        // Dynamically adding additional address details based on index
        for (let index = 0; index < rowsOfAddressHistory.length; index++) {
            addressDetails.push({
                "stayFrom": addressHistoryDetails[`anotherAddressFrom_${index}`],
                "stayTo": addressHistoryDetails[`anotherAddressTo_${index}`],
                "addressLine": addressHistoryDetails[`anotherFullAddress_${index}`],
                "pincode": addressHistoryDetails[`anotherAddressZipcode_${index}`],
                "country": addressHistoryDetails[`anotherAddressCountry_${index}`],
                "contactNumberWithRelationship": addressHistoryDetails[`anotherAddressRtnContact_${index}`]
            });
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
        // Dynamically generate the documents array from form data
        const documents = Object.keys(data)
            .filter(key => key.endsWith("Doc")) // Filter keys that represent documents
            .reduce((acc, key) => {
                const documentType = key.split("-")[0].toUpperCase(); // Extract and format the degree name as the document type

                // Determine if it's a degree certificate or passing certificate
                const isDegreeCertificate = key.includes("DegreeCertificate");
                const isPassingCertificate = key.includes("PassingCertificate") || key.includes("FinalYearMarksheet");

                // Check if a document of this type already exists in the array
                const existingDocument = acc.find(doc => doc.documentType === documentType);

                if (existingDocument) {
                    // Update the existing document's fields
                    if (isDegreeCertificate) {
                        existingDocument.degreeCertificate = true;
                        existingDocument.degreeCertificateUrl = data[key] || "";
                    } else if (isPassingCertificate) {
                        existingDocument.passingCertificate = true;
                        existingDocument.passingCertificateUrl = data[key] || "";
                    }
                } else {
                    // Create a new document object if it doesn't exist
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
            "offerLetterUrl": employmentHistoryDetails.offerLetter?.[index] || "",
        }));


        // Retrieve personal details from sessionStorage
        const personalFormDetails = sessionStorage.getItem('personalDetails');
        const contactFormDetails = sessionStorage.getItem('contactDetails');
        let parsedPersonalDetails = {};
        let parsedContactDetails = {};
        if (personalFormDetails) {
            parsedPersonalDetails = JSON.parse(personalFormDetails);
            console.log('Parsed personal details:', parsedPersonalDetails);
        }
        if (contactFormDetails) {
            parsedContactDetails = JSON.parse(contactFormDetails);
            console.log('Parsed contact details:', parsedContactDetails);
        }
        const checked = JSON.parse(sessionStorage.getItem('addressCheckbox')) || false;

        const newPayload = {
            "createdDate": registrationData.createdDate || "",
            "dateOfBirth": registrationData.dateOfBirth || "",
            "email": registrationData.email || "",
            "password": registrationData.password || "",
            "fullName": registrationData.fullName || "",
            "mobileNumber": registrationData.mobileNumber || "",
            "roleName": "EMPLOYEE",
            "personalDetailsDTO": {
                "aadharNumber": parsedPersonalDetails?.aadharNumber,
                "aadharUrl": parsedPersonalDetails?.aadharUrl,
                "dob": parsedPersonalDetails?.dob,
                "email": parsedPersonalDetails?.email,
                "fatherName": parsedPersonalDetails?.fatherName,
                "firstName": parsedPersonalDetails?.firstName,
                "gender": parsedPersonalDetails?.gender,
                "imageUrl": parsedPersonalDetails?.imageUrl,
                "middleName": parsedPersonalDetails?.middleName,
                "mobile": parsedPersonalDetails?.mobile,
                "motherName": parsedPersonalDetails?.motherName,
                "panNumber": parsedPersonalDetails?.panNumber,
                "panUrl": parsedPersonalDetails?.panUrl,
                "passportNumber": parsedPersonalDetails?.passportNumber,
                "passportUrl": parsedPersonalDetails?.passportUrl,
                "surname": parsedPersonalDetails?.surname
            },
            "permanentAddress": {
                "houseNumber": parsedContactDetails?.flatNo,
                "streetName": parsedContactDetails?.street,
                "town": parsedContactDetails?.town,
                "pincode": parsedContactDetails?.pincode,
                "state": parsedContactDetails?.state,
                "city": parsedContactDetails?.city,
                "stayFrom": parsedContactDetails?.fromStay,
                "stayTo": parsedContactDetails?.toStay,
                "emergencyContactNumber": parsedContactDetails?.emergencyContactNo,
                "emergencyContactNameAndRelationship": parsedContactDetails?.emergencyRtnName
            },
            "currentAddresses": {
                "sameAsPermanentAddress": checked, // Reflects if the checkbox is checked
                "houseNumber": checked ? parsedContactDetails?.flatNo : parsedContactDetails?.anotherFlatNo,
                "streetName": checked ? parsedContactDetails?.street : parsedContactDetails?.anotherStreet,
                "town": checked ? parsedContactDetails?.town : parsedContactDetails?.anotherTown,
                "pincode": checked ? parsedContactDetails?.pincode : parsedContactDetails?.anotherPincode,
                "state": checked ? parsedContactDetails?.state : parsedContactDetails?.anotherState,
                "city": checked ? parsedContactDetails?.city : parsedContactDetails?.anotherCity,
                "stayFrom": checked ? parsedContactDetails?.fromStay : parsedContactDetails?.anotherFromStay,
                "stayTo": checked ? parsedContactDetails?.toStay : parsedContactDetails?.anotherToStay,
                "emergencyContactNumber": checked ? parsedContactDetails?.emergencyContactNo : parsedContactDetails?.anotherEmergencyContactNo,
                "emergencyContactNameAndRelationship": checked ? parsedContactDetails?.emergencyRtnName : parsedContactDetails?.anotherEmergencyRtnName
            },
            "addressDetails": addressDetails, // Using the dynamically populated address details

            "educationalQualifications": educationalQualifications,

            "documents": documents,
            // ], {
            //                 "attachmentPath": Object.keys(data)
            //                     .filter(key => key.startsWith(`${selectedDegree}-`)) // Find all related docs
            //                     .map(key => data[key]) || [], // Store them in an array

            //             }

            "employmentHistories": employmentHistories,
            "professionalReferences": [
                {
                    "name": "",
                    "designation": "",
                    "email": "",
                    "contactNumber": ""
                },
                {
                    "name": "",
                    "designation": "",
                    "email": "",
                    "contactNumber": ""
                }
            ],
            "relativeInfos": [
                {
                    "name": "",
                    "employeeId": "",
                    "relationship": "",
                    "department": "",
                    "location": "",
                    "remarks": ""
                },
                {
                    "name": "",
                    "employeeId": "",
                    "relationship": "",
                    "department": "",
                    "location": "",
                    "remarks": ""
                }
            ],
            "passportDetails": {
                "passportNumber": "",
                "issueDate": "",
                "placeOfIssue": "",
                "expiryDate": "",
                "countryOfIssue": "",
                "nationality": "",
                "citizenship": "",
                "expatOnGreenCard": false,
                "expatOnWorkPermit": false,
                "expatOnPermanentResidencyPermit": false,
                "anyOtherStatus": "",
                "legalRightToWorkInCountry": false,
                "workPermitExpiryDate": "",
                "workPermitDetails": "",
                "passportCopy": "",
                "passportUrl": ""
            },
            "visaStatus": {
                "visaType": "",
                "legalRightToWork": false,
                "workPermitDetails": "",
                "workPermitValidTill": "",
                "passportCopyPath": ""
            },
            "otherDetails": {
                "illness": "",
                "selfIntroduction": ""
            }
        }
        console.log("Payload of educational page :", newPayload);

        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');
            console.log('token needed:', token);
            if (!token) {
                setServerError('Authentication issue');
                return; // Exit if token is not found
            }

            const response = await axios.post('http://localhost:8081/primaryDetails/save', newPayload, {
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

    return (
        <div className='container-fluid form-navbar'>
            <Navbar />

            <div className='personaldetail-form'>
                <div className='UniversalHeadline'>
                    <h6 className='mainHeading'>ASSOCIATE INFORMATION AND ONBOARDING FORM</h6>
                </div>
                <div className='noteHeading'>
                    <h5 className='noteContent'>Note:<span className='noteDescription'>Please update all cells with correct and relevant data. The information provided in this document
                        will form part of your official records in the Company<br /> and is subjected to verification.</span></h5>
                </div>
                <hr />
                {/* educational detail */}
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className='personalDetailForm'>
                        <div>
                            <div className='personalDetailHeading'> <h6 className='educationalHeadline'>EDUCATIONAL QUALIFICATION <span className='required'>*</span> -</h6><span><p className='educationalNote'>Please fill your
                                educational details and attach the documents below </p></span> </div>
                        </div>
                        {/* table content */}
                        <table className='table tableWidth table-bordered'>
                            <thead>
                                <tr>
                                    <th scope="col" className='tableHead' >S.No.</th>
                                    <th scope="col" className='tableHead'>Degree / Qualification Name</th>
                                    <th scope="col" className='tableHead'>Subjects</th>
                                    <th scope="col" className='tableHead'>Passing Year</th>
                                    <th scope="col" className='tableHead'>Roll Number </th>
                                    <th scope="col" className='tableHead'>Grade / Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eduRows.map((_, index) => (
                                    <tr key={index}>
                                        <td className={index % 2 === 0 ? 'tableBody' : 'tableBodyLight'}>{index + 1}.</td>
                                        <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'}`}>
                                            {/* <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`higherDegreeName_${index}`] ? 'invalid' : ''}`}> */}
                                            <input type='text' className='addressTableInput'
                                                {...register(`higherDegreeName_${index}`, { required: true })}
                                                onChange={(e) => handlePatternChangeForEduDoc(index,/^[A-Za-z.\-\s()]+$/, `higherDegreeName_${index}`, e)} value={degreeNames[index] || ''}
                                            />
                                        </td>
                                        <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} `}>
                                            <input type='text' className='addressTableInput'
                                                {...register(`higherDegreeSubject_${index}`, { required: true })}
                                                onChange={(e) => handlePatternChangeForEduDoc(index, /^[A-Za-z0-9,.()\-&\s]+$/, `higherDegreeSubject_${index}`, e)} value={subjects[index] || ''}
                                            />
                                        </td>
                                        <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} `}>
                                            <input type='text' className='addressTableInput'
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
                                                }}  value={passingYr[index] || ''}
                                            />
                                        </td>
                                        <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} `}>
                                            <input type='text' className='addressTableInput'
                                                {...register(`higherDegreeRollNo_${index}`, { required: true })}
                                                onChange={(e) => handlePatternChangeForEduDoc(index, /^[A-Za-z0-9\-\s]+$/, `higherDegreeRollNo_${index}`, e)} value={rollNo[index] || ''}
                                            />
                                        </td>
                                        <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} `}>
                                            <input type='text' className='addressTableInput'
                                                {...register(`higherDegreeGrade_${index}`, { required: true })}
                                                onChange={(e) => handlePatternChangeForEduDoc(index, /^[A-Za-z0-9\-\.\%\s]+$/, `higherDegreeGrade_${index}`, e)} value={grade[index] || ''}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='btns'>
                            <div className='eduAddRowButtonContainer'>
                                {showAddBtn &&
                                    (<input type='button' className='eduAddRowButton' value='+ Add Row' onClick={addTableForNextEducationDetail} />
                                    )}
                            </div>
                            <div className='eduAddRowButtonContainer'>
                                {showMinusBtn &&
                                    (<input type='button' className='eduAddRowButton' value='- Add Row' onClick={removeTableForNextEducationDetail} />
                                    )}
                            </div>
                        </div>
                        {/* attachment section */}
                        <div className='docsAttachmentContainer'>
                            <div className='attachmentLabel'>
                                <h6 className='attachmentHeadline'>Documents Attachment :</h6>
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
                                        <h6>Choose Certificate:</h6>
                                        {nestedOptions.map(option => (
                                            <div key={option}>
                                                <input
                                                    type='checkbox'
                                                    className='checkForDegree'
                                                    id={option}
                                                    name='certificate'
                                                    value={option}
                                                    checked={selectedCertificate.includes(option)}
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
                                {selectedCertificate.length > 0 && (
                                    <div className='selectedCertificatesList'>
                                        {selectedCertificate.map((certificate, index) => (
                                            <div className='certificateContainer' key={certificate}>
                                                <div className='fileUploadContainer'>
                                                    <input
                                                        type='file'
                                                        className={`eduUploadFileInput ${errors[`${selectedDegree}-${certificate}Doc`] ? 'invalid' : ''}`}
                                                        {...register(`${selectedDegree}-${certificate}Doc`, { required: true })}
                                                        onChange={(e) => handleFileForDegreeDoc(e, `${selectedDegree}-${certificate}Doc`)}
                                                    />
                                                    <button type="button" className="eduUpload" onClick={() => handleFileUpload(`${selectedDegree}-${certificate}Doc`)}>Upload</button>
                                                    {customErrorForEducationalDocUpload[`${selectedDegree}-${certificate}Doc`] ? <div className="docUploadErrorMessage">{customErrorForEducationalDocUpload[`${selectedDegree}-${certificate}Doc`]}</div> : ''}
                                                    {successfulEducationalFileUploadMsg[`${selectedDegree}-${certificate}Doc`] ? <div className="docUploadSuccessMessage">{successfulEducationalFileUploadMsg[`${selectedDegree}-${certificate}Doc`]}</div> : ''}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>




                        </div>

                        {/* experience yrs input*/}
                        <div className='attachmentContainer'>
                            <div className='attachmentLabel'> <h6 className='attachmentHeadline'>No. of companies last experienced in :</h6>
                            </div>
                            <div><input type='number' className={`yrOfExpInput ${errors.yrOfExp ? 'invalid' : ''}`} defaultValue={0} min="0" max="3" onKeyDown={(e) => e.preventDefault()} onChange={setExp}
                                {...register("yrOfExp", { required: true })}
                            /><span><p className='educationalNote'>Maximum three recent years of Employment History is needed to get filled.</p></span>
                            </div>
                        </div>

                        {/* employment history */}

                        {showEmpHistory?.map((_, index) => (
                            <EmploymentHistoryForm key={index} index={index} />
                        ))}

                        {/* save buttons */}
                        <div className='educationSaveButtons'>
                            <button type="button" className="contactBackBtn" onClick={backToContactPage}>Back</button>
                            <button type="button" className="saveBtn" onClick={saveInLocalStorage}>Save Draft</button>
                            <button type="submit" className="saveNextBtn" onClick={() => console.log("buttonclicked")}>Save And Next </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

