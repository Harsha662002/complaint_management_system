"use client";
import React, { useState } from "react";
import Complaintmodal from "../modals/complaintModal";

const Unsolved = (props) => {
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
        Unsolved Complaints
      </h2>
      <table className="mt-8 w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="hidden text-center sm:table-cell border p-2 border-solid border-black">
              ID
            </th>
            <th className="hidden text-center sm:table-cell border p-2 border-solid border-black">
              Name
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
            <th className="text-center border p-2 border-solid border-black">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((complaint) => (
            <tr
              key={complaint.id}
              className={`hover:bg-gray-100 ${
                selectedRow === complaint.id ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedRow(complaint.id)}
            >
              <td className="hidden text-center sm:table-cell border p-2 border-solid border-black">
                {complaint.id}
              </td>
              <td className="hidden text-center sm:table-cell border p-2 border-solid border-black">
                {complaint.Name}
              </td>
              <td className="text-center border p-2 border-solid border-black">
                {complaint.Subject}
              </td>
              <td className="hidden text-center md:table-cell border p-2 border-solid border-black">
                {complaint.Type}
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
              <td className="flex justify-center border p-2 border-solid border-black">
                <div
                  className={`w-full ${
                    !selectedRow ? "h-16 md:h-16  lg:h-8" : "h-8"
                  }  text-center  ${getStatusColor(complaint.Status)}`}
                ></div>
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

export default Unsolved;
