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
import ReusableProgessBar from 'layouts/ReusableProgessBar';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function ContactDetailsForm() {

  const navigate = useNavigate();
  const {
    register, handleSubmit, errors, onSubmit, setValue, watch, reset, clearErrors, trigger
  } = useFormContext();
  const { registrationData } = useRegistrationContext();  // Access registration data from context
  // const { addressHistoryDetails } = useAddressHistoryContext();
  const [permanentDateRange, setPermanentDateRange] = useState([null, null]);
  const [currentDateRange, setCurrentDateRange] = useState([null, null]);
  const [legacyDateRanges, setLegacyDateRanges] = useState([
    [null, null],
    [null, null],
    [null, null]
  ]);
  const [selectPermanentContactDetailStateColor, setPermanentContactDetailStateColor] = useState("#d3d3d3"); // for giving diff color to select placeholder and option
  const [selectLegacyAddressStateColor, setLegacyAddressStateColor] = useState({});
  const [selectPermanentContactDetailCityColor, setPermanentContactDetailCityColor] = useState("#d3d3d3");
  const [selectLegacyAddressCityColor, setLegacyAddressCityColor] = useState({});
  const [selectPermanentContactDetailFromDateColor, setPermanentContactDetailFromDateColor] = useState("#d3d3d3"); // for giving diff color to date placeholder and option
  const [selectPermanentContactDetailToDateColor, setPermanentContactDetailToDateColor] = useState("#d3d3d3");
  const [selectCurrentContactDetailStateColor, setCurrentContactDetailStateColor] = useState("#d3d3d3");
  const [selectCurrentContactDetailCityColor, setCurrentContactDetailCityColor] = useState("#d3d3d3");
  const [selectCurrentContactDetailFromDateColor, setCurrentContactDetailFromDateColor] = useState("#d3d3d3");
  const [selectCurrentContactDetailToDateColor, setCurrentContactDetailToDateColor] = useState("#d3d3d3");
  const [pincodeData, setPincodeData] = useState(false); // contains postoffice object which consists all details based on pincode
  const [stateOption, setStateOption] = useState(statesOfIndia); // whole list of states
  const [pincodeState, setPincodeState] = useState(''); // State derived from pincode
  const [legacyAddressState, setLegacyAddressState] = useState({});
  const [selectedState, setSelectedState] = useState(''); // Manually selected state
  const [selectedLegacyAddressState, setSelectedLegacyAddressState] = useState({});
  const [cityOption, setCityOption] = useState(Object.values(citiesOfIndia).flat()); // whole list of cities
  const [legacyAddressCityOption, setLegacyAddressCityOption] = useState({});
  const [selectedCity, setSelectedCity] = useState(''); // Manually selected city
  const [selectedLegacyAddressCity, setSelectedLegacyAddressCity] = useState({});
  const [patternForFlatNo, setPatternForFlatNo] = useState(''); // pattern for flat no
  const [patternForStreet, setPatternForStreet] = useState(''); // pattern for street
  const [patternForTown, setPatternForTown] = useState(''); // pattern for town
  const [patternForEmergencyRtn, setPatternForEmergencyRtn] = useState(''); // pattern for emergency rtn
  const [patternForPincode, setPatternForPincode] = useState(''); // pattern for pincode
  const [patternForEmergencyTelephone, setPatternForEmergencyTelephone] = useState(''); // pattern for Emergency Telephone
  const [patternForAnotherFlatNo, setPatternForAnotherFlatNo] = useState(''); // pattern for current address flat
  const [patternForAnotherStreet, setPatternForAnotherStreet] = useState(''); // pattern for current address 
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
  const permanentDatePickerRef = useRef(null);
  const currentDatePickerRef = useRef(null);
  const legacyDatePickerRef = useRef([]);
  const [addressBlocks, setAddressBlocks] = useState([1]);
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
    flatNo: '',
    street: '',
    town: '',
    pincode: '',
    emergencyContactNo: '',
    emergencyRtnName: '',
    anotherFlatNo: '',
    anotherStreet: '',
    anotherTown: '',
    anotherPincode: '',
    anotherEmergencyContactNo: '',
    anotherEmergencyRtnName: ''
  }); // state for overall handling of pattern
  const [customErrorForPattern, setCustomErrorForPattern] = useState({
    flatNo: '',
    street: '',
    town: '',
    pincode: '',
    emergencyContactNo: '',
    emergencyRtnName: '',
    anotherFlatNo: '',
    anotherStreet: '',
    anotherTown: '',
    anotherPincode: '',
    anotherEmergencyContactNo: '',
    anotherEmergencyRtnName: ''
  }); // error msg for its failure

  const [legacyAddressPattern, setLegacyAddressPattern] = useState({});
  const [customErrorForLegacyAddressPattern, setCustomErrorForLegacyAddressPattern] = useState({});

  const handlePatternForLegacyAddressInputs = (e, pattern, field, index) => {
    let value = e.target.value;
    const fieldKey = `${field}_${index}`;
    setLegacyAddressPattern(prev => ({ ...prev, [fieldKey]: value }));

    let patternErrorMessage = '';
    if ((field === "addressHistoryLine1" || field === "addressHistoryLine2" || field === "addressHistoryLine3" || field === "addressHistoryEmergencyRtnName") && value && !pattern.test(value)) {
      patternErrorMessage = 'No special characters are allowed';
    }
    else if (field === 'addressHistoryEmergencyContactNo') {
      if (value.length > 10) {
        value = value.slice(0, 10);
        e.target.value = value;
      }
      if (value && !pattern.test(value)) {
        patternErrorMessage = 'Only numbers are allowed';
      }
    }
    else if (field === 'addressHistoryPincode') {
      if (value.length > 6) {
        value = value.slice(0, 6);
        e.target.value = value;
      }
      if (value && !pattern.test(value)) {
        patternErrorMessage = 'Only numbers are allowed';
      }
    }
    setCustomErrorForLegacyAddressPattern(prev => ({ ...prev, [fieldKey]: patternErrorMessage }));

    if (patternErrorMessage === '') {
      clearErrors(fieldKey);
    }
  }

  useEffect(() => {
    legacyDatePickerRef.current = legacyDateRanges.map(
      (_, i) => legacyDatePickerRef.current[i] || React.createRef()
    );
  }, [legacyDateRanges]);

  useEffect(() => {
    const initialColors = {};
    addressBlocks.forEach((_, index) => {
      initialColors[index] = '#d3d3d3';
    });
    setLegacyAddressStateColor(initialColors);
    setLegacyAddressCityColor(initialColors);
  }, []);  

  const handleAddAddressBlock = () => {
    if (addressBlocks.length < 3) {
      setAddressBlocks([...addressBlocks, addressBlocks.length + 1]);
    }
  };

  const handleLegacyAdddressPincode = (e, index) => {
    const pincode = e.target.value;
    if (pincode.length === 6) {
      getLegacyAdddressLocationData(pincode, index);
    }
  };

  const getLegacyAdddressLocationData = async (pincode, index) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        const state = postOffice.State;
        const city = postOffice.Name;

        // Update state and city for that specific index
        setLegacyAddressState(prev => ({ ...prev, [index]: state }));
        setSelectedLegacyAddressState(prev => ({ ...prev, [index]: state }));
        console.log('state from pincode:', selectedLegacyAddressState);
        setLegacyAddressCityOption(prev => ({ ...prev, [index]: getCitiesForLegacyAddressByState(state) }));
        setValue(`addressHistoryPincode_${index}`, pincode);
        setValue(`addressHistoryState_${index}`, state);
        clearErrors(`addressHistoryPincode_${index}`);
        clearErrors(`addressHistoryState_${index}`);
        setLegacyAddressStateColor(prev => ({...prev, [index]: "black"}));
        setLegacyAddressCityColor(prev => ({...prev, [index]: "#d3d3d3"}));
        console.log(`Pincode ${pincode} resolved to state: ${state}, city: ${city}`);
      } else {
        console.error('Invalid pincode');
      }
    } catch (error) {
      console.error('Error fetching pincode data:', error);
    }
  }


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
      getLocationData(pincode);
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

  const handleLegacyAdddressStateChange = (e, index) => {
    const state = e.target.value;
    setSelectedLegacyAddressState(prev => ({ ...prev, [index]: state }));
    console.log('state from option:', selectedLegacyAddressState);
    setLegacyAddressCityOption(prev => ({ ...prev, [index]: getCitiesForLegacyAddressByState(state) }));
    console.log('cities:', getCitiesForLegacyAddressByState(state));
  }

  // get changed value of city
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  }
  const handleLegacyAdddressCityChange = (e, index) => {
    const city = e.target.value;
    setSelectedLegacyAddressCity(prev => ({ ...prev, [index]: city }));
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
  const getCitiesForLegacyAddressByState = (state) => {
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
    if (field === 'flatNo') setPatternForFlatNo(value);
    if (field === 'street') setPatternForStreet(value);
    if (field === 'town') setPatternForTown(value);
    if (field === 'pincode') setPatternForPincode(value);
    if (field === 'emergencyContactNo') setPatternForEmergencyTelephone(value);
    if (field === 'emergencyRtnName') setPatternForEmergencyRtn(value);
    if (field === 'anotherFlatNo') setPatternForAnotherFlatNo(value);
    if (field === 'anotherStreet') setPatternForAnotherStreet(value);
    if (field === 'anotherTown') setPatternForAnotherTown(value);
    if (field === 'anotherPincode') setPatternForAnotherPincode(value);
    if (field === 'anotherEmergencyContactNo') setPatternForAnotherEmergencyTelephone(value);
    if (field === 'anotherEmergencyRtnName') setPatternForAnotherEmergencyRtn(value);

    let patternErrorMessage = '';
    if ((field === 'flatNo' || field === 'street' || field === 'town' || field === 'emergencyRtnName' || field === 'anotherFlatNo' || field === 'anotherStreet' ||
      field === 'anotherTown' || field === 'anotherEmergencyRtnName') && value && !pattern.test(value)) {
      patternErrorMessage = 'No special characters are allowed';
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
  const handleLegacyAddressStateColorChange = (e, index) => {
    const selectedValue = e.target.value;
    setLegacyAddressStateColor(prev => ({...prev, [index]: selectedValue ? "black" : "#d3d3d3"}));
    clearErrors(`addressHistoryState_${index}`);
  };
  const handlePermanentContactDetailsCityColorChange = (e) => {
    const selectedValue = e.target.value;
    setPermanentContactDetailCityColor(selectedValue ? "black" : "#d3d3d3");
    clearErrors('city');
  };
  const handleLegacyAddressCityColorChange = (e, index) => {
    const selectedValue = e.target.value;
    setLegacyAddressCityColor(prev => ({...prev, [index]: selectedValue ? "black" : "#d3d3d3"}))
    clearErrors(`addressHistoryCity_${index}`);
  };
  // const handlePermanentContactDetailsFromDateColorChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setPermanentContactDetailFromDateColor(selectedValue ? "black" : "#d3d3d3");
  //   setPermanentContactDetailToDateColor("#d3d3d3");
  //   clearErrors('fromStay');
  // };
  // const handlePermanentContactDetailsToDateColorChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setPermanentContactDetailToDateColor(selectedValue ? "black" : "#d3d3d3");
  //   clearErrors('toStay');
  // };

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
  // const handleCurrentContactDetailsFromDateColorChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setCurrentContactDetailFromDateColor(selectedValue ? "black" : "#d3d3d3");
  //   setCurrentContactDetailToDateColor("#d3d3d3");
  //   clearErrors('anotherFromStay');
  // };
  // const handleCurrentContactDetailsToDateColorChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setCurrentContactDetailToDateColor(selectedValue ? "black" : "#d3d3d3");
  //   clearErrors('anotherToStay');
  // };

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
    const allFilled = Object.values(permanentAddress).every(field => String(field).trim() !== '');

    if (!allFilled) {
      return;
    }
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
      const emptyCurrent = {
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
      };
      setCurrentAddress(emptyCurrent);
      setAnotherSelectedState("");
      setAnotherSelectedCity("");

      // Clear form field values as well
      Object.entries(emptyCurrent).forEach(([key, value]) => {
        setValue(key, value);  // Clear RHF field values
      });
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
    sessionStorage.setItem('addressCheckbox', JSON.stringify(checked));
    const legacyAddressArray =[];
    // Dynamically adding additional address details based on index
    for( let index = 0; index < addressBlocks.length; index++) {
      legacyAddressArray.push({
        "houseNumber": addressBlocks[`addressHistoryLine1_${index}`],
        "streetName": addressBlocks[`addressHistoryLine2_${index}`],
        "town": addressBlocks[`addressHistoryLine3_${index}`],
        "pincode": addressBlocks[`addressHistoryPincode_${index}`],
        "state": addressBlocks[`addressHistoryState_${index}`],
        "city": addressBlocks[`addressHistoryCity_${index}`],
        "stayFrom": addressBlocks[`addressHistoryFromStay_${index}`],
        "stayTo": addressBlocks[`addressHistoryToStay_${index}`],
        "emergencyContactNumber": addressBlocks[`addressHistoryEmergencyContactNo_${index}`],
        "emergencyContactNameAndRelationship": addressBlocks[`addressHistoryEmergencyRtnName_${index}`]
      })
    }
    const newPayload = {
      // "primaryId": registrationData.primaryId || "",
      "permanentAddressDTO": {
        "houseNumber": data.flatNo || "",
        "streetName": data.street || "",
        "town": data.town || "",
        "pincode": data.pincode || "",
        "state": data.state || "",
        "city": data.city || "",
        "stayFrom": data.fromStay || "",
        "stayTo": data.toStay || "",
        "emergencyContactNumber": data.emergencyContactNo || "",
        "emergencyContactNameAndRelationship": data.emergencyRtnName || ""
      },
      "currentAddressDTO": {
        "sameAsPermanentAddress": checked, // Reflects if the checkbox is checked
        "houseNumber": checked ? data.flatNo : data.anotherFlatNo,
        "streetName": checked ? data.street : data.anotherStreet,
        "town": checked ? data.town : data.anotherTown,
        "pincode": checked ? data.pincode : data.anotherPincode,
        "state": checked ? data.state : data.anotherState,
        "city": checked ? data.city : data.anotherCity,
        "stayFrom": checked ? data.fromStay : data.anotherFromStay,
        "stayTo": checked ? data.toStay : data.anotherToStay,
        "emergencyContactNumber": checked ? data.emergencyContactNo : data.anotherEmergencyContactNo,
        "emergencyContactNameAndRelationship": checked ? data.emergencyRtnName : data.anotherEmergencyRtnName
      },
      "addressDetailsDTOList": legacyAddressArray, // Using the dynamically populated address details
    }
    console.log("Payload of contact page :", newPayload);

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('tokenForFormsValidation');
      console.log('token needed:', token);
      if (!token) {
        setServerError('Authentication issue');
        return; // Exit if token is not found
      }

      // const response = await axios.post('http://localhost:8081/primary/createAddress', newPayload, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });

      // if (response && response.data) {
      //   console.log("Form submitted successfully:", response.data);
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
      //  else {
      //   console.error("Error submitting form:", response);
      //   console.error("Error submitting form. Status:", response.status);
      //   console.error("Error details:", response.data);
      // }
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
      return Object.values(permanentAddress).every((field) => String(field).trim() !== '');
      // gets an array of all the values in the permanentAddress object & checks that every value in the array is not an empty string after trimming whitespace.
    };
    setIsCheckboxDisabled(!checkAllFieldsFilled());
  }, [permanentAddress]);

  useEffect(() => {
    console.log("Address History Data:", addressBlocks);
  }, [addressBlocks]);

  const numberToWords = (num) => {
    if (isNaN(num) || num === undefined) return '';
    const words = ['First', 'Second', 'Third'];
    return words[num - 1] || num;
  }

  useEffect(()=> {
      console.log('errors:', errors)
  }, [errors]);

  return (
    <div className='container-fluid form-navbar'>
      <Navbar />

      <div className='personaldetail-form'>
        <ReusableProgessBar>

          {/* <div className='UniversalHeadline'>
          <h6 className='mainHeading'>PRE-ONBOARDING FORM</h6>
        </div> */}
          {/* <div className='noteHeading'>
          <h5 className='noteContent'>Note:<span className='noteDescription'>Please update all cells with correct and relevant data. The information provided in this document
            will form part of your official records in the Company<br /> and is subjected to verification.</span></h5>
        // </div> */}
          {/* <hr /> */}


          {/* contact detail form */}
          <div className='contactDetailForm'>

            {/* <div className='personalDetailHeading'> <h6 className='personalDetailHeadline'>CONTACT DETAILS</h6> </div> */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className='contactDetailContainer'>
              <div className='contact-container'>
                <div className='permanent-contact-container'>
                  <div>
                    <label className='permanentAddressLabel'>Permanent Address <span className='required'>*</span></label>
                    <input type='text' placeholder='Address Line 1' className={`flatNoInput ${errors.flatNo ? 'invalid' : ''}`} {...register("flatNo", { required: true, maxLength: 100 })}
                      value={permanentAddress.flatNo} onChange={(e) => { handlePatternForAddressInputs(e, /^[a-zA-Z0-9\s,.'\-/#()&]+$/, 'flatNo'); handleAddressChange('permanent', 'flatNo', e.target.value) }} />
                    {customErrorForPattern.flatNo ? <div className="contactErrorMessage">{customErrorForPattern.flatNo}</div> : ''}
                    <input type='text' placeholder='Address Line 2' className={`streetInput ${errors.street ? 'invalid' : ''}`} {...register("street", { required: true, maxLength: 100 })}
                      value={permanentAddress.street} onChange={(e) => { handlePatternForAddressInputs(e, /^[a-zA-Z0-9\s,.'\-/#()&]+$/, 'street'); handleAddressChange('permanent', 'street', e.target.value) }} />
                    {customErrorForPattern.street ? <div className="contactErrorMessage">{customErrorForPattern.street}</div> : ''}
                  </div>
                  <div className='townPinCodeBox'>
                    <div className="fieldWrapper">
                      <div>
                        <input type='text' placeholder='Address Line 3' className={`townInput ${errors.town ? 'invalid' : ''}`} {...register("town", { required: true, maxLength: 50 })}
                          value={permanentAddress.town} onChange={(e) => { handlePatternForAddressInputs(e, /^[a-zA-Z0-9\s,.'\-/#()&]+$/, 'town'); handleAddressChange('permanent', 'town', e.target.value) }} />
                      </div>
                      {customErrorForPattern.town ? <div className="addressErrorMessage">{customErrorForPattern.town}</div> : ''}
                    </div>
                    <div className="fieldWrapper">
                      <div>
                        <label>Pin Code<span className='required'>*</span></label>
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
                      </div>
                      {errors.pincode?.message ? (<div className="errorMessage">{errors.pincode.message}</div>) :
                        customErrorForPattern.pincode ? (<div className="pincodeErrorMessage">{customErrorForPattern.pincode}</div>)
                          : null}
                    </div>
                  </div>
                  <div className='stateCityContainer'>
                    <div>
                      <label>State<span className='required'>*</span></label>
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
                      <label>City<span className='required'>*</span></label>
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
                  {/* <div className='stateCityContainer' style={{ marginLeft: '-28px' }}>
                    <div className='fromContainer'>
                      <label>Period Of Stay</label>  <label className='fromLabel'>From</label>
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
                  </div> */}
                  <div className='datepicker-container'>
                    <label>Period Of Stay<span className='required'>*</span></label>
                    <DatePicker ref={permanentDatePickerRef}
                      selectsRange
                      startDate={permanentDateRange[0]}
                      endDate={permanentDateRange[1]}
                      onChange={(update) => {
                        setPermanentDateRange(update);
                        handleAddressChange("permanent", "fromStay", update[0]);
                        handleAddressChange("permanent", "toStay", update[1]);

                        // Optional: Reset custom styles if needed
                        // handlePermanentContactDetailsFromDateColorChange({ target: { value: update[0] } });
                        // handlePermanentContactDetailsToDateColorChange({ target: { value: update[1] } });

                        // Update React Hook Form values if using register
                        setValue("fromStay", update[0]);
                        setValue("toStay", update[1]);

                        // Trigger validation manually
                        trigger(["fromStay", "toStay"]);
                      }}
                      maxDate={new Date()} // Prevent future dates
                      placeholderText="Select period of stay"
                      className={`fromInput ${errors.fromStay || errors.toStay ? 'invalid' : ''}`}
                      isClearable
                    />
                    <input type="hidden" {...register("fromStay", { required: true })} />
                    <input type="hidden" {...register("toStay", { required: true })} />
                    <img src={require("assets/img/calendar-icon.png")} alt="calendar" className="calendar-icon" onClick={() => permanentDatePickerRef.current.setFocus()} />
                  </div>
                  <div className='emergencyContainer'>
                    <div>
                      <label className='emergencyContactLabel'>Emergency Contact<span className='required'>*</span></label>
                      <input type='telephone' placeholder='Mobile No.' className={`emergencyNoInput ${errors.emergencyContactNo ? 'invalid' : ''}`} {...register("emergencyContactNo", {
                        required: true, minLength: {
                          value: 10,
                          message: "Contact no. must be of ten digits only"
                        }
                      })}
                        value={permanentAddress.emergencyContactNo} onChange={(e) => { handlePatternForAddressInputs(e, /^[0-9]+$/, 'emergencyContactNo'); handleAddressChange('permanent', 'emergencyContactNo', e.target.value) }} />
                      {customErrorForPattern.emergencyContactNo ? (<div className="emergencyErrorMessage">{customErrorForPattern.emergencyContactNo}</div>)
                        : errors.emergencyContactNo?.message ? (<div className="emergencyErrorMessage">{errors.emergencyContactNo.message}</div>)
                          : null}
                    </div>
                    <div className='relationshipLabelContainer'>
                      <label className='relationshipLabel'>Name (Relation) <span className='required'>*</span></label>
                      <input type='text' placeholder='Name (Relation)' className={`emergencyNameInput ${errors.emergencyRtnName ? 'invalid' : ''}`} {...register("emergencyRtnName", { required: true, maxLength: 50 })}
                        value={permanentAddress.emergencyRtnName} onChange={(e) => { handlePatternForAddressInputs(e, /^[A-Za-z,()&\s]+$/, 'emergencyRtnName'); handleAddressChange('permanent', 'emergencyRtnName', e.target.value) }} />
                      {customErrorForPattern.emergencyRtnName ? <div className="emergencyNoErrorMessage">{customErrorForPattern.emergencyRtnName}</div> : ''}
                    </div>
                  </div>
                </div>
                {/* current address */}
                <div className='currentaddressDetailContainer'>
                  <div className='currentaddressContainer'>
                    <label>Current Address <span className='required'>*</span></label>
                    <input type='checkbox' className='check' checked={checked} onChange={fillSamePermanentAddress}
                      onClick={(e) => {
                        const allFilled = Object.values(permanentAddress).every(field => String(field).trim() !== '');
                        if (!allFilled) {
                          e.preventDefault();
                          alert("Please fill all permanent address fields first.");
                        }
                      }}
                    />
                    <label className='sameAddressLabel'>Same As Permanent Address ?</label>
                  </div>
                  {!checked && (
                    <div className='sameForm'>
                      <div>
                        <input type='text' placeholder='Address Line 1' className={`flatNoInput ${errors.anotherFlatNo ? 'invalid' : ''}`}
                          {...register("anotherFlatNo", { required: true, maxLength: 100 })}
                          value={currentAddress.anotherFlatNo} onChange={(e) => { handlePatternForAddressInputs(e, /^[a-zA-Z0-9\s,.'\-/#()&]+$/, 'anotherFlatNo'); handleAddressChange('current', 'anotherFlatNo', e.target.value) }}
                          disabled={checked ? true : false} />
                        {customErrorForPattern.anotherFlatNo ? <div className="contactErrorMessage" style={{ marginBottom: '10px', marginTop: '-11px' }}>{customErrorForPattern.anotherFlatNo}</div> : ''}
                        <input type='text' placeholder='Address Line 2' className={`streetInput  ${errors.anotherStreet ? 'invalid' : ''}`} {...register("anotherStreet", { required: true, maxLength: 100 })}
                          value={currentAddress.anotherStreet} onChange={(e) => { handlePatternForAddressInputs(e, /^[a-zA-Z0-9\s,.'\-/#()&]+$/, 'anotherStreet'); handleAddressChange('current', 'anotherStreet', e.target.value) }} disabled={checked ? true : false} />
                        {customErrorForPattern.anotherStreet ? <div className="contactErrorMessage">{customErrorForPattern.anotherStreet}</div> : ''}
                      </div>
                      <div className='townPinCodeBox'>
                        <div className="fieldWrapper">
                          <div>
                            <input type='text' placeholder='Address Line 3' className={`townInput  ${errors.anotherTown ? 'invalid' : ''}`} {...register("anotherTown", { required: true, maxLength: 50 })}
                              value={currentAddress.anotherTown} onChange={(e) => { handlePatternForAddressInputs(e, /^[a-zA-Z0-9\s,.'\-/#()&]+$/, 'anotherTown'); handleAddressChange('current', 'anotherTown', e.target.value) }} disabled={checked ? true : false} />
                          </div>
                          {customErrorForPattern.anotherTown ? <div className="addressErrorMessage">{customErrorForPattern.anotherTown}</div> : ''}
                        </div>
                        <div className="fieldWrapper">
                          <div>
                            <label>Pin Code<span className='required'>*</span></label>
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
                          </div>
                          {errors.anotherPincode?.message ? (<div className="errorMessage">{errors.anotherPincode.message}</div>)
                            : customErrorForPattern.anotherPincode ? (<div className="pincodeErrorMessage">{customErrorForPattern.anotherPincode}</div>)
                              : null}
                        </div>
                      </div>
                      <div className='stateCityContainer'>
                        <div>
                          <label>State<span className='required'>*</span></label>
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
                          <label className='cityLabel'>City<span className='required'>*</span></label>
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
                      {/* <div className='stateCityContainer' style={{ marginLeft: '-32px' }}>
                        <div className='fromContainer'>
                          <label>Period Of Stay</label>  <label className='fromLabel'>From</label>
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
                      </div> */}
                      <div className='datepicker-container'>
                        <label>Period Of Stay<span className='required'>*</span></label>
                        <DatePicker ref={currentDatePickerRef}
                          selectsRange
                          startDate={currentDateRange[0]}
                          endDate={currentDateRange[1]}
                          onChange={(update) => {
                            setCurrentDateRange(update);
                            handleAddressChange("permanent", 'anotherFromStay', update[0]);
                            handleAddressChange("permanent", 'anotherToStay', update[1]);

                            // Optional: Reset custom styles if needed
                            // handlePermanentContactDetailsFromDateColorChange({ target: { value: update[0] } });
                            // handlePermanentContactDetailsToDateColorChange({ target: { value: update[1] } });

                            // Update React Hook Form values if using register
                            setValue('anotherFromStay', update[0]);
                            setValue('anotherToStay', update[1]);
                            trigger(["anotherFromStay", "anotherToStay"]);
                          }}
                          maxDate={new Date()} // Prevent future dates
                          placeholderText="Select period of stay"
                          className={`fromInput ${errors.anotherFromStay || errors.anotherToStay ? 'invalid' : ''}`}
                          isClearable
                        />
                        <input type="hidden" {...register("anotherFromStay", { required: true })} />
                        <input type="hidden" {...register("anotherToStay", { required: true })} />
                        <img src={require("assets/img/calendar-icon.png")} alt="calendar" className="calendar-icon" onClick={() => currentDatePickerRef.current.setFocus()} />
                      </div>
                      <div className='emergencyContainer'>
                        <div>
                          <label className='emergencyContactLabel'>Emergency Contact<span className='required'>*</span></label>
                          <input type='text' placeholder='Mobile No.' className={`emergencyNoInput ${errors.anotherEmergencyContactNo ? 'invalid' : ''}`} {...register("anotherEmergencyContactNo", {
                            required: true,
                            minLength: {
                              value: 10,
                              message: "Contact no. must be of ten digits only"
                            }
                          })}
                            value={currentAddress.anotherEmergencyContactNo} onChange={(e) => { handlePatternForAddressInputs(e, /^[0-9]+$/, 'anotherEmergencyContactNo'); handleAddressChange('current', 'anotherEmergencyContactNo', e.target.value) }} disabled={checked ? true : false} />
                          {customErrorForPattern.anotherEmergencyContactNo ? (<div className="emergencyErrorMessage">{customErrorForPattern.anotherEmergencyContactNo}</div>)
                            : errors.anotherEmergencyContactNo?.message ? (<div className="emergencyErrorMessage">{errors.anotherEmergencyContactNo.message}</div>)
                              : null}
                        </div>
                        <div className='relationshipLabelContainer'>
                          <label className='relationshipLabel'>Name (Relation)<span className='required'>*</span></label>
                          <input type='text' placeholder='Name (Relation)' className={`emergencyNameInput ${errors.anotherEmergencyRtnName ? 'invalid' : ''}`} {...register("anotherEmergencyRtnName", { required: true })}
                            value={currentAddress.anotherEmergencyRtnName} onChange={(e) => { handlePatternForAddressInputs(e, /^[A-Za-z,()&\s]+$/, 'anotherEmergencyRtnName'); handleAddressChange('current', 'anotherEmergencyRtnName', e.target.value) }} disabled={checked ? true : false} />
                          {customErrorForPattern.anotherEmergencyRtnName ? <div className="emergencyErrorMessage">{customErrorForPattern.anotherEmergencyRtnName}</div> : ''}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <hr style={{ width: '84.5%', marginTop: '30px', marginLeft: '90px', height: '3px', backgroundColor: 'lightgray', border: 'none' }} />
              {/* address history form */}
              <div className='address-history-container'>
                <div className='address-heading-btn-container'>
                  <div>
                    <p className='permanentAddressLabel'>Address History (Legacy Address)<span className='required'>*</span> - Last 3 Years</p>
                  </div>
                  <div>
                    {addressBlocks.length < 3 && (
                      <button type="button" className="primary-btn" onClick={handleAddAddressBlock} style={{ borderRadius: '0.25rem', fontSize: '18px', width: '30px', height: '30px', padding: '0' }}>
                        +
                      </button>
                    )}
                  </div>
                </div>
                {addressBlocks.map((block, index) => {
                  const wordIndex = numberToWords(index + 1);
                  return (
                    <div key={index} className='address-history-box'>
                      <div>
                        <p style={{ textAlign: 'left' }}>{wordIndex} Year :</p>
                      </div>
                      <div>
                        <input
                          type='text'
                          placeholder='Address Line 1'
                          className={`flatNoInput ${errors[`addressHistoryLine1_${index}`] ? 'invalid' : ''}`}
                          {...register(`addressHistoryLine1_${index}`, { required: true, maxLength: 100 })} value={pattern[`addressHistoryLine1_${index}`]}
                          onChange={(e) => handlePatternForLegacyAddressInputs(e, /^[a-zA-Z0-9\s,.'\-/#()&]+$/, "addressHistoryLine1", index)} />
                        {customErrorForLegacyAddressPattern[`addressHistoryLine1_${index}`] && (
                          <div className="contactErrorMessage" style={{ marginBottom: '10px', marginTop: '-11px' }}>
                            {customErrorForLegacyAddressPattern[`addressHistoryLine1_${index}`]}
                          </div>
                        )}
                        <input type='text' placeholder='Address Line 2' className={`streetInput ${errors[`addressHistoryLine2_${index}`] ? 'invalid' : ''}`} {...register(`addressHistoryLine2_${index}`, { required: true, maxLength: 100 })}
                          value={pattern[`addressHistoryLine2_${index}`]} onChange={(e) => handlePatternForLegacyAddressInputs(e, /^[a-zA-Z0-9\s,.'\-/#()&]+$/, "addressHistoryLine2", index)} />
                        {customErrorForLegacyAddressPattern[`addressHistoryLine2_${index}`] && (<div className="contactErrorMessage">{customErrorForLegacyAddressPattern[`addressHistoryLine2_${index}`]}</div>)}
                      </div>
                      <div className='townPinCodeBox'>
                        <div className="fieldWrapper">
                          <div>
                            <input type='text' placeholder='Address Line 3' className={`townInput ${errors[`addressHistoryLine3_${index}`] ? 'invalid' : ''}`} {...register(`addressHistoryLine3_${index}`, { required: true, maxLength: 50 })}
                              value={pattern[`addressHistoryLine3_${index}`]} onChange={(e) => handlePatternForLegacyAddressInputs(e, /^[a-zA-Z0-9\s,.'\-/#()&]+$/, "addressHistoryLine3", index)} />
                          </div>
                          {customErrorForLegacyAddressPattern[`addressHistoryLine3_${index}`] && (
                            <div className="addressErrorMessage">{customErrorForLegacyAddressPattern[`addressHistoryLine3_${index}`]}</div>
                          )}
                        </div>
                        <div className="fieldWrapper">
                          <div>
                            <label>Pin Code</label>
                            <input type='text' placeholder='Pin Code' className={`pinCodeInput  ${errors[`addressHistoryPincode_${index}`] ? 'invalid' : ''}`} {...register(`addressHistoryPincode_${index}`,
                              {
                                required: true, minLength: {
                                  value: 6,
                                  message: "Pincode must be of six digits only"
                                }
                              })} value={pattern[`addressHistoryPincode_${index}`]} onChange={(e) => {
                                handleLegacyAdddressPincode(e, index); handlePatternForLegacyAddressInputs(e, /^[0-9]+$/, "addressHistoryPincode", index)
                              }} />
                          </div>
                          {customErrorForLegacyAddressPattern[`addressHistoryPincode_${index}`] ? (
                            <div className="pincodeErrorMessage">{customErrorForLegacyAddressPattern[`addressHistoryPincode_${index}`]}</div>)
                            : errors[`addressHistoryPincode_${index}`] ? (<div className="errorMessage">{errors[`addressHistoryPincode_${index}`].message}</div>)
                              : null}
                        </div>
                      </div>
                      <div className='stateCityContainer'>
                        <div>
                          <label>State</label>
                          <select
                            className={`stateInput ${errors[`addressHistoryState_${index}`] ? 'invalid' : ''}`}
                            {...register(`addressHistoryState_${index}`, { required: true })}
                            value={selectedLegacyAddressState[index] || ''} // Bind select element to state value
                            onChange={(e) => { handleLegacyAdddressStateChange(e, index); handleLegacyAddressStateColorChange(e, index) }} // Update state variable on change
                            style={{ color: selectLegacyAddressStateColor[index] || "#d3d3d3" }}>
                               <option value="" hidden style={{ color: "#d3d3d3" }}>Select State</option>
                            {stateOption.map((eachState, index) => (
                              <option key={index} value={eachState} style={{ color: "black" }}>{eachState}</option>
                            ))}
                          </select>
                        </div>
                        <div className='cityContainer'>
                          <label>City</label>
                          <select className={`cityInput  ${errors[`addressHistoryCity_${index}`] ? 'invalid' : ''}`} {...register(`addressHistoryCity_${index}`, { required: true })}
                            value={selectedLegacyAddressCity[index] || ''} // Bind select element to city value
                            onChange={(e) => { handleLegacyAdddressCityChange(e, index); handleLegacyAddressCityColorChange(e, index) }} // Update city variable on change
                            style={{ color: selectLegacyAddressCityColor[index]|| "#d3d3d3" }}> <option value="" hidden style={{ color: "#d3d3d3" }}>Select City</option>
                            {(legacyAddressCityOption[index] || []).map((eachCity, id) => (
                              <option key={id} value={eachCity} style={{ color: "black" }}>{eachCity}</option>
                            ))}
                           </select>
                        </div>

                      </div>
                      {/* <div className='stateCityContainer'>
                  <div className='fromContainer'>
                    <label>Period Of Stay</label>  
                    <label className='fromLabel'>From</label>
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
                </div> */}
                      <div className='datepicker-container'>
                        <label>Period Of Stay</label>
                        <DatePicker ref={legacyDatePickerRef.current[index]}
                          selectsRange
                          startDate={legacyDateRanges[index]?.[0]}
                          endDate={legacyDateRanges[index]?.[1]}
                          onChange={(update) => {
                            const newRanges = [...legacyDateRanges];
                            newRanges[index] = update;
                            setLegacyDateRanges(newRanges);

                            // Optional: Reset custom styles if needed
                            // handlePermanentContactDetailsFromDateColorChange({ target: { value: update[0] } });
                            // handlePermanentContactDetailsToDateColorChange({ target: { value: update[1] } });

                            // Update React Hook Form values if using register
                            setValue(`addressHistoryFromStay_${index}`, update[0]);
                            setValue(`addressHistoryToStay_${index}`, update[1]);
                            trigger([`addressHistoryFromStay_${index}`, `addressHistoryToStay_${index}`]);
                          }}
                          maxDate={new Date()} // Prevent future dates
                          placeholderText="Select period of stay"
                          className={`fromInput ${errors[`addressHistoryFromStay_${index}`] || errors[`addressHistoryToStay_${index}`] ? 'invalid' : ''}`}
                          isClearable
                        />
                        <input type="hidden" {...register(`addressHistoryFromStay_${index}`, { required: true })} />
                        <input type="hidden" {...register(`addressHistoryToStay_${index}`, { required: true })} />
                        <img src={require("assets/img/calendar-icon.png")} alt="calendar" className="calendar-icon" onClick={() => legacyDatePickerRef.current[index].current.setFocus()} />
                      </div>
                      <div className='emergencyContainer'>
                        <div>
                          <label className='emergencyContactLabel'>Emergency Contact</label>
                          <input type='telephone' placeholder='Mobile No.' className={`emergencyNoInput ${errors[`addressHistoryEmergencyContactNo_${index}`] ? 'invalid' : ''}`} {...register(`addressHistoryEmergencyContactNo_${index}`, {
                            required: true, minLength: {
                              value: 10,
                              message: "Contact no. must be of ten digits only"
                            }
                          })}
                            value={pattern[`addressHistoryEmergencyContactNo_${index}`]} onChange={(e) => handlePatternForLegacyAddressInputs(e, /^[0-9]+$/, "addressHistoryEmergencyContactNo", index)} />
                          {errors[`addressHistoryEmergencyContactNo_${index}`] ? (<div className="emergencyErrorMessage">{errors[`addressHistoryEmergencyContactNo_${index}`].message}</div>)
                            : customErrorForLegacyAddressPattern[`addressHistoryEmergencyContactNo_${index}`] ? (
                              <div className="emergencyErrorMessage">{customErrorForLegacyAddressPattern[`addressHistoryEmergencyContactNo_${index}`]}</div>)
                              : null}
                        </div>
                        <div className='relationshipLabelContainer'>
                          <label className='relationshipLabel'>Name (Relation)</label>
                          <input type='text' placeholder='Name (Relation)' className={`emergencyNameInput ${errors[`addressHistoryEmergencyRtnName_${index}`] ? 'invalid' : ''}`} {...register(`addressHistoryEmergencyRtnName_${index}`, { required: true, maxLength: 50 })}
                            value={pattern[`addressHistoryEmergencyRtnName_${index}`]} onChange={(e) => handlePatternForLegacyAddressInputs(e, /^[A-Za-z,()&\s]+$/, "addressHistoryEmergencyRtnName", index)} />
                          {customErrorForLegacyAddressPattern[`addressHistoryEmergencyRtnName_${index}`] && (
                            <div className="emergencyErrorMessage">{customErrorForLegacyAddressPattern[`addressHistoryEmergencyRtnName_${index}`]}</div>)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* save buttons */}
              <div className='contactSaveButtons'>
                <button type="button" className="backBtn" onClick={backToPersonalPage}>Back</button>
                <button type="button" className="saveBtn" onClick={saveInLocalStorage}>Save As Draft</button>
                <button type="submit" className="saveNextBtn">Save And Next </button>
              </div>
            </form>
          </div>
        </ReusableProgessBar>
      </div>
    </div>
  )
}
