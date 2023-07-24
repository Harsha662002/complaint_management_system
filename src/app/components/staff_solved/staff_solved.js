"use client";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/app/contexts/authcontext";
const StaffSolved = () => {
  const [solvedComplaints, setSolvedComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [users, setUsers] = useState({});
  const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);

  const fetchSolvedComplaints = async () => {
    try {
      const response = await fetch("/api/solved", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();

        const filteredComplaints = data.solvedComplaints.filter((complaint) => {
          return complaint.StaffSolved === loggedInUserEmail;
        });

        setSolvedComplaints(filteredComplaints);
      }
    } catch (error) {
      console.error("Error fetching solved complaints", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        const usersMap = {};

        data.users.forEach((user) => {
          usersMap[user.email] = user.name;
        });

        setUsers(usersMap);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint((prevSelectedComplaint) =>
      prevSelectedComplaint?.id === complaint.id ? null : complaint
    );
  };

  useEffect(() => {
    fetchSolvedComplaints();
    fetchUsers();
  }, [loggedInUserEmail]);
  return (
    <div>
      <h2 className="text-center my-4 font-bold text-3xl">SOLVED COMPLAINTS</h2>

      {solvedComplaints.map((complaint) => (
        <div
          key={complaint.id}
          className="w-full bg-gray-100 mb-4 p-4 rounded cursor-pointer"
          onClick={() => handleComplaintClick(complaint)}
        >
          <div className="flex justify-between items-center">
            <div className="font-bold text-black text-xl">
              {complaint.Subject}
            </div>
            <div className="font-medium text-gray-500">{complaint.Type}</div>
          </div>
          {selectedComplaint && selectedComplaint.id === complaint.id && (
            <div className="mt-4">
              <div className="py-1">
                <span className="font-semibold">Name of the Complaintee:</span>{" "}
                {users[selectedComplaint.Email]}
              </div>
              <div className="py-1">
                <span className="font-semibold">Subject: </span>
                {selectedComplaint.Subject}
              </div>
              <div className="py-1">
                <span className="font-semibold">
                  Email of the Complaintee:{" "}
                </span>
                {selectedComplaint.Email}
              </div>
              <div className="py-1">
                <span className="font-semibold">Date of Complaint:</span>{" "}
                {selectedComplaint.ComplaintDate}
              </div>
              <div className="py-1">
                <span className="font-semibold">
                  Type of Complaint: {selectedComplaint.Type}
                </span>
              </div>
              <div className="py-1">
                <span className="font-semibold">
                  Description of Complaint:{" "}
                </span>
                {selectedComplaint.Description}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StaffSolved;
