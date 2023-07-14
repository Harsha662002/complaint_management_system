"use client";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import AdminDashboard from "../components/admin_dashboard/admin_dashboard";
import { AuthContext } from "@/app/contexts/authcontext";

const AdminDashboardPage = () => {
  const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);
  return (
    <div className="overflow-y-hidden">
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="flex gap-6 flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="text-xl w-screen">
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
