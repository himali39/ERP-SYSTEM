import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239c72c000180",
};

const userInitialState = {
  loading: false,
  user: null,
  error: null,
  accessToken: null,
  refreshToken: null,
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

// export const loginUser = createAsyncThunk(
//   "loginUser",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`http://localhost:5000/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       });

//       if (!response.ok) {
//         console.error(
//           `HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`
//         );
//         throw new Error("Login failed");
//       }

//       // Check if the content-type header indicates JSON
//       const contentType = response.headers.get("content-type");
//       if (contentType && contentType.includes("application/json")) {
//         const data = await response.json();
//         return data;
//       } else {
//         // If not JSON, handle the response accordingly (e.g., read as text)
//         const textData = await response.text();
//         return textData;
//       }
//     } catch (error) {
//       console.error("Error in loginApi:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const loginUser = createAsyncThunk(
  "loginUser",
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
        // If not JSON, handle the response accordingly (e.g., read as text)
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
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    resetLoginState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        // console.log("pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // console.log("fulfilled");
        // console.log("action" + action.payload);
        state.loading = false;
        state.isAuthenticated = true;
        // state.info = action.payload.info;
        // localStorage.setItem("token", action.payload.info.token);
        // localStorage.setItem("refreshToken", action.payload.info.refresh_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        // console.log("rejected");
        // console.log("action" + action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetLoginState } = apiSlice.actions;

export const userReducer = apiSlice.reducer;

// export const selectUser = (state) => state.user;
// export const userReducer = userSlice.reducer;

export const { setMode } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
