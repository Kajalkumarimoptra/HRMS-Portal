import React, { useState, useRef, useEffect } from 'react';
import { useFormContext } from 'components/ContextProvider/Context';
import { useRegistrationContext } from 'components/ContextProvider/RegistrationDataContext';
import { useNavigate } from 'react-router-dom';
import ReusableProgessBar from 'layouts/ReusableProgessBar';
import DatePicker from 'react-datepicker';
import Navbar from './Navbar';
import axios from 'axios';

export default function AdditionalDetailsForm() {
    const {
        register, handleSubmit, onSubmit, errors, watch, reset, setValue, trigger
    } = useFormContext();
    const navigate = useNavigate();
    const { registrationData } = useRegistrationContext();  // Access registration data from context
    const [passportValidDateRange, setPassportValidDateRange] = useState([null, null]);
    const [passportIssueDateColor, setPassportIssueDateColor] = useState("#d3d3d3");
    const [patternForPassportPlace, setPatternForPassportPlace] = useState(''); // pattern for Passport Place
    const [customErrorForPassportPlace, setCustomErrorForPassportPlace] = useState('');
    const [patternForPassportCountry, setPatternForPassportCountry] = useState(''); // pattern for Passport country
    const [customErrorForPassportCountry, setCustomErrorForPassportCountry] = useState('');
    const [patternForPassportNationality, setPatternForPassportNationality] = useState(''); // pattern for Passport nationality
    const [customErrorForPassportNationality, setCustomErrorForPassportNationality] = useState('');
    const [passportWorkPermitDateColor, setPassporWorkPermitDateColor] = useState("#d3d3d3");
    const [showIllnessSection,setShowIllnessSection] = useState(null);
    const passportValidDatePickerRef = useRef(null);

    // for backward navigation
    const backToProfPage = () => {
        navigate("/professionalrefform");
    }

    useEffect(() => {
        console.log("Validation Errors:", errors);
    }, [errors]);

    const handlePassportIssueDateColorChange = (e) => {
        const selectedValue = e.target.value;
        setPassportIssueDateColor(selectedValue ? "black" : "#d3d3d3");
        clearErrors('passportDate');
    };

    const handlePatternForPassportPlace = (e) => {
        const value = e.target.value;
        setPatternForPassportPlace(value);
        if (value && ! /^[A-Za-z\s]+$/.test(value)) {
            setCustomErrorForPassportPlace('No numbers or special characters are allowed');
        } else {
            setCustomErrorForPassportPlace('');
        }
    }

    const handlePatternForPassportCountry = (e) => {
        const value = e.target.value;
        setPatternForPassportCountry(value);
        if (value && ! /^[A-Za-z\s]+$/.test(value)) {
            setCustomErrorForPassportCountry('No numbers or special characters are allowed');
        } else {
            setCustomErrorForPassportCountry('');
        }
    }

    const handlePatternForPassportNationality = (e) => {
        const value = e.target.value;
        setPatternForPassportNationality(value);
        if (value && ! /^[A-Za-z\s]+$/.test(value)) {
            setCustomErrorForPassportNationality('No numbers or special characters are allowed');
        } else {
            setCustomErrorForPassportNationality('');
        }
    }


    const handlePassportWorkPermitDateColorChange = (e) => {
        const selectedValue = e.target.value;
        setPassporWorkPermitDateColor(selectedValue ? "black" : "#d3d3d3");
        clearErrors('workPermit');
    };

    const handleRadioChange = (e) => {
    const illnessSuffered = e.target.value;
    setShowIllnessSection(illnessSuffered === 'yes');
    setValue('illness', illnessSuffered);  // Update the form state with the selected value
  };
  const illness = watch('illness', '');

    // for handle submit
    const handleFormSubmit = async (data) => {
        console.log('Form data:', data);
        console.log("Errors during submission:", errors);
        if (Object.keys(errors).length > 0) {
            console.error("Form has errors:", errors);
            return;
        }

        const declarationFormPayload = {
            "primaryId": registrationData.primaryId || "",
            "illness": data.anyIllnessDetail || "",
            "selfIntroduction": data.hobbies || "",
            "declarationAccepted": data.declaration || ""
        }

        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('tokenForFormsValidation');
            console.log('token needed:', token);
            if (!token) {
                setServerError('Authentication issue');
                return; // Exit if token is not found
            }

            const response = await axios.post('http://localhost:8081/primary/createOthers', declarationFormPayload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response && response.data) {
                console.log("Form submitted successfully:", response.data);
                sessionStorage.setItem('declarationFormDetails', JSON.stringify(response.data))
                navigate("/previewform");
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
                <ReusableProgessBar>
                    {/* <div className='UniversalHeadlines'>
                    <h6 className='mainHeading'>ASSOCIATE INFORMATION AND PRE-ONBOARDING FORM</h6>
                </div>
                <div className='noteHeading'>
                    <p className='noteContent'><b>Note: </b>Please update all cells with correct and relevant data. The information provided in this document
                        will form part of your official records in the Company<br /> and is subjected to verification.</p>
                </div> */}

                    {/* form content */}
                    <div className='personalDetailForm'>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className='edu-form-container' style={{ padding: '10px' }}>
                            {/* passport details form */}
                            <div>
                                <div>
                                    <h6>PASSPORT DETAILS</h6>
                                </div>
                                <div className='passportDetailsContainer'>
                                    <div style={{ gap: '50px' }}>
                                        <div className='datepicker-container'>
                                            <div className="datepicker-label-input">
                                                <label>Date Of Issue to Valid upto<span className='required'>*</span></label>
                                                <DatePicker ref={passportValidDatePickerRef}
                                                    selectsRange
                                                    startDate={passportValidDateRange[0]}
                                                    endDate={passportValidDateRange[1]}
                                                    onChange={(update) => {
                                                        setPassportValidDateRange(update);
                                                        // Update React Hook Form values if using register
                                                        setValue('passportStartValidDate', update[0]);
                                                        setValue('passportEndValidDate', update[1]);
                                                        trigger(['passportStartValidDate', 'passportEndValidDate']);
                                                    }}
                                                    maxDate={new Date()} // Prevent future dates
                                                    placeholderText="Select valid duration"
                                                    className={`fromInput ${errors.passportStartValidDate || errors.passportEndValidDate ? 'invalid' : ''}`}
                                                    isClearable
                                                />
                                                <img src={require("assets/img/calendar-icon.png")} alt="calendar" className="calendar-icon" onClick={() => passportValidDatePickerRef.current.setFocus()} />
                                            </div>
                                            <input type="hidden" {...register("passportStartValidDate", { required: true })} />
                                            <input type="hidden" {...register("passportEndValidDate", { required: true })} />
                                        </div>
                                        <div>
                                            <label>Place Of Issue</label>
                                            <input type='text' placeholder='place' className='passportPlaceInput'  {...register("passportPlace", { pattern: /^[A-Za-z\s]+$/ })}
                                                value={patternForPassportPlace} onChange={handlePatternForPassportPlace} />
                                            {customErrorForPassportPlace ? <div className='errorMessage' style={{ marginLeft: '-40px' }}>{customErrorForPassportPlace}</div> : ''}
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label>Country Of Issue</label>
                                            <input type='text' placeholder='Country Name' className='passportCountryInput'  {...register("passportCountry", { pattern: /^[A-Za-z\s]+$/ })}
                                                value={patternForPassportCountry} onChange={handlePatternForPassportCountry} />
                                            {customErrorForPassportCountry ? <div className='errorMessage'>{customErrorForPassportCountry}</div> : ''}
                                        </div>
                                        <div>
                                            <label>Nationality</label>
                                            <input type='text' placeholder='Nationality' className='passportValidInput'  {...register("nationality", { pattern: /^[A-Za-z\s]+$/ })}
                                                value={patternForPassportNationality} onChange={handlePatternForPassportNationality} />
                                            {customErrorForPassportNationality ? <div className='errorMessage'>{customErrorForPassportNationality}</div> : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='visaStatusContainer'>
                                <div className='profDetailHeading'> <h6 className='relativeWorkingHeadline'>Please tick an appropriate option
                                    related to your Visa status.</h6></div>
                            </div> */}

                            {/* table content */}
                            <div className='visa-status-container'>
                                <div>
                                    <h5>Citizen</h5>
                                    <input type="radio" name="visa status" value="citizen" className='visa-radio' {...register("visaStatus")} />
                                </div>
                                <div>
                                    <h5>Expat on Green Card</h5>
                                    <input type="radio" name="visa status" value="Expat on Green Card" className='visa-radio' {...register("visaStatus")} />
                                </div>
                                <div>
                                    <h5>Expat on Work Permit</h5>
                                    <input type="radio" name="visa status" value="Expat on Work Permit" className='visa-radio' {...register("visaStatus")} />
                                </div>
                                <div>
                                    <h5>Expat on Permanent Residency Permit</h5>
                                    <input type="radio" name="visa status" value="Expat on Permanent Residency Permit" className='visa-radio' {...register("visaStatus")} />
                                </div>
                                <div>
                                    <h5>Any Other Status</h5>
                                    <input type="radio" name="visa status" value="Any Other Status" className='visa-radio' {...register("visaStatus")} />
                                </div>
                            </div>
                            {/* <table className='table profTableWidth table-bordered'>
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
                                        <td className='tableBody'><input type="radio" name="visa status" value="citizen"  {...register("visaStatus")} /></td>
                                        <td className='tableBody'><input type="radio" name="visa status" value="expat_green_card"  {...register("visaStatus")} /></td>
                                        <td className='tableBody'><input type="radio" name="visa status" value="expat_work_permit"  {...register("visaStatus")} /></td>
                                        <td className='tableBody'><input type="radio" name="visa status" value="expat_permanent_residency"  {...register("visaStatus")} /></td>
                                        <td className='tableBody'><input type="radio" name="visa status" value="any_other_status"  {...register("visaStatus")} /></td>
                                    </tr>
                                </tbody>
                            </table> */}
                            <div className='permitContainer'>
                                <div>
                                    <label>Legal Right to work in country</label>
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
                                <div>
                                    <label>Work permit valid till</label>
                                    <input type='date' placeholder='select date' className='workPermitInput' {...register("workPermit")}
                                        onChange={handlePassportWorkPermitDateColorChange} style={{ color: passportWorkPermitDateColor }} />
                                </div>
                                <div>
                                    <label>Mention the details of work permit<span className='separatorForWorkPermit'>:</span></label>
                                    <input type='text' className='workPermitDetailInput' {...register("workPermitDetails")} />
                                </div>
                            </div>
                            <div className='illnessDetailContainer'>
                                <div className='illness-checkmark'>
                                <label className='illnessLabel'>Have you suffered from any major illness or undergone any surgery in the past 3 years?</label>
                                <div className='relativeButtons'>
                                    <label>
                                        <input
                                            type='radio' className='radioYes' name='illness' onChange={handleRadioChange} value='yes'
                                            {...register("illness", { required: true })}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            type='radio' className='radioYes' name='illness' onChange={handleRadioChange} value='no'
                                            {...register("illness", { required: true })}
                                        />
                                        No
                                    </label>
                                    {errors.illness && <div className='moptraRelativeErrorMessage'>Please select atleast any one alternative</div>}
                                </div>
                                 </div>
                               {illness === 'yes' && (<textarea name="postContent" rows={5} {...register("anyIllnessDetail")} /> )}
                            </div>
                            <div className='illnessDetailContainer'>
                                <label className='hobbiesLabel'>Add Your hobbies, interests and professional alignments / memberships etc :</label>
                                <textarea name="postContent" rows={5} {...register("hobbies")} />
                            </div>
                            {/* <div className='personalDetailHeading'> <h6 className='educationalHeadline'>Declaration</h6></div>
                        <div className='declaration-container'>
                            <p>
                                <section className='numbering'>*</section>I am accepting the defined policies and processes in Moptra Infotech. <br />
                                <section className='numbering' style={{ marginRight: '14px' }}>*</section>I also agree that my candidature with Moptra Infotech is valid only till I abide by the policies and processes of
                                Moptra Infotech.<br />
                                <section className='numbering' style={{ marginRight: '14px' }}>*</section>I give my consent and authorize Moptra Infotech (or a third party appointed by Moptra Infotech) to contact any
                                former employee as indicated above <p className='textShift'>and carry out all Background checks not restricted to education, employment, database search,
                                    address verification, criminal check, reference check <br /> deemed appropriate through this selection procedure/continued employment.
                                    I authorize my former employers, agencies educational institutes etc. <br /> to release any information pertaining to any employment/
                                    education and I release them from any liability in doing so.</p><br />
                                <section className='numbering' style={{ marginRight: '14px' }}>*</section>I have not been charge sheeted for any offense under the CRPC and the IPC or any other criminal Laws in India or any other country.
                                I shall promptly<p className='textShift'> notify Moptra  Infotech and the relevant stakeholders, if I am being sheeted for any offense now or any time during
                                    my tenure at Moptra Infotech.</p><br />
                                <section className='declarationCheck'><input type='checkbox' className='lastDeclarecheck' {...register("declaration", { required: true })} /><span className='required'>*</span>I hereby declare that all information that I have provided in this form are true to the best of my acknowledge, and that
                                    any misrepresentation <p className='lastLine'> of information by me will disqualify my candidature and subsequent employment with Moptra Infotech Pvt. Ltd.</p> </section>
                            </p>
                            {errors.declaration && <p className='declarationErrorMessage'>Please check the declaration to proceed further</p>}
                        </div> */}
                            {/* save buttons */}
                            <div className='declareSaveButtons'>
                                <button type="button" className="backBtn" onClick={backToProfPage}>Back</button>
                                {/* <button type="button" className="saveBtn" onClick={saveInLocalStorage}>Save Draft</button> */}
                                <button type="submit" className="saveNextBtn">Preview</button>
                            </div>
                        </form>
                    </div>
                </ReusableProgessBar>
            </div>
        </div>
    )
}

