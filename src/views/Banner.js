import React, { useState, useRef } from "react";

export default function Banner() {
  const [image, setImage] = useState("/image/profileimage.jpg");
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="banner-container">
      <div className="banner-box">
        <div className="anniversary-card">
          <div className="image-container">
          
            <div className="profile-wrapper" onClick={triggerFileInput}>
              <img src={image} alt="Profile" />
            </div>
          </div>
          <img src={require("assets/img/flower-decor.png")}  alt="Flowers" className="flower-decoration" />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <div className="anniversary-content">
            <p className="anniversary-greeting">Dear Siena,</p>
            <h1 className="anniversary-title">
              Happy 4th Work Anniversary!
            </h1>
            <p className="anniversary-message">
              <br />
              Thank you for growing with us! <br />
              Your work is highly appreciated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};



