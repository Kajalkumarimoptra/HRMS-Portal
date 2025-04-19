import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'components/ContextProvider/Context';
import { useRegistrationContext } from 'components/ContextProvider/RegistrationDataContext';
import Navbar from './Navbar.js';
import axios from 'axios';

export default function ProfessionalRefForm() {

  const navigate = useNavigate();
  const {
    register, handleSubmit, errors, onSubmit, setValue, watch, clearErrors, showAddBtn, setShowAddBtn, showMinusBtn, setShowMinusBtn, reset
  } = useFormContext();
  const { registrationData } = useRegistrationContext();  // Access registration data from context
  const [refNames, setRefNames] = useState([]); // initialize the state to track all the prof ref names invaid input in array
  const [refDesg, setRefDesg] = useState([]);
  const [refNo, setRefNo] = useState([]); // initialize the state to track all the ref no. invaid input in array
  const [passportIssueDateColor, setPassportIssueDateColor] = useState("#d3d3d3");
  const [passportValidDateColor, setPassportValidDateColor] = useState("#d3d3d3");
  const [passportWorkPermitDateColor, setPassporWorkPermitDateColor] = useState("#d3d3d3");
  const [patternForPassportPlace, setPatternForPassportPlace] = useState(''); // pattern for Passport Place
  const [customErrorForPassportPlace, setCustomErrorForPassportPlace] = useState(''); // error msg for its pattern failure
  const [patternForPassportCountry, setPatternForPassportCountry] = useState(''); // pattern for Passport country
  const [customErrorForPassportCountry, setCustomErrorForPassportCountry] = useState(''); // error msg for its pattern failure
  const [patternForPassportNationality, setPatternForPassportNationality] = useState(''); // pattern for Passport nationality
  const [customErrorForPassportNationality, setCustomErrorForPassportNationality] = useState(''); // error msg for its pattern failure
  const [passportCopyDoc, setPassportCopyDoc] = useState(''); // state for holding paassport file
  const [errorForPassportCopyFileSize, setErrorForPassportCopyFileSize] = useState(''); // error for wrong file size 
  const [showRelativeSection, setShowRelativeSection] = useState(null); // for showing table of moptra relative details
  const [profRows, setProfRows] = useState([{}, {}]); // 2 default rows in table
  const [firstMoptraRelativeName, setFirstMoptraRelativeName] = useState('');
  const [secondMoptraRelativeName, setSecondMoptraRelativeName] = useState('');
  const [firstMoptraRelativeEmpId, setFirstMoptraRelativeEmpId] = useState('');
  const [secondMoptraRelativeEmpId, setSecondMoptraRelativeEmpId] = useState('');
  const [firstMoptraRelativeRelationship, setFirstMoptraRelativeRelationship] = useState('');
  const [secondMoptraRelativeRelationship, setSecondMoptraRelativeRelationship] = useState('');
  const [firstMoptraRelativeDept, setFirstMoptraRelativeDept] = useState('');
  const [secondMoptraRelativeDept, setSecondMoptraRelativeDept] = useState('');
  const [patternForProfPassport, setPatternForProfPassport] = useState('');
  const [customErrorForPassportNo, setcustomErrorForPassportNo] = useState('');
  const [profPassportCopyDocUploadStatus, setProfPassportCopyDocUploadStatus] = useState(false);
  const [successfulProfPassportCopyDocUploadMsg, setSuccessfulProfPassportCopyDocUploadMsg] = useState('');
  const [customErrorForPassportCopyDocUpload, setCustomErrorForPassportCopyDocUpload] = useState('');

  const passportFileInputRef = useRef(null);

  useEffect(() => {
    register("passportCopyFile");
  }, [register]);

  // for pattern validation of professional references inputs
  const handlePatternChangeForProfRef = (index, pattern, field, e) => {
    const value = e.target.value;
    if (field.includes('RefName')) {
      // Create a copy of the degree names array to update the specific index
      const newRefNames = [...refNames]; // to ensure that the original state is not mutated

      // Validate the input value
      if (value && !pattern.test(value)) {
        console.log(`${field} is invalid at index ${index}`); // Log if the value is invalid
        alert('No numbers or special characters are allowed');
        // Update only the part that is invalid
        const validValue = value.slice(0, -1); // Removing the last entered invalid character
        newRefNames[index] = validValue; // Set the value minus the invalid character
        setRefNames(newRefNames);
        return;
      }
      newRefNames[index] = value; // Updates the copied array at the specified index with the new value
      setRefNames(newRefNames);
    }
    else if (field.includes('RefDesg')) {
      const newRefDesg = [...refDesg];

      if (value && !pattern.test(value)) {
        alert('No numbers or special characters are allowed');
        const validValue = value.slice(0, -1);
        newRefDesg[index] = validValue;
        setRefDesg(newRefDesg);
        return;
      }
      newRefDesg[index] = value;
      setRefDesg(newRefDesg);
    }
    else if (field.includes('RefNo')) {
      const newRefNo = [...refNo];
      let newValue = value;
      if (newValue.length > 10) {
        newValue = newValue.slice(0, 10); // Slice to 10 digits
      }
      if (newValue && !pattern.test(newValue)) {
        alert('Only numbers are allowed');
        newValue = newValue.slice(0, -1);
      }
      newRefNo[index] = newValue;
      setRefNo(newRefNo);
    }
  }

  const addTableForNextProfRef = () => {
    if (profRows.length < 5) {
      const newRows = [...profRows, {}];
      setProfRows(newRows);

      // Manage button visibility
      if (newRows.length === 3) {
        setShowAddBtn(false);
        setShowMinusBtn(true);
      } else {
        setShowAddBtn(true);
        setShowMinusBtn(false);
      }
    }
  };

  const removeTableForNextProfRef = () => {
    if (profRows.length > 2) {
      const newRows = profRows.slice(0, -1);
      setProfRows(newRows);

      // Manage button visibility
      if (newRows.length < 3) {
        setShowAddBtn(true);
      }

      if (newRows.length === 2) {
        setShowMinusBtn(false);
      } else {
        setShowMinusBtn(true);
        setShowAddBtn(false);
      }
    }
  };

  const [pattern, setPattern] = useState({
    firstMoptraRelativeName: '',
    secondMoptraRelativeName: '',
    firstMoptraRelativeEmpId: '',
    secondMoptraRelativeEmpId: '',
    firstMoptraRelativeRelationship: '',
    secondMoptraRelativeRelationship: '',
    firstMoptraRelativeDept: '',
    secondMoptraRelativeDept: ''

  }); // state for overall handling of pattern

  // pattern failure validation 
  const handlePatternForRelativeDetails = (e, pattern, field) => {
    let value = e.target.value;
    clearErrors(field);
    setPattern(prev => ({ ...prev, [field]: value }))
    if (field === 'firstMoptraRelativeName') setFirstMoptraRelativeDept(value);
    if (field === 'secondMoptraRelativeName') setSecondMoptraRelativeName(value);
    if (field === 'firstMoptraRelativeEmpId') setFirstMoptraRelativeEmpId(value);
    if (field === 'secondMoptraRelativeEmpId') setSecondMoptraRelativeEmpId(value);
    if (field === 'firstMoptraRelativeRelationship') setFirstMoptraRelativeRelationship(value);
    if (field === 'secondMoptraRelativeRelationship') setSecondMoptraRelativeRelationship(value);
    if (field === 'firstMoptraRelativeDept') setFirstMoptraRelativeDept(value);
    if (field === 'secondMoptraRelativeDept') setSecondMoptraRelativeDept(value);

    if ((field === 'firstMoptraRelativeName' || field === 'secondMoptraRelativeName' || field === 'firstMoptraRelativeRelationship'
      || field === 'secondMoptraRelativeRelationship' || field === 'firstMoptraRelativeDept' || field === 'secondMoptraRelativeDept') && value && !pattern.test(value)) {
      alert('No numbers or special characters are allowed');
      value = value.slice(0, -1);
    } else if (field === 'firstMoptraRelativeEmpId' || field === 'secondMoptraRelativeEmpId') {
      // If emp id exceeds 6 digits, slice it to 6 digits
      if (value.length > 6) {
        value = value.slice(0, 6);
      }
      // perform validation
      if (value && !pattern.test(value)) {
        alert('Only numbers are allowed');
        value = value.slice(0, -1);
      }
      if (field === 'firstMoptraRelativeEmpId') setFirstMoptraRelativeEmpId(value);
      if (field === 'secondMoptraRelativeEmpId') setSecondMoptraRelativeEmpId(value);
    }
  };

  const handlePatternForProfPassport = (e) => {
    const value = e.target.value;
    setPatternForProfPassport(value);

    // Regular expression to check if the value contains more than one space
    const moreThanOneSpaceRegex = /\s{2,}/;

    if (value && moreThanOneSpaceRegex.test(value)) {
      setcustomErrorForPassportNo('Please fill the blank as per the right format of Passport No.');
    } else if (value && !/^[A-Z0-9\s]+$/.test(value)) {
      setcustomErrorForPassportNo('Please fill the blank as per the right format of Passport No.');
    } else {
      setcustomErrorForPassportNo('');
    }
  };

  // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
  const handlePassportIssueDateColorChange = (e) => {
    const selectedValue = e.target.value;
    setPassportIssueDateColor(selectedValue ? "black" : "#d3d3d3");
    clearErrors('passportDate');
  };

  const handlePassportWorkPermitDateColorChange = (e) => {
    const selectedValue = e.target.value;
    setPassporWorkPermitDateColor(selectedValue ? "black" : "#d3d3d3");
    clearErrors('workPermit');
  };

  const handlePassportValidDateColorChange = (e) => {
    const selectedValue = e.target.value;
    setPassportValidDateColor(selectedValue ? "black" : "#d3d3d3");
    clearErrors('passportValidUpto');
  };

  // pattern failure validation 
  // for Passport Place
  const handlePatternForPassportPlace = (e) => {
    const value = e.target.value;
    setPatternForPassportPlace(value);
    if (value && ! /^[A-Za-z\s]+$/.test(value)) {
      setCustomErrorForPassportPlace('No numbers or special characters are allowed');
    } else {
      setCustomErrorForPassportPlace('');
    }
  }
  // for Passport country
  const handlePatternForPassportCountry = (e) => {
    const value = e.target.value;
    setPatternForPassportCountry(value);
    if (value && ! /^[A-Za-z\s]+$/.test(value)) {
      setCustomErrorForPassportCountry('No numbers or special characters are allowed');
    } else {
      setCustomErrorForPassportCountry('');
    }
  }
  // for Passport Place
  const handlePatternForPassportNationality = (e) => {
    const value = e.target.value;
    setPatternForPassportNationality(value);
    if (value && ! /^[A-Za-z\s]+$/.test(value)) {
      setCustomErrorForPassportNationality('No numbers or special characters are allowed');
    } else {
      setCustomErrorForPassportNationality('');
    }
  }

  // file type for passport copy upload
  const handleFileForPassportCopy = (e) => {
    const file = e.target.files[0];
    setCustomErrorForPassportCopyDocUpload('');
    setSuccessfulProfPassportCopyDocUploadMsg('');
    setProfPassportCopyDocUploadStatus(false);
    setErrorForPassportCopyFileSize('');
    if (file) {
      const fileType = file.type;
      const allowedFileTypes = ["application/pdf"];
      if (!allowedFileTypes.includes(fileType)) {
        window.alert("Only PDF files are supported");
        e.target.value = '';
        return;
      }
      setPassportCopyDoc(file);
      clearErrors("passportCopyFile");
      const fileSize = file.size;
      if (fileSize / 1024 > 20) {
        setErrorForPassportCopyFileSize("file should be less than or upto 20kb");
        e.target.value = '';
        return;
      }
      else {
        setErrorForPassportCopyFileSize('');
      }
    }
  }

  // handle file upload
  const handleFileUpload = async () => {
    if (!passportCopyDoc) {
      console.log(`No file found for passportCopyFile, setting error`);
      setCustomErrorForPassportCopyDocUpload("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append('file', passportCopyDoc);
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
        const fileUrl = response.data.data.url; // Extract the file URL from the response
        console.log('File uploaded successfully for passport copy:', fileUrl);
        setPassportCopyDoc(fileUrl);
        setValue("passportCopyFile", fileUrl); // Registering the uploaded file path with the form
        clearErrors("passportCopyFile");
        setProfPassportCopyDocUploadStatus(true);
        setSuccessfulProfPassportCopyDocUploadMsg('Uploaded successfully');
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
          setCustomErrorForPassportCopyDocUpload("This file is already uploaded");
          setProfPassportCopyDocUploadStatus(false);
          setSuccessfulProfPassportCopyDocUploadMsg('');
          return;
        } else {
          console.log('common error:', errorMessage);
          setCustomErrorForPassportCopyDocUpload("Upload failed, Please try again");
          setProfPassportCopyDocUploadStatus(false);
          setSuccessfulProfPassportCopyDocUploadMsg('');
        }
      }
      else {
        setCustomErrorForPassportCopyDocUpload("Upload failed, Please try again");
        setProfPassportCopyDocUploadStatus(false);
        setSuccessfulProfPassportCopyDocUploadMsg('');
      }
    }
  };

  const handleRemoveFile = (e) => {
    setPassportCopyDoc('');
    setProfPassportCopyDocUploadStatus(false);
    setCustomErrorForPassportCopyDocUpload('');
    setSuccessfulProfPassportCopyDocUploadMsg('');

    if (passportFileInputRef.current) {
      passportFileInputRef.current.value = '';
    }
  };

  //for radio
  const handleRadioChange = (e) => {
    const relativeDetail = e.target.value;
    setShowRelativeSection(relativeDetail === 'yes');
    setValue('moptraRelative', relativeDetail);  // Update the form state with the selected value
  };
  // Watch the value of the radio button to conditionally render the section
  const moptraRelative = watch('moptraRelative', '');

  // for backward navigation
  const backToEducationalPage = () => {
    navigate("/educationaldetailsform");
  }

  useEffect(() => {
    console.log("Validation Errors:", errors);
  }, [errors]);

  // for handle submit
  const handleFormSubmit = async (data) => {
    console.log('Form data:', data);
    console.log("Errors during submission:", errors);
    if (Object.keys(errors).length > 0) {
      console.error("Form has errors:", errors);
      return;
    }

    const retrievedPayload = JSON.parse(sessionStorage.getItem('newPayload'));

    // Extracting professional references from the form data
    const professionalReferences = profRows.map((_, index) => ({
      name: data[`ProfRefName_${index}`] || '',
      designation: data[`ProfRefDesg_${index}`] || '',
      email: data[`ProfRefEmail_${index}`] || '',
      contactNumber: data[`ProfRefNo_${index}`] || '',
    }));

    // Extract whether the user selected 'yes' or 'no'
    const hasRelative = data.moptraRelative === 'yes';
    // Prepare relativeInfoDTOS only if hasRelative is true
    const relativeInfoDTOS = hasRelative ? [
      {
        "name": data.firstMoptraRelativeName,
        "employeeId": data.firstMoptraRelativeEmpId,
        "relationship": data.firstMoptraRelativeRelationship,
        "department": data.firstMoptraRelativeDept,
        "location": data.firstMoptraRelativeLocation,
        "remarks": data.firstMoptraRelativeRemarks
      },
      {
        "name": data.secondMoptraRelativeName,
        "employeeId": data.secondMoptraRelativeEmpId,
        "relationship": data.secondMoptraRelativeRelationship,
        "department": data.secondMoptraRelativeDept,
        "location": data.secondMoptraRelativeLocation,
        "remarks": data.secondMoptraRelativeRemarks
      }
    ] : [];

    const visaStatusSelected = data.visaStatus;

    const visaStatus = {
      "citizen": visaStatusSelected === "citizen",
      "expatOnGreenCard": visaStatusSelected === "expat_green_card",
      "expatOnWorkPermit": visaStatusSelected === "expat_work_permit",
      "expatOnPermanentResidencyPermit": visaStatusSelected === "expat_permanent_residency",
      "anyOtherStatus": visaStatusSelected === "any_other_status"
    };

    const professionalPayload = {

      "primaryId": registrationData.primaryId || "",
      "professionalReferences": professionalReferences,
      "passportDetails": {
        "passportNumber": data.passportNo || "",
        "issueDate": data.passportDate || "",
        "placeOfIssue": data.passportPlace || "",
        "expiryDate": data.passportValidUpto || "",
        "countryOfIssue": data.passportCountry || "",
        "nationality": data.nationality || ""
      },
      "employeeRelatives": {
        hasRelative: hasRelative,
        ...(hasRelative && { relativeInfoDTOS })  // only include if hasRelative is true
      },
      "visaStatus": visaStatus,
      "workPermit": {
        "legalRightToWork": data.legalRight === "yes",
        "workPermitDetails": data.workPermitDetails || "",
        "workPermitValidTill": data.workPermit || "",
        "passportCopy": data.passportCopy || "",
        "passportCopyPath": data.passportCopyFile || ""
      }
    }

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      console.log('token needed:', token);
      if (!token) {
        setServerError('Authentication issue');
        return; // Exit if token is not found
      }

      const response = await axios.post('http://localhost:8081/primary/createProfessional', professionalPayload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response && response.data) {
        console.log("Form submitted successfully:", response.data);
        sessionStorage.setItem('professionalReferenceDetails', JSON.stringify(response.data))
        navigate("/declarationform");
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
    console.log('saved professional detail data:', data);
  }

  return (
    <div className='container-fluid form-navbar'>
      <Navbar />
      <div className='prof-form'>
        <div className='UniversalHeadline'>
          <h6 className='mainHeading'>ASSOCIATE INFORMATION AND ONBOARDING FORM</h6>
        </div>
        <div className='noteHeading'>
          <h5 className='noteContent'>Note:<span className='noteDescription'>Please update all cells with correct and relevant data. The information provided in this document
            will form part of your official records in the Company<br /> and is subjected to verification.</span></h5>
        </div>
        <hr />
        <div>
          <div className='profDetailHeading'> <h6 className='personalDetailHeadline' style={{ textAlign: 'center' }}>PROFESSIONAL REFERENCES</h6></div>
        </div>

        {/* table content */}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <table className=' table profTableWidth table-bordered'>
            <thead>
              <tr>
                <th scope="col" className='tableHead' >S.No.</th>
                <th scope="col" className='tableHead'>Name</th>
                <th scope="col" className='tableHead'>Designation</th>
                <th scope="col" className='tableHead'>Email Address</th>
                <th scope="col" className='tableHead'>Contact No.</th>
              </tr>
            </thead>
            <tbody>
              {profRows.map((_, index) => (
                <tr key={index}>
                  <th className={index % 2 === 0 ? 'tableBody' : 'tableBodyLight'}>{index + 1}</th>
                  <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`ProfRefName_${index}`] ? 'invalid' : ''}`}>
                    <input type='text area' className='addressTableInput' {...register(`ProfRefName_${index}`)}
                      onChange={(e) => handlePatternChangeForProfRef(index, /^[A-Za-z\s]+$/, `ProfRefName_${index}`, e)} value={refNames[index] || ''} /></td>
                  <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`ProfRefDesg_${index}`] ? 'invalid' : ''}`}>
                    <input type='text area' className='addressTableInput' {...register(`ProfRefDesg_${index}`)}
                      onChange={(e) => handlePatternChangeForProfRef(index, /^[A-Za-z0-9-\s]+$/, `ProfRefDesg_${index}`, e)} value={refDesg[index] || ''} /></td>
                  <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`ProfRefEmail_${index}`] ? 'invalid' : ''}`}>
                    <input type='email' className='addressTableInput' {...register(`ProfRefEmail_${index}`)}
                    /></td>
                  <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`ProfRefNo_${index}`] ? 'invalid' : ''}`}>
                    <input type='text' className='addressTableInput' {...register(`ProfRefNo_${index}`, { minLength: 10, maxLength: 10 })}
                      onChange={(e) => handlePatternChangeForProfRef(index, /^[0-9]+$/, `ProfRefNo_${index}`, e)} value={refNo[index] || ''} /></td>
                </tr>
              ))}

            </tbody>
          </table>
          <div className='btns'>
            <div className='eduAddRowButtonContainer'>
              {showAddBtn &&
                (<input type='button' className='profAddRowButton' value='+ Add Row' onClick={addTableForNextProfRef} />
                )}
            </div>
            <div className='eduAddRowButtonContainer'>
              {showMinusBtn &&
                (<input type='button' className='profAddRowButton' value='- Add Row' onClick={removeTableForNextProfRef} />
                )}
            </div>
          </div>

          <div className='relativeWorking'>
            <div className='profDetailHeading'> <h6 className='personalDetailHeadline' style={{ textTransform: 'capitalize' }}>Do you have any relative's working with Moptra Infotech?
              If Yes, Please tick it and fill the details, otherwise tick No and proceed further.</h6></div>
          </div>
          <div className='relativeButtons'>
            <label>
              <input
                type='radio' className='radioYes' name='moptraRelative' onChange={handleRadioChange} value='yes'
                {...register("moptraRelative", { required: true })}
              />
              Yes
            </label>
            <label>
              <input
                type='radio' className='radioYes' name='moptraRelative' onChange={handleRadioChange} value='no'
                {...register("moptraRelative", { required: true })}
              />
              No
            </label>
            {errors.moptraRelative && <div className='moptraRelativeErrorMessage'>Please select atleast any one alternative</div>}
          </div>

          {/* table content */}
          {moptraRelative === 'yes' && <table className='table profTableWidth table-bordered'>
            <thead>
              <tr>
                <th scope="col" className='tableHead'>Name</th>
                <th scope="col" className='tableHead'>Employee ID</th>
                <th scope="col" className='tableHead'>Relationship</th>
                <th scope="col" className='tableHead'>Department</th>
                <th scope="col" className='tableHead'>Location</th>
                <th scope="col" className='tableHead'>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='tableBody'><input type='text area' className='tableInput' {...register("firstMoptraRelativeName")} value={pattern.firstMoptraRelativeName}
                  onChange={(e) => handlePatternForRelativeDetails(e, /^[A-Za-z\s]+$/, 'firstMoptraRelativeName')} /></td>
                <td className='tableBody'><input type='text area' className='tableInput' {...register("firstMoptraRelativeEmpId")} value={pattern.firstMoptraRelativeEmpId}
                  onChange={(e) => handlePatternForRelativeDetails(e, /^[0-9]+$/, 'firstMoptraRelativeEmpId')} /></td>
                <td className='tableBody'><input type='text area' className='tableInput' {...register("firstMoptraRelativeRelationship")} value={pattern.firstMoptraRelativeRelationship}
                  onChange={(e) => handlePatternForRelativeDetails(e, /^[A-Za-z\s]+$/, 'firstMoptraRelativeRelationship')} /></td>
                <td className='tableBody'><input type='text area' className='tableInput' {...register("firstMoptraRelativeDept")} value={pattern.firstMoptraRelativeDept}
                  onChange={(e) => handlePatternForRelativeDetails(e, /^[A-Za-z\s]+$/, 'firstMoptraRelativeDept')} /></td>
                <td className='tableBody'><input type='text area' className='tableInput' {...register("firstMoptraRelativeLocation")} /></td>
                <td className='tableBody'><input type='text area' className='tableInput' {...register("firstMoptraRelativeRemarks")} /></td>
              </tr>
              <tr>
                <td className='tableBodyLight'><input type='text area' className='tableInput' {...register("secondMoptraRelativeName")} value={pattern.secondMoptraRelativeName}
                  onChange={(e) => handlePatternForRelativeDetails(e, /^[A-Za-z\s]+$/, 'secondMoptraRelativeName')} /></td>
                <td className='tableBodyLight'><input type='text area' className='tableInput' {...register("secondMoptraRelativeEmpId")} value={pattern.secondMoptraRelativeEmpId}
                  onChange={(e) => handlePatternForRelativeDetails(e, /^[0-9]+$/, 'secondMoptraRelativeEmpId')} /></td>
                <td className='tableBodyLight'><input type='text area' className='tableInput' {...register("secondMoptraRelativeRelationship")} value={pattern.secondMoptraRelativeRelationship}
                  onChange={(e) => handlePatternForRelativeDetails(e, /^[A-Za-z\s]+$/, 'secondMoptraRelativeRelationship')} /></td>
                <td className='tableBodyLight'><input type='text area' className='tableInput' {...register("secondMoptraRelativeDept")} value={pattern.secondMoptraRelativeDept}
                  onChange={(e) => handlePatternForRelativeDetails(e, /^[A-Za-z\s]+$/, 'secondMoptraRelativeDept')} /></td>
                <td className='tableBodyLight'><input type='text area' className='tableInput' {...register("secondMoptraRelativeLocation")} /></td>
                <td className='tableBodyLight'><input type='text area' className='tableInput' {...register("secondMoptraRelativeRemarks")} /></td>
              </tr>
            </tbody>
          </table>}

          {/* passport details form */}
          <div className='passportContainer'>
            <div className='profDetailHeading'> <h6 className='personalDetailHeadline' style={{ textAlign: 'center' }}>PASSPORT DETAILS</h6></div>
          </div>
          <div className='passportDetailsContainer'>
            <div className='passportNoContainer'>
              <label>Passport Number<span className='separatorForPrevEmpName'>:</span></label>
              <input type='text' placeholder='Passport Number' className='passportNoInput' {...register("passportNo")}
                value={patternForProfPassport} onChange={handlePatternForProfPassport} />
              {customErrorForPassportNo ? <div className="errorMessage">{customErrorForPassportNo}</div> : ''}
            </div>
            <div className='passportDateContainer'>
              <label>Date Of Issue<span className='separatorForPrevEmpName'>:</span></label>
              <input type='date' placeholder='date' className='passportDateInput'  {...register("passportDate")}
                onChange={handlePassportIssueDateColorChange} style={{ color: passportIssueDateColor }} />
            </div>
            <div className='passportPlaceContainer'>
              <label>Place Of Issue<span className='separatorForPrevEmpName'>:</span></label>
              <input type='text' placeholder='place' className='passportPlaceInput'  {...register("passportPlace", { pattern: /^[A-Za-z\s]+$/ })}
                value={patternForPassportPlace} onChange={handlePatternForPassportPlace} />
              {customErrorForPassportPlace ? <div className='errorMessage' style={{ marginLeft: '-40px' }}>{customErrorForPassportPlace}</div> : ''}
            </div>
          </div>
          <div className='passportValidDetailsContainer'>
            <div className='passportValidContainer'>
              <label>Valid Upto<span className='separatorForPrevEmpName'>:</span></label>
              <input type='date' placeholder='Enter Valid Date' className='passportValidInput'  {...register("passportValidUpto")}
                onChange={handlePassportValidDateColorChange} style={{ color: passportValidDateColor }} />
            </div>
            <div className='passportCountryContainer'>
              <label>Country Of Issue<span className='separatorForPassport'>:</span></label>
              <input type='text' placeholder='Country Name' className='passportCountryInput'  {...register("passportCountry", { pattern: /^[A-Za-z\s]+$/ })}
                value={patternForPassportCountry} onChange={handlePatternForPassportCountry} />
              {customErrorForPassportCountry ? <div className='errorMessage'>{customErrorForPassportCountry}</div> : ''}
            </div>
            <div className='passportNationalityContainer'>
              <label>Nationality<span className='separatorForNationality'>:</span></label>
              <input type='text' placeholder='Nationality' className='passportValidInput'  {...register("nationality", { pattern: /^[A-Za-z\s]+$/ })}
                value={patternForPassportNationality} onChange={handlePatternForPassportNationality} />
              {customErrorForPassportNationality ? <div className='errorMessage'>{customErrorForPassportNationality}</div> : ''}
            </div>
          </div>
          <div className='visaStatusContainer'>
            <div className='profDetailHeading'> <h6 className='relativeWorkingHeadline'>Please tick an appropriate option
              related to your Visa status.</h6></div>
          </div>
          {/* table content */}
          <table className='table profTableWidth table-bordered'>
            <thead>
              <tr>
                <th scope="col" className='tableHead'>Citizen</th>
                <th scope="col" className='tableHead'>Expat on Green Card</th>
                <th scope="col" className='tableHead'>Expat on Work Permit</th>
                <th scope="col" className='tableHead'>Expat on Permanent Residency Permit</th>
                <th scope="col" className='tableHead'>Any Other Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='tableBody'><input type="radio" name="visa status" value="citizen" className='radioCheckForVisa' {...register("visaStatus")} /></td>
                <td className='tableBody'><input type="radio" name="visa status" value="expat_green_card" className='radioCheckForVisa' {...register("visaStatus")} /></td>
                <td className='tableBody'><input type="radio" name="visa status" value="expat_work_permit" className='radioCheckForVisa' {...register("visaStatus")} /></td>
                <td className='tableBody'><input type="radio" name="visa status" value="expat_permanent_residency" className='radioCheckForVisa' {...register("visaStatus")} /></td>
                <td className='tableBody'><input type="radio" name="visa status" value="any_other_status" className='radioCheckForVisa' {...register("visaStatus")} /></td>
              </tr>
            </tbody>
          </table>
          <div className='permitContainer'>
            <div className='passportValidContainer'>
              <label>Legal Right to work in country<span className='separatorForPrevEmpName'>:</span></label>
              {/* <input type='text' placeholder='Yes or No' className='legalRightInput' {...register("legalRight")} /> */}
              <label>
                <input
                  type='radio' className='radioYes' name='legalRight' value='yes'
                  {...register("legalRight")}
                />
                Yes
              </label>
              <label>
                <input
                  type='radio' className='radioYes' name='legalRight' value='no'
                  {...register("legalRight")}
                />
                No
              </label>
            </div>
            <div className='workPermitContainer'>
              <label>Work permit valid till<span className='separatorForPassport'>:</span></label>
              <input type='date' placeholder='select date' className='workPermitInput' {...register("workPermit")}
                onChange={handlePassportWorkPermitDateColorChange} style={{ color: passportWorkPermitDateColor }} />
            </div>
          </div>
          <div className='permitContainer'>
            <div className='workPermitDetailContainer'>
              <label>Mention the details of work permit<span className='separatorForWorkPermit'>:</span></label>
              <input type='text' className='workPermitDetailInput' {...register("workPermitDetails")} />
            </div>
          </div>
          <div className='passportCopyContainer'>
            <div>
              <label>Passport Copy<span className='separatorForPassportCopy'> : </span></label>
              <input type='text' placeholder='Passport Copy' className="passportInput" {...register("passportCopy")} />
            </div>
            <div style={{ marginTop: '-3px', marginLeft: '-572px' }}>
              <input type='file' className="profUploadFileInput" ref={passportFileInputRef}
                //  {...register("passportCopyFile")}
                onChange={handleFileForPassportCopy} />
              <button type="button" className="passportCopyUpload" onClick={handleFileUpload}>upload</button>
            </div>
            {errorForPassportCopyFileSize && <div className='passportCopyErrorMessage'>{errorForPassportCopyFileSize}</div>}
            {customErrorForPassportCopyDocUpload && <div className='passportCopyErrorMessage'>{customErrorForPassportCopyDocUpload}</div>}
            {successfulProfPassportCopyDocUploadMsg && <div className='passportCopyErrorMessage' style={{ color: 'green', fontSize: '14px', fontWeight: 'bold' }}>{successfulProfPassportCopyDocUploadMsg}</div>}
            {passportCopyDoc && (<img src={require("assets/img/file-cut-icon.png")} alt="..." className='cross-icon' onClick={() => handleRemoveFile("passportCopyFile")} />)}
          </div>
          {/* save buttons */}
          <div className='educationSaveButtons'>
            <button type="button" className="profBackBtn" onClick={backToEducationalPage}>Back</button>
            <button type="button" className="saveBtn" onClick={saveInLocalStorage}>Save Draft</button>
            <button type="submit" className="saveNextBtn">Save And Next </button>
          </div>
        </form>
      </div>
    </div>
  )
}

