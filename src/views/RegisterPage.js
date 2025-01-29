import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormContext } from "../components/ContextProvider/Context";
import { useRegistrationContext } from 'components/ContextProvider/RegistrationDataContext';

function RegisterPage() {
    const {
        register, handleSubmit, onSubmit, reset, errors, serverError, setServerError, clearErrors, role, setRole
    } = useFormContext();
    const { setRegistrationData } = useRegistrationContext(); // Get the function from context to set registration data

    const [regFullName, setRegFullName] = useState(''); // state for holding fullname
    const [regMobNo, setRegMobNo] = useState(''); // state for holding mob no.
    const [isSubmitted, setIsSubmitted] = useState(false); // State for submission status

    const [pattern, setPattern] = useState({
        userFullName: '',
        userMobNo: ''
    }); // state for overall handling of pattern

    const [customErrorForRegInputs, setCustomErrorForRegInputs] = useState({
        userFullName: '',
        userMobNo: ''
    }); // error msg for its pattern failure

    useEffect(() => {
        const storedRole = sessionStorage.getItem('role');
        if (storedRole) {
            setRole(storedRole);
        }
    }, []);


    // pattern failure validation 
    const handlePatternForRegInputs = (e, pattern, field) => {
        let value = e.target.value;
        // Clear server error when the user starts typing again
        setServerError('');
        setPattern(prev => ({ ...prev, [field]: value }))
        if (field === 'userFullName') setRegFullName(value);
        if (field === 'userMobNo') setRegMobNo(value);

        let patternErrorMessage = '';
        if (field === 'userFullName' && value && !pattern.test(value)) {
            patternErrorMessage = 'No numbers or special characters are allowed';
        } else if (field === 'userMobNo') {
            // If mobile number exceeds 10 digits, slice it to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10); // Slice to 10 digits
            }
            // Perform validation
            if (value && !pattern.test(value)) {
                patternErrorMessage = 'Only numbers are allowed';
            } else if (value.length !== 10) {
                patternErrorMessage = 'Mobile number must be of 10 digits';
            }
            // Update the value after applying the limit of 10 digits
            setRegMobNo(value);
        }
        setCustomErrorForRegInputs(prev => ({ ...prev, [field]: patternErrorMessage }));

        // If there's no error, clear the error message for the field
        if (!patternErrorMessage) {
            setCustomErrorForRegInputs(prev => ({ ...prev, [field]: '' }));
            clearErrors(field);  // This will clear the react-hook-form error for the field
        }
    };

    // Handle form submission
    const handleFormSubmit = async (data) => {
        console.log("Form submission initiated");
        console.log("Submitting data:", data);
        console.log(data.userEmail);

        const newPayload = {
            "fullName": regFullName,
            "mobileNumber": regMobNo,
            "dateOfBirth": data.userDob,
            "email": data.userEmail,
            "roleName": "EMPLOYEE",
            "password": ""
        };
        console.log("New Payload:", newPayload);

        try {
            // Retrieve the token from sessionStorage
            const token = sessionStorage.getItem('token');
            if (!token) {
                setServerError('User is not authenticated. Please log in again.');
                return; // Exit if token is not found
            }

            const result = await axios.post('http://localhost:8081/primaryDetails/create', newPayload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (result && result.data) {
                // Save backend-generated data to localStorage
                const registrationData = {
                    ...result.data,
                    password: result.data.password, // Assuming the backend returns password
                    createdDate: result.data.createdDate, // Assuming the backend returns createdDate
                };
                // Save data to localStorage
                localStorage.setItem('registrationData', JSON.stringify(registrationData));
                console.log("Data saved to localStorage:", registrationData);
                setRegistrationData(registrationData); // Set registration data in context
                console.log('saved in registrationcontext:', registrationData);
                console.log("Registration data set:", result.data);
                toast.success("Please wait for the registration");
                console.log("Registration successful:", result.data);
                reset(); // Clear the form
                setPattern({ userFullName: '', userMobNo: '' }); // Clear patterns
                setCustomErrorForRegInputs({ userFullName: '', userMobNo: '' }); // Clear errors
                setServerError(''); // Clear any server errors
                setIsSubmitted(true); // Set submitted state to true
                console.log('isSubmitted set to:', true);
            } else {
                // Handle unexpected status codes
                console.error("Unexpected response status:", result.status);
            }
        } catch (err) {
            console.error("Full Error Object:", err);
            setServerError('server error');
            if (err.response) {
                console.log("Error Response Data:", err.response.data);
                console.log("Error Status:", err.response.status);
                if (err.response.data === 'Email already exists, kindly use a different one.') {
                    setServerError('Email already exists. Please use a different email')
                }
                else {
                    console.log("error in registration:", err);
                    setServerError('An error occurred during registration');
                    setIsSubmitted(false);
                }
            } else if (err.request) {
                // The request was made but no response was received
                setServerError('No response from server. Please check your network connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setServerError(`Error: ${err.message}`);
            }
        }
    };

    // Render success message if submitted
    if (isSubmitted) {
        return (
            <div className="expiredLink">
                <h2 className='expiredLinkHeading'>Registration Successful</h2>
                <p className='expiredLinkPara'>Account activation url has been sent to the registered email id.</p>
            </div>
        );
    }
    return (
        <div className="container-fluid">
            <div className='register-container'>
                <div className="row Signup-row">
                    <div className="col-6 left">
                        <div className="Signup-form">
                            <div className="top-logo">
                                <img src={require("assets/img/company_logo.png")} alt="..." />
                            </div>
                            <div className="title">
                                <p className='name'>Welcome !</p>
                                <p className='signup-info-text'>
                                    Please fill the following details of the candidate
                                </p>
                            </div>
                            <br/>
                            <div className="form">
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="form-detail">
                                        <div className="input-text">
                                            <p>Employee Full Name</p>
                                            <div className="input-icons">
                                                <input className="input-field" type="text" placeholder="Enter Your Full Name" {...register("userFullName", { required: 'Please enter your name', maxLength: 50 })}
                                                    value={pattern.userFullName} onChange={(e) => handlePatternForRegInputs(e, /^[A-Za-z\s]+$/, 'userFullName')} />
                                                {errors.userFullName && (<div className="errorMessage">{errors.userFullName.message}</div>)}
                                                {customErrorForRegInputs.userFullName && (<div className='errorMessage'>{customErrorForRegInputs.userFullName}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>E-mail Address</p>
                                            <div className="input-icons">
                                                <input className="input-field" type="email" placeholder="Enter Your E-mail Address" name='userEmail' {...register("userEmail", { required: 'Please enter your email id' })} />
                                                {errors.userEmail && (<div className="errorMessage">{errors.userEmail.message}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Mobile Number</p>
                                            <div className="input-icons">
                                                <input className="input-field" type="tel" placeholder="Enter Your Mobile No." {...register("userMobNo", { required: 'Please enter your mobile no.' })}
                                                    value={pattern.userMobNo} onChange={(e) => handlePatternForRegInputs(e, /^[0-9]+$/, 'userMobNo')} />
                                                {errors.userMobNo && (<div className="errorMessage">{errors.userMobNo.message}</div>)}
                                                {customErrorForRegInputs.userMobNo && (<div className='errorMessage'>{customErrorForRegInputs.userMobNo}</div>)}
                                            </div>
                                        </div>
                                        <div className="input-text">
                                            <p>Date Of Birth</p>
                                            <div className="input-icons">
                                                <input className="input-field" type="date" placeholder="Enter Your DOB in DD/MM/YYYY" {...register("userDob", { required: 'Please enter your date of birth' })} />
                                                {errors.userDob && (<div className="errorMessage">{errors.userDob.message}</div>)}
                                            </div>
                                        </div>
                                        <br/>

                                        {/* <div className="Signup-btn">
                                            <button className='registerSubmitBtn' type='submit' onClick={console.log(errors)}>Submit</button>
                                        </div> */}
                                         <div>
                                                <button className="login" type="submit">
                                                    Submit
                                                </button>
                                            </div>
                                        <br />

                                        {serverError && (<div className="serverErrorMessage">{serverError}</div>)}
                                        <br />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default RegisterPage;
