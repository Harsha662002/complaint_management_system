"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import Solved from "../components/solved/solved";
import { AuthContext } from "@/app/contexts/authcontext";

const Solvedpage = () => {
  const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/solved", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const responseData = await response.json();
      console.log("response Data", responseData.solvedComplaints);
      const filteredData = responseData.solvedComplaints.filter(
        (complaint) => complaint.Email === loggedInUserEmail
      );
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log("DATA", data);
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="flex gap-6 flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="text-xl  w-screen ">
          <Solved data={data} />
        </div>
      </div>
    </div>
  );
};

export default Solvedpage;
