"use client";
import React, { useState, useContext } from "react";
import { AuthContext } from "@/app/contexts/authcontext";

const Complaint = () => {
  const [Subject, setSubject] = useState("");
  const [Type, setType] = useState("");
  const [Description, setDescription] = useState("");
  const { loggedInUserEmail } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000000);
    const currentDate = new Date().toLocaleDateString("en-GB");
    const Email = loggedInUserEmail;

    const formData = {
      id,
      Email,
      ComplaintDate: currentDate,
      Status: "pending",
      Subject,
      Type,
      Description,
    };

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubject("");
        setType("");
        setDescription("");
        alert("Complaint submitted successfully!");
      } else {
        alert("Failed to submit complaint.");
      }
    } catch (error) {
      alert("Error submitting complaint, check console!!");
      console.error("Error submitting complaint:", error);
    }
  };

  return (
    <div className="border p-4 m-4">
      <h2 className="text-2xl font-bold mb-4 sm:text-4xl">
        Enter your Complaint
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="Subject" className="block font-medium">
            Subject*
          </label>
          <input
            type="text"
            id="Subject"
            value={Subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Type" className="block font-medium">
            Type*
          </label>
          <select
            id="Type"
            value={Type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select type of Complaint</option>
            <option value="Sales">Sales</option>
            <option value="Accounting">Accounting</option>
            <option value="IT">IT</option>
            <option value="Misc">Misc</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="Description" className="block font-medium">
            Description*
          </label>
          <textarea
            id="Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            rows="3"
            cols="15"
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Complaint;
