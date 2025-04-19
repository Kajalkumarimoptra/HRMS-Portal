import React, { useRef, useEffect } from 'react';
import { useFormContext } from 'components/ContextProvider/Context';
import { useRegistrationContext } from 'components/ContextProvider/RegistrationDataContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

export default function DeclarationForm() {
    const {
        register, handleSubmit, onSubmit, errors, watch, reset
    } = useFormContext();
    const navigate = useNavigate();
    const { registrationData } = useRegistrationContext();  // Access registration data from context

    // for backward navigation
    const backToProfPage = () => {
        navigate("/professionalrefform");
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

        const declarationFormPayload = {
            "primaryId": registrationData.primaryId || "",
            "illness": data.anyIllnessDetail || "",
            "selfIntroduction": data.hobbies || "",
            "declarationAccepted": data.declaration || ""
        }

        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');
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
            <div className='declaration-form'>
                <div className='UniversalHeadlines'>
                    <h6 className='mainHeading'>ASSOCIATE INFORMATION AND ONBOARDING FORM</h6>
                </div>
                <div className='noteHeading'>
                    <p className='noteContent'><b>Note: </b>Please update all cells with correct and relevant data. The information provided in this document
                        will form part of your official records in the Company<br /> and is subjected to verification.</p>
                </div>
                <hr />

                {/* form content */}
                <div className='personalDetailForm'>
                    <div className='personalDetailHeading'> <h6 className='otherDetailHeadline'>OTHER DETAILS-</h6></div>
                    <form onSubmit={handleSubmit(handleFormSubmit)} className='personalDetailContainer' style={{ padding: '0px 15px 0 1px' }}>
                        <div className='illnessDetailContainer'>
                            <label className='illnessLabel'>Have you suffered from any major illness or undergone any surgery in the past 3 years? If yes, please give details :</label>
                            <textarea name="postContent" rows={5} {...register("anyIllnessDetail")} />
                        </div>
                        <div className='selfIntrolHeading'> <h6 className='personalDetailHeadline'>SELF INTRODUCTION-</h6></div>
                        <div className='illnessDetailContainer'>
                            <label className='hobbiesLabel'>Please use free following text and tell us regarding your Hobbies,Interest,how you spend your free time and your professional alignments/memberships etc.</label>
                            <textarea name="postContent" rows={5} {...register("hobbies")} />
                        </div>
                        <div className='selfIntrolHeading'> <h6 className='personalDetailHeadline'>Declaration and Authorization-</h6></div>
                        <div>
                            <p>
                                <section className='numbering'>(1)</section>I am accepting the defined policies and processes in Moptra Infotech. <br />
                                <section className='numbering' style={{ marginRight: '14px' }}>(2)</section>I also agree that my candidature with Moptra Infotech is valid only till I abide by the policies and processes of
                                Moptra Infotech.<br />
                                <section className='numbering' style={{ marginRight: '14px' }}>(3)</section>I give my consent and authorize Moptra Infotech (or a third party appointed by Moptra Infotech) to contact any
                                former employee as indicated above <p className='textShift'>and carry out all Background checks not restricted to education, employment, database search,
                                    address verification, criminal check, reference check <br /> deemed appropriate through this selection procedure/continued employment.
                                    I authorize my former employers, agencies educational institutes etc. <br /> to release any information pertaining to any employment/
                                    education and I release them from any liability in doing so.</p><br />
                                <section className='numbering' style={{ marginRight: '14px' }}>(4)</section>I have not been charge sheeted for any offense under the CRPC and the IPC or any other criminal Laws in India or any other country.
                                I shall promptly<p className='anotherTextShift'> notify Moptra  Infotech and the relevant stakeholders, if I am being sheeted for any offense now or any time during
                                    my tenure at Moptra Infotech.</p><br />
                                <section className='declarationCheck'><input type='checkbox' className='lastDeclarecheck' {...register("declaration", { required: true })} /><span className='required'>*</span>I hereby declare that all information that I have provided in this form are true to the best of my acknowledge, and that
                                    any misrepresentation <p className='lastLine'> of information by me will disqualify my candidature and subsequent employment with Moptra Infotech Pvt. Ltd.</p> </section>
                            </p>
                            {errors.declaration && <p className='declarationErrorMessage'>Please check the declaration to proceed further</p>}
                        </div>
                        {/* save buttons */}
                        <div className='declareSaveButtons'>
                            <button type="button" className="backBtn" onClick={backToProfPage}>Back</button>
                            <button type="button" className="saveBtn" onClick={saveInLocalStorage}>Save Draft</button>
                            <button type="submit" className="saveNextBtn">Preview</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

