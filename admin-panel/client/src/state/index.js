import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239c72c000180",
};
export const globlSlice = createSlice(
  {
    name: "global",
    initialState: initialState,
    reducers:
     {
      setMode: (state) => {
        state.mode = state.mode === "light" ? "dark" : "light";
      },
    },
  },
  {
    name: "user",
    initialState: {
      loading:false,
      user:null,
      error:null
    },
  }
);

export const { setMode } = globlSlice.actions;

export default globlSlice.reducer;
