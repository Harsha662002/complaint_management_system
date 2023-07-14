"use client";
import React, { useEffect, useState } from "react";
import classNames from "classnames";

const AdminDashboard = () => {
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [solvedComplaints, setSolvedComplaints] = useState(0);
  const [unsolvedComplaints, setUnsolvedComplaints] = useState(0);
  const [totalSelectedComplaints, setTotalSelectedComplaints] = useState(0);
  const [solvedSelectedComplaints, setSolvedSelectedComplaints] = useState(0);
  const [unsolvedSelectedComplaints, setUnsolvedSelectedComplaints] =
    useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const dropdownClass = classNames(
    "border border-black rounded px-4 py-1 text-center text-gray-700 font-bold appearance-none",
    {
      "bg-gradient-to-r from-blue-300 to-blue-500": isOpen,
      "bg-white": !isOpen,
    }
  );

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/complaints", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        const complaints = data.complaints;
        console.log("complaints", complaints);

        setUnsolvedComplaints(complaints.length);

        const totalSelectedComplaints = complaints.filter(
          (complaint) => complaint.Type === selectedType
        );
        console.log("totalSelectedComplaints", totalSelectedComplaints);
        setUnsolvedSelectedComplaints(totalSelectedComplaints.length);
      }
    } catch (error) {
      console.error("Error fetching complaints", error);
    }

    try {
      const response = await fetch("/api/solved", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        const solvedComplaints = data.solvedComplaints;
        console.log("solvedComplaints", solvedComplaints);
        setSolvedComplaints(solvedComplaints.length);

        const totalSelectedsolvedComplaints = solvedComplaints.filter(
          (complaint) => complaint.Type === selectedType
        );
        console.log("totalSelectedComplaints", totalSelectedsolvedComplaints);

        setSolvedSelectedComplaints(totalSelectedsolvedComplaints.length);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchComplaints();
  }, [selectedType]);

  return (
    <div>
      <div className="flex justify-between mt-10">
        <div className="w-1/3 text-center">
          <h2 className="text-3xl font-bold mb-8">Total Complaints</h2>
          <div
            className="text-7xl font-bold counter text-blue-500"
            data-target={totalComplaints}
          >
            {totalComplaints}
          </div>
        </div>
        <div className="w-1/3 text-center">
          <h2 className="text-3xl font-bold mb-8">Solved Complaints</h2>
          <div
            className="text-7xl font-bold counter text-blue-500"
            data-target={solvedComplaints}
          >
            {solvedComplaints}
          </div>
        </div>
        <div className="w-1/3 text-center">
          <h2 className="text-3xl font-bold mb-8">Unsolved Complaints</h2>
          <div
            className="text-7xl font-bold counter text-blue-500"
            data-target={unsolvedComplaints}
          >
            {unsolvedComplaints}
          </div>
        </div>
      </div>
      <div className="flex items-center mt-16">
        <hr className="w-1/6 border-t-2 border-blue-300 mt-1" />
        <span className="px-4 text-4xl text-blue-700 font-semibold flex items-center">
          STATISTICS
        </span>
        <hr className="flex-grow border-t-2 border-blue-300" />
      </div>
      <div className="flex items-center justify-end mt-4 pr-4">
        <select
          className={dropdownClass}
          onClick={handleDropdownClick}
          onBlur={() => setIsOpen(false)}
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">Choose</option>
          <option value="Sales">Sales</option>
          <option value="IT">IT</option>
          <option value="Accounting">Accounting</option>
          <option value="Misc">Misc</option>
        </select>
      </div>
      <div className="flex justify-between mt-10">
        <div className="w-1/3 text-center">
          <h2 className="text-3xl font-bold mb-8">Total Complaints</h2>
          <div
            className="text-7xl font-bold counter text-blue-500"
            data-target={totalSelectedComplaints}
          >
            {totalSelectedComplaints}
          </div>
        </div>
        <div className="w-1/3 text-center">
          <h2 className="text-3xl font-bold mb-8">Solved Complaints</h2>
          <div
            className="text-7xl font-bold counter text-blue-500"
            data-target={solvedSelectedComplaints}
          >
            {solvedSelectedComplaints}
          </div>
        </div>
        <div className="w-1/3 text-center">
          <h2 className="text-3xl font-bold mb-8">Unsolved Complaints</h2>
          <div
            className="text-7xl font-bold counter text-blue-500"
            data-target={unsolvedSelectedComplaints}
          >
            {unsolvedSelectedComplaints}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
