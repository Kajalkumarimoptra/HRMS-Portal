import React from 'react';
import { useLocation } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function ReusableProgessBar({children}) {
    const location = useLocation();
    const formPaths = ['/personaldetailsform', '/contactdetailsform', '/educationaldetailsform', '/professionalrefform', '/additionaldetailsform'];
    const currentStep = formPaths.indexOf(location.pathname);
  
    return (
      <div>
        <ProgressBar currentStep={currentStep} />
        <div>{children}</div>
      </div>
    );
}
