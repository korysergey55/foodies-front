import { createSlice } from "@reduxjs/toolkit";
import { authSignUpThunk, authSignInThunk, authLogOutThunk } from "./thunks";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const fulfildAuthSignUp = (state, { payload }) => {
  state.user = payload;
  state.isLoading = false;
};
const pandingAuthSignUp = (state, _) => {
  state.isLoading = true;
};
const rejectedAuthSignUp = (state, { error }) => {
  state.isLoading = false;
  state.error = error;
};

const fulfildAuthSignIn = (state, { payload }) => {
  state.token = payload;
  state.isLoading = false;
};
const pandingAuthSignIn = (state, _) => {
  state.isLoading = true;
};
const rejectedAuthSignIn = (state, { error }) => {
  state.isLoading = false;
  state.error = error;
};

const fulfildAuthLogOut = (state, _) => {
  state.token = "";
  state.isLoading = false;
};
const pandingAuthLogOut = (state, _) => {
  state.isLoading = true;
};
const rejectedAuthLogOut = (state, { error }) => {
  state.isLoading = false;
  state.error = error;
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  extraReducers: bilder => {
    bilder
      .addCase(authSignUpThunk.fulfilled, fulfildAuthSignUp)
      .addCase(authSignUpThunk.pending, pandingAuthSignUp)
      .addCase(authSignUpThunk.rejected, rejectedAuthSignUp)
      .addCase(authSignInThunk.fulfilled, fulfildAuthSignIn)
      .addCase(authSignInThunk.pending, pandingAuthSignIn)
      .addCase(authSignInThunk.rejected, rejectedAuthSignIn)
      .addCase(authLogOutThunk.fulfilled, fulfildAuthLogOut)
      .addCase(authLogOutThunk.pending, pandingAuthLogOut)
      .addCase(authLogOutThunk.rejected, rejectedAuthLogOut);
  },
});

export const authUserReduser = authUserSlice.reducer;