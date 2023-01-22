import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOAST_FAILURE } from "../../App";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading, showToast } from "./appConfigSlice";
import { likeAndUnlikePost } from "./postSlice";


export const getFeedData = createAsyncThunk('/user/getFeedData', async (body, thunkAPi) => {
    try {
        thunkAPi.dispatch(setLoading(true))
        const response = await axiosClient.post('/user/getFeedData');
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

export const followAndUnfollowUser = createAsyncThunk('user/followAndUnfollowUser', async (body, thunkAPi) => {
    try {
        const response = await axiosClient.post('/user/follow', body)
        return response.result
    } catch (error) {
        thunkAPi.dispatch(showToast({
            type: TOAST_FAILURE,
            message: error
        }))
        return Promise.reject(error)
    }
})


const feedSlice = createSlice({
    name: 'feedSlice',
    initialState: {
        feedData: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getFeedData.fulfilled, (state, action) => {
            state.feedData = action.payload
        })
        .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
            const post = action.payload;
            const index = state?.feedData?.posts?.findIndex((item) => {
                return item._id == post._id
            })
            if(index != undefined && index != -1){
                state.feedData.posts[index] = post;
            }
        })
        .addCase(followAndUnfollowUser.fulfilled, (state, action) => {
            const user = action.payload.user
            const index = state.feedData.following.findIndex(item => item._id === user._id)
            if(index != undefined && index != -1){
                state.feedData.following.splice(index, 1)
            }else{
                state.feedData.following.push(user)
            }
        })
    }
})



export default feedSlice.reducer
