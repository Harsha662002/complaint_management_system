"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { AuthContext } from "@/app/contexts/authcontext";
import StaffDashboard from "../components/staff_dashboard/staff_dashboard";

const StaffDashboardPage = () => {
  const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="flex gap-6 flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="text-xl w-screen h-1/2">
          <StaffDashboard />
        </div>
      </div>
    </div>
  );
};

export default StaffDashboardPage;
