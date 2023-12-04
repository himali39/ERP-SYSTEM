import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./state";
import { Provider } from "react-redux";
import {api} from "./state/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Auth0Provider } from "@auth0/auth0-react";

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
  <Auth0Provider
    domain="dev-c4r8f2bqnkfsro87.us.auth0.com"
    clientId="dNtaLWLenPvSRIzKgbdoIDjvZnGH7kOU"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);
