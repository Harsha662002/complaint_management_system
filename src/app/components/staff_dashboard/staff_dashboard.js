"use client";
import React, { useEffect, useState, useContext } from "react";
import classNames from "classnames";
import { AuthContext } from "@/app/contexts/authcontext";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

const StaffDashboard = () => {
  const [totalComplaints, setTotalComplaints] = useState({});
  const [solvedComplaints, setSolvedComplaints] = useState({});
  const [unsolvedComplaints, setUnsolvedComplaints] = useState({});
  const { loggedInUserEmail } = useContext(AuthContext);
  const [selectedYear, setSelectedYear] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [chartData, setChartData] = useState([]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  Chart.register(CategoryScale);

  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/assigned", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        const complaints = data.assignedComplaints;

        const filteredComplaints = complaints.filter((complaint) => {
          return complaint.EmployeeEmail === loggedInUserEmail;
        });
        // console.log("filtered Complaints", filteredComplaints);

        setUnsolvedComplaints(filteredComplaints);
      }
    } catch (error) {
      console.error("Error fetching complaints", error);
    }
  };

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

  const dropdownClass = classNames(
    "border border-black rounded px-4 py-1 text-center text-gray-700 font-bold appearance-none",
    {
      "bg-gradient-to-r from-blue-300 to-blue-500": isOpen,
      "bg-white": !isOpen,
    }
  );

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    fetchComplaints();
    fetchSolvedComplaints();
    const combinedComplaints = { ...solvedComplaints, ...unsolvedComplaints };
    setTotalComplaints(combinedComplaints);
    console.log("Totla", totalComplaints);
  }, []);

  useEffect(() => {
    if (!selectedYear) return;

    const assignedComplaintsData = new Array(12).fill(0);
    unsolvedComplaints.forEach((complaint) => {
      const [day, month, year] = complaint.ComplaintDate.split("/");
      if (year === selectedYear) {
        assignedComplaintsData[parseInt(month, 10) - 1]++;
      }
    });

    const solvedComplaintsData = new Array(12).fill(0);
    solvedComplaints.forEach((complaint) => {
      const [day, month, year] = complaint.ComplaintDate.split("/");
      if (year === selectedYear) {
        solvedComplaintsData[parseInt(month, 10) - 1]++;
      }
    });

    const totalComplaintsData = assignedComplaintsData.map(
      (value, index) => value + solvedComplaintsData[index]
    );
    setChartData({
      assigned: assignedComplaintsData,
      solved: solvedComplaintsData,
      total: totalComplaintsData,
    });
  }, [selectedYear]);

  const barChartData = {
    labels: monthNames,
    datasets: [
      {
        label: "Total Complaints Raised",
        data: chartData.total,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Complaints Solved",
        data: chartData.solved,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [2, 4],
        },
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-24">
      <div className="flex flex-col md:flex-row justify-between mt-10">
        <div className="w-full md:w-1/3 text-center mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-8">Total Complaints</h2>
          <div
            className="text-5xl md:text-7xl font-bold counter text-blue-500"
            data-target={totalComplaints}
          >
            {solvedComplaints.length + unsolvedComplaints.length}
          </div>
        </div>
        <div className="w-full md:w-1/3 text-center mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-8">Solved Complaints</h2>
          <div
            className="text-5xl md:text-7xl font-bold counter text-blue-500"
            data-target={solvedComplaints}
          >
            {solvedComplaints.length}
          </div>
        </div>
        <div className="w-full md:w-1/3 text-center">
          <h2 className="text-3xl font-bold mb-8">Unsolved Complaints</h2>
          <div
            className="text-5xl md:text-7xl font-bold counter text-blue-500"
            data-target={unsolvedComplaints}
          >
            {unsolvedComplaints.length}
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
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">Choose</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="flex justify-center items-center h-96 md:h-80">
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
