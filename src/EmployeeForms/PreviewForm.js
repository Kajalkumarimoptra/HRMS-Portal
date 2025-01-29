import React, { useRef, useEffect, useState } from 'react';
import AttachSign from './AttachSign';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'components/ContextProvider/Context';
import Navbar from './Navbar';

export default function PreviewForm() {

  const navigate = useNavigate();
  const {
    register, handleSubmit, onSubmit, setValue, errors, watch
  } = useFormContext();

  // for getting the current date
  const getCurrentDate = () => {
    const todayDate = new Date();
    const month = todayDate.getMonth();
    const year = todayDate.getFullYear();
    const date = todayDate.getDate();
    return `${date}/${month}/${year}`;
  }
  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  }
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  const backToDeclarationPage = () => {
    navigate("/declarationform");
  }

  return (
    <div className='container-fluid form-navbar'>
    <Navbar />
    <div className='declaration-form'>
      <div className='UniversalHeadlines'>
        <h6 className='previewHeading'>ASSOCIATE INFORMATION AND BACKGROUND CHECK FORM- PREVIEW</h6>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='signAttach'>
          <AttachSign />
          <label className='signatureLabel'>Employee Signature</label>
          <div className='lastDate'>
            <label>Date<span className='finalDateSeperator' >:</span></label>
            <input type='date' className='lastDateInput' {...register("dateAttach")} value={currentDate} onChange={handleDateChange} />
          </div>
          <div>
            <label>Place<span className='required'>*</span> :</label>
            <input type='text' className={`lastPlaceInput ${errors.placeAttach ? 'invalid' : ''}`} {...register("placeAttach", { required: true })} />
          </div>

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
    </div>
    </div>
  )
}
