"use client";
import React from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import Complaint from "../components/complaints/complaint";

const ComplaintPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex gap-6">
        <div>
          <Sidebar />
        </div>
        <div className="m-3 text-xl  w-screen overflow-hidden">
          <Complaint />
        </div>
      </div>
    </div>
  );
};

export default ComplaintPage;
