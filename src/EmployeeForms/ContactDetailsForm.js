import React, { useState, useEffect, useRef } from 'react';
import { useFormContext } from 'components/ContextProvider/Context';
import { useAddressHistoryContext } from 'components/ContextProvider/AddressHistoryContext.js';
import { useRegistrationContext } from 'components/ContextProvider/RegistrationDataContext';
import Navbar from './Navbar.js';
import AddressHistory from './AddressHistory.js';
import axios from 'axios';
import { statesOfIndia } from './FetchingPlaces/States.js';
import { citiesOfIndia } from './FetchingPlaces/Cities.js';
import { useNavigate } from 'react-router-dom';

export default function ContactDetailsForm() {

  const navigate = useNavigate();
  const {
    register, handleSubmit, errors, onSubmit, setValue, watch, reset, clearErrors
  } = useFormContext();
  const { registrationData } = useRegistrationContext();  // Access registration data from context
  const { addressHistoryDetails, rowsOfAddressHistory } = useAddressHistoryContext();
  const [selectPermanentContactDetailStateColor, setPermanentContactDetailStateColor] = useState("#d3d3d3"); // for giving diff color to select placeholder and option
  const [selectPermanentContactDetailCityColor, setPermanentContactDetailCityColor] = useState("#d3d3d3");
  const [selectPermanentContactDetailFromDateColor, setPermanentContactDetailFromDateColor] = useState("#d3d3d3"); // for giving diff color to date placeholder and option
  const [selectPermanentContactDetailToDateColor, setPermanentContactDetailToDateColor] = useState("#d3d3d3");
  const [selectCurrentContactDetailStateColor, setCurrentContactDetailStateColor] = useState("#d3d3d3");
  const [selectCurrentContactDetailCityColor, setCurrentContactDetailCityColor] = useState("#d3d3d3");
  const [selectCurrentContactDetailFromDateColor, setCurrentContactDetailFromDateColor] = useState("#d3d3d3");
  const [selectCurrentContactDetailToDateColor, setCurrentContactDetailToDateColor] = useState("#d3d3d3");
  const [pincodeData, setPincodeData] = useState(false); // contains postoffice object which consists all details based on pincode
  const [stateOption, setStateOption] = useState(statesOfIndia); // whole list of states
  const [pincodeState, setPincodeState] = useState(''); // State derived from pincode
  const [selectedState, setSelectedState] = useState(''); // Manually selected state
  const [cityOption, setCityOption] = useState(Object.values(citiesOfIndia).flat()); // whole list of cities
  const [selectedCity, setSelectedCity] = useState(''); // Manually selected city
  const [patternForStreet, setPatternForStreet] = useState(''); // pattern for street
  const [patternForTown, setPatternForTown] = useState(''); // pattern for town
  const [patternForEmergencyRtn, setPatternForEmergencyRtn] = useState(''); // pattern for emergency rtn
  const [patternForPincode, setPatternForPincode] = useState(''); // pattern for pincode
  const [patternForEmergencyTelephone, setPatternForEmergencyTelephone] = useState(''); // pattern for Emergency Telephone
  const [patternForAnotherStreet, setPatternForAnotherStreet] = useState(''); // pattern for current address street
  const [patternForAnotherTown, setPatternForAnotherTown] = useState(''); // pattern for current address town
  const [patternForAnotherEmergencyRtn, setPatternForAnotherEmergencyRtn] = useState(''); // pattern for current address emergency rtn
  const [patternForAnotherPincode, setPatternForAnotherPincode] = useState(''); // pattern for current address pincode
  const [patternForAnotherEmergencyTelephone, setPatternForAnotherEmergencyTelephone] = useState(''); // pattern for current address Emergency Telephone
  const [anotherPincodeData, setAnotherPincodeData] = useState(false); // contains postoffice object which consists all details based on pincode for current address
  const [anotherStateOption, setAnotherStateOption] = useState(statesOfIndia); // whole list of states for current address
  const [anotherPincodeState, setAnotherPincodeState] = useState(''); // State derived from pincode for current address
  const [anotherSelectedState, setAnotherSelectedState] = useState(''); // Manually selected state for current address
  const [anotherCityOption, setAnotherCityOption] = useState(Object.values(citiesOfIndia).flat()); // whole list of cities for current address
  const [anotherSelectedCity, setAnotherSelectedCity] = useState(''); // Manually selected city for current address
  const [checked, setChecked] = useState(false); // for filling same address as above
  const [customErrorForAddRows, setCustomErrorForAddRows] = useState('');
  const [permanentAddress, setPermanentAddress] = useState({
    flatNo: '',
    street: '',
    town: '',
    pincode: '',
    state: '',
    city: '',
    fromStay: '',
    toStay: '',
    emergencyContactNo: '',
    emergencyRtnName: ''
  });
  const [currentAddress, setCurrentAddress] = useState({
    anotherFlatNo: '',
    anotherStreet: '',
    anotherTown: '',
    anotherPincode: '',
    anotherState: '',
    anotherCity: '',
    anotherFromStay: '',
    anotherToStay: '',
    anotherEmergencyContactNo: '',
    anotherEmergencyRtnName: ''
  });
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(false);
  const [pattern, setPattern] = useState({
    street: '',
    town: '',
    pincode: '',
    emergencyContactNo: '',
    emergencyRtnName: '',
    anotherStreet: '',
    anotherTown: '',
    anotherPincode: '',
    anotherEmergencyContactNo: '',
    anotherEmergencyRtnName: ''
  }); // state for overall handling of pattern
  const [customErrorForPattern, setCustomErrorForPattern] = useState({
    street: '',
    town: '',
    pincode: '',
    emergencyContactNo: '',
    emergencyRtnName: '',
    anotherStreet: '',
    anotherTown: '',
    anotherPincode: '',
    anotherEmergencyContactNo: '',
    anotherEmergencyRtnName: ''
  }); // error msg for its failure

  // get location from pin code
  const getLocationData = async (pincode) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setPincodeData(postOffice);
        const state = postOffice.State;
        const city = postOffice.Name;
        setPincodeState(state); // Set state based on pincode
        setSelectedState(state); // Also set the selected state to pincode state initially
        setCityOption(getCitiesByState(state)); // set the related cities list based on state coming from pincode
        setPermanentAddress(prevState => ({ ...prevState, state: state })); // Update permanent address state
        setValue("state", state);
        clearErrors("state");

        // Update the color to black when state comes from pincode
        setPermanentContactDetailStateColor("black");
        console.log(postOffice);
      } else {
        console.error('Error: Invalid pincode');
      }
    } catch (error) {
      console.error('Error fetching pincode data:', error);
    }
  }

  // get parameter of pincode and target it 
  const handlePincode = (e) => {
    const pincode = e.target.value;
    if (pincode.length === 6) {
      getLocationData(pincode)
    }
  }

  // get changed value of state 
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setCityOption(getCitiesByState(state));
    setPermanentAddress(prevState => ({ ...prevState, state: state }));  // Update permanent address state
    console.log('cities:', setCityOption);

  }

  // get changed value of city
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  }

  // get cities by state
  const getCitiesByState = (state) => {
    if (citiesOfIndia.hasOwnProperty(state)) {
      return citiesOfIndia[state];
    }
    else {
      return [];
    }
  }

  // to display error msg on pattern validation failure 
  const handlePatternForAddressInputs = (e, pattern, field) => {
    let value = e.target.value;

    setPattern(prev => ({ ...prev, [field]: value }));
    if (field === 'street') setPatternForStreet(value);
    if (field === 'town') setPatternForTown(value);
    if (field === 'pincode') setPatternForPincode(value);
    if (field === 'emergencyContactNo') setPatternForEmergencyTelephone(value);
    if (field === 'emergencyRtnName') setPatternForEmergencyRtn(value);
    if (field === 'anotherStreet') setPatternForAnotherStreet(value);
    if (field === 'anotherTown') setPatternForAnotherTown(value);
    if (field === 'anotherPincode') setPatternForAnotherPincode(value);
    if (field === 'anotherEmergencyContactNo') setPatternForAnotherEmergencyTelephone(value);
    if (field === 'anotherEmergencyRtnName') setPatternForAnotherEmergencyRtn(value);

    let patternErrorMessage = '';
    if ((field === 'street' || field === 'town' || field === 'emergencyRtnName' || field === 'anotherStreet' ||
      field === 'anotherTown' || field === 'anotherEmergencyRtnName') && value && !pattern.test(value)) {
      patternErrorMessage = 'No numbers or special characters are allowed';
    }
    else if (field === 'pincode' || field === 'anotherPincode') {
      if (value.length > 6) {
        value = value.slice(0, 6); // Slice to 6 digits
        e.target.value = value;  // Update the input value directly
      }
      if (value && !pattern.test(value)) {
        patternErrorMessage = 'Only numbers are allowed';
      }
      if (field === 'pincode') setPatternForPincode(value);
      if (field === 'anotherPincode') setPatternForAnotherPincode(value);
    }
    else if (field === 'emergencyContactNo' || field === 'anotherEmergencyContactNo') {
      // If mobile number exceeds 10 digits, slice it to 10 digits
      if (value.length > 10) {
        value = value.slice(0, 10); // Slice to 10 digits
        e.target.value = value;  // Update the input value directly
      }
      // Perform validation
      if (value && !pattern.test(value)) {
        patternErrorMessage = 'Only numbers are allowed';
      }
      if (field === 'emergencyContactNo') setPatternForEmergencyTelephone(value);
      if (field === 'anotherEmergencyContactNo') setPatternForAnotherEmergencyTelephone(value);
    }
    setCustomErrorForPattern(prev => ({ ...prev, [field]: patternErrorMessage }));
    if (patternErrorMessage === '') {
      clearErrors(field);
    }
  }

  // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
  const handlePermanentContactDetailsStateColorChange = (e) => {
    const selectedValue = e.target.value;
    setPermanentContactDetailStateColor(selectedValue ? "black" : "#d3d3d3");
    clearErrors('state');
  };
  const handlePermanentContactDetailsCityColorChange = (e) => {
    const selectedValue = e.target.value;
    setPermanentContactDetailCityColor(selectedValue ? "black" : "#d3d3d3");
    clearErrors('city');
  };
  const handlePermanentContactDetailsFromDateColorChange = (e) => {
    const selectedValue = e.target.value;
    setPermanentContactDetailFromDateColor(selectedValue ? "black" : "#d3d3d3");
    setPermanentContactDetailToDateColor("#d3d3d3");
    clearErrors('fromStay');
  };
  const handlePermanentContactDetailsToDateColorChange = (e) => {
    const selectedValue = e.target.value;
    setPermanentContactDetailToDateColor(selectedValue ? "black" : "#d3d3d3");
    clearErrors('toStay');
  };

  // 🔥 Fix: Change color dynamically, but ensure placeholder remains gray
  const handleCurrentContactDetailsStateColorChange = (e) => {
    const selectedValue = e.target.value;
    setCurrentContactDetailStateColor(selectedValue ? "black" : "#d3d3d3");
    clearErrors('anotherState');
  };
  const handleCurrentContactDetailsCityColorChange = (e) => {
    const selectedValue = e.target.value;
    setCurrentContactDetailCityColor(selectedValue ? "black" : "#d3d3d3");
    clearErrors('anotherCity');
  };
  const handleCurrentContactDetailsFromDateColorChange = (e) => {
    const selectedValue = e.target.value;
    setCurrentContactDetailFromDateColor(selectedValue ? "black" : "#d3d3d3");
    setCurrentContactDetailToDateColor("#d3d3d3");
    clearErrors('anotherFromStay');
  };
  const handleCurrentContactDetailsToDateColorChange = (e) => {
    const selectedValue = e.target.value;
    setCurrentContactDetailToDateColor(selectedValue ? "black" : "#d3d3d3");
    clearErrors('anotherToStay');
  };

  // get location from pin code for current address
  const getAnotherLocationData = async (anotherPincode) => {
    try {
      const anotherResponse = await fetch(`https://api.postalpincode.in/pincode/${anotherPincode}`);
      if (!anotherResponse.ok) {
        throw new Error(`Error: ${anotherResponse.status}`);
      }
      const anotherData = await anotherResponse.json();
      if (anotherData[0].Status === "Success") {
        const anotherPostOffice = anotherData[0].PostOffice[0];
        setAnotherPincodeData(anotherPostOffice);
        const anotherState = anotherPostOffice.State;
        const anotherCity = anotherPostOffice.Name;
        setAnotherPincodeState(anotherState); // Set state based on pincode
        setAnotherSelectedState(anotherState); // Also set the selected state to pincode state initially
        setAnotherCityOption(getAnotherCitiesByState(anotherState)); // set the related cities list based on state coming from pincode
        setValue("anotherState", anotherState);
        clearErrors("anotherState")
        // Update the color to black when state comes from pincode
        setCurrentContactDetailStateColor("black");
        console.log(anotherPostOffice);
      } else {
        console.error('Error: Invalid pincode');
      }
    } catch (error) {
      console.error('Error fetching pincode data:', error);
    }
  }

  // get parameter of pincode and target it for current address
  const handleAnotherPincode = (e) => {
    const anotherPincode = e.target.value;
    if (anotherPincode.length === 6) {
      getAnotherLocationData(anotherPincode);
      setPatternForAnotherPincode(anotherPincode);
    } else {
      // Clear the pattern if the pincode is not 6 characters
      setPatternForAnotherPincode('');
    }
  }

  // get changed value of state for current address
  const handleAnotherStateChange = (e) => {
    const anotherState = e.target.value;
    setAnotherSelectedState(anotherState);
    setAnotherCityOption(getAnotherCitiesByState(anotherState));
    console.log('cities:', setAnotherCityOption);
  }

  // get changed value of city for current address
  const handleAnotherCityChange = (e) => {
    setAnotherSelectedCity(e.target.value);
  }

  // get cities by state for current address
  const getAnotherCitiesByState = (anotherState) => {
    if (citiesOfIndia.hasOwnProperty(anotherState)) {
      return citiesOfIndia[anotherState];
    }
    else {
      return [];
    }
  }

  // get same address
  const fillSamePermanentAddress = (e) => {
    setChecked(e.target.checked);
    const newCheckedState = !checked;
    setChecked(newCheckedState);

    if (newCheckedState) {
      // Copy permanent address to current address
      setCurrentAddress({
        anotherFlatNo: permanentAddress.flatNo,
        anotherStreet: permanentAddress.street,
        anotherTown: permanentAddress.town,
        anotherPincode: permanentAddress.pincode,
        anotherState: permanentAddress.state,
        anotherCity: permanentAddress.city,
        anotherFromStay: permanentAddress.fromStay,
        anotherToStay: permanentAddress.toStay,
        anotherEmergencyContactNo: permanentAddress.emergencyContactNo,
        anotherEmergencyRtnName: permanentAddress.emergencyRtnName
      });
      setAnotherSelectedState(permanentAddress.state); // Set current state
      setAnotherSelectedCity(permanentAddress.city); // Set current city

      // Trigger revalidation after checked
      setValue('anotherFlatNo', permanentAddress.flatNo);
      setValue('anotherStreet', permanentAddress.street);
      setValue('anotherTown', permanentAddress.town);
      setValue('anotherPincode', permanentAddress.pincode);
      setValue('anotherState', permanentAddress.state);
      setValue('anotherCity', permanentAddress.city);
      setValue('anotherFromStay', permanentAddress.fromStay);
      setValue('anotherToStay', permanentAddress.toStay);
      setValue('anotherEmergencyContactNo', permanentAddress.emergencyContactNo);
      setValue('anotherEmergencyRtnName', permanentAddress.emergencyRtnName);

      // disable the inputs after checked
    } else {
      // Clear current address
      setCurrentAddress({
        anotherFlatNo: '',
        anotherStreet: '',
        anotherTown: '',
        anotherPincode: '',
        anotherState: '',
        anotherCity: '',
        anotherFromStay: '',
        anotherToStay: '',
        anotherEmergencyContactNo: '',
        anotherEmergencyRtnName: ''
      });
      setAnotherSelectedState("");
      setAnotherSelectedCity("")
    }
  };

  const handleAddressChange = (type, field, value) => {   // handle the updates to the address fields
    if (type === 'permanent') {
      setPermanentAddress(prevState => ({ ...prevState, [field]: value }));
    } else {
      setCurrentAddress(prevState => ({ ...prevState, [field]: value }));
    }
  };

  // for backward navigation
  const backToPersonalPage = () => {
    navigate("/personaldetailsform");
  }

  const handleFormSubmit = async (data) => {
    if (rowsOfAddressHistory.length < 2) {
      setCustomErrorForAddRows('please fill the address history details for whole three years by clicking on add row button'); // error msg display on not filling all three yrs address history details
      setTimeout(() => {
        setCustomErrorForAddRows('');
      }, 5000);
    }
    else {
      setCustomErrorForAddRows('');
      console.log('Form data:', data);
      onSubmit(data);
      navigate("/educationaldetailsform");
      reset();
    }
    sessionStorage.setItem('addressCheckbox', JSON.stringify(checked));
    const addressDetails = [
      {
        "stayFrom": addressHistoryDetails.firstAddressFrom,
        "stayTo": addressHistoryDetails.firstAddressTo,
        "addressLine": addressHistoryDetails.firstFullAddress,
        "pincode": addressHistoryDetails.firstAddressZipcode,
        "country": addressHistoryDetails.firstAddressCountry,
        "contactNumberWithRelationship": addressHistoryDetails.firstAddressRtnContact
      }
    ];

    // Dynamically adding additional address details based on index
    for (let index = 0; index < rowsOfAddressHistory.length; index++) {
      addressDetails.push({
        "stayFrom": addressHistoryDetails[`anotherAddressFrom_${index}`],
        "stayTo": addressHistoryDetails[`anotherAddressTo_${index}`],
        "addressLine": addressHistoryDetails[`anotherFullAddress_${index}`],
        "pincode": addressHistoryDetails[`anotherAddressZipcode_${index}`],
        "country": addressHistoryDetails[`anotherAddressCountry_${index}`],
        "contactNumberWithRelationship": addressHistoryDetails[`anotherAddressRtnContact_${index}`]
      });
    }

    const newPayload = {
        "primaryId": registrationData.primaryId || "",
        "permanentAddressDTO": {
          "houseNumber":  data.flatNo || "",
          "streetName":data.street || "",
          "town":  data.town || "",
          "pincode": data.pincode || "",
          "state": data.state || "",
          "city": data.city || "",
          "stayFrom": data.fromStay || "",
          "stayTo": data.toStay || "",
          "emergencyContactNumber": data.emergencyContactNo || "",
          "emergencyContactNameAndRelationship":  data.emergencyRtnName || ""
        },
        "currentAddressDTO": {
          "sameAsPermanentAddress": checked, // Reflects if the checkbox is checked
          "houseNumber":checked ? data.flatNo : data.anotherFlatNo,
          "streetName": checked ? data.street : data.anotherStreet,
          "town": checked ? data.town : data.anotherTown,
          "pincode": checked ? data.pincode : data.anotherPincode,
          "state": checked ? data.state : data.anotherState,
          "city": checked ? data.city : data.anotherCity,
          "stayFrom":  checked ? data.fromStay : data.anotherFromStay,
          "stayTo": checked ? data.toStay : data.anotherToStay,
          "emergencyContactNumber": checked ? data.emergencyContactNo : data.anotherEmergencyContactNo,
          "emergencyContactNameAndRelationship": checked ? data.emergencyRtnName : data.anotherEmergencyRtnName
        },
        "addressDetailsDTOList": addressDetails, // Using the dynamically populated address details
    }
    console.log("Payload of contact page :", newPayload);

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      console.log('token needed:', token);
      if (!token) {
        setServerError('Authentication issue');
        return; // Exit if token is not found
      }

      const response = await axios.post('http://localhost:8081/primary/createAddress', newPayload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response && response.data) {
        console.log("Form submitted successfully:", response.data);
        sessionStorage.setItem('contactDetails', JSON.stringify(response.data))
        navigate("/educationaldetailsform");
        setPermanentContactDetailStateColor("#d3d3d3");
        setPermanentContactDetailCityColor("#d3d3d3");
        setPermanentContactDetailFromDateColor("#d3d3d3");
        setPermanentContactDetailToDateColor("#d3d3d3");
        setCurrentContactDetailStateColor("#d3d3d3");
        setCurrentContactDetailCityColor("#d3d3d3");
        setCurrentContactDetailFromDateColor("#d3d3d3");
        setCurrentContactDetailToDateColor("#d3d3d3");
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
    console.log('saved contact detaildata:', data);
  }

  useEffect(() => {
    const checkAllFieldsFilled = () => {
      return Object.values(permanentAddress).every((field) => field.trim() !== '');  // gets an array of all the values in the permanentAddress object & checks that every value in the array is not an empty string after trimming whitespace.
    };
    setIsCheckboxDisabled(!checkAllFieldsFilled());
  }, [permanentAddress]);

  useEffect(() => {
    console.log("Address History Data:", addressHistoryDetails);
  }, [addressHistoryDetails]);

  return (
    <div className='container-fluid form-navbar'>
      <Navbar />

      <div className='personaldetail-form'>

        <div className='UniversalHeadline'>
          <h6 className='mainHeading'>ASSOCIATE INFORMATION AND PRE-ONBOARDING FORM</h6>
        </div>
        <div className='noteHeading'>
          <h5 className='noteContent'>Note:<span className='noteDescription'>Please update all cells with correct and relevant data. The information provided in this document
            will form part of your official records in the Company<br /> and is subjected to verification.</span></h5>
        </div>
        <hr />


        {/* contact detail form */}
        <div className='personalDetailForm'>

          <div className='personalDetailHeading'> <h6 className='personalDetailHeadline'>CONTACT DETAILS</h6> </div>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='contactDetailContainer'>
            <div>
              <label className='permanentAddressLabel'>Permanent Address <span className='required'>*</span> <span className='separatorForPermanentAddress'>:</span></label>
              <input type='text' placeholder='Flat/House Number' className={`flatNoInput ${errors.flatNo ? 'invalid' : ''}`} {...register("flatNo", { required: true, maxLength: 100 })}
                value={permanentAddress.flatNo} onChange={(e) => handleAddressChange('permanent', 'flatNo', e.target.value)} />
              <input type='text' placeholder='Street Name' className={`streetInput ${errors.street ? 'invalid' : ''}`} {...register("street", { required: true, maxLength: 100 })}
                value={permanentAddress.street} onChange={(e) => { handlePatternForAddressInputs(e, /^[A-Za-z0-9\s.,'-]+$/, 'street'); handleAddressChange('permanent', 'street', e.target.value) }} />
              {customErrorForPattern.street ? <div className="contactErrorMessage">{customErrorForPattern.street}</div> : ''}
            </div>
            <div className='townPinCodeBox'>
            </div>
            <div className='townPinCodeBox'>
              <div>
                <input type='text' placeholder='Town' className={`townInput ${errors.town ? 'invalid' : ''}`} {...register("town", { required: true, maxLength: 50 })}
                  value={permanentAddress.town} onChange={(e) => { handlePatternForAddressInputs(e, /^[A-Za-z\s]+$/, 'town'); handleAddressChange('permanent', 'town', e.target.value) }} />
                {customErrorForPattern.town ? <div className="contactErrorMessage">{customErrorForPattern.town}</div> : ''}
              </div>
              <div>
                <label>Pin Code <span className='separatorForPinCode'>:</span></label>
                <input type='text' placeholder='Pin Code' className={`pinCodeInput  ${errors.pincode ? 'invalid' : ''}`} {...register("pincode",
                  {
                    required: true, minLength: {
                      value: 6,
                      message: "Pincode must be of six digits only"
                    }
                  })} value={permanentAddress.pincode} onChange={(e) => {
                    handlePincode(e); handlePatternForAddressInputs(e, /^[0-9]+$/, 'pincode');
                    handleAddressChange('permanent', 'pincode', e.target.value)
                  }} />
                {customErrorForPattern.pincode ? <div className="pincodeErrorMessage">{customErrorForPattern.pincode}</div> : ''}
                {errors.pincode && (<div className="errorMessage">{errors.pincode.message}</div>)}
              </div>
            </div>
            <div className='stateCityContainer'>
              <div>
                <label>State <span className='separatorForState'>:</span></label>
                <select
                  className={`stateInput ${errors.state ? 'invalid' : ''}`}
                  {...register("state", { required: true })}
                  value={selectedState} // Bind select element to state value
                  onChange={(e) => { handleStateChange(e); handleAddressChange('permanent', 'state', e.target.value); handlePermanentContactDetailsStateColorChange(e) }} // Update state variable on change
                  style={{ color: selectPermanentContactDetailStateColor }}> <option value="" hidden style={{ color: "#d3d3d3" }}>Select State</option>
                  {stateOption.map((eachState, index) => (
                    <option key={index} value={eachState} style={{ color: "black" }}>{eachState}</option>
                  ))}
                </select>
              </div>
              <div className='cityContainer'>
                <label>City <span className='separatorForCity'>:</span></label>
                <select className={`cityInput  ${errors.city ? 'invalid' : ''}`} {...register("city", { required: true })}
                  value={selectedCity} // Bind select element to city value
                  onChange={(e) => { handleCityChange(e); handleAddressChange('permanent', 'city', e.target.value); handlePermanentContactDetailsCityColorChange(e) }} // Update city variable on change
                  style={{ color: selectPermanentContactDetailCityColor }}> <option value="" hidden style={{ color: "#d3d3d3" }}>Select City</option>
                  {cityOption.map((eachCity, id) => (
                    <option key={id} value={eachCity} style={{ color: "black" }}>{eachCity}</option>
                  ))}
                </select>
              </div>

            </div>
            <div className='stateCityContainer'>
              <div className='fromContainer'>
                <label>Period Of Stay <span className='separatorForStayFrom'>:</span></label>  <label className='fromLabel'>From</label>
                <input type='date' placeholder='Select Date' className={`fromInput ${errors.fromStay ? 'invalid' : ''}`} {...register("fromStay", { required: true })}
                  value={permanentAddress.fromStay} onChange={(e) => {
                    const newFromDate = e.target.value;
                    handleAddressChange('permanent', 'fromStay', newFromDate);
                    handlePermanentContactDetailsFromDateColorChange(e);

                    // Reset "To Date" when "From Date" changes
                    setValue("toStay", "");
                    handleAddressChange('permanent', 'toStay', "");
                  }}
                  style={{ color: selectPermanentContactDetailFromDateColor }}
                  max={new Date().toISOString().split("T")[0]} // Cannot be future date
                />
              </div>
              <div className='toContainer'>
                <label className='toLabel'>To</label>
                <input type='date' placeholder='Select Date' className={`toInput ${errors.toStay ? 'invalid' : ''}`} {...register("toStay", { required: true })}
                  {...(permanentAddress.toStay ? { value: permanentAddress.toStay } : {})}
                  onChange={(e) => { handleAddressChange('permanent', 'toStay', e.target.value); handlePermanentContactDetailsToDateColorChange(e) }}
                  style={{ color: selectPermanentContactDetailToDateColor }}
                  min={permanentAddress.fromStay ? new Date(new Date(permanentAddress.fromStay).setDate(new Date(permanentAddress.fromStay).getDate() + 1)).toISOString().split("T")[0] : undefined} />
              </div>
            </div>
            <div className='emergencyContainer'>
              <div>
                <label className='emergencyContactLabel'>Emergency Contact No. <span className='required'>*</span><span className='separatorForEmergencyNo'>:</span></label>
                <input type='telephone' placeholder='Enter Emergency Mobile No.' className={`emergencyNoInput ${errors.emergencyContactNo ? 'invalid' : ''}`} {...register("emergencyContactNo", {
                  required: true, minLength: {
                    value: 10,
                    message: "Contact no. must be of ten digits only"
                  }
                })}
                  value={permanentAddress.emergencyContactNo} onChange={(e) => { handlePatternForAddressInputs(e, /^[0-9]+$/, 'emergencyContactNo'); handleAddressChange('permanent', 'emergencyContactNo', e.target.value) }} />
                {customErrorForPattern.emergencyContactNo ? <div className="emergencyErrorMessage">{customErrorForPattern.emergencyContactNo}</div> : ''}
                {errors.emergencyContactNo && (<div className="errorMessage">{errors.emergencyContactNo.message}</div>)}
              </div>
              <div className='relationshipLabelContainer'>
                <label className='relationshipLabel'>Name (Relation) <span className='required'>*</span><span className='separatorForNameOfEmergencyNo'>:</span> </label>
                <input type='text' placeholder='Name & Relationship of Contact No. ' className={`emergencyNameInput ${errors.emergencyRtnName ? 'invalid' : ''}`} {...register("emergencyRtnName", { required: true, maxLength: 50 })}
                  value={permanentAddress.emergencyRtnName} onChange={(e) => { handlePatternForAddressInputs(e, /^[A-Za-z,()&\s]+$/, 'emergencyRtnName'); handleAddressChange('permanent', 'emergencyRtnName', e.target.value) }} />
                {customErrorForPattern.emergencyRtnName ? <div className="emergencyNoErrorMessage">{customErrorForPattern.emergencyRtnName}</div> : ''}
              </div>
            </div>

            {/* current address */}
            <div className='currentaddressDetailContainer'>
              <div className='currentaddressContainer'>
                <label>Current Address <span className='required'>*</span> <span className='separatorForCurrentAddress'>:</span></label>
                <input type='checkbox' className='check' checked={checked} onChange={fillSamePermanentAddress}
                  disabled={isCheckboxDisabled}
                />
                <label className='sameAddressLabel'>Same as Permanent address?</label>
              </div>
              <div className='sameForm'>
                <div>
                  <input type='text' placeholder='Flat/House Number' className={`flatNoInput ${errors.anotherFlatNo ? 'invalid' : ''}`}
                    {...register("anotherFlatNo", { required: true, maxLength: 100 })}
                    value={currentAddress.anotherFlatNo} onChange={(e) => handleAddressChange('current', 'anotherFlatNo', e.target.value)}
                    disabled={checked ? true : false} />
                  <input type='text' placeholder='Street Name' className={`streetInput  ${errors.anotherStreet ? 'invalid' : ''}`} {...register("anotherStreet", { required: true, maxLength: 100 })}
                    value={currentAddress.anotherStreet} onChange={(e) => { handlePatternForAddressInputs(e, /^[A-Za-z0-9\s.,'#-]+$/, 'anotherStreet'); handleAddressChange('current', 'anotherStreet', e.target.value) }} disabled={checked ? true : false} />
                  {customErrorForPattern.anotherStreet ? <div className="contactErrorMessage">{customErrorForPattern.anotherStreet}</div> : ''}
                </div>
                <div className='townPinCodeBox' style={{ marginTop: '9px' }}>
                  <div>
                    <input type='text' placeholder='Town' className={`townInput  ${errors.anotherTown ? 'invalid' : ''}`} {...register("anotherTown", { required: true, maxLength: 50 })}
                      value={currentAddress.anotherTown} onChange={(e) => { handlePatternForAddressInputs(e, /^[A-Za-z\s]+$/, 'anotherTown'); handleAddressChange('current', 'anotherTown', e.target.value) }} disabled={checked ? true : false} />
                    {customErrorForPattern.anotherTown ? <div className="contactErrorMessage">{customErrorForPattern.anotherTown}</div> : ''}
                  </div>
                  <div>
                    <label>Pin Code <span className='separatorForPinCode'>:</span></label>
                    <input
                      type='text'
                      placeholder='Pin Code'
                      className={`pinCodeInput ${errors.anotherPincode ? 'invalid' : ''}`}
                      {...register("anotherPincode", {
                        required: true,
                        minLength: {
                          value: 6,
                          message: "Pincode must be of six digits only"
                        }
                      })}
                      value={currentAddress.anotherPincode} // Bind to current address state
                      onChange={(e) => { handleAnotherPincode(e); handlePatternForAddressInputs(e, /^[0-9]+$/, 'anotherPincode'); handleAddressChange('current', 'anotherPincode', e.target.value) }} disabled={checked ? true : false} />
                    {customErrorForPattern.anotherPincode ? <div className="pincodeErrorMessage">{customErrorForPattern.anotherPincode}</div> : ''}
                    {errors.anotherPincode && (<div className="errorMessage">{errors.anotherPincode.message}</div>)}
                  </div>
                </div>
                <div className='stateCityContainer'>
                  <div>
                    <label>State <span className='separatorForState'>:</span></label>
                    <select className={`stateInput ${errors.anotherState ? 'invalid' : ''}`}
                      {...register("anotherState", { required: true })}
                      value={anotherSelectedState} // Bind select element to state value
                      onChange={(e) => { handleAnotherStateChange(e); handleAddressChange('current', 'anotherState', e.target.value); handleCurrentContactDetailsStateColorChange(e) }} // Update state variable on change
                      style={{ color: selectCurrentContactDetailStateColor }} disabled={checked ? true : false}> <option value="" hidden style={{ color: "#d3d3d3" }}>Select State</option>
                      {anotherStateOption.map((anotherEachState, index) => (
                        <option key={index} value={anotherEachState} style={{ color: "black" }}>{anotherEachState}</option>
                      ))}
                    </select>
                  </div>
                  <div className='cityContainer'>
                    <label className='cityLabel'>City <span className='separatorForCity'>:</span></label>
                    <select className={`cityInput ${errors.anotherCity ? 'invalid' : ''}`} {...register("anotherCity", { required: true })}
                      value={anotherSelectedCity} // Bind select element to city value
                      onChange={(e) => { handleAnotherCityChange(e); handleAddressChange('current', 'anotherCity', e.target.value); handleCurrentContactDetailsCityColorChange(e) }} // Update city variable on change
                      style={{ color: selectCurrentContactDetailCityColor }} disabled={checked ? true : false}> 
                      <option value="" hidden style={{ color: "#d3d3d3" }}>Select City</option>
                      {anotherCityOption.map((anotherEachCity, id) => (
                        <option key={id} value={anotherEachCity} style={{ color: "black" }}>{anotherEachCity}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='stateCityContainer'>
                  <div className='fromContainer'>
                    <label>Period Of Stay <span className='separatorForStayFrom'>:</span></label>  <label className='fromLabel'>From</label>
                    <input type='date' placeholder='Select Date' className={`fromInput ${errors.anotherFromStay ? 'invalid' : ''}`}
                      // ${checked ? 'disabledDropdown' : ''}`} 
                     {...register("anotherFromStay", { required: true })}
                      value={currentAddress.anotherFromStay} onChange={(e) => {
                        handleAddressChange('current', 'anotherFromStay', e.target.value); 
                        handleCurrentContactDetailsFromDateColorChange(e);
                        setValue("anotherToStay", "");
                        handleAddressChange('current', 'anotherToStay', "");
                      }}
                      style={{ color: selectCurrentContactDetailFromDateColor }}
                      disabled={checked ? true : false}
                      max={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className='toContainer'>
                    <label className='toLabel'>To</label>
                    <input type='date' placeholder='Select Date' className={`toInput  ${errors.anotherToStay ? 'invalid' : ''}`} {...register("anotherToStay", { required: true })}
                      value={currentAddress.anotherToStay} onChange={(e) => { handleAddressChange('current', 'anotherToStay', e.target.value); handleCurrentContactDetailsToDateColorChange(e) }}
                      style={{ color: selectCurrentContactDetailToDateColor }} disabled={checked ? true : false}
                      min={currentAddress.anotherFromStay ? new Date(new Date(currentAddress.anotherFromStay).setDate(new Date(currentAddress.anotherFromStay).getDate() + 1)).toISOString().split("T")[0] : undefined} />
                  </div>
                </div>
                <div className='emergencyContainer'>
                  <div>
                    <label className='emergencyContactLabel'>Emergency Contact No.<span className='required'>*</span><span className='separatorForEmergencyNo'>:</span></label>
                    <input type='text' placeholder='Enter Emergency Mobile No.' className={`emergencyNoInput ${errors.anotherEmergencyContactNo ? 'invalid' : ''}`} {...register("anotherEmergencyContactNo", {
                      required: true,
                      minLength: {
                        value: 10,
                        message: "Contact no. must be of ten digits only"
                      }
                    })}
                      value={currentAddress.anotherEmergencyContactNo} onChange={(e) => { handlePatternForAddressInputs(e, /^[0-9]+$/, 'anotherEmergencyContactNo'); handleAddressChange('current', 'anotherEmergencyContactNo', e.target.value) }} disabled={checked ? true : false} />
                    {customErrorForPattern.anotherEmergencyContactNo ? <div className="emergencyErrorMessage">{customErrorForPattern.anotherEmergencyContactNo}</div> : ''}
                    {errors.anotherEmergencyContactNo && (<div className="errorMessage">{errors.anotherEmergencyContactNo.message}</div>)}
                  </div>
                  <div className='relationshipLabelContainer'>
                    <label className='relationshipLabel'>Name (Relation) <span className='required'>*</span><span className='separatorForNameOfEmergencyNo'>:</span> </label>
                    <input type='text' placeholder='Name & Relationship of Contact No. ' className={`emergencyNameInput ${errors.anotherEmergencyRtnName ? 'invalid' : ''}`} {...register("anotherEmergencyRtnName", { required: true })}
                      value={currentAddress.anotherEmergencyRtnName} onChange={(e) => { handlePatternForAddressInputs(e, /^[A-Za-z,()&\s]+$/, 'anotherEmergencyRtnName'); handleAddressChange('current', 'anotherEmergencyRtnName', e.target.value) }} disabled={checked ? true : false} />
                    {customErrorForPattern.anotherEmergencyRtnName ? <div className="emergencyNoErrorMessage">{customErrorForPattern.anotherEmergencyRtnName}</div> : ''}
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ width: '95.6%', marginTop: '30px', height: '3px', backgroundColor: 'lightgray', border: 'none' }} />
            {/* address history form */}
            <div>
              <AddressHistory />
            </div>
            {customErrorForAddRows ? <div className='addressErrorMessage'>{customErrorForAddRows}</div> : ''}

            {/* save buttons */}
            <div className='contactSaveButtons'>
              <button type="button" className="backBtn" onClick={backToPersonalPage}>Back</button>
              {/* <button type="button" className="saveBtn" onClick={saveInLocalStorage}>Save Draft</button> */}
              <button type="submit" className="saveNextBtn">Save And Next </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}
