import React, { createContext, useContext, useEffect, useState } from 'react';

export const OffboardPopupContext = createContext();

export function useOffboardPopupContext(){
    return useContext(OffboardPopupContext);
}

export const OffboardPopupContextProvider = ({ children }) => {
    const [isExitOpen, setExitOpen] = useState(false);

    // Toggle popup function
    const toggleExitPopup = (isOpen) => {
        console.log("toggleExitPopup called with:", isOpen);
        setExitOpen(isOpen);
    };

     // Use useEffect to observe state changes
     useEffect(() => {
        console.log('Updated modal open state:', isExitOpen);
    }, [isExitOpen]);

    return (
        <OffboardPopupContext.Provider value={{ isExitOpen, toggleExitPopup, setExitOpen }}>
            {children}
        </OffboardPopupContext.Provider>

    )

}

