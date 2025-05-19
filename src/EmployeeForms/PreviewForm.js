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
        const token = localStorage.getItem('tokenForFormsValidation');
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
      <div className='personaldetail-form'>
        <div className='UniversalHeadline' style={{marginBottom: '-8px'}}>
          <h6>PREVIEW</h6>
          <p>Kajal Kumari</p>
        </div>
        {/* <div className='noteHeading'>
          <h5 className='noteContent' style={{ textAlign: 'center', marginLeft: '-250px' }}><b>Note:</b><span className='noteDescription'>Please review the information below carefully before final submission. Use the "Back" button to edit any section.</span></h5>
        </div> */}
        {/* personal detail form data */}
        <div className='personalDetailForm'>
          <div className='personalDetailHeading'> <h6 className='personalDetailHeadline'>PERSONAL DETAILS</h6> </div>
          <div className="preview-table">
            <table className='table table-hover table-vcenter text-nowrap mb-0'>
              <tbody>
                <tr>
                  <td><strong>Gender :</strong><span>{previewData.personalDetails?.gender || ''}</span></td>
                   <td><strong>Mother Name :</strong><span>{previewData.personalDetails?.motherName || ''}</span></td>
                  <td><strong>Father Name :</strong><span>{previewData.personalDetails?.fatherName || ''}</span></td>
                </tr>
                <tr>
                  <td><strong>Aadhar No :</strong><span>{previewData.personalDetails?.aadharNumber || ''}</span></td>
                   <td><strong>Pan No :</strong><span>{previewData.personalDetails?.panNumber || ''}</span></td>
                   <td><strong>Passport Photo :</strong><span>{previewData.personalDetails?.imageUrl || ''}</span></td>
                </tr>
                <tr>
                   <td><strong>Aadhar Document :</strong><span>{previewData.personalDetails?.aadharUrl ? (
                    <a href={previewData.personalDetails.aadharUrl} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    ''
                  )}</span></td>
                 <td><strong>Pan Document :</strong><span>{previewData.personalDetails?.panUrl ? (
                    <a href={previewData.personalDetails.panUrl} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    ''
                  )}</span></td>
                  <td><strong>Passport Document :</strong><span>{previewData.personalDetails?.passportUrl ? (
                    <a href={previewData.personalDetails.passportUrl} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    ''
                  )}</span></td>
                </tr>
                <tr>
                  <td><strong>Alternative Mob. No. :</strong><span>{previewData.personalDetails?.imageUrl || ''}</span></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        <div className='personalDetailForm'>
          <div className='personalDetailHeading'> <h6 className='personalDetailHeadline'>CONTACT DETAILS</h6> </div>
          <h6 style={{ margin: '10px 10px -7px 10px' }}>Permanent Address :</h6>
          <div className="preview-table">
            <table className='table table-hover table-vcenter text-nowrap mb-0'>
              <tbody>
                <tr>
                  <td><strong>House No :</strong><span>{previewData.permanentAddress?.houseNumber || ''}</span></td>
                  <td><strong>Street Name :</strong><span>{previewData.permanentAddress?.streetName || ''}</span></td>
                  <td><strong>Town :</strong><span>{previewData.permanentAddress?.town || ''}</span></td>
                </tr>
                <tr>
                  <td><strong>Pincode :</strong><span>{previewData.permanentAddress?.pincode || ''}</span></td>
                  <td><strong>State :</strong><span>{previewData.permanentAddress?.state || ''}</span></td>
                  <td><strong>City :</strong><span>{previewData.permanentAddress?.city || ''}</span></td>
                </tr>
                <tr>
                  <td><strong>Period of stay :</strong><span>{permanentPeriodOfStay || ''}</span></td>
                  <td><strong>Emergency Contact No :</strong><span>{previewData.permanentAddress?.emergencyContactNumber || ''}</span></td>
                  <td><strong>Their name with relation :</strong><span>{previewData.permanentAddress?.emergencyContactNameAndRelationship || ''}</span></td>
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
                      <td><strong>House No :</strong><span>{previewData.currentAddresses?.houseNumber || ''}</span></td>
                      <td><strong>Street Name :</strong><span>{previewData.currentAddresses?.streetName || ''}</span></td>
                      <td><strong>Town :</strong><span>{previewData.currentAddresses?.town || ''}</span></td>
                    </tr>
                    <tr>
                      <td><strong>Pincode :</strong><span>{previewData.currentAddresses?.pincode || ''}</span></td>
                      <td><strong>State :</strong><span>{previewData.currentAddresses?.state || ''}</span></td>
                      <td><strong>City :</strong><span>{previewData.currentAddresses?.city || ''}</span></td>
                    </tr>
                    <tr>
                      <td><strong>Period of stay :</strong><span>{currentPeriodOfStay || ''}</span></td>
                      <td><strong>Emergency Contact No :</strong><span>{previewData.currentAddresses?.emergencyContactNumber || ''}</span></td>
                      <td><strong>Their name with relation :</strong><span>{previewData.currentAddresses?.emergencyContactNameAndRelationship || ''}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          <h6 style={{ marginTop: '10px', margin: '10px 10px -7px 10px' }}>Legacy Address :</h6>
          <div className="preview-table">
                <table className='table table-hover table-vcenter text-nowrap mb-0'>
                  <tbody>
                    <tr>
                      <td><strong>House No :</strong><span>{previewData.currentAddresses?.houseNumber || ''}</span></td>
                      <td><strong>Street Name :</strong><span>{previewData.currentAddresses?.streetName || ''}</span></td>
                      <td><strong>Town :</strong><span>{previewData.currentAddresses?.town || ''}</span></td>
                    </tr>
                    <tr>
                      <td><strong>Pincode :</strong><span>{previewData.currentAddresses?.pincode || ''}</span></td>
                      <td><strong>State :</strong><span>{previewData.currentAddresses?.state || ''}</span></td>
                      <td><strong>City :</strong><span>{previewData.currentAddresses?.city || ''}</span></td>
                    </tr>
                    <tr>
                      <td><strong>Period of stay :</strong><span>{currentPeriodOfStay || ''}</span></td>
                      <td><strong>Emergency Contact No :</strong><span>{previewData.currentAddresses?.emergencyContactNumber || ''}</span></td>
                      <td><strong>Their name with relation :</strong><span>{previewData.currentAddresses?.emergencyContactNameAndRelationship || ''}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
        </div>
        <div className='personalDetailForm'>
          <div className='personalDetailHeading'> <h6 className='personalDetailHeadline'>EDUCATIONAL DETAILS</h6> </div>
          <h6 style={{ marginTop: '10px', margin: '10px 10px -7px 10px' }}>Educational Qualification :</h6>
          <div className="preview-table addressHistory">
            <table className='table table-hover table-vcenter text-nowrap mb-0'>
              <tbody>
                <tr>
                  <td className='serial-no-column'><strong>S.No.</strong></td>
                  <td><strong>Degree/Qualification Name</strong></td>
                   <td><strong>College / Institute Name</strong></td>
                   <td><strong>Location</strong></td>
                   <td><strong>Field Of Study</strong></td>
                   <td><strong>Duration</strong></td>
                  <td><strong>Roll No</strong></td>
                  <td><strong>Grade/Percentage</strong></td>
                  <td><strong>Attachments</strong></td>
                </tr>
                {previewData.educationalQualifications?.length > 0 ? (
                  previewData.educationalQualifications.map((education, index) => (
                    <tr key={index}>
                      <td className='serial-no-column'><strong>{index + 1}.</strong></td>
                      <td>{education.degreeName || ''}</td>
                      <td>{education.subject || ''}</td>
                      <td>{education.passingYear || ''}</td>
                      <td>{education.rollNumber || ''}</td>
                      <td>{education.gradeOrPercentage || ''}</td>
                    </tr>
                  ))
                ) : ''}
              </tbody>
            </table>
          </div>
          {/* {previewData.documents && previewData.documents.length > 0 ? (
            <>
              <h6 style={{ marginTop: '10px', margin: '10px 10px 0' }}>
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
                        <td>{docs.documentType || ''}</td>
                        <td>{docs.degreeCertificateUrl ? (docs.degreeCertificateUrl &&
                          <a href={docs.degreeCertificateUrl} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        ) : (
                          ''
                        )}</td>
                        <td>{docs.passingCertificateUrl ? (docs.passingCertificateUrl &&
                          <a href={docs.passingCertificateUrl} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        ) : (
                          ''
                        )}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <h6 style={{ marginTop: '10px', margin: '10px 10px 0' }}>
              Documents Attachment : <span style={{ fontWeight: 'normal' }}>No Documents Uploaded</span>
            </h6>
          )} */}

          {previewData.employmentHistories?.length > 0 ? (
            <>
              <h6 style={{ marginTop: '10px', margin: '10px 10px 0' }}>Employment History :</h6>
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
                          <td><strong>Previous Employer Name :</strong><span>{employment.previousEmployerName || ''}</span></td>
                          <td><strong>Address :</strong><span>{employment.employerAddress || ''}</span></td>
                          <td><strong>Telephone No. :</strong><span>{employment.telephoneNumber || ''}</span></td>
                          <td><strong>Employee Code :</strong><span>{employment.employeeCode || ''}</span></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td><strong>Designation :</strong><span>{employment.designation || ''}</span></td>
                          <td><strong>Department :</strong><span>{employment.department || ''}</span></td>
                          <td><strong>Manager's Name :</strong><span>{employment.managerName || ''}</span></td>
                          <td><strong>Manager's Contact No :</strong><span>{employment.managerContactNo || ''}</span></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td><strong>Manager's Email ID :</strong><span>{employment.managerEmail || ''}</span></td>
                          <td><strong>Reasons For Leaving :</strong><span>{employment.reasonsForLeaving || ''}</span></td>
                          <td><strong>Employment Period :</strong><span>{empHistoryPeriodOfStay || ''}</span></td>
                          <td><strong>Position :</strong><span>{employment.employmentType || ''}</span></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td><strong>Experience Certificate :</strong><span>{employment.experienceCertificateUrl ? (employment.experienceCertificateUrl &&
                            <a href={employment.experienceCertificateUrl} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          ) : (
                            ''
                          )}</span></td>
                          <td><strong>Relieving Letter :</strong><span>{employment.relievingLetterUrl ? (employment.relievingLetterUrl &&
                            <a href={employment.relievingLetterUrl} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          ) : (
                            ''
                          )}</span></td>
                          <td><strong>Last Month Salary Slip :</strong><span>{employment.lastMonthSalarySlipUrl ? (employment.lastMonthSalarySlipUrl &&
                            <a href={employment.lastMonthSalarySlipUrl} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          ) : (
                            ''
                          )}</span></td>
                          <td><strong>Appointment Letter :</strong><span>{employment.appointmentLetterUrl ? (employment.appointmentLetterUrl &&
                            <a href={employment.appointmentLetterUrl} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          ) : (
                            ''
                          )}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>)
              })}
            </>
          ) : (
            <h6 style={{ marginTop: '10px', margin: '10px 10px 10px' }}>Employment History :<span style={{ fontWeight: 'normal' }}> No Employment History Details</span></h6>
          )}
        </div>
        <div className='personalDetailForm'>
          <div className='personalDetailHeading'> <h6 className='personalDetailHeadline'>PROFESSIONAL REFERENCES DETAILS</h6> </div>
          {previewData.professionalReferences?.length > 0 ? (
            <>
              <h6 style={{ marginTop: '10px', margin: '10px 10px 0' }}>Professional References :</h6>
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
                        <td>{prof.name || ''}</td>
                        <td>{prof.designation || ''}</td>
                        <td>{prof.email || ''}</td>
                        <td>{prof.contactNumber || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>) : (
            <h6 style={{ marginTop: '10px', margin: '10px 10px 0' }}>Professional References :<span style={{ fontWeight: 'normal' }}> No Professional References Details</span></h6>
          )}
          {previewData.employeeRelatives?.hasRelative === true ? (
            <>
              <h6 style={{ marginTop: '10px', margin: '10px 10px 0' }}>Relative Working With Moptra Infotech : <span>Yes</span></h6>
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
                          <td>{relativeInfo.name || ''}</td>
                          <td>{relativeInfo.employeeId || ''}</td>
                          <td>{relativeInfo.relationship || ''}</td>
                          <td>{relativeInfo.department || ''}</td>
                          <td>{relativeInfo.location || ''}</td>
                          <td>{relativeInfo.remarks || ''}</td>
                        </tr>
                      )))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <h6 style={{ marginTop: '10px', margin: '10px 10px 0' }}>Relative Working With Moptra Infotech : <span>No</span></h6>
          )}
          {/* {Object.keys(previewData.passportDetails || {}).length > 0 &&
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
            <h6 style={{ marginTop: '10px', margin: '10px 10px 10px' }}>Passport Details : <span>No Passport Details Record</span></h6>
          )} */}
        </div>
        <div className='personalDetailForm'>
          <div className='personalDetailHeading'> <h6 className='personalDetailHeadline'>Additional DETAILS</h6> </div>
          <div className="preview-table">
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
            {/* <label className='signatureLabel'>Employee Signature</label> */}
            {errors.signatureAttach && <div className='user-error-msg'>{errors.signatureAttach.message}</div>}
            <div className='lastDate'>
              <label>Date</label>
              <input
                type='date'
                // className={`lastDateInput ${currentDate ? "filled-date" : "placeholder-date"}`}
                value={currentDate}
                onChange={(e) => {
                  handleDateChange(e);
                  clearErrors('dateAttach');
                }}
              />
            </div>
            {errors.dateAttach && <div className='user-error-msg'>{errors.dateAttach.message}</div>}
            <div className='place'>
              <label>Place</label>
              <input type='text' className={`lastPlaceInput ${errors.placeAttach ? 'invalid' : ''}`} {...register("placeAttach", { required: "Please put the place name before final submit" })} />
            </div>
            {errors.placeAttach && <div className='user-error-msg'>{errors.placeAttach.message}</div>}

            {/* save buttons */}
            <div className='contactSaveButtons'>
              <button type="button" className="backBtn" onClick={backToDeclarationPage}>Back</button>
              <button type="submit" className="saveNextBtn">Final Submit
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            {/* <div className='finalSubmitButton'>
              <button type="button" className="previewBackBtn" onClick={backToDeclarationPage}>Back</button>
              <button type="submit" className="finalSubmitBtn">Final Submit
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div> */}
          </form>
        </div>
        <ToastContainer />
      </div>
    </div >
  )
}
