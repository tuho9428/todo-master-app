import { createSlice } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
} from "./authThunk";

const authInitialState = {
  isLoggedIn: false,
  isRegistered: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearIsRegistered(state) {
      state.isRegistered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.isRegistered = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUserThunk.fulfilled, (_) => {
        return authInitialState; // Reset to initial state
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, clearIsRegistered } = authSlice.actions;

export default authSlice.reducer;
