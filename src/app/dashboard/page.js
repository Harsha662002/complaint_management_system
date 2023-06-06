import React from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import Dashboard from "../components/dashboard/dashboard";

const DashboardPage = () => {
  var data = [
    {
      id: 1,
      Name: "Harsha",
      Subject: "Har",
      Type: "Sales",
      ComplaintDate: "15-05-2023",
      Description: "Test message",
      Status: "rejected",
    },
    {
      id: 2,
      Name: "Harsha",
      Subject: "Vik",
      Type: "Accounting",
      ComplaintDate: "16-05-2023",
      Description: "Test message2",
      Status: "completed",
    },
    {
      id: 3,
      Name: "Harsha",
      Subject: "Hello",
      Type: "Others",
      ComplaintDate: "18-05-2023",
      Description: "Test message3",
      Status: "completed",
    },
    {
      id: 4,
      Name: "Harsha",
      Subject: "Hello",
      Type: "Others",
      ComplaintDate: "18-06-2023",
      Description: "Test message3",
      Status: "pending",
    },
    {
      id: 5,
      Name: "Harsha",
      Subject: "Hello",
      Type: "Others",
      ComplaintDate: "18-06-2023",
      Description: "Test message3",
      Status: "completed",
    },
    {
      id: 6,
      Name: "Harsha",
      Subject: "Hello",
      Type: "Others",
      ComplaintDate: "18-04-2023",
      Description: "Test message3",
      Status: "completed",
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="flex gap-6 flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="text-xl w-screen h-1/2">
          <Dashboard data={data} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
