"use client";
import React, { useEffect, useState, useContext, useRef } from "react";
import StaffModal from "../modals/staffModal";
import { AuthContext } from "@/app/contexts/authcontext";

const StaffUnsolved = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [users, setUsers] = useState({});
  const [rejectComment, setRejectComment] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [assignedComplaints, setAssignedComplaints] = useState([]);
  const { loggedInUserEmail } = useContext(AuthContext);

  const [comment, setComment] = useState("");
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const lastSelectedComplaint = useRef(null);

  const fetchAssignedComplaints = async () => {
    try {
      const response = await fetch("/api/assigned", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("assigned Complaints", data.assignedComplaints);
        const filteredComplaints = data.assignedComplaints.filter(
          (complaint) => complaint.EmployeeEmail === loggedInUserEmail
        );

        setAssignedComplaints(filteredComplaints);
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

  const handleSolveClick = (complaint) => {
    // setSelectedComplaint(complaint);
    lastSelectedComplaint.current = complaint;
    setSelectedComplaint(complaint);
    setShowCommentDialog(true);
  };

  const handleCommentSubmit = async () => {
    try {
      // Check if there's a selected complaint
      //if (!selectedComplaint) return;
      // console.log("COMMENT WAS", comment);
      // Send the comment along with other data to the API route
      const response = await fetch("/api/update-assigned", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lastSelectedComplaint.current.id,
          Status: "completed",
          complaint: lastSelectedComplaint.current,
          solvedStaff: loggedInUserEmail,
          comment: comment, // Include the comment in the request body
        }),
      });

      if (response.ok) {
        alert(
          `Complaint Solved for ${users[lastSelectedComplaint.current.Email]}`
        );

        // Remove the solved complaint from the list of assigned complaints
        setAssignedComplaints((prevComplaints) =>
          prevComplaints.filter(
            (c) => c.id !== lastSelectedComplaint.current.id
          )
        );
      } else {
        console.error("Error clicking solve complaint");
      }
    } catch (e) {
      console.error("Failed to solve the complaint", e);
    } finally {
      // Close the comment dialog after submitting
      setShowCommentDialog(false);
      // Clear the comment input
      setComment("");
    }
  };
  // const handleRejectClick = async (complaint) => {
  //   try {
  //     const response = await fetch("/api/update-assigned", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: complaint.id,
  //         Status: "rejected",
  //         complaint: complaint,
  //         solvedStaff: loggedInUserEmail,
  //         comment: comment,
  //       }),
  //     });

  //     if (response.ok) {
  //       alert(`Complaint rejected for ${users[complaint.Email]}`);

  //       setComplaints((prevComplaints) =>
  //         prevComplaints.filter((c) => c.id !== complaint.id)
  //       );
  //     } else {
  //       console.error("Error rejecting complaint");
  //     }
  //   } catch (e) {
  //     alert("Failed to reject the complaint");
  //   }
  // };
  const handleRejectClick = (complaint) => {
    // Store the selected complaint in the ref
    lastSelectedComplaint.current = complaint;
    setShowRejectDialog(true);
  };

  const handleRejectSubmit = async () => {
    try {
      if (!lastSelectedComplaint.current) return;

      const response = await fetch("/api/update-assigned", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lastSelectedComplaint.current.id,
          Status: "rejected",
          complaint: lastSelectedComplaint.current,
          solvedStaff: loggedInUserEmail,
          comment: rejectComment, // Include the reject comment in the request body
        }),
      });

      if (response.ok) {
        alert(
          `Complaint rejected for ${users[lastSelectedComplaint.current.Email]}`
        );

        // Remove the rejected complaint from the list of assigned complaints
        setAssignedComplaints((prevComplaints) =>
          prevComplaints.filter(
            (c) => c.id !== lastSelectedComplaint.current.id
          )
        );
      } else {
        console.error("Error rejecting complaint");
      }
    } catch (e) {
      console.error("Failed to reject the complaint", e);
    } finally {
      // Close the reject comment dialog after submitting
      setShowRejectDialog(false);
      // Clear the reject comment input
      setRejectComment("");
    }
  };

  useEffect(() => {
    fetchAssignedComplaints();
    fetchUsers();
  }, [loggedInUserEmail]);

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint((prevSelectedComplaint) =>
      prevSelectedComplaint?.id === complaint.id ? null : complaint
    );
  };

  return (
    <div>
      <h2 className="text-center my-4 font-bold text-3xl">
        UNSOLVED COMPLAINTS
      </h2>
      {assignedComplaints.map((complaint) => (
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
                  Email of the Complaintee: {selectedComplaint.Email}
                </span>
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
                  onClick={() => handleSolveClick(selectedComplaint)}
                >
                  Solve
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

      {showCommentDialog && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-70 bg-gray-500 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add a Comment</h2>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-gray-400 p-2 mb-4 w-full"
              placeholder="Enter your comment..."
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCommentSubmit}
              >
                Submit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setShowCommentDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
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

export default StaffUnsolved;
