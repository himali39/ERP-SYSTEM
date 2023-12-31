import React, { useMemo } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { themeSettings } from "./theme"; // Make sure to import your theme settings
import Layout from "./scenes/layout/layout";
import Dashboard from "./scenes/dashboard/Dashboard";
import Login from "./scenes/auth/Login";
import Faculty from "./scenes/faculty/Faculty";
import AddDataForm from "./scenes/faculty/AddDataForm";
import Forgetpassword from "./scenes/auth/Forgotpassword";
import Events from "./scenes/events/Events";
import Student from "./scenes/student/Student";
import Changepassword from "./scenes/auth/Changepassword";
import Minimallayout from "./scenes/auth/Minimallayout";

function App() {
  const isAuthenticated = useSelector(
    (state) => state.reducer.adminReducer.isAuthenticated
  );

  const mode = useSelector((state) => state.reducer.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const PublicRoute = () => {
    return isAuthenticated || Boolean(localStorage.getItem("accessToken")) ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Minimallayout />
    );
  };

  const PrivateRoute = () => {
    return isAuthenticated || Boolean(localStorage.getItem("accessToken")) ? (
      <Layout />
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<PublicRoute />}>
              <Route index element={<Login />} />
              <Route path="/forget-password" element={<Forgetpassword />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/add-data-form" element={<AddDataForm />} />
              <Route path="/events" element={<Events />} />
              <Route path="/student" element={<Student />} />
              <Route path="/change-password" element={<Changepassword />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
