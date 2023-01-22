import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOAST_FAILURE } from "../../App";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading, showToast } from "./appConfigSlice";

export const getUserProfile = createAsyncThunk('/user/getUserProfile', async (body, thunkAPi) => {
    try {
        thunkAPi.dispatch(setLoading(true))
        const response = await axiosClient.post('/user/getUserProfile', body);
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

export const likeAndUnlikePost = createAsyncThunk('post/likeAndUnlikePost', async (body, thunkAPi) => {
    try {
        const response = await axiosClient.post('/posts/like', body)
        return response.result.post
    } catch (error) {
        thunkAPi.dispatch(showToast({
            type: TOAST_FAILURE,
            message: error
        }))
        return Promise.reject(error)
    }
})


const postSlice = createSlice({
    name: 'postSlice',
    initialState: {
        userProfile: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload
        })
        .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
            const post = action.payload;
            console.log(action.payload)
            const index = state?.userProfile?.posts?.findIndex((item) => {
                return item._id == post._id
            })
            console.log(index)
            if(index != undefined && index != -1){
                state.userProfile.posts[index] = post;
            }
        })
    }
})



export default postSlice.reducer
