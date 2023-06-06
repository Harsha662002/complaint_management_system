import React from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import Solved from "../components/solved/solved";

const Solvedpage = () => {
  var data = [
    {
      id: 1,
      Name: "Harsha",
      Subject: "Har",
      Type: "Sales",
      ComplaintDate: "15-05-23",
      Description: "Test message",
      Status: "completed",
    },
    {
      id: 2,
      Name: "Harsha",
      Subject: "Vik",
      Type: "Accounting",
      ComplaintDate: "16-05-23",
      Description: "Test message2",
      Status: "completed",
    },
    {
      id: 3,
      Name: "Harsha",
      Subject: "Hello",
      Type: "Others",
      ComplaintDate: "18-05-23",
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
        <div className="text-xl  w-screen ">
          <Solved data={data} />
        </div>
      </div>
    </div>
  );
};

export default Solvedpage;
