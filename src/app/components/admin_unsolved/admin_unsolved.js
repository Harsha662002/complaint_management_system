"use client";
import React, { useEffect, useState, useContext, useRef } from "react";
import StaffModal from "../modals/staffModal";
import { AuthContext } from "@/app/contexts/authcontext";
const AdminUnsolved = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [users, setUsers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [assignedComplaints, setAssignedComplaints] = useState([]);
  const { loggedInUserEmail } = useContext(AuthContext);
  const [rejectComment, setRejectComment] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const lastSelectedComplaint = useRef(null);

  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/complaints", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        const pendingComplaints = data.complaints.filter(
          (complaint) => complaint.Status === "pending"
        );
        setComplaints(pendingComplaints);
      }
    } catch (error) {
      console.error("Error fetching complaints", error);
    }
  };

  const fetchAssignedComplaints = async () => {
    try {
      const response = await fetch("/api/assigned", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        //console.log("assigned data", data.assignedComplaints);
        setAssignedComplaints(data.assignedComplaints);
      }
    } catch (error) {
      console.error("Error fetching assigned complaints", error);
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

  const handleRejectClick = (complaint) => {
    // Store the selected complaint in the ref
    lastSelectedComplaint.current = complaint;
    setShowRejectDialog(true);
  };
  const handleRejectSubmit = async () => {
    try {
      if (!lastSelectedComplaint.current) return;

      const response = await fetch("/api/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lastSelectedComplaint.current.id,
          Status: "rejected",
          complaint: lastSelectedComplaint.current,
          solvedStaff: loggedInUserEmail,
          comment: rejectComment,
        }),
      });

      if (response.ok) {
        alert(
          `Complaint rejected for ${users[lastSelectedComplaint.current.Email]}`
        );

        setComplaints((prevComplaints) =>
          prevComplaints.filter(
            (c) => c.id !== lastSelectedComplaint.current.id
          )
        );
      } else {
        console.error("Error rejecting complaint");
      }
    } catch (error) {
      console.error("Error rejecting complaint", error);
    } finally {
      // Close the reject comment dialog after submitting
      setShowRejectDialog(false);
      // Clear the reject comment input
      setRejectComment("");
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchAssignedComplaints();
    fetchUsers();
  }, []);

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint((prevSelectedComplaint) =>
      prevSelectedComplaint?.id === complaint.id ? null : complaint
    );
  };

  const handleAssignClick = (complaintType) => {
    setIsModalOpen(true);
    setCurrentType(complaintType);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Filter out assigned complaints from the fetched complaints
  const filteredComplaints = complaints.filter(
    (complaint) =>
      !assignedComplaints.find((assigned) => assigned.id === complaint._id)
  );

  //console.log("filteredComplaints", filteredComplaints);

  return (
    <div>
      <h2 className="text-center my-4 font-bold text-3xl">
        UNSOLVED COMPLAINTS
      </h2>
      {complaints.map((complaint) => (
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
              <div className="flex justify-end mt-4 mr-2">
                <button
                  className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
                  onClick={() => handleAssignClick(selectedComplaint)}
                >
                  Assign
                </button>
                <button
                  className="bg-red-500 text-white rounded px-4 py-2"
                  onClick={() => handleRejectClick(selectedComplaint)}
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      {isModalOpen && (
        <StaffModal complaint={currentType} onClose={handleModalClose} />
      )}
      {showRejectDialog && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-70 bg-gray-500 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Reject Comment</h2>
            <input
              type="text"
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              className="border border-gray-400 p-2 mb-4 w-full"
              placeholder="Enter your comment..."
            />
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleRejectSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowRejectDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUnsolved;
