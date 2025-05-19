import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormContext } from 'components/ContextProvider/Context';
import { useRegistrationContext } from 'components/ContextProvider/RegistrationDataContext';
import PassportPhoto from './PassportPhoto';
import ProgressBar from 'layouts/ProgressBar';
import Navbar from './Navbar';
import ReusableProgessBar from 'layouts/ReusableProgessBar';
import { useEmail } from 'components/ContextProvider/EmailContext';
import UsePageIdentifier from 'components/CustomHooks/UsePageIdentifier';

export default function PersonalDetailsForm() {

  const navigate = useNavigate();
  const {
    register, handleSubmit, errors, onSubmit, setValue, watch, reset, clearErrors, unregister
  } = useFormContext();
  const pageIdentifier = UsePageIdentifier();
  const { registrationData } = useRegistrationContext();  // Access registration data from context
  const { emailForForms } = useEmail();
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

  // const [customErrorForDocUpload, setCustomErrorForDocUpload] = useState({
  //   fileForAadhar: '',
  //   fileForPan: '',
  //   fileForPassport: '',
  // }); // error msg on not uploading the file


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

  const handleFileForDocs = (e, field, setImageSizeError, setPhoto, setLoading, uploadAllowed, setImgDirection, isCropping, setIsCropping) => {
    const file = e.target.files[0];
    console.log(`Selected file for ${field}:`, file);

    // Clear error messages immediately upon file selection
    setCustomErrorForDoc(prev => ({ ...prev, [field]: '' }));
    // setCustomErrorForDocUpload(prev => ({ ...prev, [field]: '' })); // Clear any upload errors
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
        alert("File should be less than or up to 20kb");
        console.log('document size error:', customErrorForDoc);
        e.target.value = ''; // Reset the input field
        setFileUploaded(prev => ({ ...prev, [field]: false }));
        return;
      }

      setDoc(prev => ({ ...prev, [field]: file }));
      console.log("doc state before upload:", doc);
      console.log("File being passed:", file);
      handleFileUpload(field);


      // Clear previous file and upload state if a new file is selected
      setCustomErrorForDoc(prev => ({ ...prev, [field]: '' }));
      setFileUploaded(prev => ({ ...prev, [field]: false }));
      setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' }));
      setImageSizeError && setImageSizeError('');
      if (field === 'photo') {
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
    }
    else {
      if (!fileUploaded[field]) {
        // No file was previously uploaded, so we can safely clear state
        setDoc((prev) => ({ ...prev, [field]: null }));
        setFileUploaded((prev) => ({ ...prev, [field]: false }));
        setCustomErrorForDoc((prev) => ({ ...prev, [field]: '' }));
        setSuccessfulUploadMsg((prev) => ({ ...prev, [field]: '' }));
      }
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
      alert("Please select a file to upload");
      // setCustomErrorForDocUpload(prev => ({ ...prev, [field]: 'Please select a file to upload' }));
      setPhoto && setPhoto('');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    console.log('FormData being sent:', formData);
    console.log('cropping status before uploading:', isCropping);

    try {
      // Retrieve the tokenForFormsValidation from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setServerError('Authentication issue');
        return; // Exit if tokenForFormsValidation is not found
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
        setDoc(prev => ({
          ...prev,
          [field]: { file, url: fileUrl }
        }));
        setFileUploaded(prev => ({ ...prev, [field]: true }));
        setSuccessfulUploadMsg(prev => ({ ...prev, [field]: 'Uploaded successfully' }));

        // Clear any previous error for this field
        // setCustomErrorForDocUpload(prev => ({ ...prev, [field]: '' }));
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
          alert("This file is already uploaded");
          // setCustomErrorForDocUpload(prev => ({ ...prev, [field]: 'This file is already uploaded' }));
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
          alert("Upload failed, Please try again");
          // setCustomErrorForDocUpload(prev => ({ ...prev, [field]: 'Upload failed, Please try again' }));
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
        alert("Upload failed, Please try again");
        // setCustomErrorForDocUpload(prev => ({ ...prev, [field]: 'Upload failed, Please try again' }));
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
    // setCustomErrorForDocUpload(prev => ({ ...prev, [field]: '' }));
    setSuccessfulUploadMsg(prev => ({ ...prev, [field]: '' }));


    // Reset the file input field using React ref
    if (fileInputRefs.current[field]) {
      fileInputRefs.current[field].value = "";
    }
  };

  useEffect(() => {
    if (!registrationData) {
      console.log("No registration data found");
    } else {
      console.log("Registration Data:", registrationData);
    }
  }, [registrationData]);

  useEffect(() => {
    console.log("Current errors:", errors);
  }, [errors]);

  useEffect(() => {
    unregister(["otp0", "otp1", "otp2", "otp3", "otp4", "otp5"]);
  }, []);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const tokenForFormsValidation = localStorage.getItem('tokenForFormsValidation');
        console.log('tokenForFormsValidation needed for form validation:', tokenForFormsValidation);
        if (!tokenForFormsValidation) {
          setServerError('Authentication issue');
          return; // Exit if tokenForFormsValidation is not found
        }
        const response = await axios.get(`http://localhost:8081/onboarding?email=${emailForForms}&pageIdentifier=${pageIdentifier}`, {
          headers: {
            Authorization: `Bearer ${tokenForFormsValidation}`
          }
        });

        const data = response.data?.onboardingDetails;
        if (data?.personalDetails) {
          // Set the form values using React Hook Form's reset
          reset({
            fatherName: data.personalDetails.fatherName || "",
            motherName: data.personalDetails.motherName || "",
            mob: data.personalDetails.secondaryMobile || "",
            gender: data.personalDetails.gender || "",
            photo: data.personalDetails.imageUrl || "",
            aadharNo: data.aadharCardDetails?.aadharIdentificationNumber || "",
            panNo: data.panCardDetails?.panIdentificationNumber || "",
            passport: data.passportDetails?.passportNumber || ""
          });

          // If you're storing file URLs for preview/upload
          // e.g. for image preview or re-submission
          setDoc((prev) => ({
            ...prev,
            photo: data.personalDetails.imageUrl || "",
            fileForAadhar: {
              url: data.aadharCardDetails?.aadharIdentificationUrl || ""
            },
            fileForPan: {
              url: data.panCardDetails?.panIdentificationUrl || ""
            },
            fileForPassport: {
              url: data.passportDetails?.passportUrl || ""
            }
          }));
        }
      } catch (error) {
        console.error("Error fetching onboarding data:", error);
      }
    };

    fetchFormData();
  }, []);

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
      "personalDetails": {
        "fatherName": data.fatherName || "",
        "motherName": data.motherName || "",
        "secondaryMobile": data.mob || "",
        "gender": data.gender || "",
        "imageUrl": imageUrl || "",
        "fullName": registrationData.fullName || ""
      },
      "address": [],
      "education": [],
      "aadharCardDetails": {
        "aadharIdentificationNumber": data.aadharNo || "",
        "aadharIdentificationUrl": doc.fileForAadhar?.url || "",
      },
      "panCardDetails": {
        "panIdentificationNumber": data.panNo || "",
        "panIdentificationUrl": doc.fileForPan?.url || "",
      },
      "professionalReferences": [],
      "relatives": [],
      "employmentHistories": [],
      "passportDetails": {
        "passportNumber": data.passport || "",
        "passportUrl": doc.fileForPassport?.url || ""
      },
      "visaDetails": {},
      "otherDetails": {}


      // "primaryId": registrationData.primaryId || "",
      // "firstName": data.firstName || "",
      // "middleName": data.middleName || "",
      // "surname": data.lastName || "",
      // "imageUrl": imageUrl || "",
      // "dob": data.dob || "",
      // "gender": data.gender || "",
      // "motherName": data.motherName || "",
      // "fatherName": data.fatherName || "",
      // "email": data.emailid || "",
      // "mobile": data.mob || "",
      // "aadharNumber": data.aadharNo || "",
      // "aadharUrl": doc.fileForAadhar || "",
      // "panNumber": data.panNo || "",
      // "panUrl": doc.fileForPan || "",
      // "passportNumber": data.passport || "",
      // "passportUrl": doc.fileForPassport || ""
    }

    console.log("Payload of personal details page :", newPayload);

    const errors = {
      fileForAadhar: !fileUploaded.fileForAadhar ? 'Please upload your Aadhar Card' : '',
      fileForPan: !fileUploaded.fileForPan ? 'Please upload your Pan card' : '',
      fileForPassport: data.passport && !fileUploaded.fileForPassport ? 'Please upload your Passport' : '',
    };

    const hasErrors = Object.values(errors).some(val => val);

    if (hasErrors) {
      console.error("Document upload validation failed.");
      return;
    }
    console.log("All required documents are uploaded.");

    // Clear custom errors if all files are uploaded
    // setCustomErrorForDocUpload({
    //   fileForAadhar: '',
    //   fileForPan: '',
    //   fileForPassport: ''
    // });

    try {
      // Retrieve the token from localStorage
      const tokenForFormsValidation = localStorage.getItem('tokenForFormsValidation');
      console.log('tokenForFormsValidation needed for form validation:', tokenForFormsValidation);
      if (!tokenForFormsValidation) {
        setServerError('Authentication issue');
        return; // Exit if tokenForFormsValidation is not found
      }

      const onboardingId = localStorage.getItem('onboardingId');
      const url = `http://localhost:8081/onboarding?pageIdentifier=${pageIdentifier}&email=${emailForForms}`;

      const method = onboardingId ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: newPayload,
        headers: {
          'Authorization': `Bearer ${tokenForFormsValidation}`
        }
      });

      console.log("Server response:", response);

      if (response && response.data) {
        if (!onboardingId && response.data.onboardingId) {
          localStorage.setItem('onboardingId', response.data.onboardingId); // Save for future PUTs
        }

        console.log("Form submitted successfully:", response.data);
        // sessionStorage.setItem('personalDetails', JSON.stringify(response.data));
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
  const handleSaveDraft = async () => {
    const data = getValues(); // get form values without submit event
    console.log("Saving draft...");

    let imageUrl = doc.photo;
    if (data.photo && !imageUrl) {
      try {
        imageUrl = await handleFileUpload('photo');
        if (!imageUrl) {
          console.error('Image upload failed.');
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    const draftPayload = {
      "personalDetails": {
        "fatherName": data.fatherName || "",
        "motherName": data.motherName || "",
        "secondaryMobile": data.mob || "",
        "gender": data.gender || "",
        "imageUrl": imageUrl || "",
        "fullName": registrationData.fullName || ""
      },
      "address": [],
      "education": [],
      "aadharCardDetails": {
        "aadharIdentificationNumber": data.aadharNo || "",
        "aadharIdentificationUrl": doc.fileForAadhar?.url || "",
      },
      "panCardDetails": {
        "panIdentificationNumber": data.panNo || "",
        "panIdentificationUrl": doc.fileForPan?.url || "",
      },
      "professionalReferences": [],
      "relatives": [],
      "employmentHistories": [],
      "passportDetails": {
        "passportNumber": data.passport || "",
        "passportUrl": doc.fileForPassport?.url || ""
      },
      "visaDetails": {},
      "otherDetails": {}
    };

    try {
      const tokenForFormsValidation = localStorage.getItem('tokenForFormsValidation');
      if (!tokenForFormsValidation) {
        console.error("No tokenForFormsValidation found for draft saving.");
        return;
      }

      const onboardingId = localStorage.getItem('onboardingId');
      const url = `http://localhost:8081/onboarding?pageIdentifier=${pageIdentifier}&email=${emailForForms}`;

      const method = onboardingId ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: draftPayload,
        headers: { Authorization: `Bearer ${tokenForFormsValidation}` }
      });

      if (!onboardingId && response.data?.onboardingId) {
        localStorage.setItem('onboardingId', response.data.onboardingId);
      }

      alert("Draft saved successfully!");
      console.log("Draft saved:", response.data);

    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Error saving draft.");
    }
  };

  return (
    <div className='container-fluid form-navbar'>
      <Navbar />
      <div className='personaldetail-form'>
        {/* <h5 style={{textAlign: 'center', marginLeft:'-70px', marginTop: '5px'}}>Kajal Kumari</h5> */}
        <ReusableProgessBar>
          {/* <div className='UniversalHeadline'>
            <h6 className='mainHeading'>PRE-ONBOARDING FORM</h6>
          </div> */}
          {/* personal detail form */}
          <div className='personalDetailForm'>
            {/* <h5 style={{textAlign: 'center', marginLeft:'-70px', marginTop: '5px'}}>Kajal Kumari</h5> */}
            <div className='personalDetailHeading'>
              {/* <h6 className='personalDetailHeadline'>PERSONAL DETAILS</h6>  */}
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)} className='personalDetailContainer' >
              <div className='inputContainer'>
                <PassportPhoto handleFileForDocs={handleFileForDocs} />
              </div>
              {/* <div className='input-grp-Container'>
              <PassportPhoto handleFileForDocs={handleFileForDocs} />
              <div className='name-gender-container'>
              <h5 style={{marginLeft:'-250px', marginTop: '5px'}}>Kajal Kumari</h5>
              <div className='inputContainer' style={{width: '528px'}}>
                <label className='genderLabel'>Gender <span className='required'>*</span> 
                </label>
                <select className={`selectGenderInput ${errors.gender ? 'invalid' : ''}`}  {...register("gender", { required: true })}
                  onChange={handlePersonalDetailsGenderColorChange} style={{ color: selectPersonalDetailGenderColor }} >
                  <option value='' hidden style={{ color: "#d3d3d3" }}>Select Gender</option>
                  <option style={{ color: "black" }}>Male</option>
                  <option style={{ color: "black" }}>Female</option>
                </select>
              </div>
              </div>
            </div> */}
              {/* <div>
              <PassportPhoto handleFileForDocs={handleFileForDocs} />
            </div> */}
              <div className='inputContainer'>
                <label className='genderLabel'>Gender <span className='required'>*</span>
                  {/* <span className='separationForGender'> : </span> */}
                </label>
                <select className={`selectGenderInput ${errors.gender ? 'invalid' : ''}`}  {...register("gender", { required: true })}
                  onChange={handlePersonalDetailsGenderColorChange} style={{ color: selectPersonalDetailGenderColor }} >
                  <option value='' hidden style={{ color: "#d3d3d3" }}>Select Gender</option>
                  <option style={{ color: "black" }}>Male</option>
                  <option style={{ color: "black" }}>Female</option>
                </select>
              </div>
              <div className='inputContainer'>
                <label>Mother Name <span className='required'>*</span>
                </label>
                <input type='text' placeholder='Mother Name' className={`motherNameInput  ${errors.motherName ? 'invalid' : ''}`} {...register("motherName", { required: true, maxLength: 50 })}
                  value={pattern.motherName} onChange={(e) => handlePatternForPersonalDetailInputs(e, /^[A-Za-z\s]+$/, 'motherName')} />
                {customErrorForPattern.motherName ? <div className="errorMessage">{customErrorForPattern.motherName}</div> : ''}
              </div>

              <div className='inputContainer'>
                <label>Father Name <span className='required'>*</span></label>
                <input type='text' placeholder='Father Name' className={`fatherNameInput ${errors.fatherName ? 'invalid' : ''}`} {...register("fatherName", { required: true, maxLength: 50 })}
                  value={pattern.fatherName} onChange={(e) => handlePatternForPersonalDetailInputs(e, /^[A-Za-z\s]+$/, 'fatherName')} />
                {customErrorForPattern.fatherName ? <div className="errorMessage">{customErrorForPattern.fatherName}</div> : ''}
              </div>
              <div className='inputContainer'>
                <div className="inputWrapper">
                  <label>Aadhaar No. <span className='required'>*</span></label>
                  <div className='inputWithFileName'>
                    <div className="inputWithIcon">
                      <input type='text' placeholder='Aadhaar Number' className={`aadharInput ${errors.aadharNo ? 'invalid' : ''}`} {...register("aadharNo", {
                        required: true,
                        minLength: {
                          value: 12,
                          message: 'Aadhar no. must be of twelve digits'
                        }
                      })}
                        value={pattern.aadharNo} onChange={(e) => handlePatternForPersonalDetailInputs(e, /^[0-9]+$/, 'aadharNo')} />
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={(el) => fileInputRefs.current["fileForAadhar"] = el}
                        onChange={(e) => handleFileForDocs(e, 'fileForAadhar')}
                        style={{ display: 'none' }}
                      />

                      {/* Upload icon triggers hidden file input */}
                      <img
                        src={require("assets/img/upload-icon.png")}
                        alt="Upload"
                        className='upload-icon'
                        onClick={() => fileInputRefs.current["fileForAadhar"]?.click()}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                    {customErrorForPattern.aadharNo && <div className="errorMessage">{customErrorForPattern.aadharNo}</div>}
                    {errors.aadharNo && <div className="errorMessage">{errors.aadharNo.message}</div>}
                    {/* Show selected file name */}
                    <div style={{ display: 'flex', gap: '25px', alignItems: 'baseline' }}>
                      {doc["fileForAadhar"] && doc["fileForAadhar"].file && (
                        <div className="selectedFileName"><p>{doc["fileForAadhar"].file.name}</p></div>
                      )}
                      {/* {customErrorForDocUpload["fileForAadhar"] ? <div className="docUploadErrorMessage">{customErrorForDocUpload["fileForAadhar"]}</div> : ''} */}
                      {successfulUploadMsg["fileForAadhar"] ? <div className="docUploadSuccessMessage">{successfulUploadMsg["fileForAadhar"]}</div> : ''}
                    </div>
                  </div>
                </div>
                {/* <div className='fileInputContainer'>
                <input type='file' className={`uploadFileInput ${errors.fileForAadhar ? 'invalid' : ''}`}
                  onChange={(e) => handleFileForDocs(e, 'fileForAadhar')}
                  ref={(el) => {
                    if (el) fileInputRefs.current["fileForAadhar"] = el;
                  }}
                />
                {customErrorForDoc.fileForAadhar ? <div className="docErrorMessage">{customErrorForDoc.fileForAadhar}</div> : ''}
                <button type="button" className="upload" onClick={() => handleFileUpload('fileForAadhar')} >upload</button>
                {customErrorForDocUpload.fileForAadhar ? <div className="docUploadErrorMessage">{customErrorForDocUpload.fileForAadhar}</div> : ''}
                {successfulUploadMsg.fileForAadhar ? <div className="docUploadSuccessMessage">{successfulUploadMsg.fileForAadhar}</div> : ''}
                {doc["fileForAadhar"] && (<img src={require("assets/img/file-cut-icon.png")} alt="..." className='cross-icon' onClick={() => handleRemoveFile("fileForAadhar")} />)}
              </div> */}
              </div>
              <div className='inputContainer'>
                <div className="inputWrapper">
                  <label>Pan No. <span className='required'>*</span></label>
                  <div className='inputWithFileName'>
                    <div className="inputWithIcon">
                      <input type='text' placeholder='Pan Number' className={`panInput  ${errors.panNo ? 'invalid' : ''}`}  {...register("panNo", {
                        required: true,
                        minLength: {
                          value: 10,
                          message: 'Aadhar no. must be of twelve digits'
                        }
                      })}
                        value={pattern.panNo} onChange={(e) => handlePatternForPersonalDetailInputs(e, /^[A-Z0-9]+$/, 'panNo')} />
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={(el) => fileInputRefs.current["fileForPan"] = el}
                        onChange={(e) => handleFileForDocs(e, 'fileForPan')}
                        style={{ display: 'none' }}
                      />

                      {/* Upload icon triggers hidden file input */}
                      <img
                        src={require("assets/img/upload-icon.png")}
                        alt="Upload"
                        className='upload-icon'
                        onClick={() => fileInputRefs.current["fileForPan"]?.click()}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                    {customErrorForPattern.fileForPan && <div className="errorMessage">{customErrorForPattern.fileForPan}</div>}
                    {errors.fileForPan && <div className="errorMessage">{errors.fileForPan.message}</div>}
                    {/* Show selected file name */}
                    <div style={{ display: 'flex', gap: '25px', alignItems: 'baseline' }}>
                      {doc["fileForPan"] && doc["fileForPan"].file && (
                        <div className="selectedFileName"><p style={{ marginLeft: '75px' }}>{doc["fileForPan"].file.name}</p></div>
                      )}
                      {/* {customErrorForDocUpload["fileForPan"] ? <div className="docUploadErrorMessage">{customErrorForDocUpload["fileForPan"]}</div> : ''} */}
                      {successfulUploadMsg["fileForPan"] ? <div className="docUploadSuccessMessage">{successfulUploadMsg["fileForPan"]}</div> : ''}
                    </div>
                  </div>
                </div>
                {/* <div className='fileInputContainer'>
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
              </div> */}
              </div>

              <div className='inputContainer'>
                <div className="inputWrapper">
                  <label>Passport No.</label>
                  <div className='inputWithFileName'>
                    <div className='inputWithIcon'>
                      <input type='text' placeholder='Passport Number' className='passportInput' {...register("passport")}
                        value={patternForPassport} onChange={handlePatternForPassport} />

                      <input
                        type="file"
                        ref={(el) => fileInputRefs.current["fileForPassport"] = el}
                        onChange={(e) => handleFileForDocs(e, "fileForPassport")}
                        style={{ display: 'none' }}
                      />

                      {/* Upload icon triggers hidden file input */}
                      <img
                        src={require("assets/img/upload-icon.png")}
                        alt="Upload"
                        className='upload-icon'
                        onClick={() => fileInputRefs.current["fileForPassport"]?.click()}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                    {customErrorForPattern.fileForPassport && <div className="errorMessage">{customErrorForPattern.fileForPassport}</div>}
                    {errors.fileForPassport && <div className="errorMessage">{errors.fileForPassport.message}</div>}
                    {/* Show selected file name */}
                    <div style={{ display: 'flex', gap: '25px', alignItems: 'baseline' }}>
                      {doc["fileForPassport"] && doc["fileForPassport"].file && (
                        <div className="selectedFileName"><p>{doc["fileForPassport"].file.name}</p></div>
                      )}
                      {/* {customErrorForDocUpload["fileForPassport"] ? <div className="docUploadErrorMessage">{customErrorForDocUpload["fileForPassport"]}</div> : ''} */}
                      {successfulUploadMsg["fileForPassport"] ? <div className="docUploadSuccessMessage">{successfulUploadMsg["fileForPassport"]}</div> : ''}
                    </div>
                  </div>
                </div>
                {/* <div className='fileInputContainer' style={{right: '110px'}}>
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
              </div> */}
              </div>
              <div className='inputContainer'>
                <label>Alter. Mob. No. <span className='required'>*</span></label>
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

              <div className='saveButtons'>
                <button type="button" className="saveBtn" onClick={handleSaveDraft}>Save As Draft</button>
                <button type="submit" className="saveNextBtn" onClick={() => console.log("buttonclicked")}>Save And Next</button>
              </div>
            </form>
          </div>
        </ReusableProgessBar>
      </div>
    </div>
  );
}

