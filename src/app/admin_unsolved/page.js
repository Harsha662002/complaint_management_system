"use client";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { AuthContext } from "@/app/contexts/authcontext";
import AdminUnsolved from "../components/admin_unsolved/admin_unsolved";

const AdminUnsolvedPage = () => {
  const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);
  return (
    <div className="overflow-y-hidden">
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="flex gap-6 flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="text-xl w-screen">
          <AdminUnsolved />
        </div>
      </div>
    </div>
  );
};

export default AdminUnsolvedPage;
