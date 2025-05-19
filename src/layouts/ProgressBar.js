import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = ["Personal Details", "Contact Details", "Educational Details", "Prof. References", "Additional Details"];

  return (
    <div className="progress-container">
      {/* Line behind all step circles */}
      <div className="progress-line"></div>

      {steps.map((label, index) => (
        <div key={index} className="step-container">
          <div className={`step-circle ${index < currentStep ? 'completed' : index === currentStep ? 'active' : ''}`}>
          {/* <div className={`step-circle ${index === currentStep ? 'active' : ''}`}> */}
            {/* {index < currentStep ? (
              <img
                src={require("assets/img/progress-check-icon.png")}
                alt="..."
                className='progress-check-icon'
              />
            ) : (
              index + 1
            )} */}
              {index + 1}
          </div>
          <div className="step-label">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
