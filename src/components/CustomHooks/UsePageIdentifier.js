import React from 'react';
import { useLocation } from 'react-router-dom';

const formPathToPageIdentifier = {
  '/personaldetailsform': 'personalDetails',
  '/contactdetailsform': 'contactDetails',
  '/educationaldetailsform': 'educationDetails',
  '/professionalrefform': 'professionalRef',
  '/additionaldetailsform': 'additionalDetails',
  '/previewform' : '/previewform'
};

export default function UsePageIdentifier() {
    const location = useLocation();
    return formPathToPageIdentifier[location.pathname] || 'unknown';
}
