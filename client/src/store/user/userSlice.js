import { createSlice } from "@reduxjs/toolkit";
import { getUserThunk } from "./userThunk";

const userInitialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
