import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'components/ContextProvider/Context';
import { useRegistrationContext } from 'components/ContextProvider/RegistrationDataContext';
import Navbar from './Navbar.js';
import axios from 'axios';
import ReusableProgessBar from 'layouts/ReusableProgessBar';

export default function ProfessionalRefForm() {

  const navigate = useNavigate();
  const {
    register, handleSubmit, errors, onSubmit, setValue, watch, clearErrors, showAddBtn, setShowAddBtn, showMinusBtn, setShowMinusBtn, reset
  } = useFormContext();
  const { registrationData } = useRegistrationContext();  // Access registration data from context
  const [refNames, setRefNames] = useState([]); // initialize the state to track all the prof ref names invaid input in array
  const [refCompanyNames, setRefCompanyNames] = useState([]);
  const [refDesg, setRefDesg] = useState([]);
  const [refRelation, setRefRelation] = useState([]);
  const [refNo, setRefNo] = useState([]); // initialize the state to track all the ref no. invaid input in array
  const [showRelativeSection, setShowRelativeSection] = useState(null); // for showing table of moptra relative details
  const [profRows, setProfRows] = useState([{}, {}, {}]); // 3 default rows in table
  const [moptraRelativeName, setMoptraRelativeName] = useState('');
  const [moptraRelativeEmpId, setMoptraRelativeEmpId] = useState('');
  const [moptraRelativeRelationship, setMoptraRelativeRelationship] = useState('');
  const [moptraRelativeDept, setMoptraRelativeDept] = useState('');
  const [moptraRelativeDesg, setMoptraRelativeDesg] = useState('');

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
    else if (field.includes('RefCompanyName')) {
      // Create a copy of the degree names array to update the specific index
      const newRefCompanyNames = [...refCompanyNames]; // to ensure that the original state is not mutated

      // Validate the input value
      if (value && !pattern.test(value)) {
        console.log(`${field} is invalid at index ${index}`); // Log if the value is invalid
        alert('No numbers or special characters are allowed');
        // Update only the part that is invalid
        const validValue = value.slice(0, -1); // Removing the last entered invalid character
        newRefCompanyNames[index] = validValue; // Set the value minus the invalid character
        setRefCompanyNames(newRefCompanyNames);
        return;
      }
      newRefCompanyNames[index] = value; // Updates the copied array at the specified index with the new value
      setRefCompanyNames(newRefCompanyNames);
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
    else if (field.includes('RefRelation')) {
      const newRefRelation = [...refRelation];

      if (value && !pattern.test(value)) {
        alert('No numbers or special characters are allowed');
        const validValue = value.slice(0, -1);
        newRefRelation[index] = validValue;
        setRefRelation(newRefRelation);
        return;
      }
      newRefRelation[index] = value;
      setRefRelation(newRefRelation);
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

  const [pattern, setPattern] = useState({
    moptraRelativeName: '',
    moptraRelativeEmpId: '',
    moptraRelativeRelationship: '',
    moptraRelativeDept: '',
    moptraRelativeDesg: ''
  }); // state for overall handling of pattern

  // pattern failure validation 
  const handlePatternForRelativeDetails = (e, pattern, field) => {
    let value = e.target.value;
    clearErrors(field);
    setPattern(prev => ({ ...prev, [field]: value }))
    if (field === 'moptraRelativeName') setMoptraRelativeDept(value);
    if (field === 'moptraRelativeEmpId') setMoptraRelativeEmpId(value);
    if (field === 'moptraRelativeRelationship') setMoptraRelativeRelationship(value);
    if (field === 'moptraRelativeDept') setMoptraRelativeDept(value);
    if (field === 'moptraRelativeDesg') setMoptraRelativeDesg(value);

    if ((field === 'moptraRelativeName' || field === 'moptraRelativeRelationship'
      || field === 'moptraRelativeDept') && value && !pattern.test(value)) {
      alert('No numbers or special characters are allowed');
      value = value.slice(0, -1);
    } else if (field === 'moptraRelativeEmpId') {
      // If emp id exceeds 6 digits, slice it to 6 digits
      if (value.length > 6) {
        value = value.slice(0, 6);
      }
      // perform validation
      if (value && !pattern.test(value)) {
        alert('Only numbers are allowed');
        value = value.slice(0, -1);
      }
      setMoptraRelativeEmpId(value);
    } else if ((field === 'moptraRelativeDept' || field === 'moptraRelativeDesg') && value && !pattern.test(value)) {
      alert('No special characters are allowed');
      value = value.slice(0, -1);
    }
  };

  const handlePassportValidDateColorChange = (e) => {
    const selectedValue = e.target.value;
    setPassportValidDateColor(selectedValue ? "black" : "#d3d3d3");
    clearErrors('passportValidUpto');
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
      const token = localStorage.getItem('tokenForFormsValidation');
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
        navigate("/additionaldetailsform");
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
      <div className='personaldetail-form'>
        <ReusableProgessBar>
          <div className='personalDetailForm'>
            {/* table content */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className='edu-form-container'>
              <div className="personalDetailHeading">
                <h6 className='educationalHeadline'>PROFESSIONAL REFERENCES</h6>
              </div>
              <table className='table tableWidth table-bordered'>
                <thead>
                  <tr>
                    <th scope="col" className='tableHead' >S.No.</th>
                    <th scope="col" className='tableHead'>Name</th>
                    <th scope="col" className='tableHead'>Company Name</th>
                    <th scope="col" className='tableHead'>Designation</th>
                    <th scope="col" className='tableHead'>Relationship</th>
                    <th scope="col" className='tableHead'>Email Address</th>
                    <th scope="col" className='tableHead'>Contact No.</th>
                  </tr>
                </thead>
                <tbody>
                  {profRows.map((_, index) => (
                    <tr key={index}>
                      <td className='tableBody'>{index + 1}.</td>
                      <td className={`tableBody ${errors[`ProfRefName_${index}`] ? 'invalid' : ''}`}>
                        <input type='text area' className='addressTableInput' {...register(`ProfRefName_${index}`)}
                          onChange={(e) => handlePatternChangeForProfRef(index, /^[A-Za-z\s]+$/, `ProfRefName_${index}`, e)} value={refNames[index] || ''} /></td>
                      <td className={`tableBody ${errors[`ProfRefCompanyName_${index}`] ? 'invalid' : ''}`}>
                        <input type='text area' className='addressTableInput' {...register(`ProfRefCompanyName_${index}`)}
                          onChange={(e) => handlePatternChangeForProfRef(index, /^[A-Za-z\s]+$/, `ProfRefCompanyName_${index}`, e)} value={refCompanyNames[index] || ''} /></td>
                      <td className={`tableBody ${errors[`ProfRefDesg_${index}`] ? 'invalid' : ''}`}>
                        <input type='text area' className='addressTableInput' {...register(`ProfRefDesg_${index}`)}
                          onChange={(e) => handlePatternChangeForProfRef(index, /^[A-Za-z0-9-\s]+$/, `ProfRefDesg_${index}`, e)} value={refDesg[index] || ''} /></td>
                      <td className={`tableBody ${errors[`ProfRefRelation_${index}`] ? 'invalid' : ''}`}>
                        <input type='text area' className='addressTableInput' {...register(`ProfRefRelation_${index}`)}
                          onChange={(e) => handlePatternChangeForProfRef(index, /^[A-Za-z0-9-\s]+$/, `ProfRefRelation_${index}`, e)} value={refRelation[index] || ''} /></td>
                      <td className={`tableBody ${errors[`ProfRefEmail_${index}`] ? 'invalid' : ''}`}>
                        <input type='email' className='addressTableInput' {...register(`ProfRefEmail_${index}`)}
                        /></td>
                      <td className={`tableBody ${errors[`ProfRefNo_${index}`] ? 'invalid' : ''}`}>
                        <input type='text' className='addressTableInput' {...register(`ProfRefNo_${index}`, { minLength: 10, maxLength: 10 })}
                          onChange={(e) => handlePatternChangeForProfRef(index, /^[0-9]+$/, `ProfRefNo_${index}`, e)} value={refNo[index] || ''} /></td>
                    </tr>
                  ))}

                </tbody>
              </table>
              <div className='relativeWorking'>
                <div> <h6>Mark if you have any relative working in Moptra Infotech :</h6>
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
              </div>

              {/* table content */}
              {moptraRelative === 'yes' && <table className='table relative-table tableWidth table-bordered'>
                <thead>
                  <tr>
                    <th scope="col" className='tableHead'>Relative's Name</th>
                    <th scope="col" className='tableHead'>Relationship</th>
                    <th scope="col" className='tableHead'>Department</th>
                    <th scope="col" className='tableHead'>Designation</th>
                    <th scope="col" className='tableHead'>Employee ID (If known)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='tableBody'><input type='text' className='tableInput' {...register("moptraRelativeName")} value={pattern.moptraRelativeName}
                      onChange={(e) => handlePatternForRelativeDetails(e, /^[A-Za-z\s]+$/, 'moptraRelativeName')} /></td>
                    <td className='tableBody'><input type='text' className='tableInput' {...register("moptraRelativeRelationship")} value={pattern.moptraRelativeRelationship}
                      onChange={(e) => handlePatternForRelativeDetails(e, /^[A-Za-z\s]+$/, 'moptraRelativeRelationship')} /></td>
                    <td className='tableBody'><input type='text' className='tableInput' {...register("moptraRelativeDept")} value={pattern.moptraRelativeDept}
                      onChange={(e) => handlePatternForRelativeDetails(e, /^[A-Za-z\s]+$/, 'moptraRelativeDept')} /></td>
                    <td className='tableBody'><input type='text' className='tableInput' {...register("moptraRelativeDesg")} value={pattern.moptraRelativeDesg}
                    onChange={(e) => handlePatternForRelativeDetails(e, /^[A-Za-z\s]+$/, 'moptraRelativeDesg')} /></td>
                    <td className='tableBody'><input type='text' className='tableInput' {...register("moptraRelativeEmpId")} value={pattern.moptraRelativeEmpId}
                      onChange={(e) => handlePatternForRelativeDetails(e, /^[0-9]+$/, 'moptraRelativeEmpId')} /></td>
                  </tr>
                </tbody>
              </table>}
              {/* save buttons */}
              <div className='educationSaveButtons'>
                <button type="button" className="profBackBtn" onClick={backToEducationalPage}>Back</button>
                <button type="button" className="saveBtn" onClick={saveInLocalStorage}>Save Draft</button>
                <button type="submit" className="saveNextBtn">Save And Next </button>
              </div>
            </form>
          </div>
        </ReusableProgessBar>
      </div>
    </div>
  )
}

