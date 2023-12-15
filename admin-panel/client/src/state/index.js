import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  mode: "dark",
  //  userId: "657be0fa1548bc5db89e9297",
};
/**set color theme mode reducer */
const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const loginAdmin = createAsyncThunk(
  "loginAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/login`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the content-type header indicates JSON
      const contentType = response.headers["content-type"];
      if (contentType && contentType.includes("application/json")) {
        return response.data;
      } else {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    loading: false,
    error: null,
    isAuthenticated: Boolean(localStorage.getItem("accessToken")),
  },
  reducers: {
    resetLoginState: (state) => {
      state.loading = false;
      state.error = null;
    },
    signout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("adminId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("adminId", action.payload.admin._id);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetLoginState, signout } = apiSlice.actions;
export const adminReducer = apiSlice.reducer;

export const { setMode } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
