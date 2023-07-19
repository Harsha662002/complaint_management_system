"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import Dashboard from "../components/dashboard/dashboard";
import { AuthContext } from "@/app/contexts/authcontext";

const DashboardPage = () => {
  const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [unsolved, setUnsolved] = useState([]);
  const [assinged, setAssigned] = useState([]);
  const [solved, setSolved] = useState([]);

  useEffect(() => {
    fetchData();
    fetchAssignedData();
    fetchSolvedData();
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
      setUnsolved(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAssignedData = async () => {
    try {
      const response = await fetch("/api/assigned", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error fetching datad");
      }
      const responseData = await response.json();
      console.log(responseData);
      const filteredData = responseData.assignedComplaints.filter(
        (complaint) => complaint.Email === loggedInUserEmail
      );
      setAssigned(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSolvedData = async () => {
    try {
      const response = await fetch("/api/solved", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error fetching datad");
      }
      const responseData = await response.json();
      console.log(responseData);
      const filteredData = responseData.solvedComplaints.filter(
        (complaint) => complaint.Email === loggedInUserEmail
      );
      setSolved(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //setData([...solved, ...assinged, ...unsolved]);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="flex gap-6 flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="text-xl w-screen h-1/2">
          <Dashboard data={[...solved, ...assinged, ...unsolved]} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
