"use client";
import React, { useState, useContext } from "react";
import { AuthContext } from "@/app/contexts/authcontext";

const Complaint = () => {
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
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
      subject,
      type,
      description,
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
        console.log("Complaint submitted successfully!");
      } else {
        console.error("Failed to submit complaint.");
      }
    } catch (error) {
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
          <label htmlFor="subject" className="block font-medium">
            Subject*
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block font-medium">
            Type*
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select type of Complaint</option>
            <option value="Sales">Sales</option>
            <option value="Accounting">Accounting</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">
            Description*
          </label>
          <textarea
            id="description"
            value={description}
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
