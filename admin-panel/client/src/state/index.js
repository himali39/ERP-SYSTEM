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

export const loginUser = createAsyncThunk(
  "userlogin",
  async (data, { rejectWithValue }) => {
    try {
      const request = await axios.post(
        `${process.env.REACT_APP_BASE_URL}auth/login`,
        data
      );

      const response = await request.data;
      if (!response.ok) {
        throw new Error("Failed");
      }
      // console.log(response);
      localStorage.setItem("admin", JSON.stringify(response));
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

/**set user authentication reducer */
const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // console.log(loginUser);
    builder
      .addCase(loginUser.pending, (state) => {
        // console.log("pending");
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // console.log(action);
        state.loading = false;
        // state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

// export const selectUser = (state) => state.user;
export const userReducer = userSlice.reducer;

export const { setMode } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
