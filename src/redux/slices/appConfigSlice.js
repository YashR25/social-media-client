import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TOAST_FAILURE, TOAST_SUCCESS } from "../../App";
import { axiosClient } from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk('/user/getMyInfo', async (body, thunkAPi) => {
    try {
        thunkAPi.dispatch(setLoading(true))
        const response = await axiosClient.get('/user/getMyInfo');
        return response.result;
    } catch (error) {
        thunkAPi.dispatch(showToast({
            type: TOAST_FAILURE,
            message: error
        }))
        return Promise.reject(error)
    }finally{
        thunkAPi.dispatch(setLoading(false))
    }
    
})

export const updateMyProfile = createAsyncThunk('user/updateMyProfile', async (body, thunkAPi) => {
    try {
        thunkAPi.dispatch(setLoading(true))
        const response = await axiosClient.put('/user/', body);
        return response.result; 
    } catch (error) {
        thunkAPi.dispatch(showToast({
            type: TOAST_FAILURE,
            message: error
        }))
        return Promise.reject(error)
    }finally{
        thunkAPi.dispatch(showToast({
            type: TOAST_SUCCESS,
            message: 'Successfully updated proofile'
        }))
        thunkAPi.dispatch(setLoading(false))
    }
})

const appConfigSlice = createSlice({
    name: 'appConfigSlice',
    initialState: {
        isLoading: false,
        myProfile: {},
        toastData: {},
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        showToast: (state, action) => {
            state.toastData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMyInfo.fulfilled, (state, action) => {
            state.myProfile = action.payload.user
        })
        .addCase(updateMyProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload.user
        })
    }
})



export default appConfigSlice.reducer

export const {setLoading, showToast} = appConfigSlice.actions