import { Box, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { useAdminLoginQuery } from "../../state/api";

function Layout() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // reduxjs-toolkit
  const { data } = useAdminLoginQuery(localStorage.getItem("adminId"));
    
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <SideBar
        admin={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          admin={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
