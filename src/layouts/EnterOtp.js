import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useFormContext } from "../components/ContextProvider/Context";
import OtpTimer from "otp-timer";
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEmail } from 'components/ContextProvider/EmailContext';

export default function EnterOtp() {

    const navigate = useNavigate();
    const {
        register, handleSubmit, reset, serverError, setServerError, watch, clearErrors, errors, setError, setValue
    } = useFormContext();
    const { setEmailForForms } = useEmail();
    const [loading, setLoading] = useState(true);
    const [storeRegEmail, setStoreRegEmail] = useState('');
    const [tokenValid, setTokenValid] = useState(false);
    const [tokenInvalid, setTokenInvalid] = useState(false);
    const [otpValues, setOtpValues] = useState(Array(6).fill('')); // Array to hold OTP values
    const otpRefs = useRef([]); // To hold references to each OTP input
    const [searchParams] = useSearchParams(); // To read URL parameters
    const [expired, setExpired] = useState(false); // // To track if the link is expired
    const [isOtpResend, setIsOtpResend] = useState(false);
    const otpRequestedRef = useRef(false);

    const handleError = (errors) => {
        console.log("Validation Errors:", errors);
        setServerError("Please enter all required OTP fields correctly");
    };
    // Effect to synchronize local state with React Hook Form
    useEffect(() => {
        // Sync local state with React Hook Form whenever the watched values change
        otpValues.forEach((value, index) => {
            setValue(`otp${index}`, value);
        });
    }, [otpValues, setValue]);


    // extract token from the url
    const tokenFromUrl = searchParams.get('token');

    // Focus the first OTP input on component load
    useEffect(() => {
        if (otpRefs.current[0]) {
            otpRefs.current[0].focus();
        }
    }, []);

    // Log component mount/unmount
    useEffect(() => {
        console.log('Component mounted');
        return () => {
            console.log('Component unmounted');
        };
    }, []);

    // Track render count
    const renderCount = useRef(0);
    renderCount.current += 1;
    console.log("Render count:", renderCount.current); // Log render count for debugging
    // Track OTP request status
    // const otpRequestedRef = useRef(false); // Track if OTP has already been requested
    // useEffect(() => {
    //     console.log('Fetching OTP for email:', email);
    //     if (email && !otpRequestedRef.current) {
    //         fetchOtp();
    //         otpRequestedRef.current = true; // Move this here to ensure OTP is only fetched once
    //     }
    // }, [email]);

    useEffect(() => {
        const checkTokenAndSendOtp = async () => {
            await validateToken();
            console.log('validate otp token api hit');
        };
        checkTokenAndSendOtp();
    }, []);


    const validateToken = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:8081/primaryDetails/validateToken?token=${tokenFromUrl}`);
            const { tokenValid, message, email } = response.data;
            console.log('response of validate token api:', response.data);

            if (tokenValid === true) {
                console.log('token is valid');
                setTokenValid(true);
                setStoreRegEmail(email);
                console.log('Calling fetchOtp with email:', email);
                fetchOtp(email);
            } else if (tokenValid === false && message.includes("Invalid token")) {
                console.log('token is invalid');
                setTokenInvalid(true);
            } else if (tokenValid === false && message.includes("Token expired")) {
                console.log('token is expired');
                setExpired(true);
            }
        } catch (error) {
            if (error.response) {
                console.error("Error response in token validation api:", error.response);
                console.error("Response status in token validation api:", error.response.status);
                console.error("Response data in token validation api:", error.response.data);
            } else if (error.request) {
                console.error("Error request in token validation api:", error.request);
            } else {
                console.error("General error in token validation api :", error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    const fetchOtp = async (email) => {
        if (!otpRequestedRef.current) { // Ensure OTP is requested only once
            try {
                const response = await axios.post('http://localhost:8081/primaryDetails/sendOtp', { email });
                if (response.data) {
                    console.log("OTP sent:", response.data);
                    otpRequestedRef.current = true; // Set flag after OTP is sent
                }
            } catch (error) {
                console.error("OTP request failed:", error);
                setServerError('An error occurred in email sending');
            }
        }
    };

    const handleResendOtp = async () => {
        try {
            otpRequestedRef.current = false;
            console.log("Resending OTP...");
            const resendOtp = await axios.post('http://localhost:8081/primaryDetails/resendOtp', { email: storeRegEmail });
            console.log('resend otp is:', resendOtp.data);

            if (resendOtp.data) {
                setOtpValues(Array(6).fill(''));
                setIsOtpResend(true);
                setServerError('');
                toast.success("A fresh otp has been sent to your email id.");
                reset();
            } else {
                setServerError('error occurred in resend otp');
            }
        }
        catch (error) {
            console.log('error in resend otp:', error);
            setServerError('server error in resend otp')
        }

    };

    const handleFormSubmit = async () => {
        console.log("Form submitted");
        console.log("Current OTP values before submit:", otpValues);
        const combinedOtp = otpValues.join(''); // Combine OTP values to send it to backend for validation part
        console.log("Combined OTP:", combinedOtp);

        if (combinedOtp.length === 6) {
            try {
                const otpResult = await axios.post(`http://localhost:8081/primaryDetails/validate?token=${tokenFromUrl}&otp=${combinedOtp}`)
                console.log("OTP validated response:", otpResult.data);
                const tokenForFormsValidation = otpResult.data.data.token;

                if (otpResult.status === 200) {
                    toast.success("otp has been verified successfully!");
                    // Store the token in sessionStorage
                    localStorage.setItem('tokenForFormsValidation', tokenForFormsValidation);
                    const emailForForms = otpResult.data.data.email;
                    setEmailForForms(emailForForms);
                    reset();
                    setOtpValues(Array(6).fill('')); // Reset OTP values after successful submission
                    setServerError('');
                    setIsOtpResend(false);
                    setTimeout(() => {
                        navigate('/personaldetailsform')
                    }, 1000);
                } else {
                    setServerError('Invalid OTP. Please try again.');
                    console.error('Error in validation of OTP:');
                }
            } catch (error) {
                console.error('Error validating OTP:', error);

                if (error.response && error.response.status === 400) {
                    console.error('Detailed error message from server:', error.response.data.message || error.response.data);
                    setServerError('Invalid OTP. Please try again.');
                }
                // setServerError('OTP validation failed. Please try again.');
            }
        } else {
            setServerError('Please enter a valid 6-digit OTP');
        }
    };

    const handleOtpChange = (index, value) => {
        console.log("Input changed:", value);
        setServerError(''); // Clear previous error message

        // Ensure the input is a valid digit and not empty, with a maximum length of 1
        if (/^[0-9]*$/.test(value) && value.length <= 1) {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value; // Update the OTP value at the specific index
            setOtpValues(newOtpValues); // Set the updated state

            // Move focus to the next input if a value is entered, and it's not the last input
            if (value && index < otpRefs.current.length - 1) {
                otpRefs.current[index + 1]?.focus();
            }
            // Move focus to the previous input if the value is deleted and it's not the first input
            else if (!value && index > 0) {
                otpRefs.current[index - 1]?.focus();
            }
        }
        // Keep the focus on the current input when a value is deleted
        if (!value) {
            otpRefs.current[index]?.focus();
        }
    };

    useEffect(() => {
        console.log("OTP Refs:", otpRefs.current);
    }, [otpRefs]);

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otpValues[index]) {
            // Move to the previous input only if the current input is empty
            if (index > 0) {
                otpRefs.current[index - 1]?.focus();
            }
        }
    };

    if (loading) {
        return <p>Validating link...</p>
    }

    if (expired) {
        return (
            <div className="expiredLink">
                <h2 className='expiredLinkHeading'>Link Expired</h2>
                <p className='expiredLinkPara'>The OTP link has expired. Please request a new one.</p>
            </div>
        );
    }
    // Normal OTP form rendering if the link is still valid
    if (tokenInvalid) {
        return (
            <div className="expiredLink">
                <h2 className='expiredLinkHeading'>This email is not the registered one </h2>
                <p className='expiredLinkPara'>Please try again with the correct email.</p>
            </div>
        );
    }
    if (tokenValid) {
        return (
            <div className="container-fluid">
                <div className="row enterotp-row">
                    <div className="col-8 left">
                        <div className="login-form">
                            <div className="top-logo">
                                <img src={require("assets/img/company_logo.png")} alt="..." />
                            </div>
                            <div className="form">
                                <form onSubmit={handleSubmit(handleFormSubmit, handleError)}>
                                    <p className="enterotp-title">ENTER OTP</p>
                                    <p className='otpDirection'>otp was sent to your email id</p>
                                    <div className="form-detail">
                                        <div className="input-text">
                                            <div className="otp-container">
                                                {otpValues.map((_, index) => (
                                                    <input
                                                        key={index}
                                                        type="text"
                                                        maxLength="1"
                                                        value={otpValues[index]}
                                                        className={`otp-input ${errors[`otp${index}`] ? 'error' : ''}`}
                                                        {...register(`otp${index}`, {
                                                            required: 'true',
                                                            pattern: {
                                                                value: /^[0-9]{1}$/, // Ensures only 1 digit
                                                                message: 'Must be a single digit'
                                                            }
                                                        })}
                                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                                        ref={(el) => (otpRefs.current[index] = el)} // Assign ref
                                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                                    />
                                                ))}
                                                {/* {otpValues.map((value, index) => (
                                                <input
                                                    key={index}
                                                    id={`otp${index}`} // Assign unique ID for focus
                                                    type="text"
                                                    maxLength={1}
                                                    ref={(el) => (otpRefs.current[index] = el)}
                                                    className={`otp-input ${errors[`otp${index}`] ? 'error' : ''}`}
                                                    {...register(`otp${index}`, {
                                                        required: 'true',
                                                        pattern: {
                                                            value: /^[0-9]{1}$/, // Ensures only 1 digit
                                                            message: 'Must be a single digit'
                                                        }
                                                    })}
                                                    value={value} // Set value from local state
                                                    onChange={(e) => {
                                                        handleOtpChange(index, e.target.value);
                                                    }}
                                                    onFocus={() => clearErrors(`otp${index}`)} // Clear error on focus
                                                />
                                            ))} */}

                                            </div>
                                            {/* Error handling for each OTP input */}
                                            {/* {Object.keys(errors).map((key) => (
                                            <div key={key} className="error">
                                                {errors[key]?.message || 'OTP is required'}
                                            </div>
                                        ))} */}
                                        </div>
                                        <div>
                                            <div>
                                                <button className="login" type="submit"> verify
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text">
                                            <OtpTimer
                                                minutes={2}
                                                seconds={1}
                                                text="Resend otp in"
                                                ButtonText="Resend OTP"
                                                resend={handleResendOtp}
                                            />
                                        </div>
                                        {serverError && (<div style={{fontSize: '13px', color: 'red'}}>{serverError}</div>)}
                                    </div>
                                </form>
                            </div>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
