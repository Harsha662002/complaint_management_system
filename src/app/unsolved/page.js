"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import Unsolved from "../components/unsolved/unsolved";
import { AuthContext } from "@/app/contexts/authcontext";

const Unsolvedpage = () => {
  const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const complaintsResponse = await fetch("/api/complaints", {
        method: "GET",
      });
      if (!complaintsResponse.ok) {
        throw new Error("Error fetching complaints");
      }
      const complaintsData = await complaintsResponse.json();
      console.log(complaintsData);

      const assignedResponse = await fetch("/api/assigned", {
        method: "GET",
      });
      if (!assignedResponse.ok) {
        throw new Error("Error fetching assigned complaints");
      }
      const assignedData = await assignedResponse.json();
      console.log("assigned data", assignedData.assignedComplaints);

      const combinedData = [
        ...complaintsData.complaints,
        ...assignedData.assignedComplaints,
      ];
      const filteredData = combinedData.filter(
        (complaint) => complaint.Email === loggedInUserEmail
      );

      console.log("filtered", filteredData);
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
        <div className="text-xl  w-screen ">
          <Unsolved data={data} />
        </div>
      </div>
    </div>
  );
};

export default Unsolvedpage;
