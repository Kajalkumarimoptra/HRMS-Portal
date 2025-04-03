import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormContext } from 'components/ContextProvider/Context';
import { useRegistrationContext } from 'components/ContextProvider/RegistrationDataContext';
import PassportPhoto from './PassportPhoto';
import Navbar from './Navbar';

export default function PersonalDetailsForm() {

  const navigate = useNavigate();
  const {
    register, handleSubmit, errors, onSubmit, setValue, watch, reset, clearErrors
  } = useFormContext();
  const { registrationData } = useRegistrationContext();  // Access registration data from context
  const [selectPersonalDetailGenderColor, setPersonalDetailGenderColor] = useState("#d3d3d3"); // for giving diff color to select placeholder and option
  const [selectPersonalDetailDateColor, setPersonalDetailDateColor] = useState("#d3d3d3"); // for giving diff color to date placeholder and option
  const [patternForFirstName, setPatternForFirstName] = useState(''); // pattern for firstname
  const [patternForMiddleName, setPatternForMiddleName] = useState(''); // pattern for middle name
  const [patternForLastName, setPatternForLastName] = useState(''); // pattern for last name
  const [patternForMotherName, setPatternForMotherName] = useState(''); // pattern for mother name
  const [patternForFatherName, setPatternForFatherName] = useState(''); // pattern for father name
  const [patternForMobNo, setPatternForMobNo] = useState(''); // pattern for mob. no.
  const [patternForAadhar, setPatternForAadhar] = useState(''); // pattern for aadhar
  const [patternForPan, setPatternForPan] = useState(''); // pattern for pan no.
  const [patternForPassport, setPatternForPassport] = useState(''); // pattern for passport no.
  const [customErrorForPassport, setCustomErrorForPassport] = useState(''); // error msg for its pattern failure
  const [aadharDoc, setAadharDoc] = useState(''); // state for holding aadhar file
  const [errorForAadharFileSize, setErrorForAadharFileSize] = useState(''); // error for wrong file size
  const [panDoc, setPanDoc] = useState(''); // state for holding pan  file
  const [errorForPanFileSize, setErrorForPanFileSize] = useState(''); // error for wrong file size
  const [passportDoc, setPassportDoc] = useState(''); // state for holding passport file
  const [errorForPassportFileSize, setErrorForPassportFileSize] = useState(''); // error for wrong file size
  const fileInputRefs = useRef({}); // Object to store multiple refs
  const [selectedFiles, setSelectedFiles] = useState({});
  const [successfulUploadMsg, setSuccessfulUploadMsg] = useState({
    fileForAadhar: '',
    fileForPan: '',
    fileForPassport: '',
  }); // state for displaying successful upload msg

  const [pattern, setPattern] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    motherName: '',
    fatherName: '',
    mobNo: '',
    aadharNo: '',
    panNo: ''
  }); // state for overall handling of pattern

  const [customErrorForPattern, setCustomErrorForPattern] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    motherName: '',
    fatherName: '',
    mobNo: '',
    aadharNo: '',
    panNo: '',
    passportNo: '',
  }); // error msg for its failure

  const [doc, setDoc] = useState({
    fileForAadhar: '',
    fileForPan: '',
    fileForPassport: '',
  }) // state for overall handling of documents validation

  const [customErrorForDoc, setCustomErrorForDoc] = useState({
    fileForAadhar: '',
    fileForPan: '',
    fileForPassport: '',
  }) // error msg for its failure

  const [fileUploaded, setFileUploaded] = useState({
    fileForAadhar: false,
    fileForPan: false,
    fileForPassport: false
  }); // Tracks if files have been uploaded

  const [customErrorForDocUpload, setCustomErrorForDocUpload] = useState({
    fileForAadhar: '',
    fileForPan: '',
    fileForPassport: '',
  }); // error msg on not uploading the file

  // pattern failure validation 
  const handlePatternForPersonalDetailInputs = (e, pattern, field) => {
    let value = e.target.value;
    setPattern(prev => ({ ...prev, [field]: value }))
    if (field === 'firstName') setPatternForFirstName(value);
    if (field === 'middleName') setPatternForMiddleName(value);
    if (field === 'lastName') setPatternForLastName(value);
    if (field === 'motherName') setPatternForMotherName(value);
    if (field === 'fatherName') setPatternForFatherName(value);
    if (field === 'mob') setPatternForMobNo(value);
    if (field === 'aadharNo') setPatternForAadhar(value);
    if (field === 'panNo') setPatternForPan(value);
    if (field === 'passport') setPatternForPassport(value);

    let patternErrorMessage = '';
    if ((field === 'firstName' || field === 'middleName' || field === 'lastName' || field === 'motherName' || field === 'fatherName') && value && !pattern.test(value)) {
      patternErrorMessage = 'No numbers or special characters are allowed';
    }
    else if (field === 'mob') {
      // If mobile number exceeds 10 digits, slice it to 10 digits
      if (value.length > 10) {
        value = value.slice(0, 10); // Slice to 10 digits
      }
      // perform validation
      if (value && !pattern.test(value)) {
        patternErrorMessage = 'Only numbers are allowed';
      }
      setPatternForMobNo(value);
    }

    else if (field === 'aadharNo') {
      // If mobile number exceeds 10 digits, slice it to 10 digits
      if (value.length > 12) {
        value = value.slice(0, 12); // Slice to 10 digits
      }
      // perform validation
      if (value && !pattern.test(value)) {
        patternErrorMessage = 'Only numbers are allowed';
      }
      setPatternForAadhar(value);
    }
    else if (field === 'panNo') {
      // If mobile number exceeds 10 digits, slice it to 10 digits
      if (value.length > 10) {
        value = value.slice(0, 10); // Slice to 10 digits
      }
      // perform validation
      if (value && !pattern.test(value)) {
        patternErrorMessage = 'Please fill the blank as per the right format of Pan No.';
      }
      setPatternForPan(value);
    }
    setCustomErrorForPattern(prev => ({ ...prev, [field]: patternErrorMessage }));
    // Clear error if input is valid
    if (patternErrorMessage === '') {
      clearErrors(field);
    }
  }

  const handlePatternForPassport = (e) => {
    const value = e.target.value;
    setPatternForPassport(value);

    // Regular expression to check if the value contains more than one space
    const moreThanOneSpaceRegex = /\s{2,}/;

    if (value && moreThanOneSpaceRegex.test(value)) {
      setCustomErrorForPassport('Please fill the blank as per the right format of Passport No.');
    } else if (value && !/^[A-Z0-9\s]+$/.test(value)) {
      setCustomErrorForPassport('Please fill the blank as per the right format of Passport No.');
    } else {
      setCustomErrorForPassport('');
    }
  };

  // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
  const handlePersonalDetailsDateColorChange = (e) => {
    const selectedValue = e.target.value;
    setPersonalDetailDateColor(selectedValue ? "black" : "#d3d3d3");
    clearErrors('dob');
  };
  const handlePersonalDetailsGenderColorChange = (e) => {
    const selectedValue = e.target.value;
    setPersonalDetailGenderColor(selectedValue ? "black" : "#d3d3d3");
    clearErrors('gender');
  };
  // const handleFileForDocs = (e, field) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const fileType = file.type;
  //     const allowedFileTypes = ["application/pdf"];  // file type allowed
  //     if (!allowedFileTypes.includes(fileType)) {
  //       window.alert("Only PDF files are supported");
  //       e.target.value = ''; // Reset the input field
  //       setFileUploaded(prev => ({ ...prev, [field]: false })); // Mark the file as not uploaded on invalid file type
  //       return;
  //     }

  //     const fileSize = file.size;
  //     if (fileSize / 1024 > 20) {
  //       setCustomErrorForDoc(prev => ({ ...prev, [field]: "File should be less than or upto 20kb" }));  // file size validation
  //       e.target.value = '';
  //       setFileUploaded(prev => ({ ...prev, [field]: false })); // Mark the file as not uploaded on invalid file size
  //       return;
  //     }

  //     // Clear previous file and upload state if a new file is selected
  //     setCustomErrorForDoc(prev => ({ ...prev, [field]: '' }));
  //     setFileUploaded(prev => ({ ...prev, [field]: false }));  // Mark the new file as not uploaded until being uploaded
  //     setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' }));
  //     setDoc(prev => ({ ...prev, [field]: file })); // set all the files in their state
  //     if (field === 'fileForAadhar') setAadharDoc(file);
  //     if (field === 'fileForPan') setPanDoc(file);
  //     if (field === 'fileForPassport') setPassportDoc(file);
  //   }
  //   else {
  //     // Reset file and errors if no file selected
  //     setDoc(prev => ({ ...prev, [field]: null }));
  //     setFileUploaded(prev => ({ ...prev, [field]: false }));
  //     setCustomErrorForDoc(prev => ({ ...prev, [field]: '' }));
  //     setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' }));
  //   }
  // }

  // const handleFileUpload = (field) => {
  //   if (doc[field]) {
  //     setValue(field, doc[field]); // Manually set the file in React Hook Form on upload button click
  //     setFileUploaded(prev => ({ ...prev, [field]: true })); // Mark the file as uploaded on upload click
  //     setSuccessfulUploadMsg(prev => ({ ...prev, [field]: 'Uploaded successfully' }));
  //     setCustomErrorForDocUpload(prev => ({ ...prev, [field]: '' })); // Clear any previous error messages
  //   }
  //   else {
  //     setCustomErrorForDocUpload(prev => ({ ...prev, [field]: 'Please upload a file' }));
  //     setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' }));
  //   }
  // };

  const handleFileForDocs = (e, field, setImageSizeError, setPhoto, setLoading, uploadAllowed, setImgDirection, isCropping, setIsCropping) => {
    const file = e.target.files[0];
    console.log(`Selected file for ${field}:`, file);

    // Clear error messages immediately upon file selection
    setCustomErrorForDoc(prev => ({ ...prev, [field]: '' }));
    setCustomErrorForDocUpload(prev => ({ ...prev, [field]: '' })); // Clear any upload errors
    setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' })); // Clear success message
    setFileUploaded(prev => ({ ...prev, [field]: false })); // Reset file uploaded state
    setPhoto && setPhoto(''); // Clear previous photo
    setImageSizeError && setImageSizeError(''); // Clear previous error
    setImgDirection && setImgDirection(true);

    if (file) {
      const fileType = file.type;
      console.log(`File type for ${field}:`, fileType);
      let allowedFileTypes;

      // Conditional check for file types based on the field (photo vs documents)
      if (field === 'photo') {
        allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg']; // Image file types for passport photo
      } else {
        allowedFileTypes = ['application/pdf']; // Allowed file types for documents
      }

      // File type validation
      if (!allowedFileTypes.includes(fileType)) {
        window.alert(field === 'photo' ? 'Only image files (JPEG, PNG) are supported for passport photo.' : 'Only PDF files are supported');
        e.target.value = ''; // Reset the input field
        setFileUploaded(prev => ({ ...prev, [field]: false })); // Mark the file as not uploaded
        return;
      }

      // File size validation
      const fileSize = file.size / 1024; //file size in kb
      console.log(`File size for ${field}:`, fileSize);
      let maxSize = 20; // 20 KB for both image and document
      let minSize = 10;

      if (field === 'photo' && (fileSize > maxSize || fileSize < minSize)) {
        setImageSizeError("Image size should be between 10kb-20kb");
        e.target.value = ''; // Reset the input field
        setFileUploaded(prev => ({ ...prev, [field]: false }));
        return;
      }
      else if (field !== 'photo' && fileSize > maxSize) {
        setCustomErrorForDoc(prev => ({ ...prev, [field]: "File should be less than or up to 20kb" }));
        console.log('document size error:', customErrorForDoc);
        e.target.value = ''; // Reset the input field
        setFileUploaded(prev => ({ ...prev, [field]: false }));
        return;
      }

      setDoc(prev => ({ ...prev, [field]: file }));
      console.log("doc state before upload:", doc);
      console.log("File being passed:", file);


      // Clear previous file and upload state if a new file is selected
      setCustomErrorForDoc(prev => ({ ...prev, [field]: '' }));
      setFileUploaded(prev => ({ ...prev, [field]: false }));
      setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' }));
      setImageSizeError && setImageSizeError('');
      if(field === 'photo') {
        const tempURL = URL.createObjectURL(file); // Temporary URL for preview
        setLoading(true); // Start loading spinner
        console.log('Temporary URL:', tempURL); // Debugging line to ensure temp URL is created
        setImgDirection && setImgDirection(false);

        setTimeout(() => {
          setPhoto(tempURL); // Set the photo preview
          setLoading(false); // Stop loading spinner
          setValue('photo', file); // Save the file in the form state
          console.log('photo saved:', file);
          setFileUploaded((prev) => ({ ...prev, [field]: true })); // Mark the file as uploaded
          setImgDirection && setImgDirection(false);
          setIsCropping && setIsCropping(true);
          console.log('Before calling handleFileUpload: ', { uploadAllowed, isCropping });

          // Call handleFileUpload after file validation is done
          handleFileUpload(field, setImageSizeError, setPhoto, setImgDirection, uploadAllowed, isCropping, setIsCropping); // Upload the file
        }, 1000); // Simulated delay for uploading
      }
    } else {
      // Reset file and errors if no file is selected
      setDoc((prev) => ({ ...prev, [field]: null }));
      setFileUploaded((prev) => ({ ...prev, [field]: false }));
      setCustomErrorForDoc((prev) => ({ ...prev, [field]: '' }));
      setSuccessfulUploadMsg((prev) => ({ ...prev, [field]: '' }));
    }
  };

  useEffect(() => {
    console.log('Updated doc:', doc);
  }, [doc]);

  const handleFileUpload = async (field, setImageSizeError, setPhoto, setImgDirection, uploadAllowed, isCropping, setIsCropping) => {
    console.log('Upload allowed:', uploadAllowed);
    console.log('Is cropping:', isCropping);
    // Check if upload is allowed (uploadAllowed flag) and if cropping is completed (isCropping flag)
    if (field === 'photo' && (!uploadAllowed || isCropping)) {
      console.log(`Upload blocked for ${field}, UploadAllowed: ${uploadAllowed}, IsCropping: ${isCropping}`);
      return;
    }
    const file = field === 'photo' ? doc[field] : fileInputRefs.current[field]?.files[0];
    console.log(file);
    if (!file) {
      console.log(`No file found for ${field}, setting error`);
      setImageSizeError && setImageSizeError('Please select a file to upload');
      setCustomErrorForDocUpload(prev => ({ ...prev, [field]: 'Please select a file to upload' }));
      setPhoto && setPhoto('');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    console.log('FormData being sent:', formData);
    console.log('cropping status before uploading:', isCropping);

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
        // setDoc(prev => {
        //   const updatedDoc = { ...prev, [field]: file };
        //   console.log(`Updated doc for ${field}:`, updatedDoc);
        //   return updatedDoc;
        // });        
        setDoc(prev => ({ ...prev, [field]: fileUrl }));
        setFileUploaded(prev => ({ ...prev, [field]: true }));
        setSuccessfulUploadMsg(prev => ({ ...prev, [field]: 'Uploaded successfully' }));

        // Clear any previous error for this field
        setCustomErrorForDocUpload(prev => ({ ...prev, [field]: '' }));
        setImageSizeError && setImageSizeError('');
        setIsCropping && setIsCropping(false);
        setImgDirection && setImgDirection(false);
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
        if (errorMessage && errorMessage.includes('File already exists')) {
          console.log('file already exist error:', errorMessage);
          setCustomErrorForDocUpload(prev => ({ ...prev, [field]: 'This file is already uploaded' }));
          setImageSizeError && setImageSizeError('This file already exist');
          setPhoto && setPhoto('');
          setImgDirection && setImgDirection(false);
          setFileUploaded(prev => ({ ...prev, [field]: false }));
          setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' }));
          setIsCropping && setIsCropping(false);
          // **Reset input field** so the same file can be selected again
          if (fileInputRefs.current[field]) {
            fileInputRefs.current[field].value = '';
          }
          return;
        } else {
          console.log('common error:', errorMessage);
          setCustomErrorForDocUpload(prev => ({ ...prev, [field]: 'Upload failed, Please try again' }));
          setImageSizeError && setImageSizeError('Upload failed, Please try again');
          setPhoto && setPhoto('');
          setFileUploaded(prev => ({ ...prev, [field]: false }));
          setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' }));
          setIsCropping && setIsCropping(false);
          if (fileInputRefs.current[field]) {
            fileInputRefs.current[field].value = '';
          }
          return;
        }
      }
      else {
        // Handle generic errors
        setCustomErrorForDocUpload(prev => ({ ...prev, [field]: 'Upload failed, Please try again' }));
        setImageSizeError && setImageSizeError('Upload failed, Please try again');
        setPhoto && setPhoto('');
        setFileUploaded(prev => ({ ...prev, [field]: false }));
        setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' }));
        setIsCropping && setIsCropping(false);
      }
    }
  };

  const handleRemoveFile = (field) => {
    setDoc(prev => ({ ...prev, [field]: null }));
    setFileUploaded(prev => ({ ...prev, [field]: false }));
    setCustomErrorForDocUpload(prev => ({ ...prev, [field]: '' }));
    setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' }));


    // Reset the file input field using React ref
    if (fileInputRefs.current[field]) { // ✅ Corrected
      fileInputRefs.current[field].value = ""; // ✅ Corrected
    }
  };

  useEffect(() => {
    if (!registrationData) {
      console.log("No registration data found");
    } else {
      console.log("Registration Data:", registrationData);
    }
  }, [registrationData]);


  const handleFormSubmit = async (data) => {
    console.log("Form submission triggered");
    console.log("Form data before submission:", data);

    // Upload the image and get the URL
    let imageUrl = doc.photo;
    if (data.photo && !imageUrl) {
      try {
        console.log("Uploading photo...");
        // Assuming handleFileUpload returns the URL of the uploaded image
        imageUrl = await handleFileUpload('photo');
        console.log('Returned Image URL:', imageUrl);
        if (!imageUrl) {
          console.error('Error: Image upload failed.');
          return; // Exit if image upload fails
        }
        // Ensure the doc state is updated before proceeding
        // setDoc(prev => ({ ...prev, photo: imageUrl }));
      } catch (error) {
        console.error("Error uploading image:", error);
        return; // Exit if the image upload fails
      }
    }

    const newPayload = {
      "createdDate": registrationData.createdDate || "",
      "dateOfBirth": registrationData.dateOfBirth || "",
      "email": registrationData.email || "",
      "password": registrationData.password || "",
      "fullName": registrationData.fullName || "",
      "mobileNumber": registrationData.mobileNumber || "",
      "roleName": "EMPLOYEE",
      "personalDetailsDTO": {
        "aadharNumber": data.aadharNo || "",
        "aadharUrl": doc.fileForAadhar || "",
        "dob": data.dob || "",
        "email": data.emailid || "",
        "fatherName": data.fatherName || "",
        "firstName": data.firstName || "",
        "gender": data.gender || "",
        "imageUrl": imageUrl || "",
        "middleName": data.middleName || "",
        "mobile": data.mob || "",
        "motherName": data.motherName || "",
        "panNumber": data.panNo || "",
        "panUrl": doc.fileForPan || "",
        "passportNumber": data.passport || "",
        "passportUrl": doc.fileForPassport || "",
        "surname": data.lastName || ""
      },
      "permanentAddress": {
        "houseNumber": "",
        "streetName": "",
        "town": "",
        "pincode": "",
        "state": "",
        "city": "",
        "stayFrom": "",
        "stayTo": "",
        "emergencyContactNumber": "",
        "emergencyContactNameAndRelationship": ""
      },
      "currentAddresses": {
        "sameAsPermanentAddress": false,
        "houseNumber": "",
        "streetName": "",
        "town": "",
        "pincode": "",
        "state": "",
        "city": "",
        "stayFrom": "",
        "stayTo": "",
        "emergencyContactNumber": "",
        "emergencyContactNameAndRelationship": ""
      },
      "addressDetails": [
        {
          "stayFrom": "",
          "stayTo": "",
          "addressLine": "",
          "pincode": "",
          "country": "",
          "contactNumberWithRelationship": ""
        },
        {
          "stayFrom": "",
          "stayTo": "",
          "addressLine": "",
          "pincode": "",
          "country": "",
          "contactNumberWithRelationship": ""
        }
      ],
      "educationalQualifications": [
        {
          "degreeName": "",
          "subject": "",
          "passingYear": "",
          "rollNumber": "",
          "gradeOrPercentage": ""
        },
        {
          "degreeName": "",
          "subject": "",
          "passingYear": "",
          "rollNumber": "",
          "gradeOrPercentage": ""
        }
      ],
      "documents": [

      ],
      "employmentHistories": [
        {
          "previousEmployerName": "",
          "employerAddress": "",
          "telephoneNumber": "",
          "employeeCode": "",
          "designation": "",
          "department": "",
          "managerName": "",
          "managerEmail": "",
          "managerContactNo": "",
          "reasonsForLeaving": "",
          "employmentStartDate": "",
          "employmentEndDate": "",
          "employmentType": "",
          "experienceCertificateUrl": "",
          "relievingLetterUrl": "",
          "lastMonthSalarySlipUrl": "",
          "appointmentLetterUrl": ""
        },
        {
          "previousEmployerName": "",
          "employerAddress": "",
          "telephoneNumber": "",
          "employeeCode": "",
          "designation": "",
          "department": "",
          "managerName": "",
          "managerEmail": "",
          "managerContactNo": "",
          "reasonsForLeaving": "",
          "employmentStartDate": "",
          "employmentEndDate": "",
          "employmentType": "",
          "experienceCertificateUrl": "",
          "relievingLetterUrl": "",
          "lastMonthSalarySlipUrl": "",
          "appointmentLetterUrl": ""
        }
      ],
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
          "remarks": "."
        },
        {
          "name": "",
          "employeeId": "",
          "relationship": "",
          "department": "",
          "location": "",
          "remarks": "."
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

    console.log("Payload of personal details page :", newPayload);

    let docsUpload = false;
    // check files are uploaded or not
    if (!fileUploaded.fileForAadhar) {
      setCustomErrorForDocUpload(prev => ({ ...prev, fileForAadhar: 'Please upload your Aadhar Card' }));
      docsUpload = true;
    }
    if (!fileUploaded.fileForPan) {
      setCustomErrorForDocUpload(prev => ({ ...prev, fileForPan: 'Please upload your Pan card' }));
      docsUpload = true;
    }

    if (data.passport) {
      console.log("Passport entered, checking fileForPassport");
      if (!fileUploaded.fileForPassport) {
        setCustomErrorForDocUpload(prev => ({ ...prev, fileForPassport: 'Please upload your Passport' }));
        docsUpload = true;
      } else {
        setCustomErrorForDocUpload(prev => ({ ...prev, fileForPassport: '' }));
      }
    }
    else {
      setCustomErrorForDocUpload(prev => ({ ...prev, fileForPassport: '' }));
    }

    if (docsUpload) {
      console.error("Document upload validation failed.");
      return;
    }
    console.log("All required documents are uploaded.");

    // Clear custom errors if all files are uploaded
    setCustomErrorForDocUpload({
      fileForAadhar: '',
      fileForPan: '',
      fileForPassport: ''
    });

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      console.log('token needed:', token);
      if (!token) {
        setServerError('Authentication issue');
        return; // Exit if token is not found
      }

      const response = await axios.post("http://localhost:8081/primaryDetails/save", newPayload, {

        headers: {
          'Authorization': `Bearer ${token}`
        },

      });
      console.log("Server response:", response);
      if (response && response.data) {
        console.log("Form submitted successfully:", response.data);
        sessionStorage.setItem('personalDetails', JSON.stringify(response.data.personalDetails));
        navigate("/contactdetailsform");
        reset();
        setPersonalDetailDateColor("#d3d3d3");
        setPersonalDetailGenderColor("#d3d3d3");
      } else {
        // Handle the 403 Forbidden error
        if (response.status === 403) {
          console.error("403 Forbidden error: ", response.data.message || "Access Denied");
        } else {
          console.error("Error submitting form. Status:", response.status);
          console.error("Error details:", response.data);
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data.message || error.response.data);
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
    console.log('saved personal detaildata:', data);
  }

  return (
    <div className='container-fluid form-navbar'>
      <Navbar />

      <div className='personaldetail-form'>
        <form>

          {/*general data */}

          <div className='UniversalHeadline'>
            <h6 className='mainHeading'>ASSOCIATE INFORMATION AND ONBOARDING FORM</h6>
          </div>
          <div className='noteHeading'>
            <h5 className='noteContent'>Note:<span className='noteDescription'>Please update all cells with correct and relevant data. The information provided in this document
              will form part of your official records in the Company<br /> and is subjected to verification.</span></h5>
          </div>
          <hr />

          {/* <div className='basicInformation'>
          <div className='empId'>
            <label>Employee ID :</label>
            <input type='text' placeholder='Employee ID' />
          </div>
          <div className='dateOfJoining'>
            <label>Date of Joining :</label>
            <input type='date' placeholder='DD/MM/YYYY' />
          </div>
          <div className='workPlace'>
            <label>Place of Work :</label>
            <input type='text' placeholder='Place of Work' className='placeInput' />
          </div>
          <div className='empType'>
            <label>Employment Type :</label>
            <select>
              <option hidden>Select Employment Type</option>
              <option>Permanent</option>
              <option>Temporary</option>
              <option>Contractual</option>
            </select>
          </div>
        </div> */}
        </form>
        {/* <hr /> */}

        {/* personal detail form */}
        <div className='personalDetailForm' >

          <div className='personalDetailHeading'> <h6 className='personalDetailHeadline'>PERSONAL DETAILS</h6> </div>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='personalDetailContainer' >

            <div className='inputContainer'>
              <div>
                <label className='nameLabel'>First Name<span className='required'>*</span> <span className='separationForFirstName'> : </span></label>
                <input type='text' placeholder='First Name' className={`firstNameInput ${errors.firstName ? 'invalid' : ''}`} {...register("firstName", { required: true, maxLength: 50 })}
                  value={pattern.firstName} onChange={(e) => handlePatternForPersonalDetailInputs(e, /^[A-Za-z\s]+$/, 'firstName')}
                />
                {customErrorForPattern.firstName ? <div className="errorMessage">{customErrorForPattern.firstName}</div> : ''}
              </div>
              <div>
                <label className='nameLabel'>Middle Name <span className='separationForMiddleName'> : </span></label>
                <input type='text' placeholder='Middle Name' className='middleNameInput' {...register("middleName", { maxLength: 50 })}
                  value={pattern.middleName} onChange={(e) => handlePatternForPersonalDetailInputs(e, /^[A-Za-z\s]+$/, 'middleName')} />
                {customErrorForPattern.middleName ? <div className="errorMessage">{customErrorForPattern.middleName}</div> : ''}
              </div>
              <div>
                <label className='nameLabel'>Last Name <span className='required'>*</span><span className='separationForsurName'> : </span></label>
                <input type='text' placeholder='Last Name' className={`surNameInput  ${errors.lastName ? 'invalid' : ''}`} {...register("lastName", { required: true, maxLength: 50 })}
                  value={pattern.lastName} onChange={(e) => handlePatternForPersonalDetailInputs(e, /^[A-Za-z\s]+$/, 'lastName')} />
                {customErrorForPattern.lastName ? <div className="errorMessage">{customErrorForPattern.lastName}</div> : ''}
              </div>
            </div>
            <div>
              <PassportPhoto handleFileForDocs={handleFileForDocs} />
            </div>
            <div className='dobGenderContainer'>
              <div>
                <label>Date of Birth <span className='required'>*</span> <span className='separationForDOB'> : </span></label>
                <input type='date' placeholder='DD/MM/YYYY' className={`dobInput ${errors.dob ? 'invalid' : ''}`} {...register("dob", { required: true })}
                  onChange={handlePersonalDetailsDateColorChange} style={{ color: selectPersonalDetailDateColor }} />
              </div>
              <div className='genderContainer'>
                <label className='genderLabel'>Gender <span className='required'>*</span> <span className='separationForGender'> : </span></label>
                <select className={`selectGenderInput ${errors.gender ? 'invalid' : ''}`}  {...register("gender", { required: true })}
                  onChange={handlePersonalDetailsGenderColorChange} style={{ color: selectPersonalDetailGenderColor }} >
                  <option value='' hidden style={{ color: "#d3d3d3" }}>Select Gender</option>
                  <option style={{ color: "black" }}>Male</option>
                  <option style={{ color: "black" }}>Female</option>
                </select>
              </div>
            </div>

            <div className='inputContainer'>
              <div>
                <label>Mother Name <span className='required'>*</span> <span className='separationForMotherName'> : </span></label>
                <input type='text' placeholder='Mother Name' className={`motherNameInput  ${errors.motherName ? 'invalid' : ''}`} {...register("motherName", { required: true, maxLength: 50 })}
                  value={pattern.motherName} onChange={(e) => handlePatternForPersonalDetailInputs(e, /^[A-Za-z\s]+$/, 'motherName')} />
                {customErrorForPattern.motherName ? <div className="errorMessage">{customErrorForPattern.motherName}</div> : ''}
              </div>
            </div>

            <div className='fatherNameContainer'>
              <div>
                <label>Father Name <span className='required'>*</span> <span className='separationForFatherName'> : </span></label>
                <input type='text' placeholder='Father Name' className={`fatherNameInput ${errors.fatherName ? 'invalid' : ''}`} {...register("fatherName", { required: true, maxLength: 50 })}
                  value={pattern.fatherName} onChange={(e) => handlePatternForPersonalDetailInputs(e, /^[A-Za-z\s]+$/, 'fatherName')} />
                {customErrorForPattern.fatherName ? <div className="errorMessage">{customErrorForPattern.fatherName}</div> : ''}
              </div>
            </div>

            <div className='fatherNameContainer'>
              <div>
                <label>Email ID <span className='required'>*</span> <span className='separationForEmail'> : </span></label>
                <input type='email' placeholder='Email ID' className={`emailInput ${errors.emailid ? 'invalid' : ''}`} {...register("emailid", { required: true, maxLength: 50 })} />
              </div>
            </div>

            <div className='smallGrpContainer'>
              <div>
                <label>Mobile Number <span className='required'>*</span> <span className='separationForMob'> : </span></label>
                <input type='telephone' placeholder='Mobile No.' className={`mobInput ${errors.mob ? 'invalid' : ''}`} {...register("mob", {
                  required: true,
                  minLength: {
                    value: 10,
                    message: 'Mobile no. must be of ten digits'
                  }
                })}
                  value={pattern.mob} onChange={(e) => handlePatternForPersonalDetailInputs(e, /^[0-9]+$/, 'mob')} />
                {customErrorForPattern.mob ? <div className="errorMessage">{customErrorForPattern.mob}</div> : ''}
                {errors.mob && (<div className="errorMessage">{errors.mob.message}</div>)}
              </div>
            </div>

            <div className='smallGrpContainer'>
              <div>
                <label>Aadhaar No. <span className='required'>*</span> <span className='separationForAadhar'> : </span></label>
                <input type='text' placeholder='Aadhaar Number' className={`aadharInput ${errors.aadharNo ? 'invalid' : ''}`} {...register("aadharNo", {
                  required: true,
                  minLength: {
                    value: 12,
                    message: 'Aadhar no. must be of twelve digits'
                  }
                })}
                  value={pattern.aadharNo} onChange={(e) => handlePatternForPersonalDetailInputs(e, /^[0-9]+$/, 'aadharNo')} />
                {customErrorForPattern.aadharNo ? <div className="errorMessage">{customErrorForPattern.aadharNo}</div> : ''}
                {errors.aadharNo && (<div className="errorMessage">{errors.aadharNo.message}</div>)}
              </div>
              <div className='fileInputContainer'>
                <input type='file' className={`uploadFileInput ${errors.fileForAadhar ? 'invalid' : ''}`}
                  onChange={(e) => handleFileForDocs(e, 'fileForAadhar') }
                  ref={(el) => {
                    if (el) fileInputRefs.current["fileForAadhar"] = el;
                  }}
                />
                {customErrorForDoc.fileForAadhar ? <div className="docErrorMessage">{customErrorForDoc.fileForAadhar}</div> : ''}
                <button type="button" className="upload" onClick={() => handleFileUpload('fileForAadhar')} >upload</button>
                {customErrorForDocUpload.fileForAadhar ? <div className="docUploadErrorMessage">{customErrorForDocUpload.fileForAadhar}</div> : ''}
                {successfulUploadMsg.fileForAadhar ? <div className="docUploadSuccessMessage">{successfulUploadMsg.fileForAadhar}</div> : ''}
                {doc["fileForAadhar"] && (<img src={require("assets/img/file-cut-icon.png")} alt="..." className='cross-icon' onClick={() => handleRemoveFile("fileForAadhar")} />)}
              </div>
            </div>
            <div className='smallGrpContainer'>
              <div>
                <label>Pan No. <span className='required'>*</span> <span className='separationForPan'> : </span></label>
                <input type='text' placeholder='Pan Number' className={`panInput  ${errors.panNo ? 'invalid' : ''}`}  {...register("panNo", {
                  required: true,
                  minLength: {
                    value: 10,
                    message: 'Aadhar no. must be of twelve digits'
                  }
                })}
                  value={pattern.panNo} onChange={(e) => handlePatternForPersonalDetailInputs(e, /^[A-Z0-9]+$/, 'panNo')} />
                {customErrorForPattern.panNo ? <div className="errorMessage">{customErrorForPattern.panNo}</div> : ''}
                {errors.panNo && (<div className="errorMessage">{errors.panNo.message}</div>)}
              </div>
              <div className='fileInputContainer'>
                <input type='file' className={`uploadFileInput ${errors.fileForPan ? 'invalid' : ''}`}
                  onChange={(e) => handleFileForDocs(e, 'fileForPan')}
                  ref={(el) => {
                    if (el) fileInputRefs.current["fileForPan"] = el; // ✅ Ensures ref is assigned
                  }} // Assign dynamic ref
                />
                {customErrorForDoc.fileForPan ? <div className="docErrorMessage">{customErrorForDoc.fileForPan}</div> : ''}
                <button type="button" className="upload" onClick={() => handleFileUpload('fileForPan')}>upload</button>
                {customErrorForDocUpload.fileForPan ? <div className="docUploadErrorMessage">{customErrorForDocUpload.fileForPan}</div> : ''}
                {successfulUploadMsg.fileForPan ? <div className="docUploadSuccessMessage">{successfulUploadMsg.fileForPan}</div> : ''}
                {doc["fileForPan"] && (<img src={require("assets/img/file-cut-icon.png")} alt="..." className='cross-icon' onClick={() => handleRemoveFile("fileForPan")} />)}
              </div>
            </div>

            <div className='smallGrpContainer'>
              <div>
                <label>Passport No. <span className='separationForPassport'> : </span></label>
                <input type='text' placeholder='Passport Number' className='passportInput' {...register("passport")}
                  value={patternForPassport} onChange={handlePatternForPassport} />
                {customErrorForPassport ? <div className="errorMessage">{customErrorForPassport}</div> : ''}
              </div>
              <div className='fileInputContainer'>
                <input type='file' className='uploadFileInput' onChange={(e) => handleFileForDocs(e, 'fileForPassport')}
                  ref={(el) => {
                    if (el) fileInputRefs.current["fileForPassport"] = el; // ✅ Ensures ref is assigned
                  }}  // Assign dynamic ref
                />
                {customErrorForDoc.fileForPassport ? <div className="docErrorMessage">{customErrorForDoc.fileForPassport}</div> : ''}
                <button type="button" className="upload" onClick={() => handleFileUpload('fileForPassport')}>upload</button>
                {customErrorForDocUpload.fileForPassport ? <div className="docUploadErrorMessage">{customErrorForDocUpload.fileForPassport}</div> : ''}
                {successfulUploadMsg.fileForPassport ? <div className="docUploadSuccessMessage">{successfulUploadMsg.fileForPassport}</div> : ''}
                {doc["fileForPassport"] && (<img src={require("assets/img/file-cut-icon.png")} alt="..." className='cross-icon' onClick={() => handleRemoveFile("fileForPassport")} />)}
              </div>
            </div>

            <div className='saveButtons'>
              <button type="button" className="saveBtn" onClick={saveInLocalStorage}>Save Draft</button>
              <button type="submit" className="saveNextBtn" onClick={() => console.log("buttonclicked")}>Save And Next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

