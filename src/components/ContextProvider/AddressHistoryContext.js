import React, { createContext, useContext, useEffect, useState } from 'react';

export const AddressHistoryContext = createContext();

export function useAddressHistoryContext() {
    return useContext(AddressHistoryContext);
}

export const AddressHistoryContextProvider = ({ children }) => {
    const [addressHistoryDetails, setAddressHistoryDetails] = useState([]);
    const [rowsOfAddressHistory, setRowsOfAddressHistory] = useState([]);  // for addition of rows on click
    const [showAddButtonOfAddressHistory, setShowAddButtonOfAddressHistory] = useState(true); // state to control add row button visibility

    const addRowForAddressHistory = () => {  // for handling row counter on button click
        if (rowsOfAddressHistory.length < 2) {
            setRowsOfAddressHistory([...rowsOfAddressHistory, {}])
        }
        if (rowsOfAddressHistory.length + 1 === 2) {
            setShowAddButtonOfAddressHistory(false);
        }
    }

    return (
        <AddressHistoryContext.Provider value={{ addressHistoryDetails, setAddressHistoryDetails, rowsOfAddressHistory, setRowsOfAddressHistory, showAddButtonOfAddressHistory, addRowForAddressHistory }}>
            {children}
        </AddressHistoryContext.Provider>

    )

}