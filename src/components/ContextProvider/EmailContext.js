// EmailContext.js
import { createContext, useContext, useState } from 'react';

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [emailForForms, setEmailForForms] = useState('');
  return (
    <EmailContext.Provider value={{ emailForForms, setEmailForForms }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => useContext(EmailContext);
