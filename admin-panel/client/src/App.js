import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./scenes/layout/layout";
import Dashboard from "./scenes/dashboard/Dashboard";
import Admin from "./scenes/admin/Admin";
import Login from "./scenes/login/Login";
import Faculty from "./scenes/faculty/Faculty";
import AddDataForm from "./scenes/faculty/AddDataForm";
import Register from "./scenes/login/Register";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/add-data-form" exact element={<AddDataForm />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
