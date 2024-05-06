import { GetAllCoursesApp } from "@/appwrite/db/course/getAllCourses";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

export const getAllCourses = createAsyncThunk("course/all",async (raiseToast=true)=>{
    try{
        const allCourses = await GetAllCoursesApp();
        if(raiseToast){
            toast.promise((async () => {
                if(allCourses.status === 200){
                    Promise.resolve()
                }else{
                    throw new Error(allCourses.resp)
                }
              })(),{
                loading: 'Loading...',
                success: 'Courses Loaded',
                error: 'Failed to load courses'
              
              })
        }


          return allCourses.resp;

    }catch(e){
        toast.error(e.message)
    }
})


const initialState = {
    courses:new Object()
}

const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled,(state,action)=>{
            state.courses = action.payload;
        })
    }
})

export default courseSlice.reducer