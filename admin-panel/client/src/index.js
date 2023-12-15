import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { api } from "./state/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./state/rootReducer";

const store = configureStore({
  reducer: {
    reducer: rootReducer,
    [api.reducerPath]: api.reducer, //api.js
  },

  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Provider store={store}>
    <App />
  </Provider>

);
