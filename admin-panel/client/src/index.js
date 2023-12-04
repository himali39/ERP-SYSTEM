import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./state";
import { Provider } from "react-redux";
import {api} from "./state/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthProvider } from "../src/components/AuthContext";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer, //api.js
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);
