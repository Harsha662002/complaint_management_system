import React, { useEffect } from "react";

const Complaintmodal = (props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Complaint Details</h3>
          <p>ID: {props.complaint.id}</p>
          <p>Name: {props.complaint.Name}</p>
          <p>Subject: {props.complaint.Subject}</p>
          <p>Type: {props.complaint.Type}</p>
          <p>ComplaintDate: {props.complaint.ComplaintDate}</p>
          <p>Description: {props.complaint.Description}</p>
          <div className="mt-6">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
              onClick={props.onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    //create a separate page for this for mobile view
  );
};

export default Complaintmodal;
