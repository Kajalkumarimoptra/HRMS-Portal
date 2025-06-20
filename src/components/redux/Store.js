import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { setUserId } from './Slice/getUserIdSlice';
import userReducer from './Slice/getUserIdSlice';

export const Store= configureStore({
   reducer:{
      getUserId: userReducer
      
   }
}) 
