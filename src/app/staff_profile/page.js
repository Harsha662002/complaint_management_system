"use client";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import { AuthContext } from "@/app/contexts/authcontext";
import Sidebar from "../components/sidebar/sidebar";
import StaffProfile from "../components/staff_profile/staff_profile";

const StaffProfilePage = () => {
  const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="flex gap-6 flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="text-xl w-screen h-1/2">
          <StaffProfile />
        </div>
      </div>
    </div>
  );
};

export default StaffProfilePage;
