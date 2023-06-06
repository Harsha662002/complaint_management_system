import React from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import Unsolved from "../components/unsolved/unsolved";

const Unsolvedpage = () => {
  var data = [
    {
      id: 1,
      Name: "Harsha",
      Subject: "Har",
      Type: "Sales",
      ComplaintDate: "15-5-23",
      Description: "Test message",
      Status: "pending",
    },
    {
      id: 2,
      Name: "Harsha",
      Subject: "Vik",
      Type: "Accounting",
      ComplaintDate: "16-5-23",
      Description: "Test message2",
      Status: "pending",
    },
    {
      id: 3,
      Name: "Harsha",
      Subject: "Hello",
      Type: "Others",
      ComplaintDate: "18-5-23",
      Description: "Test message3",
      Status: "rejected",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex gap-6 flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="text-xl  w-screen ">
          <Unsolved data={data} />
        </div>
      </div>
    </div>
  );
};

export default Unsolvedpage;
