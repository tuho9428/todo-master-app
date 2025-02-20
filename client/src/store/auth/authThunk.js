import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const email = formData.email;
      const password = formData.password;
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data?.error) {
        return rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const email = formData.email;
      const password = formData.password;
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data?.error) {
        return rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",

        credentials: "include",
      });
      if (!res.ok) {
        return rejectWithValue("Logout failed. Please try again.");
      }
      return {};
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const verifyUserThunk = createAsyncThunk(
  "auth/verifyUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/verify", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        return rejectWithValue("Verify failed. Please try again.");
      }
      return {};
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);
