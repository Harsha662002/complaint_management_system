"use client";
import React, { useEffect, useState } from "react";

const StaffModal = (props) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await fetch("/api/staff", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        const filteredStaffList = data.users.filter(
          (employee) => employee.category === props.complaint.Type
        );
        setStaffList(filteredStaffList);
      }
    } catch (error) {
      console.error("Error fetching staff list", error);
    }
  };

  useEffect(() => {
    fetchStaffList();
  }, []);

  const handleModalClose = () => {
    setSelectedEmployee(null);
    props.onClose();
  };

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      handleModalClose();
    }
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleAssignClick = async () => {
    if (selectedEmployee) {
      try {
        const response = await fetch("/api/staff", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            complaint: props.complaint,
            selectedEmployee,
          }),
        });

        if (response.ok) {
          alert(`Complaint assigned to ${selectedEmployee.name}`);
        } else {
          console.error("Error assigning complaint to staff");
        }
      } catch (error) {
        console.error("Error assigning complaint to staff", error);
      }
    }
    props.onClose();
  };

  // console.log("Stafflist", staffList);
  // console.log("currentType", props.complaint);
  console.log("selected", selectedEmployee);

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75"
      onClick={handleModalClick}
    >
      <div className="bg-white rounded p-4">
        <h3 className="text-xl font-bold mb-4">Available Employees</h3>
        <ul className="divide-y divide-gray-300">
          {staffList.length > 0 ? (
            staffList.map((employee) => (
              <li
                key={employee.id}
                className={`cursor-pointer ${
                  selectedEmployee && selectedEmployee.id === employee.id
                    ? "bg-gray-200"
                    : ""
                }`}
                onClick={() => handleEmployeeClick(employee)}
              >
                {employee.name}
              </li>
            ))
          ) : (
            <li>None available</li>
          )}
        </ul>
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
            onClick={handleModalClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white rounded px-4 py-2"
            disabled={!selectedEmployee || staffList.length === 0}
            onClick={handleAssignClick}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffModal;
