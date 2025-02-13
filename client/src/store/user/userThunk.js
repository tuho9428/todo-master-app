import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserThunk = createAsyncThunk("user/getUser", async () => {
  const response = await fetch("http://localhost:3000/api/user", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch user info");
  const data = await response.json();
  return data;
});
