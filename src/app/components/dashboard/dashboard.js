"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

const Dashboard = (props) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  Chart.register(CategoryScale);
  const [selectedYear, setSelectedYear] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const filteredData = props.data.filter(
      (item) => getYearFromDate(item.ComplaintDate) === selectedYear
    );
    setChartData(filteredData);
  }, [selectedYear, props.data]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const getYearFromDate = (dateString) => {
    const dateParts = dateString.split("-");
    if (dateParts.length === 3) {
      return dateParts[2];
    }
    return "";
  };

  const newChartData = [];
  const months = {};

  chartData.forEach((item) => {
    const dateParts = item.ComplaintDate.split("-");
    const month = parseInt(dateParts[1]);
    const status = item.Status;

    if (months[month]) {
      months[month][status]++;
    } else {
      months[month] = { month, completed: 0, pending: 0, rejected: 0 };
      months[month][status]++;
    }
  });

  for (const month in months) {
    newChartData.push(months[month]);
  }

  newChartData.sort((a, b) => a.month - b.month);

  const chartLabels = newChartData.map((item) => monthNames[item.month - 1]);
  const chartSolvedData = newChartData.map((item) => item.completed);
  const chartPendingData = newChartData.map((item) => item.pending);
  const chartRejectedData = newChartData.map((item) => item.rejected);

  const chartOptions = {
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

  const chartDataConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: "Solved",
        data: chartSolvedData,
        backgroundColor: "rgba(52, 211, 153, 0.7)",
      },
      {
        label: "Pending",
        data: chartPendingData,
        backgroundColor: "rgba(255, 159, 64, 0.7)",
      },
      {
        label: "Rejected",
        data: chartRejectedData,
        backgroundColor: "rgba(220, 38, 38, 0.7)",
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <div className="flex justify-end mb-4">
        <select
          className="px-2 py-1 border rounded"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">Select Year</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-2/3">
          <div className="flex justify-center items-center h-full">
            <Bar data={chartDataConfig} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
