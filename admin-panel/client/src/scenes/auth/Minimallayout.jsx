import React from "react";
import { Outlet } from "react-router-dom";

const Minimallayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Minimallayout;
