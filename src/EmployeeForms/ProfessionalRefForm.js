import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'components/ContextProvider/Context';
import Navbar from './Navbar.js';
import axios from 'axios';

export default function ProfessionalRefForm() {

  const navigate = useNavigate();
  const {
    register, handleSubmit, errors, onSubmit, setValue, watch, showAddBtn, setShowAddBtn, showMinusBtn, setShowMinusBtn
  } = useFormContext();
  
  const [refNames, setRefNames] = useState([]); // initialize the state to track all the prof ref names invaid input in array
  const [refDesg, setRefDesg] = useState([]); // initialize the state to track all the ref desg names invaid input in array
  const [refNo, setRefNo] = useState([]); // initialize the state to track all the ref no. invaid input in array
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

        if (value && !pattern.test(value)) {
            alert('No numbers or special characters are allowed');
            const validValue = value.slice(0, -1);
            newRefNo[index] = validValue;
            setRefNo(newRefNo);
            return;
        }
        newRefNo[index] = value;
        setRefNo(newRefNo);
    }
}

const addTableForNextProfRef = () => {
  if (profRows.length < 5) { 
    const newRows = [...profRows, {}]; 
    setProfRows(newRows);

    // Manage button visibility
    if (newRows.length === 3 ) {
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
    const file = e.target.files[0]; // Get the first file from the input
    if (file) {
      const fileType = file.type;
      const allowedFileTypes = ["application/pdf"];  // file type allowed
      if (!allowedFileTypes.includes(fileType)) {
        window.alert("Only PDF files are supported");
        e.target.value = ''; // Reset the input field
        return;
      }
      setPassportCopyDoc(file);
      const fileSize = file.size;
      if (fileSize / 1024 > 20) {
        setErrorForPassportCopyFileSize("file should be less than or upto 20kb");  // file size validation
        e.target.value = '';
        return;
      }
      else {
        setErrorForPassportCopyFileSize('');
      }
    }
  }

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

  const handleFormSubmit = (data) => {
    console.log('Form data:', data); // Verify form data
    onSubmit(data); // Calling the onSubmit prop passed from the parent
    navigate("/declarationform");
    reset();
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
        <h6 className='mainHeading'>ASSOCIATE INFORMATION AND BACKGROUND CHECK FORM</h6>
      </div>
      <div className='noteHeading'>
        <h5 className='noteContent'>Note:<span className='noteDescription'>Please update all cells with correct and relevant data. The information provided in this document
          will form part of your official records in the Company<br /> and is subjected to verification.</span></h5>
      </div>
      <hr />
      <div>
        <div className='profDetailHeading'> <h6 className='personalDetailHeadline'>PROFESSIONAL REFERENCES-</h6></div>
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
                  onChange={(e) => handlePatternChangeForProfRef(index, /^[A-Za-z\s]+$/, `ProfRefName_${index}`, e)} value={refNames[index] || ''}/></td>
                <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`ProfRefDesg_${index}`] ? 'invalid' : ''}`}>
                  <input type='text area' className='addressTableInput' {...register(`ProfRefDesg_${index}`)} 
                  onChange={(e) => handlePatternChangeForProfRef(index, /^[A-Za-z\s]+$/, `ProfRefDesg_${index}`, e)} value={refDesg[index] || ''}/></td>
                <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`ProfRefEmail_${index}`] ? 'invalid' : ''}`}>
                  <input type='email' className='addressTableInput' {...register(`ProfRefEmail_${index}`)} 
                 /></td>
                <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`ProfRefNo_${index}`] ? 'invalid' : ''}`}>
                  <input type='text' className='addressTableInput' {...register(`ProfRefNo_${index}`, { minLength: 10, maxLength: 10 })} 
                  onChange={(e) => handlePatternChangeForProfRef(index, /^[0-9]+$/, `ProfRefNo_${index}`, e)} value={refNo[index] || ''}/></td>
              </tr>
            ))}
            {/* <tr>
              <th className='tableBody'>1</th>
              <td className='tableBody'><input type='text area' className='tableInput' {...register("firstProfRefName", { pattern: /^[A-Za-z\s]+$/ })} /></td>
              <td className='tableBody'><input type='text area' className='tableInput' {...register("firstProfRefDesg", { pattern: /^[A-Za-z\s]+$/ })} /></td>
              <td className='tableBody'><input type='email' className='tableInput' {...register("firstProfRefEmail")} /></td>
              <td className='tableBody'><input type='text' className='tableInput' {...register("firstProfRefNo", { pattern: /^[0-9]+$/, minLength: 10, maxLength: 10 })} /></td>
            </tr>
            <tr>
              <th className='tableBodyLight'>2</th>
              <td className='tableBodyLight'><input type='text area' className='tableInput' {...register("secondProfRefName", { pattern: /^[A-Za-z\s]+$/ })} /></td>
              <td className='tableBodyLight'><input type='text area' className='tableInput' {...register("secondProfRefDesg", { pattern: /^[A-Za-z\s]+$/ })} /></td>
              <td className='tableBodyLight'><input type='email' className='tableInput' {...register("secondProfRefEmail")} /></td>
              <td className='tableBodyLight'><input type='text' className='tableInput' {...register("secondProfRefNo", { pattern: /^[0-9]+$/, minLength: 10, maxLength: 10 })} /></td>
            </tr>
            {rows.map((_, index) => (
              <tr key={index}>
                <th className={index % 2 === 0 ? 'tableBody' : 'tableBodyLight'}>{index + 3}</th>
                <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`anotherProfRefName_${index}`] ? 'invalid' : ''}`}>
                  <input type='text area' className='tableInput' {...register(`anotherProfRefName_${index}`, { pattern: /^[A-Za-z\s]+$/ })} /></td>
                <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`anotherProfRefDesg_${index}`] ? 'invalid' : ''}`}>
                  <input type='text area' className='tableInput' {...register(`anotherProfRefDesg_${index}`, { pattern: /^[A-Za-z\s]+$/ })} /></td>
                <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`anotherProfRefEmail_${index}`] ? 'invalid' : ''}`}>
                  <input type='email' className='tableInput' {...register(`anotherProfRefEmail_${index}`)} /></td>
                <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`anotherProfRefNo_${index}`] ? 'invalid' : ''}`}>
                  <input type='text' className='tableInput' {...register(`anotherProfRefNo_${index}`, { pattern: /^[0-9]+$/, minLength: 10, maxLength: 10 })} /></td>
              </tr>
            ))} */}

          </tbody>
        </table>
        <div className='btns'>
                <div className='eduAddRowButtonContainer'>
                    {showAddBtn &&
                        (<input type='button' className='profAddRowButton' value='+Add Row' onClick={addTableForNextProfRef} />
                        )}
                </div>
                <div className='eduAddRowButtonContainer'>
                    {showMinusBtn &&
                        (<input type='button' className='profAddRowButton' value='-Add Row' onClick={removeTableForNextProfRef} />
                        )}
                </div>
            </div>
        {/* <div>
          <input type='button' className='profAddRowButton' value='+Add Row' onClick={addRowForProfRef} disabled={rows.length >= 1} />
        </div> */}
        <div className='relativeWorking'>
          <div className='profDetailHeading'> <h6 className='relativeWorkingHeadline'>Do you have any relative's working with Moptra Infotech?
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
              <td className='tableBody'><input type='text area' className='tableInput' /></td>
              <td className='tableBody'><input type='text area' className='tableInput' /></td>
              <td className='tableBody'><input type='text area' className='tableInput' /></td>
              <td className='tableBody'><input type='text area' className='tableInput' /></td>
              <td className='tableBody'><input type='text area' className='tableInput' /></td>
              <td className='tableBody'><input type='text area' className='tableInput' /></td>
            </tr>
            <tr>
              <td className='tableBodyLight'><input type='text area' className='tableInput' /></td>
              <td className='tableBodyLight'><input type='text area' className='tableInput' /></td>
              <td className='tableBodyLight'><input type='text area' className='tableInput' /></td>
              <td className='tableBodyLight'><input type='text area' className='tableInput' /></td>
              <td className='tableBodyLight'><input type='text area' className='tableInput' /></td>
              <td className='tableBodyLight'><input type='text area' className='tableInput' /></td>
            </tr>
          </tbody>
        </table>}

        {/* passport details form */}
        <div className='passportContainer'>
          <div className='profDetailHeading'> <h6 className='personalDetailHeadline'>PASSPORT DETAILS-</h6></div>
        </div>
        <div className='passportDetailsContainer'>
          <div className='passportNoContainer'>
            <label>Passport Number<span className='separatorForPrevEmpName'>:</span></label>
            <input type='text' placeholder='Passport Number' className='passportNoInput' {...register("passportNo")} />
          </div>
          <div className='passportDateContainer'>
            <label>Date of Issue<span className='separatorForPrevEmpName'>:</span></label>
            <input type='date' placeholder='date' className='passportDateInput'  {...register("passportDate")} />
          </div>
          <div className='passportPlaceContainer'>
            <label>Place of Issue<span className='separatorForPrevEmpName'>:</span></label>
            <input type='text' placeholder='place' className='passportPlaceInput'  {...register("passportPlace", { pattern: /^[A-Za-z\s]+$/ })}
              value={patternForPassportPlace} onChange={handlePatternForPassportPlace} />
            {customErrorForPassportPlace ? <div className='errorMessage'>{customErrorForPassportPlace}</div> : ''}
          </div>
        </div>
        <div className='passportValidDetailsContainer'>
          <div className='passportValidContainer'>
            <label>Valid Upto<span className='separatorForPrevEmpName'>:</span></label>
            <input type='date' placeholder='Enter Valid Date' className='passportValidInput'  {...register("passportValidUpto")} />
          </div>
          <div className='passportCountryContainer'>
            <label>Country of Issue<span className='separatorForPassport'>:</span></label>
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
              {...register("legalRight", { required: true })}
            />
            Yes
          </label>
          <label>
            <input
              type='radio' className='radioYes' name='legalRight' value='no'
              {...register("legalRight", { required: true })}
            />
            No
          </label>
          {errors.legalRight && <div className='moptraRelativeErrorMessage'>Please select atleast any one alternative</div>}
          </div>
          <div className='workPermitContainer'>
            <label>Work permit valid till<span className='separatorForPassport'>:</span></label>
            <input type='date' placeholder='select date' className='workPermitInput' {...register("workPermit")} />
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
          <div>
            <input type='file' className="profUploadFileInput" {...register("passportCopyFile")}
              onChange={handleFileForPassportCopy} />
            <button type="submit" className="passportCopyUpload">upload</button>
          </div>
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

