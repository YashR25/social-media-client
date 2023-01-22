import { configureStore } from "@reduxjs/toolkit";
import appConfigSlice from "./slices/appConfigSlice";
import feedSlice from "./slices/feedSlice";
import postSlice from "./slices/postSlice";



export default configureStore({
    reducer: {
        appConfigReducer: appConfigSlice,
        postReducer: postSlice,
        feedReducer: feedSlice
    }
})