import { createSlice } from "@reduxjs/toolkit";

const initState = {
  currentUser: null,
  isFectching: false,
  error: false,
  errorMessage: ''
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
    loginFail: (state, action) => {
      state.isFectching = false;
      state.error = true;
      state.errorMessage = action.payload
    },
    logoutSuccess: (state) => {
      state.currentUser = initState.currentUser;
      state.isFectching = initState.isFectching;
      state.error = initState.error;
      state.errorMessage = initState.errorMessage;
    }
  }
});

export const { loginStart, loginSuccess, loginFail, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;