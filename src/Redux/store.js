import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import courseSlice from "./slices/courseSlice";


export const store = configureStore({
    reducer:{
        user: userSlice,
        course: courseSlice
    },
    devTools:true
})