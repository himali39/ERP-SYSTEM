import { createSlice } from "@reduxjs/toolkit";
import { useLoginQuery } from "./api";

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239c72c000180",
};

const userInitialState = {
  loading: false,
  user: null,
  error: null,
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

/**set user authentication reducer */
const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    // Add your user-related reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(useLoginQuery.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(useLoginQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(useLoginQuery.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === "request failed with status 401") {
          state.error = "Access denied";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const { setMode } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
export const userReducer = userSlice.reducer;
