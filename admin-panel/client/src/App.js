import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import React, {  useMemo } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./scenes/layout/layout";
import Dashboard from "./scenes/dashboard/Dashboard";
import Admin from "./scenes/admin/Admin";
import Login from "./scenes/login/Login";
import Faculty from "./scenes/faculty/Faculty";
import AddDataForm from "./scenes/faculty/AddDataForm";
import Register from "./scenes/login/Register";
import { PrivateRoute } from "./components/PrivateRoute";

 
function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Layout />}>
              {/* <Route path="/" element={<Navigate to="/login" replace />} /> ; */}

              <Route path="/dashboard"  element={<PrivateRoute element={<Dashboard />} />}/>
              <Route path="/faculty" element={<PrivateRoute element={<Faculty />} />}/>
              <Route path="/admin" element={<PrivateRoute element={<Admin />} />}/>
              <Route
                path="/add-data-form"
                exact
                element={<PrivateRoute element={<AddDataForm />}/>}/>
              
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
