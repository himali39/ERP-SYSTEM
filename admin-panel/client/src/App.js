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
import Admin from "./scenes/admin/Admin";
import Login from "./scenes/login/Login";
import Faculty from "./scenes/faculty/Faculty";
import AddDataForm from "./scenes/faculty/AddDataForm";
import Register from "./scenes/login/Register";

function App() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const mode = useSelector((state) => state.reducer.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // const PublicRoute = ({ element }) => {
  //   return isAuthenticated ? <Navigate to="/dashboard" replace /> : element;
  // };

  // const PrivateRoute = ({ element }) => {

  //   console.log(isAuthenticated);
  //   return isAuthenticated ? element : <Navigate to="/login" replace />;
  // };

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* <Route path="/" element={<PublicRoute element={<Layout />} />}> */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* </Route> */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/add-data-form" element={<AddDataForm />} />
            </Route>
          </Routes>
          {/* <Routes>
            <Route
              path="/login"
              element={<PublicRoute element={<Login />} />}
            />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route
              path="/faculty"
              element={<PrivateRoute element={<Faculty />} />}
            />
            <Route
              path="/admin"
              element={<PrivateRoute element={<Admin />} />}
            />
            <Route
              path="/add-data-form"
              element={<PrivateRoute element={<AddDataForm />} />}
            />
          </Routes> */}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
