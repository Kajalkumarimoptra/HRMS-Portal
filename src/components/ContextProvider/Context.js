import React, { createContext, useContext, useState } from 'react';
import { useForm } from "react-hook-form";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 // Call useForm once
 const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
    reset,
    clearErrors,
    setError,
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  // State management
  const [serverError, setServerError] = useState('');
  const [role, setRole] = useState(null);
  const [showAddBtn, setShowAddBtn] = useState(true); // To track the visibility of add row button 
  const [showMinusBtn, setShowMinusBtn] = useState(false); // To track the visibility of minus row button

  
  // Combine everything into a single value object
  const value = {
    register,
    handleSubmit, onSubmit,
    errors,
    trigger,
    setValue,
    watch,
    reset,
    clearErrors,
    setError,
    serverError,
    setServerError,
    role,
    setRole,
    showAddBtn, setShowAddBtn,
    showMinusBtn, setShowMinusBtn
  };

  return <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>;
};

// Custom hook to use the FormContext
export const useFormContext = () => {
    return useContext(AuthContext);
  };