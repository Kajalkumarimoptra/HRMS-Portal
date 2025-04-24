import React, { useRef, useEffect, useState } from 'react';
import AttachSign from './AttachSign';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'components/ContextProvider/Context';
import { useRegistrationContext } from 'components/ContextProvider/RegistrationDataContext';
import Navbar from './Navbar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function PreviewForm() {

  const navigate = useNavigate();
  const {
    register, handleSubmit, onSubmit, setValue, errors, watch, clearErrors, reset
  } = useFormContext();
  const { registrationData } = useRegistrationContext();  // Access registration data from context
  const [previewData, setPreviewData] = useState({});

  // for getting the current date
  const getCurrentDate = () => {
    const todayDate = new Date();
    const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // month is 0-indexed
    const year = todayDate.getFullYear();
    const date = String(todayDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
  };

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  }
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  useEffect(() => {
    setValue("dateAttach", getCurrentDate());
  }, []);

  useEffect(() => {
    const primaryId = registrationData.primaryId;
    console.log('primary id:', primaryId);
    const fetchData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        console.log('token needed:', token);
        if (!token) {
          setServerError('Authentication issue');
          return; // Exit if token is not found
        }
        const response = await axios.get(`http://localhost:8081/primary/preview/${primaryId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("preview data from API:", response.data);
        setPreviewData(response.data);
        console.log("preview data:", previewData);
      }
      catch (error) {
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
    fetchData();
  }, []);

  const fullName = [previewData.personalDetails?.firstName, previewData.personalDetails?.middleName, previewData.personalDetails?.surname]
    .filter(Boolean) // Removes empty strings or undefined
    .join(' ');
  const permanentPeriodOfStay = [previewData.permanentAddress?.stayFrom, previewData.permanentAddress?.stayTo]
    .filter(Boolean)
    .join(' to ');
  const currentPeriodOfStay = [previewData.currentAddresses?.stayFrom, previewData.currentAddresses?.stayTo]
    .filter(Boolean)
    .join(' to ');

  const visaLabelMap = {
    citizen: "Citizen",
    expatOnGreenCard: "Expat on Green Card",
    expatOnWorkPermit: "Expat on Work Permit",
    expatOnPermanentResidencyPermit: "Expat on PR Permit",
    anyOtherStatus: "Other Status"
  };

  const backToDeclarationPage = () => {
    navigate("/declarationform");
  }

  // for handle submit
  const handleFormSubmit = async (data) => {
    console.log('Form data:', data);
    console.log("Errors during submission:", errors);
    if (Object.keys(errors).length > 0) {
      console.error("Form has errors:", errors);
      return;
    }
    const previewFormPayload = {
      "primaryId": registrationData.primaryId || "",
      "employeeSignatureUrl": data.signatureAttach || "",
      "signatureDate": data.dateAttach || "",
      "place": data.placeAttach || ""
    }
    console.log('payload given:', previewFormPayload);
     try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      console.log('token needed:', token);
      if (!token) {
        setServerError('Authentication issue');
        return; // Exit if token is not found
      }

      const response = await axios.post('http://localhost:8081/primary/sendPreviewDetailsToHR', previewFormPayload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response && response.data) {
        console.log("Form submitted successfully:", response.data);
        sessionStorage.setItem('previewFormDetails', JSON.stringify(response.data))
        reset();
        toast.success("Your form has been successfully submitted to the HR and you will be updated soon!");
        // Push a new state, so the previous form page is replaced
        window.history.pushState(null, null, window.location.href);
    
        // Block going back
        window.addEventListener('popstate', function () {
          window.history.pushState(null, null, window.location.href);
        });
        setTimeout(() => {
          window.location.replace("https://www.google.com");  // Use replace to prevent going back
        }, 1000);
      } else {
        console.error("Error submitting form:", response);
        console.error("Error submitting form. Status:", response.status);
        console.error("Error details:", response.data);
      }
     }
     catch (error) {
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

  return (
    <div className='container-fluid form-navbar'>
      <Navbar />
      <div className='declaration-form'>
        <div className='UniversalHeadlines'>
          <h6 className='previewHeading'>ASSOCIATE INFORMATION AND PRE-ONBOARDING FORM - PREVIEW</h6>
        </div>
        <div className='noteHeading'>
          <h5 className='noteContent' style={{ textAlign: 'center', marginLeft: '-250px' }}><b>Note:</b><span className='noteDescription'>Please review the information below carefully before final submission. Use the "Back" button to edit any section.</span></h5>
        </div>
        <hr />
        {/* personal detail form data */}
        <div className='personalDetailForm' style={{ marginBottom: '25px' }}>
          <div className='personalDetailHeading'> <h6 className='personalDetailHeadline'>PERSONAL DETAILS</h6> </div>
          <div className="preview-table">
            <table className='table table-hover table-vcenter text-nowrap mb-0'>
              <tbody>
                <tr>
                  <td><strong>Full Name :</strong><span>{fullName || 'loading...'}</span></td>
                  <td><strong>Date of Birth :</strong><span>{previewData.personalDetails?.dob || 'loading...'}</span></td>
                  <td><strong>Gender :</strong><span>{previewData.personalDetails?.gender || 'loading...'}</span></td>
                </tr>
                <tr>
                  <td><strong>Mother Name :</strong><span>{previewData.personalDetails?.motherName || 'loading...'}</span></td>
                  <td><strong>Father Name :</strong><span>{previewData.personalDetails?.fatherName || 'loading...'}</span></td>
                  <td><strong>Mobile No :</strong><span>{previewData.personalDetails?.mobile || 'loading...'}</span></td>
                </tr>
                <tr>
                  <td><strong>Passport Photo :</strong><span>{previewData.personalDetails?.imageUrl || 'loading...'}</span></td>
                  <td><strong>Email ID :</strong><span>{previewData.personalDetails?.email || 'loading...'}</span></td>
                  <td><strong>Aadhar No :</strong><span>{previewData.personalDetails?.aadharNumber || 'loading...'}</span></td>
                </tr>
                <tr>
                  <td><strong>Pan No :</strong><span>{previewData.personalDetails?.panNumber || 'loading...'}</span></td>
                  <td><strong>Pan Document :</strong><span>{previewData.personalDetails?.panUrl ? (
                    <a href={previewData.personalDetails.panUrl} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    'loading...'
                  )}</span></td>
                  <td><strong>Aadhar Document :</strong><span>{previewData.personalDetails?.aadharUrl ? (
                    <a href={previewData.personalDetails.aadharUrl} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    'loading...'
                  )}</span></td>
                </tr>
                <tr>
                <td><strong>Passport No :</strong><span>{previewData.personalDetails?.passportNumber || ''}</span></td>
                  <td><strong>Passport Document :</strong><span>{previewData.personalDetails?.passportUrl ? (
                    <a href={previewData.personalDetails.passportUrl} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    ''
                  )}</span></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        <div className='personalDetailForm' style={{ marginBottom: '25px' }}>
          <div className='personalDetailHeading'> <h6 className='personalDetailHeadline'>CONTACT DETAILS</h6> </div>
          <h6 style={{ margin: '10px 10px -7px 10px' }}>Permanent Address :</h6>
          <div className="preview-table">
            <table className='table table-hover table-vcenter text-nowrap mb-0'>
              <tbody>
                <tr>
                  <td><strong>House No :</strong><span>{previewData.permanentAddress?.houseNumber || 'loading...'}</span></td>
                  <td><strong>Street Name :</strong><span>{previewData.permanentAddress?.streetName || 'loading...'}</span></td>
                  <td><strong>Town :</strong><span>{previewData.permanentAddress?.town || 'loading...'}</span></td>
                </tr>
                <tr>
                  <td><strong>Pincode :</strong><span>{previewData.permanentAddress?.pincode || 'loading...'}</span></td>
                  <td><strong>State :</strong><span>{previewData.permanentAddress?.state || 'loading...'}</span></td>
                  <td><strong>City :</strong><span>{previewData.permanentAddress?.city || 'loading...'}</span></td>
                </tr>
                <tr>
                  <td><strong>Period of stay :</strong><span>{permanentPeriodOfStay || 'loading...'}</span></td>
                  <td><strong>Emergency Contact No :</strong><span>{previewData.permanentAddress?.emergencyContactNumber || 'loading...'}</span></td>
                  <td><strong>Their name with relation :</strong><span>{previewData.permanentAddress?.emergencyContactNameAndRelationship || 'loading...'}</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* If sameAsPermanentAddress is true, show heading and text inline */}
          {previewData.currentAddresses?.sameAsPermanentAddress ? (
            <h6 style={{ margin: '10px 10px -2px 10px' }}>
              Current Address : <span style={{ fontWeight: 'normal' }}>Same As Permanent Address</span>
            </h6>
          ) : (
            <>
              <h6 style={{ margin: '10px 10px -7px 10px' }}>Current Address :</h6>
              <div className="preview-table">
                <table className='table table-hover table-vcenter text-nowrap mb-0'>
                  <tbody>
                    <tr>
                      <td><strong>House No :</strong><span>{previewData.currentAddresses?.houseNumber || 'loading...'}</span></td>
                      <td><strong>Street Name :</strong><span>{previewData.currentAddresses?.streetName || 'loading...'}</span></td>
                      <td><strong>Town :</strong><span>{previewData.currentAddresses?.town || 'loading...'}</span></td>
                    </tr>
                    <tr>
                      <td><strong>Pincode :</strong><span>{previewData.currentAddresses?.pincode || 'loading...'}</span></td>
                      <td><strong>State :</strong><span>{previewData.currentAddresses?.state || 'loading...'}</span></td>
                      <td><strong>City :</strong><span>{previewData.currentAddresses?.city || 'loading...'}</span></td>
                    </tr>
                    <tr>
                      <td><strong>Period of stay :</strong><span>{currentPeriodOfStay || 'loading...'}</span></td>
                      <td><strong>Emergency Contact No :</strong><span>{previewData.currentAddresses?.emergencyContactNumber || 'loading...'}</span></td>
                      <td><strong>Their name with relation :</strong><span>{previewData.currentAddresses?.emergencyContactNameAndRelationship || 'loading...'}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          <h6 style={{ marginTop: '10px', margin: '10px 10px -7px 10px' }}>Address History :</h6>
          <div className="preview-table addressHistory">
            <table className='table table-hover table-vcenter text-nowrap mb-0'>
              <tbody>
                <tr>
                  <td className='serial-no-column'><strong>S.No.</strong></td>
                  <td><strong>Period To Stay</strong></td>
                  <td><strong>Address</strong></td>
                  <td><strong>Zipcode</strong></td>
                  <td><strong>Country</strong></td>
                  <td className='contact-no-column'><strong>Contact No. With Relationship</strong></td>
                </tr>
                {previewData.addressDetails?.length > 0 ? (
                  previewData.addressDetails.map((address, index) => {
                    const addressHistoryPeriodOfStay = [address.stayFrom, address.stayTo].filter(Boolean).join(' to ');
                    return (
                      <tr key={index}>
                        <td className='serial-no-column'><strong>{index + 1}.</strong></td>
                        <td>{addressHistoryPeriodOfStay || 'loading...'}</td>
                        <td>{address.addressLine || 'loading...'}</td>
                        <td>{address.pincode || 'loading...'}</td>
                        <td>{address.country || 'loading...'}</td>
                        <td className='contact-no-column'>{address.contactNumberWithRelationship || 'loading...'}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>Loading Address Details...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
        <div className='personalDetailForm' style={{ marginBottom: '25px' }}>
          <div className='personalDetailHeading'> <h6 className='personalDetailHeadline'>EDUCATIONAL DETAILS</h6> </div>
          <h6 style={{ marginTop: '10px', margin: '10px 10px -7px 10px' }}>Educational Qualification :</h6>
          <div className="preview-table addressHistory">
            <table className='table table-hover table-vcenter text-nowrap mb-0'>
              <tbody>
                <tr>
                  <td className='serial-no-column'><strong>S.No.</strong></td>
                  <td><strong>Degree/Qualification Name</strong></td>
                  <td><strong>Subjects</strong></td>
                  <td><strong>Passing year</strong></td>
                  <td><strong>Roll No</strong></td>
                  <td><strong>Grade/Percentage</strong></td>
                </tr>
                {previewData.educationalQualifications?.length > 0 ? (
                  previewData.educationalQualifications.map((education, index) => (
                    <tr key={index}>
                      <td className='serial-no-column'><strong>{index + 1}.</strong></td>
                      <td>{education.degreeName || 'loading...'}</td>
                      <td>{education.subject || 'loading...'}</td>
                      <td>{education.passingYear || 'loading...'}</td>
                      <td>{education.rollNumber || 'loading...'}</td>
                      <td>{education.gradeOrPercentage || 'loading...'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>Loading Educational Qualification Details...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {previewData.documents && previewData.documents.length > 0 ? (
            <>
              <h6 style={{ marginTop: '10px', margin: '10px 10px -7px 10px' }}>
                Documents Attachment :
              </h6>
              <div className="preview-table addressHistory">
                <table className='table table-hover table-vcenter text-nowrap mb-0'>
                  <tbody>
                    <tr>
                      <td className='serial-no-column'><strong>S.No.</strong></td>
                      <td><strong>Degree Name</strong></td>
                      <td><strong>Degree Certificate</strong></td>
                      <td><strong>Passing Certificate / Final Year Marksheet</strong></td>
                    </tr>
                    {previewData.documents.map((docs, index) => (
                      <tr key={index}>
                        <td className='serial-no-column'><strong>{index + 1}.</strong></td>
                        <td>{docs.documentType || 'loading...'}</td>
                        <td>{docs.degreeCertificateUrl ? (docs.degreeCertificateUrl &&
                          <a href={docs.degreeCertificateUrl} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        ) : (
                          'loading...'
                        )}</td>
                        <td>{docs.passingCertificateUrl ? (docs.passingCertificateUrl &&
                          <a href={docs.passingCertificateUrl} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        ) : (
                          'loading...'
                        )}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <h6 style={{ marginTop: '10px', margin: '10px 10px -7px 10px' }}>
              Documents Attachment : <span style={{ fontWeight: 'normal' }}>No Documents Uploaded</span>
            </h6>
          )}

          {previewData.employmentHistories?.length > 0 ? (
            <>
              <h6 style={{ marginTop: '10px', margin: '10px 10px -7px 10px' }}>Employment History :</h6>
              {previewData.employmentHistories.map((employment, index) => {
                const empHistoryPeriodOfStay = [employment.employmentStartDate, employment.employmentEndDate]
                  .filter(Boolean)
                  .join(' to ');
                return (
                  <div className="preview-table">
                    <table className='table table-hover table-vcenter text-nowrap mb-0'>
                      <tbody>
                        <tr key={index}>
                          <td style={{ width: '75px', textAlign: 'center' }}><strong>{index + 1}.</strong></td>
                          <td><strong>Previous Employer Name :</strong><span>{employment.previousEmployerName || 'loading...'}</span></td>
                          <td><strong>Address :</strong><span>{employment.employerAddress || 'loading...'}</span></td>
                          <td><strong>Telephone No. :</strong><span>{employment.telephoneNumber || 'loading...'}</span></td>
                          <td><strong>Employee Code :</strong><span>{employment.employeeCode || 'loading...'}</span></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td><strong>Designation :</strong><span>{employment.designation || 'loading...'}</span></td>
                          <td><strong>Department :</strong><span>{employment.department || 'loading...'}</span></td>
                          <td><strong>Manager's Name :</strong><span>{employment.managerName || 'loading...'}</span></td>
                          <td><strong>Manager's Contact No :</strong><span>{employment.managerContactNo || 'loading...'}</span></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td><strong>Manager's Email ID :</strong><span>{employment.managerEmail || 'loading...'}</span></td>
                          <td><strong>Reasons For Leaving :</strong><span>{employment.reasonsForLeaving || 'loading...'}</span></td>
                          <td><strong>Employment Period :</strong><span>{empHistoryPeriodOfStay || 'loading...'}</span></td>
                          <td><strong>Position :</strong><span>{employment.employmentType || 'loading...'}</span></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td><strong>Experience Certificate :</strong><span>{employment.experienceCertificateUrl ? (employment.experienceCertificateUrl &&
                            <a href={employment.experienceCertificateUrl} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          ) : (
                            'loading...'
                          )}</span></td>
                          <td><strong>Relieving Letter :</strong><span>{employment.relievingLetterUrl ? (employment.relievingLetterUrl &&
                            <a href={employment.relievingLetterUrl} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          ) : (
                            'loading...'
                          )}</span></td>
                          <td><strong>Last Month Salary Slip :</strong><span>{employment.lastMonthSalarySlipUrl ? (employment.lastMonthSalarySlipUrl &&
                            <a href={employment.lastMonthSalarySlipUrl} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          ) : (
                            'loading...'
                          )}</span></td>
                          <td><strong>Appointment Letter :</strong><span>{employment.appointmentLetterUrl ? (employment.appointmentLetterUrl &&
                            <a href={employment.appointmentLetterUrl} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          ) : (
                            'loading...'
                          )}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>)
              })}
            </>
          ) : (
            <h6 style={{ marginTop: '10px', margin: '10px 10px 3px 10px' }}>Employment History :<span style={{ fontWeight: 'normal' }}>No Employment History Details</span></h6>
          )}
        </div>
        <div className='personalDetailForm' style={{ marginBottom: '25px' }}>
          <div className='personalDetailHeading'> <h6 className='personalDetailHeadline'>PROFESSIONAL REFERENCES DETAILS</h6> </div>
          {previewData.professionalReferences?.length > 0 ? (
            <>
              <h6 style={{ marginTop: '10px', margin: '10px 10px -7px 10px' }}>Professional References :</h6>
              <div className="preview-table addressHistory">
                <table className='table table-hover table-vcenter text-nowrap mb-0'>
                  <tbody>
                    <tr>
                      <td className='serial-no-column'><strong>S.No.</strong></td>
                      <td><strong>Name</strong></td>
                      <td><strong>Designation</strong></td>
                      <td><strong>Email ID</strong></td>
                      <td><strong>Contact No.</strong></td>
                    </tr>
                    {previewData.professionalReferences.map((prof, index) => (
                      <tr key={index}>
                        <td className='serial-no-column'><strong>{index + 1}.</strong></td>
                        <td>{prof.name || 'loading...'}</td>
                        <td>{prof.designation || 'loading...'}</td>
                        <td>{prof.email || 'loading...'}</td>
                        <td>{prof.contactNumber || 'loading...'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>) : (
            <h6 style={{ marginTop: '10px', margin: '10px 10px -7px 10px' }}>Professional References :<span style={{ fontWeight: 'normal' }}>No Professional References Details</span></h6>
          )}
          {previewData.employeeRelatives?.hasRelative === true ? (
            <>
              <h6 style={{ marginTop: '10px', margin: '10px 10px -7px 10px' }}>Relative Working With Moptra Infotech : <span>Yes</span></h6>
              <div className="preview-table addressHistory">
                <table className='table table-hover table-vcenter text-nowrap mb-0'>
                  <tbody>
                    <tr>
                      <td className='serial-no-column'><strong>S.No.</strong></td>
                      <td><strong>Name</strong></td>
                      <td><strong>Employee ID</strong></td>
                      <td><strong>Relationship</strong></td>
                      <td><strong>Department</strong></td>
                      <td><strong>Location</strong></td>
                      <td><strong>Remarks</strong></td>
                    </tr>
                    {previewData.employeeRelatives?.relativeInfoList?.length > 0 && (
                      previewData.employeeRelatives.relativeInfoList.map((relativeInfo, index) => (
                        <tr key={index}>
                          <td className='serial-no-column'><strong>{index + 1}.</strong></td>
                          <td>{relativeInfo.name || 'loading...'}</td>
                          <td>{relativeInfo.employeeId || 'loading...'}</td>
                          <td>{relativeInfo.relationship || 'loading...'}</td>
                          <td>{relativeInfo.department || 'loading...'}</td>
                          <td>{relativeInfo.location || 'loading...'}</td>
                          <td>{relativeInfo.remarks || 'loading...'}</td>
                        </tr>
                      )))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <h6 style={{ marginTop: '10px', margin: '10px 10px -7px 10px' }}>Relative Working With Moptra Infotech : <span>No</span></h6>
          )}
          {Object.keys(previewData.passportDetails || {}).length > 0 &&
            Object.keys(previewData.visaStatus || {}).length > 0 &&
            Object.keys(previewData.workPermit || {}).length > 0 ? (
            <>
              <h6 style={{ marginTop: '10px', margin: '10px 10px -7px 10px' }}>Passport Details :</h6>
              <div className="preview-table">
                <table className='table table-hover table-vcenter text-nowrap mb-0'>
                  <tbody>
                    <tr>
                      <td><strong>Passport No :</strong><span>{previewData.passportDetails.passportNumber || 'N/A'}</span></td>
                      <td><strong>Date Of Issue :</strong><span>{previewData.passportDetails.issueDate || 'N/A'}</span></td>
                      <td><strong>Place Of Issue :</strong><span>{previewData.passportDetails.placeOfIssue || 'N/A'}</span></td>
                      <td><strong>Valid Upto :</strong><span>{previewData.passportDetails.expiryDate || 'N/A'}</span></td>
                      <td><strong>Country Of Issue :</strong><span>{previewData.passportDetails.countryOfIssue || 'N/A'}</span></td>
                    </tr>
                    <tr>
                      <td><strong>Nationality :</strong><span>{previewData.passportDetails.nationality || 'N/A'}</span></td>
                      <td><strong>Visa Status :</strong><span>
                        {
                          Object.entries(previewData.visaStatus || {}).find(([key, value]) => value === true)
                            ? visaLabelMap[Object.entries(previewData.visaStatus).find(([_, val]) => val === true)[0]]
                            : 'N/A'
                        }
                      </span>
                      </td>
                      <td><strong>Legal Right To Work In Country :</strong><span>{previewData.workPermit.legalRightToWork || 'N/A'}</span></td>
                      <td><strong>Work Permit Valid Till :</strong><span>{previewData.workPermit.workPermitValidTill || 'N/A'}</span></td>
                      <td><strong>Work Permit Details :</strong><span>{previewData.workPermit.workPermitDetails || 'N/A'}</span></td>
                    </tr>
                    <tr>
                      <td><strong>Passport Copy :</strong><span>{previewData.workPermit.passportCopy || 'N/A'}</span></td>
                      <td><strong>Passport Document :</strong><span><span>{previewData.workPermit.passportCopyPath ? (previewData.workPermit.passportCopyPath &&
                        <a href={previewData.workPermit.passportCopyPath} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      ) : (
                        'N/A'
                      )}</span></span></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>) : (
            <h6 style={{ marginTop: '10px', margin: '10px 10px -7px 10px' }}>Passport Details : <span>No Passport Details Record</span></h6>
          )}
        </div>
        <div className='personalDetailForm' style={{ marginBottom: '25px' }}>
          <div className='personalDetailHeading'> <h6 className='personalDetailHeadline'>DECLARATION DETAILS</h6> </div>
          <div className="preview-table" style={{ marginBottom: '125px' }}>
            <table className='table table-hover table-vcenter text-nowrap mb-0'>
              <tbody>
                <tr>
                  <td><strong>Details Of Any Major Illness/Surgery In The Past 3 Years :</strong><span>{previewData.otherDetails?.illness || 'Not Mentioned'}</span></td>
                  <td><strong>Self introduction :</strong><span>{previewData.otherDetails?.selfIntroduction || 'Not Mentioned'}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='signAttach'>
            <AttachSign />
            <label className='signatureLabel'>Employee Signature</label>
            {errors.signatureAttach && <div className='user-error-msg' style={{ marginTop: '-40px', marginBottom: '12px' }}>{errors.signatureAttach.message}</div>}
            <div className='lastDate'>
              <label>Date<span className='finalDateSeperator' >:</span></label>
              <input
                type='date'
                className={`lastDateInput ${currentDate ? "filled-date" : "placeholder-date"}`}
                value={currentDate}
                onChange={(e) => {
                  handleDateChange(e);
                  clearErrors('dateAttach');
                }}
              />
            </div>
            {errors.dateAttach && <div className='user-error-msg'>{errors.dateAttach.message}</div>}
            <div>
              <label>Place<span className='required'>*</span> :</label>
              <input type='text' className={`lastPlaceInput ${errors.placeAttach ? 'invalid' : ''}`} {...register("placeAttach", { required: "Please put the place name before final submit" })} />
            </div>
            {errors.placeAttach && <div className='user-error-msg'>{errors.placeAttach.message}</div>}

            {/* save buttons */}
            <div className='finalSubmitButton'>
              <button type="button" className="previewBackBtn" onClick={backToDeclarationPage}>Back</button>
              <button type="submit" className="finalSubmitBtn">Final Submit
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div >
  )
}
