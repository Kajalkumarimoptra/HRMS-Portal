import { createSlice } from '@reduxjs/toolkit'
import def from 'ajv/dist/vocabularies/applicator/additionalItems';
import React from 'react'

export const getUserIdSlice = createSlice({
    name: 'getUserId',
    initialState: {userId: null},
    reducers:{
        setUserId: (state,action) => {
            state.userId = action.payload 
        }
    }
}) 

export const {setUserId} =  getUserIdSlice.actions;
export default getUserIdSlice.reducer;
