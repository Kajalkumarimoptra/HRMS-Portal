import React, { useState, useEffect, useContext } from 'react';
import { useFormContext } from 'components/ContextProvider/Context';
import { AddressHistoryContext } from 'components/ContextProvider/AddressHistoryContext';
import { useNavigate } from 'react-router-dom';

export default function AddressHistory() {
    const navigate = useNavigate();
    const {
        handleSubmit, onSubmit, register, errors, customErrorForAddRows, setValue
    } = useFormContext();
    const { setAddressHistoryDetails, rowsOfAddressHistory, addRowForAddressHistory, showAddButtonOfAddressHistory } = useContext(AddressHistoryContext);
    const [zipcodes, setZipcodes] = useState([]); // initialize the state to track all the zipcode invaid input in array
    const [countries, setCountries] = useState([]); // initialize the state to track all the country invaid input in array
    const [contactHistories, setContactHistories] = useState([]); // initialize the state to track all the contact no. invaid input in array
    const [isValid, setIsValid] = useState(true); // To track whether input is valid for length validation
    const [fromStayDate, setFromStayDate] = useState("");
    const [fromStayDates, setFromStayDates] = useState({});

    // for pattern validation of address
    const handlePatternForAddressHistoryTableInputs = (index, pattern, field, e) => {
        const value = e.target.value;

        if (field.includes('Zipcode')) {
            // Create a copy of the zipcodes array to update the specific index
            const newZipcodes = [...zipcodes]; // to ensure that the original state is not mutated

            // Validate the input value
            if (value && !pattern.test(value)) {
                const newZipcodes = [...zipcodes];
                let newValue = value;

                if (newValue.length > 6) {
                    newValue = newValue.slice(0, 6);
                }
                // Validate the input value
                if (newValue && !pattern.test(newValue)) {
                    alert('Only numbers are allowed');
                    newValue = newValue.slice(0, -1);
                }
                newZipcodes[index] = newValue;
                setZipcodes(newZipcodes);
                setIsValid(true);
            }
        }
        else if (field.includes('Country')) {
            const newCountries = [...countries];

            // Validate the input value
            if (value && !pattern.test(value)) {
                alert('No numbers or special characters are allowed');
                const validValue = value.slice(0, -1); // Removing the last entered invalid character
                newCountries[index] = validValue;
                setCountries(newCountries);
                return;
            }
            newCountries[index] = value;
            setCountries(newCountries);
        }
        else if (field.includes('Contact')) {
            const newContactHistories = [...contactHistories];
            let newValue = value;

            if (newValue.length > 10) {
                newValue = newValue.slice(0, 10); // Slice to 10 digits
            }
            // Validate the input value
            if (newValue && !pattern.test(newValue)) {
                alert('Only numbers are allowed');
                newValue = newValue.slice(0, -1);
            }
            newContactHistories[index] = newValue;
            setContactHistories(newContactHistories);
            setIsValid(true);
        }
    };

    // to store theese fields in context
    const handleInputChange = (field, value) => {
        setAddressHistoryDetails((prev) => ({
            ...prev, [field]: value,
        }));
    };

    const handleFromStayDateChange = (value) => {
        setFromStayDate(value);
    };
    const handleDynamicFromStayDatesChange = (index, e) => {
        let value = e.target.value;
        setFromStayDates((prev) => ({
            ...prev,
            [index]: value,
        }))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='addressForm'>
                <div>
                    <div className='addressHeading'> <h6 className='educationalHeadline'>ADDRESS HISTORY <span className='required'>*</span> - </h6>
                        <span><p className='educationalNote'> &nbsp;&nbsp;Please provide address for the last 3 years</p></span>
                    </div>
                </div>
                {/* table content */}
                <table className='table addressTableWidth table-bordered'>
                    <thead>
                        <tr>
                            <th scope="col" className='tableHead'>S.No.</th>
                            <th scope="col" colSpan={2} className='tableHead' >Period To Stay</th>
                            <th scope="col" className='tableHead'>Address</th>
                            <th scope="col" className='tableHead'>Zip Code</th>
                            <th scope="col" className='tableHead'>Country</th>
                            <th scope="col" className='tableHead'>Contact No. with relationship </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='tableBody'></th>
                            <th className='tableBody'>From</th>
                            <th className='tableBody'>To</th>
                            <td className='tableBody'></td>
                            <td className='tableBody'></td>
                            <td className='tableBody'></td>
                            <td className='tableBody'></td>
                        </tr>
                        <tr>
                            <td className='tableBody'>1.</td>
                            <td className={`tableBody ${errors.firstAddressFrom ? 'invalid' : ''}`} ><input type='date' className='addressTableInput' {...register("firstAddressFrom", { required: true })}
                                max={new Date().toISOString().split("T")[0]}
                                onChange={(e) => {
                                    handleInputChange("firstAddressFrom", e.target.value);
                                    setValue("firstAddressTo", "");
                                    handleInputChange("firstAddressTo", "");
                                    handleFromStayDateChange(e.target.value)
                                }}
                            /></td>
                            <td className={`tableBody ${errors.firstAddressTo ? 'invalid' : ''}`} ><input type='date' className='addressTableInput' {...register("firstAddressTo", { required: true })}
                                min={
                                    fromStayDate
                                        ? new Date(new Date(fromStayDate).setDate(new Date(fromStayDate).getDate() + 1))
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }
                                onChange={(e) => handleInputChange("firstAddressTo", e.target.value)}
                            /></td>
                            <td className={`tableBody ${errors.firstFullAddress ? 'invalid' : ''}`} ><input type='text area' className='addressTableInput' {...register("firstFullAddress", { required: true })}
                                onChange={(e) => handleInputChange("firstFullAddress", e.target.value)}
                            /></td>
                            <td className={`tableBody ${errors.firstAddressZipcode ? 'invalid' : ''}`} ><input type='text' className='addressTableInput' {...register("firstAddressZipcode",
                                { required: true })} value={zipcodes[0]}
                                onChange={(e) => {
                                    handlePatternForAddressHistoryTableInputs(0, /^[0-9]+$/, 'firstAddressZipcode', e);
                                    handleInputChange("firstAddressZipcode", e.target.value)
                                }}
                            // onBlur={(e) => handlePatternForTotalDigits(0, 'firstAddressZipcode', e)}
                            />
                            </td>
                            <td className={`tableBody ${errors.firstAddressCountry ? 'invalid' : ''}`} ><input type='text' className='addressTableInput' {...register("firstAddressCountry", { required: true })} value={countries[0]}
                                onChange={(e) => {
                                    handlePatternForAddressHistoryTableInputs(0, /^[A-Za-z\s'-]+$/, 'firstAddressCountry', e);
                                    handleInputChange("firstAddressCountry", e.target.value)
                                }} />
                            </td>
                            <td className={`tableBody ${errors.firstAddressRtnContact ? 'invalid' : ''}`}><input type='text' className='addressTableInput'  {...register("firstAddressRtnContact", { required: true })} value={contactHistories[0]}
                                onChange={(e) => {
                                    handlePatternForAddressHistoryTableInputs(0, /^[0-9]+$/, 'firstAddressRtnContact', e);
                                    handleInputChange("firstAddressRtnContact", e.target.value)
                                }}
                            // onBlur={(e) => handlePatternForTotalDigits(0, 'firstAddressRtnContact', e)} 
                            />
                            </td>
                        </tr>
                        {rowsOfAddressHistory.map((_, index) => (
                            <tr key={index}>
                                <td className='tableBody'>{index + 2}.</td>
                                {/* <td className={index % 2 === 0 ? 'tableBody' : 'tableBodyLight'}>{index + 2}.</td> */}
                                {/* <td className={`${index % 2 === 0 ? 'tableBody' : 'tableBodyLight'}  */}
                                <td className={`tableBody ${errors[`anotherAddressFrom_${index}`] ? 'invalid' : ''}`}>
                                    <input type='date' className='addressTableInput' {...register(`anotherAddressFrom_${index}`, { required: true })}
                                        max={new Date().toISOString().split("T")[0]} onChange={(e) => {
                                            handleInputChange(`anotherAddressFrom_${index}`, e.target.value);
                                            setValue(`anotherAddressTo_${index}`, "");
                                            handleInputChange(`anotherAddressTo_${index}`, "");
                                            handleDynamicFromStayDatesChange(index, e)
                                        }}
                                    />
                                </td>
                                <td className={`tableBody ${errors[`anotherAddressTo_${index}`] ? 'invalid' : ''}`}>
                                    <input type='date' className='addressTableInput' {...register(`anotherAddressTo_${index}`, { required: true })}
                                        onChange={(e) => handleInputChange(`anotherAddressTo_${index}`, e.target.value)}
                                        min={
                                            fromStayDates[index]
                                                ? new Date(new Date(fromStayDates[index]).setDate(new Date(fromStayDates[index]).getDate() + 1))
                                                    .toISOString()
                                                    .split("T")[0]
                                                : ""
                                        }
                                    />
                                </td>
                                <td className={`tableBody ${errors[`anotherFullAddress_${index}`] ? 'invalid' : ''}`}>
                                    <input type='text area' className='addressTableInput' {...register(`anotherFullAddress_${index}`, { required: true })}
                                        onChange={(e) => handleInputChange(`anotherFullAddress_${index}`, e.target.value)}
                                    />
                                </td>
                                <td className={`tableBody ${errors[`anotherAddressZipcode_${index}`] ? 'invalid' : ''}`}>
                                    <input type='text' className='addressTableInput' {...register(`anotherAddressZipcode_${index}`, { required: true })} value={zipcodes[index + 1]}
                                        onChange={(e) => {
                                            handlePatternForAddressHistoryTableInputs(index + 1, /^[0-9]+$/, `anotherAddressZipcode_${index}`, e);
                                            handleInputChange(`anotherAddressZipcode_${index}`, e.target.value)
                                        }}
                                    // onBlur={(e) => handlePatternForTotalDigits(index + 1, `anotherAddressZipcode_${index}`, e)} 
                                    />
                                </td>
                                <td className={`tableBody ${errors[`anotherAddressCountry_${index}`] ? 'invalid' : ''}`}>
                                    <input type='text' className='addressTableInput' {...register(`anotherAddressCountry_${index}`, { required: true })}
                                        onChange={(e) => {
                                            handlePatternForAddressHistoryTableInputs(index + 1, /^[A-Za-z\s'-]+$/, `anotherAddressCountry_${index}`, e);
                                            handleInputChange(`anotherAddressCountry_${index}`, e.target.value)
                                        }} value={countries[index + 1]} />
                                </td>
                                <td className={`tableBody ${errors[`anotherAddressRtnContact_${index}`] ? 'invalid' : ''}`}>
                                    <input type='text' className='addressTableInput' {...register(`anotherAddressRtnContact_${index}`, { required: true })} value={contactHistories[index + 1]}
                                        onChange={(e) => {
                                            handlePatternForAddressHistoryTableInputs(index + 1, /^[0-9]+$/, `anotherAddressRtnContact_${index}`, e);
                                            handleInputChange(`anotherAddressRtnContact_${index}`, e.target.value)
                                        }}
                                    // onBlur={(e) => handlePatternForTotalDigits(index + 1, `anotherAddressRtnContact_${index}`, e)} 
                                    />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <div>
                    {showAddButtonOfAddressHistory && (
                        <input type='button' className='contactAddRowButton' value='+Add Row' onClick={addRowForAddressHistory} />)}
                </div>
            </div>
        </form>
    )
}
