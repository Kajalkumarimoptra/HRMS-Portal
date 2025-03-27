import React, { createContext, useContext, useMemo } from 'react';

const HolidayListContext = createContext();

// Sample holiday data
   const holidays = [
    { date: "Jan 01", name: "New Year" },
    { date: "Jan 14", name: "Makar Sankranti/Pongal" },
    { date: "Jan 26", name: "Republic Day" },
    { date: "Feb 26", name: "Maha Shivratri" },
    { date: "Mar 14", name: "Holi" },
    { date: "Mar 31", name: "Id-Ul-Fitr" },
    { date: "Apr 06", name: "Ram Navami" },
    { date: "Apr 18", name: "Good Friday" },
    { date: "Aug 09", name: "Raksha Bandhan" },
    { date: "Aug 15", name: "Independence Day" },
    { date: "Aug 16", name: "Janmasthmi" },
    { date: "Aug 27", name: "Ganesh Chaturthi" },
    { date: "Oct 02", name: "Gandhi Jayanti" },
    { date: "Oct 02", name: "Dussehra" },
    { date: "Oct 21", name: "Diwali" },
    { date: "Dec 25", name: "Christmas Day" }
  ];

export const HolidayListContextProvider = ({children}) => {
    const holidayList = useMemo(()=> holidays, []) // to ensure that holidayData is only created once and reused
    return(
        <HolidayListContext.Provider value={holidayList}>
         {children}
        </HolidayListContext.Provider>
    )

}

export const useHolidayListContext = () => {
    return useContext(HolidayListContext);
}