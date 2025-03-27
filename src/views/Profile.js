import React, {useState} from 'react';
import { FaCamera } from "react-icons/fa";
import defaultProfilePic from "../assets/img/default-profile-pic.png";
import Breadcrumb from './Breadcrumb';

export default function Profile() {
  const [selectedProfileImage, setSelectedProfileImage] = useState(defaultProfilePic); // to track the selected image

  const handleProfileImageChange =(e) => {
    const file = e.target.files[0];
    if(file){
      const profileImageUrl = URL.createObjectURL(file);
      setSelectedProfileImage(profileImageUrl);
    }
  }

  return (
    <div className='container-fluid'>
      <Breadcrumb/>
      <div className='row clearfix'>
        <div className='col-md-12' style={{marginTop: '16px'}}>
          <div className="profile-card">
            <div className="profile-header">
              <div className='profile-pic-section'>
                <img
                  src={selectedProfileImage}
                  alt=""
                  className={`${selectedProfileImage === defaultProfilePic ? "default-profile-image" : "profile-image"} `}
                /> 
                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*" 
                  id="fileInput"
                  className="file-input"
                  onChange={handleProfileImageChange}
                />
                {/* Camera Icon */}
                <label htmlFor="fileInput" className="camera-icon">
                  <FaCamera />
                </label>
               <p>Active</p>
              </div>
              <div className="profile-info" style={{marginLeft: '-4px'}}>
                <h2>Personal Details</h2>
                <p className="personal-details">
                <span className="label">Name:</span>
                <span>Avinash Gautam</span>
                </p>
                <p className="personal-details">
                <span className="label">Gender:</span>
                <span>Male</span>
                </p>
                <p className="personal-details">
                <span className="label">DOB:</span>
                <span>05 sept, 1995</span>
                 </p>
              </div>
              <div className="profile-info">
                <h2>Contact Details</h2>
                <p className="personal-details">
                <span className="label">Email ID:</span>
                <span>avinashgautam@moptra.com</span>
                </p>
                <p className="personal-details">
                <span className="label">Mob No.:</span>
                <span>8545632569</span>
                </p>
              </div>
            </div>

            <div className='secondary-info-container'>
            <div className="contact-info">
              <h2>Employee Details</h2>
              <p><span className="label">Employee ID:</span>
              <span>50523</span>
              </p>
              <p><span className="label">Designation:</span>
              <span> HR</span>
              </p>
              <p><span className="label">Joining Date:</span>
              <span>10 feb,2024</span>
              </p>
            </div>
            <div className="contact-info" style={{marginLeft: '36px'}}>
              <h2>Address Details</h2>
              <p>Shiksha Sadan, House No-PY/12, D.v.c road</p>
              <p>Gardanibagh, Gaya, Bihar, 562369</p>
            </div>
            <div className="contact-info" style={{marginRight: '32px'}}>
              <h2>Project Details</h2>
            <p><span className="label">Client:</span>
              <span>Petco</span>
              </p>
              <p><span className="label">Reporting Manager:</span>
              <span>Anup Mangla</span>
              </p>
              <p className='location'>
                <span className="location-label">Location:</span>
                <span>Noida</span>
                </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
