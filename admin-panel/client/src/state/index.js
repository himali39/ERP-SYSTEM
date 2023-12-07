import { createSlice } from "@reduxjs/toolkit";
import { useAdminLoginMutation } from "./api";

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

/**set user authentication reducer */
const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,

  reducers: {
    // Add your user-related reducers here
  },
  // extraReducers: (build) => {
  //   build
  //     .addCase(useAdminLoginMutation.pending, (state) => {
  //       state.loading = true;
  //       state.user = null;
  //       state.error = null;
  //     })
  //     .addCase(useAdminLoginMutation.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.user = action.payload;
  //       state.accessToken = action.payload.accessToken;
  //       state.refreshToken = action.payload.refreshToken;
  //       state.error = null;
  //     })
  //     .addCase(useAdminLoginMutation.rejected, (state, action) => {
  //       state.loading = false;
  //       state.user = null;
  //       console.log(action.error.message);
  //       if (action.error.message === "request failed with status 401") {
  //         state.error = "Access denied";
  //       } else {
  //         state.error = action.error.message;
  //       }
  //     });
  // },
});

export const selectUser = (state) => state.user;
export const userReducer = userSlice.reducer;

export const { setMode } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
