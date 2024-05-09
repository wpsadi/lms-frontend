import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import courseSlice from "./slices/courseSlice";
import lectureSlice from "./slices/lectureSlice";


export const store = configureStore({
    reducer:{
        user: userSlice,
        course: courseSlice,
        lecture:lectureSlice
    },
    devTools:true
})