import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  name:null,
  isLoggedIn: false,
  verified: null,  
  uniqueToken: null,
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
      }
      return newState

      // state.uniqueToken = action.payload.uniqueToken
    },
    logoutUser() {
      return initialState
    },
  },
});
export const { updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
