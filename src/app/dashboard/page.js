"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import Dashboard from "../components/dashboard/dashboard";
import { AuthContext } from "@/app/contexts/authcontext";

const DashboardPage = () => {
  const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/complaints", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error fetching datad");
      }
      const responseData = await response.json();
      console.log(responseData);
      const filteredData = responseData.complaints.filter(
        (complaint) => complaint.Email === loggedInUserEmail
      );
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="flex gap-6 flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="text-xl w-screen h-1/2">
          <Dashboard data={data} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
