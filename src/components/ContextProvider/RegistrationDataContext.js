import React, { createContext, useContext, useEffect, useState } from 'react';
import { json } from 'react-router-dom';

const RegistrationDataContext = createContext();

export function useRegistrationContext() {
    return useContext(RegistrationDataContext);
}

export function RegistrationProvider({ children }) {
    const [registrationData, setRegistrationData] = useState(() => {
        // Load data from localStorage on initialization
        const storedRegData = localStorage.getItem('registrationData');
        return storedRegData ? JSON.parse(storedRegData) : null;
    });
 
    // Persist data to localStorage whenever registrationData changes
    useEffect( () => {
        if(registrationData){
            localStorage.setItem('registrationData', JSON.stringify(registrationData));
        }else{
            localStorage.removeItem('registrationData');
        }
    }, [registrationData]);

    return (
        <RegistrationDataContext.Provider value={{ registrationData, setRegistrationData }}>
            {children}
        </RegistrationDataContext.Provider>
    );
}
