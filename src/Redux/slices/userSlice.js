import { SetUpUser } from "@/appwrite/user/getUserDetails";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


export const fetchUser = createAsyncThunk("user/get",async (raiseToast = true)=>{
  try{
    const UserDet = await SetUpUser();

    if (raiseToast) {
      toast.promise((async () => {
        if(UserDet.status === 200){
            Promise.resolve()
        }else{
            throw new Error(UserDet.resp)
        }
      })(),{
        loading: 'Loading...',
        success: 'Account fetched',
        error: ''
      
      })
    }


      return UserDet.resp;

}catch(e){
    toast.error(e.message)
}
})

const initialState = {
  user: null,
  name:null,
  isLoggedIn: false,
  verified: null,  
  firstname:null,
  all:new Object()
};


const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    updateUser(state, action) {
      // logic to update user
      
      const newState = {
        ...state,
        name:action.payload.name,
        user: action.payload.user,
        verified: action.payload.verified,
        isLoggedIn: action.payload.isLoggedIn,
        all : action.payload,
      }
      return newState

      // state.uniqueToken = action.payload.uniqueToken
    },
    logoutUser() {
      return initialState
    },
    updateRaisedQuery(state){
      return {
        ...state,
        all:{
          ...state.all,
          prefs : {
            ...state.all.prefs,
            raisedQuery: (()=>{
              const existing = state.all.prefs.raisedQuery;
              if (existing === "false"){

                return "true"
              }
              else{

                return "false"
              }
            })()
          }
        }
      }

    }
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchUser.fulfilled, (state, action)=>{
      state.firstname = action.payload.prefs.firstname;
      state.name = action.payload.name;
      state.user = action.payload.email;
      state.isLoggedIn = true;
      state.all = action.payload,
      state.verified = action.payload.emailVerification;
    })
  
  }
});
export const { updateUser, logoutUser,updateRaisedQuery } = userSlice.actions;
export default userSlice.reducer;
