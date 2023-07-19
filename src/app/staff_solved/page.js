"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { AuthContext } from "@/app/contexts/authcontext";
import StaffSolved from "../components/staff_solved/staff_solved";

const StaffSolvedPage = () => {
  const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="flex gap-6 flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="text-xl w-screen h-1/2">
          <StaffSolved />
        </div>
      </div>
    </div>
  );
};

export default StaffSolvedPage;
