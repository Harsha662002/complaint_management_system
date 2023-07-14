"use client";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { AuthContext } from "@/app/contexts/authcontext";
import Assigned from "../components/assigned/assigned";

const AssignedPage = () => {
  const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);
  return (
    <div className="overflow-y-hidden">
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="flex gap-6 flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="text-xl w-screen">
          <Assigned />
        </div>
      </div>
    </div>
  );
};

export default AssignedPage;
