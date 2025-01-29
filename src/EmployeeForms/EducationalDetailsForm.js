import React, { useState, useEffect, useRef } from 'react';
import EmploymentHistoryForm from './EmploymentHistoryForm';
import Navbar from './Navbar';
import { useFormContext } from 'components/ContextProvider/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EducationalDetailsForm() {

  const navigate = useNavigate();
  const {
    register, handleSubmit, errors, onSubmit, watch, setValue, reset, clearErrors, showAddBtn, setShowAddBtn, showMinusBtn, setShowMinusBtn
  } = useFormContext();
    const [storedContactDetails, setStoredContactDetails] = useState(''); // State to hold parsed contactDetails
    const [expYr, setExpYr] = useState(''); // for storing no. of exp. in yrs
    const [showEmpHistory, setEmpHistory] = useState([]); // shows emp history in array as much required
    const [degreeDoc, setDegreeDoc] = useState(''); // state for holding degree document file
    const [selectedDegree, setSelectedDegree] = useState(""); // state for holding degree name
    const [nestedOptions, setNestedOptions] = useState([]); // state for taking values from object 'educationOptions'
    const [selectedCertificate, setSelectedCertificate] = useState([]); // to keep track of the selected certificate
    const [optionSelected, setOptionSelected] = useState(false); // State to track if an option is selected
    const [degreeNames, setDegreeNames] = useState([]); // initialize the state to track all the degree names invaid input in array
    const [subjects, setSubjects] = useState([]); // initialize the state to track all the subjects invaid input in array
    const [passingYr, setPassingYr] = useState([]); // initialize the state to track all the passing year invaid input in array
    const [rollNo, setRollNo] = useState([]); // initialize the state to track all the roll no. invaid input in array
    const [grade, setGrade] = useState([]); // initialize the state to track all the grade invaid input in array
    const [isValid, setIsValid] = useState(true); // To track whether input is valid for length validation
    const [eduRows, setEduRows] = useState([{}, {}, {}]); // 3 default rows in table

    // to render attachment section
    const educationOptions = {     // options of degree which contains options for certificates
        Highschool: ['Degree Certificate', 'Passing Certificate'],
        Intermediate: ['Degree Certificate', 'Passing Certificate'],
        Graduation: ['Degree Certificate', 'Final Year Marksheet'],
        PostGraduation: ['Degree Certificate', 'Final Year Marksheet'],
        others: ['Degree Certificate', 'Final Year Marksheet']
    };

    const changeSelectOptionHandler = (event) => {
        const value = event.target.value;
        setSelectedDegree(value);
        const options = educationOptions[value] || []; // to show certificates list or nothing
        setNestedOptions(options);
        setSelectedCertificate([]); // to reset the input type file for certificates
        setOptionSelected(true); // Set option selected state to true when an option is selected

    };

    const changeNestedOptionHandler = (e) => {
        const certificate = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedCertificate([...selectedCertificate, certificate]); // adds the certificate to the selectedCertificate array
        } else {
            setSelectedCertificate(selectedCertificate.filter(item => item !== certificate)); // remove the certificate from the selectedCertificate array
        }
    };

    const addTableForNextEducationDetail = () => {
    if (eduRows.length < 5) { // Allow adding only up to 5 rows total (3 default + 2 added)
      const newRows = [...eduRows, {}]; // Add one more row
      setEduRows(newRows);

      // Manage button visibility
      if (newRows.length === 5) {
        setShowAddBtn(false);  // Hide "Add Row" button when there are exactly 5 rows
        setShowMinusBtn(true); // Show "Remove Row" button when there are exactly 5 rows
      } else {
        setShowAddBtn(true); // Show "Add Row" button if there are less than 5 rows
        setShowMinusBtn(false); // Hide "Remove Row" button until 5 rows are reached
      }
    }
  };

    const removeTableForNextEducationDetail = () => {
        if (eduRows.length > 3) { // Allow removing only if there are more than 3 rows
          const newRows = eduRows.slice(0, -1); // Remove one row
          setEduRows(newRows);
    
          // Manage button visibility
          if (newRows.length < 5) {
            setShowAddBtn(true); // Show "Add Row" button again when there are fewer than 5 rows
          }
    
          if (newRows.length === 3) {
            setShowMinusBtn(false); // Hide "Remove Row" button when only 3 rows remain
          } else {
            setShowMinusBtn(true); // Keep "Remove Row" button visible when more than 3 rows
            setShowAddBtn(false);
          }
        }
      };

    const yrOfExp = watch("yrOfExp", "");  // to monitor changes in the yrOfExp field.
    const setExp = (e) => {
        const value = e.target.value;
        setValue('yrOfExp', value);  // Update the form state with the selected value
        setExpYr(value);
    };
    useEffect(() => {  // for showing emp history component as many times as the no. of exp. in yrs given
        if (yrOfExp <= 3) {
            setEmpHistory(Array.from({ length: yrOfExp }, () => ({})));
        } else if (yrOfExp > 3) {
            setEmpHistory(Array.from({ length: 3 }, () => ({})));
        } else {
            setEmpHistory([]);
        }
    }, [yrOfExp]);

    // file type for degree document upload
    const handleFileForDegreeDoc = (e) => {
        const file = e.target.files[0]; // Get the first file from the input
        if (file) {
            const fileType = file.type;
            const allowedFileTypes = ["application/pdf"];  // file type allowed
            if (!allowedFileTypes.includes(fileType)) {
                window.alert("Only PDF files are supported");
                e.target.value = ''; // Reset the input field
                return;
            }
            setDegreeDoc(file);
            const fileSize = file.size;
            if (fileSize / 1024 > 20) {
                window.alert("File Size should be less than or upto 20kb"); // file size validation
                e.target.value = '';
                return;
            }
        }
    }

    // for pattern validation of educational document inputs
    const handlePatternChangeForEduDoc = (index, pattern, field, e) => {
        const value = e.target.value;

        if (field.includes('DegreeName')) {
            // Create a copy of the degree names array to update the specific index
            const newDegreeNames = [...degreeNames]; // to ensure that the original state is not mutated

            // Validate the input value
            if (value && !pattern.test(value)) {
                console.log(`${field} is invalid at index ${index}`); // Log if the value is invalid
                alert('No numbers or special characters are allowed');
                // Update only the part that is invalid
                const validValue = value.slice(0, -1); // Removing the last entered invalid character
                newDegreeNames[index] = validValue; // Set the value minus the invalid character
                setDegreeNames(newDegreeNames);
                return;
            }
            newDegreeNames[index] = value; // Updates the copied array at the specified index with the new value
            setDegreeNames(newDegreeNames);
        }
        else if (field.includes('DegreeSubject')) {
            const newSubjects = [...subjects];

            if (value && !pattern.test(value)) {
                alert('No numbers or special characters are allowed');
                const validValue = value.slice(0, -1);
                newSubjects[index] = validValue;
                setSubjects(newSubjects);
                return;
            }
            newSubjects[index] = value;
            setSubjects(newSubjects);
        }
        else if (field.includes('DegreePassingYr')) {
            const newPassingYr = [...passingYr];

            if (value && !pattern.test(value)) {
                alert('No numbers or special characters are allowed');
                const validValue = value.slice(0, -1);
                newPassingYr[index] = validValue;
                setPassingYr(newPassingYr);
                setIsValid(false);
                return;
            }
            newPassingYr[index] = value;
            setPassingYr(newPassingYr);
            setIsValid(true);
        }
        else if (field.includes('DegreeRollNo')) {
            const newRollNo = [...rollNo];

            if (value && !pattern.test(value)) {
                alert('No numbers or special characters are allowed');
                const validValue = value.slice(0, -1);
                newRollNo[index] = validValue;
                setRollNo(newRollNo);
                return;
            }
            newRollNo[index] = value;
            setRollNo(newRollNo);
        }
        else if (field.includes('DegreeGrade')) {
            const newGrade = [...grade];

            if (value && !pattern.test(value)) {
                alert('No numbers or special characters are allowed');
                const validValue = value.slice(0, -1);
                newGrade[index] = validValue;
                setGrade(newGrade);
                return;
            }
            newGrade[index] = value;
            setGrade(newGrade);
        }
    }

    // for backward navigation
    const backToContactPage = () => {
        navigate("/contactdetailsform");
    }

    // for handle submit
    const handleFormSubmit = async(data) => {
        console.log('Form data:', data);

        try{
            const response = await axios.post('http://localhost:8081/primaryDetails/save', newPayload, {
                headers: {
                    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJTVVBFUl9BRE1JTiIsImVtYWlsSWQiOiJzdXBlcmFkbWluMTIzQGdtYWlsLmNvbSIsInByaW1hcnlJZCI6bnVsbCwiZXhwIjoxNzM4MzkzNzcxLCJpYXQiOjE3Mzc1Mjk3NzEsImp0aSI6ImVjMmM3MTMyLTAxMWQtNDdkYy1iZjU4LTUxYjE2NmU4ZjA2NiIsInZhbGlkU2Vzc2lvbiI6dHJ1ZX0.JYeengxGEXUTZ6ixEmrWcDQu6mc3fyxZyIdlFJEPOn4'}`
                }
            });
         if(response && response.data){
            console.log("Form submitted successfully:", response.data);
            navigate("/professionalrefform");
            reset();
           // onSubmit(data);
          } else {
            console.error("Error submitting form:", response);
            console.error("Error submitting form. Status:", response.status);
            console.error("Error details:", response.data);
          }
        }catch (error) {
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

    // for retrieving data from session storage
    const contactFormDetails = sessionStorage.getItem('contactDetails');
    if(contactFormDetails){
        const parsedContactDetails = JSON.parse(contactFormDetails);
        setStoredContactDetails(parsedContactDetails);
        console.log('parsed contact details data:', parsedContactDetails);
        console.log('retrieved contact details data:', storedContactDetails);
      }else {
        console.log('No contact details found in sessionStorage');
      }

  return (
    <div className='container-fluid form-navbar'>
    <Navbar />
 
    <div className='personaldetail-form'>
    <div className='UniversalHeadline'>
        <h6 className='mainHeading'>ASSOCIATE INFORMATION AND BACKGROUND CHECK FORM</h6>
    </div>
    <div className='noteHeading'>
        <h5 className='noteContent'>Note:<span className='noteDescription'>Please update all cells with correct and relevant data. The information provided in this document
            will form part of your official records in the Company<br /> and is subjected to verification.</span></h5>
    </div>
    <hr />
    {/* educational detail */}
    <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='personalDetailForm'>
            <div>
                <div className='personalDetailHeading'> <h6 className='educationalHeadline'>EDUCATIONAL QUALIFICATION <span className='required'>*</span> -</h6><span><p className='educationalNote'>Please fill your
                    educational details and attach the documents below. </p></span> </div>
            </div>
            {/* table content */}
            <table className='table tableWidth table-bordered'>
                <thead>
                    <tr>
                        <th scope="col" className='tableHead' >S.No.</th>
                        <th scope="col" className='tableHead'>Degree/Qualification Name</th>
                        <th scope="col" className='tableHead'>Subject</th>
                        <th scope="col" className='tableHead'>Passing Year</th>
                        <th scope="col" className='tableHead'>Roll Number </th>
                        <th scope="col" className='tableHead'>Grade/Percentage</th>
                    </tr>
                </thead>
                <tbody>
                {eduRows.map((_, index) => (
                    <tr key={index}>
                        <td className={index % 2 === 0 ? 'tableBody' : 'tableBodyLight'}>{index + 1}</td>
                        <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`higherDegreeName_${index}`] ? 'invalid' : ''}`}>
                            <input type='text' className='addressTableInput'
                                {...register(`higherDegreeName_${index}`, { required: true })}
                                onChange={(e) => handlePatternChangeForEduDoc(index, /^[A-Za-z\s]+$/, `higherDegreeName_${index}`, e)} value={degreeNames[index] || ''}
                            />
                        </td>
                        <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`higherDegreeSubject_${index}`] ? 'invalid' : ''}`}>
                            <input type='text' className='addressTableInput'
                                {...register(`higherDegreeSubject_${index}`, { required: true })}
                                onChange={(e) => handlePatternChangeForEduDoc(index, /^[A-Za-z\s]+$/, `higherDegreeSubject_${index}`, e)} value={subjects[index] || ''}
                            />
                        </td>
                        <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`higherDegreePassingYr_${index}`] ? 'invalid' : ''}`}>
                            <input type='text' className='addressTableInput'
                                {...register(`higherDegreePassingYr_${index}`, { required: true, minLength: 4 })}
                                onChange={(e) => handlePatternChangeForEduDoc(index, /^[0-9]+$/, `higherDegreePassingYr_${index}`, e)} value={passingYr[index] || ''}
                            />
                        </td>
                        <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`higherDegreeRollNo_${index}`] ? 'invalid' : ''}`}>
                            <input type='text' className='addressTableInput'
                                {...register(`higherDegreeRollNo_${index}`, { required: true })}
                                onChange={(e) => handlePatternChangeForEduDoc(index, /^[A-Za-z0-9\-\s]+$/, `higherDegreeRollNo_${index}`, e)} value={rollNo[index] || ''}
                            />
                        </td>
                        <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`higherDegreeGrade_${index}`] ? 'invalid' : ''}`}>
                            <input type='text' className='addressTableInput'
                                {...register(`higherDegreeGrade_${index}`, { required: true })}
                                onChange={(e) => handlePatternChangeForEduDoc(index, /^[A-Za-z0-9\-\.\%\s]+$/, `higherDegreeGrade_${index}`, e)} value={grade[index] || ''}
                            />
                        </td>
                    </tr>
                ))}
                    {/* <tr>
                        <td className='tableBodyLight'>1</td>
                        <td className={`tableBodyLight ${errors.firstDegreeName ? 'invalid' : ''}`} ><input type='text area' className='addressTableInput' {...register("firstDegreeName", { required: true })}
                            onChange={(e) => handlePatternChangeForEduDoc(0, /^[A-Za-z\s]+$/, 'firstDegreeName', e)} value={degreeNames[0]} /></td>
                        <td className={`tableBodyLight ${errors.firstDegreeSubject ? 'invalid' : ''}`} ><input type='text area' className='addressTableInput' {...register("firstDegreeSubject", { required: true })}
                            onChange={(e) => handlePatternChangeForEduDoc(0, /^[A-Za-z\s]+$/, 'firstDegreeSubject', e)} value={subjects[0]} /></td>
                        <td className={`tableBodyLight ${errors.firstDegreePassingYr ? 'invalid' : ''}`} ><input type='text' className='addressTableInput' {...register("firstDegreePassingYr", { required: true, minLength: 4 })}
                            onChange={(e) => handlePatternChangeForEduDoc(0, /^[0-9]+$/, 'firstDegreePassingYr', e)} value={passingYr[0]} /></td>
                        <td className={`tableBodyLight ${errors.firstDegreeRollNo ? 'invalid' : ''}`} ><input type='text area' className='addressTableInput' {...register("firstDegreeRollNo", { required: true })}
                            onChange={(e) => handlePatternChangeForEduDoc(0, /^[A-Za-z0-9\-\s]+$/, 'firstDegreeRollNo', e)} value={rollNo[0]} /></td>
                        <td className={`tableBodyLight ${errors.firstDegreeGrade ? 'invalid' : ''}`} ><input type='text area' className='addressTableInput' {...register("firstDegreeGrade", { required: true })}
                            onChange={(e) => handlePatternChangeForEduDoc(0, /^[A-Za-z0-9\-\.\%\s]+$/, 'firstDegreeGrade', e)} value={grade[0]} /></td>
                    </tr>
                    <tr>
                        <td className='tableBody'>2</td>
                        <td className={`tableBody ${errors.secondDegreeName ? 'invalid' : ''}`} ><input type='text area' className='addressTableInput' {...register("secondDegreeName", { required: true })}
                            onChange={(e) => handlePatternChangeForEduDoc(1, /^[A-Za-z\s]+$/, 'secondDegreeName', e)} value={degreeNames[1]} /></td>
                        <td className={`tableBody ${errors.secondDegreeSubject ? 'invalid' : ''}`} ><input type='text area' className='addressTableInput' {...register("secondDegreeSubject", { required: true })}
                            onChange={(e) => handlePatternChangeForEduDoc(1, /^[A-Za-z\s]+$/, 'secondDegreeSubject', e)} value={subjects[1]} /></td>
                        <td className={`tableBody ${errors.secondDegreePassingYr ? 'invalid' : ''}`} ><input type='text' className='addressTableInput' {...register("secondDegreePassingYr", { required: true, minLength: 4 })}
                            onChange={(e) => handlePatternChangeForEduDoc(1, /^[0-9]+$/, 'secondDegreePassingYr', e)} value={passingYr[1]} /></td>
                        <td className={`tableBody ${errors.secondDegreeRollNo ? 'invalid' : ''}`} ><input type='text area' className='addressTableInput' {...register("secondDegreeRollNo", { required: true })}
                            onChange={(e) => handlePatternChangeForEduDoc(1, /^[A-Za-z0-9\-\s]+$/, 'secondDegreeRollNo', e)} value={rollNo[1]} /></td>
                        <td className={`tableBody ${errors.secondDegreeGrade ? 'invalid' : ''}`} ><input type='text area' className='addressTableInput' {...register("secondDegreeGrade", { required: true })}
                            onChange={(e) => handlePatternChangeForEduDoc(1, /^[A-Za-z0-9\-\.\%\s]+$/, 'secondDegreeGrade', e)} value={grade[1]} /></td>
                    </tr>

                    <tr>
                        <td className='tableBodyLight'>3</td>
                        <td className={`tableBodyLight ${errors.thirdAddressFrom ? 'invalid' : ''}`} ><input type='text area' className='addressTableInput' {...register("thirdDegreeName", { required: true })}
                            onChange={(e) => handlePatternChangeForEduDoc(2, /^[A-Za-z\s]+$/, 'thirdDegreeName', e)} value={degreeNames[2]} /></td>
                        <td className={`tableBodyLight ${errors.thirdAddressTo ? 'invalid' : ''}`} ><input type='text area' className='addressTableInput' {...register("thirdDegreeSubject", { required: true })}
                            onChange={(e) => handlePatternChangeForEduDoc(2, /^[A-Za-z\s]+$/, 'thirdDegreeSubject', e)} value={subjects[2]} /></td>
                        <td className={`tableBodyLight ${errors.thirdDegreePassingYr ? 'invalid' : ''}`} ><input type='text' className='addressTableInput' {...register("thirdDegreePassingYr", { required: true, minLength: 4 })}
                            onChange={(e) => handlePatternChangeForEduDoc(2, /^[0-9]+$/, 'thirdDegreePassingYr', e)} /></td>
                        <td className={`tableBodyLight ${errors.thirdAddressZipcode ? 'invalid' : ''}`} ><input type='text area' className='addressTableInput' {...register("thirdDegreeRollNo", { required: true })}
                            onChange={(e) => handlePatternChangeForEduDoc(2, /^[A-Za-z0-9\-\s]+$/, 'thirdDegreeRollNo', e)} value={rollNo[2]} /></td>
                        <td className={`tableBodyLight ${errors.thirdAddressCountry ? 'invalid' : ''}`} ><input type='text area' className='addressTableInput' {...register("thirdDegreeGrade", { required: true })}
                            onChange={(e) => handlePatternChangeForEduDoc(2, /^[A-Za-z0-9\-\.\%\s]+$/, 'thirdDegreeGrade', e)} value={grade[2]} /></td>
                    </tr>
                    {eduRows.map((_, index) => (
                        <tr key={index}>
                            <td className={index % 2 === 0 ? 'tableBody' : 'tableBodyLight'}>{index + 4}</td>
                            <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`higherDegreeName_${index}`] ? 'invalid' : ''}`}><input type='text area' className='addressTableInput'
                                {...register(`higherDegreeName_${index}`)}
                                onChange={(e) => handlePatternChangeForEduDoc(index + 3, /^[A-Za-z\s]+$/, `higherDegreeName_${index}`, e)} value={degreeNames[index + 3]} /></td>
                            <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`higherDegreeSubject_${index}`] ? 'invalid' : ''}`}><input type='text area' className='addressTableInput'
                                {...register(`higherDegreeSubject_${index}`)}
                                onChange={(e) => handlePatternChangeForEduDoc(index + 3, /^[A-Za-z\s]+$/, `higherDegreeSubject_${index}`, e)} /></td>
                            <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`higherDegreePassingYr_${index}`] ? 'invalid' : ''}`}><input type='text area' className='addressTableInput'
                                {...register(`higherDegreePassingYr_${index}`, { pattern: /^[0-9]+$/, minLength: 4 })}
                                onChange={(e) => handlePatternChangeForEduDoc(index + 3, /^[0-9]+$/, `higherDegreePassingYr_${index}`, e)} /></td>
                            <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`higherDegreeRollNo_${index}`] ? 'invalid' : ''}`}><input type='text area' className='addressTableInput'
                                {...register(`higherDegreeRollNo_${index}`)}
                                onChange={(e) => handlePatternChangeForEduDoc(index + 3, /^[A-Za-z0-9\-\s]+$/, `higherDegreeRollNo_${index}`, e)} value={rollNo[index + 3]} /></td>
                            <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'} ${errors[`higherDegreeGrade_${index}`] ? 'invalid' : ''}`}><input type='text area' className='addressTableInput'
                                {...register(`higherDegreeGrade_${index}`)}
                                onChange={(e) => handlePatternChangeForEduDoc(index + 3, /^[A-Za-z0-9\-\.\%\s]+$/, `higherDegreeGrade_${index}`, e)} value={grade[index + 3]} /></td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
            <div className='btns'>
                <div className='eduAddRowButtonContainer'>
                    {showAddBtn &&
                        (<input type='button' className='eduAddRowButton' value='+Add Row' onClick={addTableForNextEducationDetail} />
                        )}
                </div>
                <div className='eduAddRowButtonContainer'>
                    {showMinusBtn &&
                        (<input type='button' className='eduAddRowButton' value='-Add Row' onClick={removeTableForNextEducationDetail} />
                        )}
                </div>
            </div>
            {/* attachment section */}
            <div className='attachmentContainer'>
                <div className='attachmentLabel'>
                    <h6 className='attachmentHeadline'>Documents Attachment :</h6>
                </div>
                <div className='nestedDropDownContainer'>
                    <select onChange={changeSelectOptionHandler} className={optionSelected ? 'option-selected' : ''}>
                        <option hidden='hidden'>Choose degree</option>
                        {Object.keys(educationOptions).map(option => (    // to result the keys from the object 'educationOptions' in array
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    {nestedOptions.length > 0 && (
                        <div className='nestedOptionsList'>
                            <h6>Choose Certificate:</h6>
                            {nestedOptions.map(option => (
                                <div key={option}>
                                    <input
                                        type='checkbox' className='checkForDegree'
                                        id={option}
                                        name='certificate'
                                        value={option}
                                        checked={selectedCertificate.includes(option)} // checks if the option (value of the current checkbox) is present in the selectedCertificate array.
                                        onChange={changeNestedOptionHandler}
                                    />
                                    <label htmlFor={option}>{option}</label>
                                </div>
                            ))}
                        </div>
                    )}
                    {selectedCertificate.length > 0 && (
                        <div className='selectedCertificatesList'>
                            {selectedCertificate.map((certificate, index) => (
                                <div className='certificateContainer' key={index}>
                                    <div className='fileUploadContainer'>
                                        <input
                                            type='file'
                                            className={`EduUploadFileInput ${errors[`${selectedDegree}-${certificate}Doc`] ? 'invalid' : ''}`}
                                            {...register(`${selectedDegree}-${certificate}Doc`, { required: true })}  // dynamically registers the input field with a name based on the degree name-certificate
                                            onChange={handleFileForDegreeDoc} />
                                        <button type="submit" className="EduUpload">Upload</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            {/* experience yrs input*/}
            <div className='attachmentContainer'>
                <div className='attachmentLabel'> <h6 className='attachmentHeadline'>Years Of Experience :</h6>
                </div>
                <div><input type='number' className={`yrOfExpInput ${errors.yrOfExp ? 'invalid' : ''}`} min="0" onChange={setExp}
                    {...register("yrOfExp", { required: true })}
                /><span><p className='educationalNote'>Maximum three recent  years of Employment History is needed to get filled.</p></span>
                </div>
            </div>

            {/* employment history */}
            {showEmpHistory.map((_, index) => (
                <EmploymentHistoryForm />
            )
            )}

            {/* save buttons */}
            <div className='educationSaveButtons'>
                <button type="button" className="contactBackBtn" onClick={backToContactPage}>Back</button>
                <button type="button" className="saveBtn" onClick={saveInLocalStorage}>Save Draft</button>
                <button type="submit" className="saveNextBtn">Save And Next </button>
            </div>
        </div>
    </form>
</div>
</div>
  )
}

