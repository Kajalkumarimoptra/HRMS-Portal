import React, { createContext, useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
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
    setError, getValues, control,unregister
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  // State management
  const [serverError, setServerError] = useState('');
  const [showAddBtn, setShowAddBtn] = useState(true); // To track the visibility of add row button 
  const [showMinusBtn, setShowMinusBtn] = useState(false); // To track the visibility of minus row button
  const [users, setUsers] = useState([]); // State to store users
  const [allAttendance, setAllAttendance] = useState([]); // to store attendance data of all users
  
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
    setError, getValues, control, unregister,
    serverError,
    setServerError,
    showAddBtn, setShowAddBtn,
    showMinusBtn, setShowMinusBtn,
    users, setUsers,
    allAttendance, setAllAttendance
  };

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>;
};

// Custom hook to use the FormContext
export const useFormContext = () => {
  return useContext(AuthContext);
};