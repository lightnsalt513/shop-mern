import { createSlice } from "@reduxjs/toolkit";

const initState = {
  currentUser: null,
  isFectching: false,
  error: false
}

const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    loginStart: (state) => {
      state.isFectching = true;
    },
    loginSuccess: (state, action) => {
      state.isFectching = false;
      state.currentUser = action.payload;
    },
    loginFail: (state) => {
      state.isFectching = false;
      state.error = true;
    },
    logoutSuccess: (state) => {
      state.currentUser = initState.currentUser;
    }
  }
});

export const { loginStart, loginSuccess, loginFail, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;