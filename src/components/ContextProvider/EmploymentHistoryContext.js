import React, { createContext, useContext, useEffect, useState } from 'react';

export const EmploymentHistoryContext = createContext();

export function useEmploymentHistoryContext(){
    return useContext(EmploymentHistoryContext);
}

export const EmploymentHistoryContextProvider = ({ children }) => {
    const [employmentHistoryDetails, setEmploymentHistoryDetails] = useState([]);

    return (
        <EmploymentHistoryContext.Provider value={{ employmentHistoryDetails, setEmploymentHistoryDetails }}>
            {children}
        </EmploymentHistoryContext.Provider>

    )

}

