"use client";
import React, { useState } from "react";
import Complaintmodal from "../modals/complaintModal";

const Solved = (props) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleModalWindow = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleCloseModal = () => {
    setSelectedComplaint(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "pending":
        return "bg-orange-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "";
    }
  };
  return (
    <div>
      <h2 className="mt-8 font-semibold text-2xl sm:text-4xl">
        Solved Complaints
      </h2>
      <table className="mt-8 w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="hidden text-center sm:table-cell border p-2 border-solid border-black">
              ID
            </th>
            <th className="text-center border p-2 border-solid border-black">
              Subject
            </th>
            <th className="hidden text-center md:table-cell border p-2 border-solid border-black">
              Type
            </th>
            <th className="hidden text-center md:table-cell border p-2 border-solid border-black">
              Complaint Date
            </th>
            <th className="text-center border p-2 border-solid border-black">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data
            .filter((complaint) => complaint.Status === "completed")
            .map((complaint) => (
              <tr
                key={complaint.id}
                className={`hover:bg-gray-100 ${
                  selectedRow === complaint.id ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedRow(complaint.id)}
              >
                {/* Render the table cells for the filtered data */}
                <td className="hidden text-center sm:table-cell border p-2 border-solid border-black">
                  {complaint.id}
                </td>

                <td className="text-center border p-2 border-solid border-black">
                  {complaint.subject}
                </td>
                <td className="hidden text-center md:table-cell border p-2 border-solid border-black">
                  {complaint.type}
                </td>
                <td className="hidden text-center md:table-cell border p-2 border-solid border-black">
                  {complaint.ComplaintDate}
                </td>
                <td className="text-center border p-2 border-solid border-black">
                  <button
                    className="text-black"
                    style={{ textDecoration: "none" }}
                    onClick={() => handleModalWindow(complaint)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedComplaint && (
        <Complaintmodal
          complaint={selectedComplaint}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Solved;
