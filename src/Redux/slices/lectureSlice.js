import { createSlice } from "@reduxjs/toolkit"


const lectureSlice = createSlice({
    name: 'lecture',
    initialState: {
        lectures: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers:()=>{

    }
})

// export const {} = lectureSlice.actions
export default lectureSlice.reducer