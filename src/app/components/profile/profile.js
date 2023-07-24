"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";
import { AuthContext } from "@/app/contexts/authcontext";

const Profile = () => {
  const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch("/api/checkCredentials", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const responseData = await response.json();
      // console.log("responseData", responseData);
      const filteredData = responseData.user.find(
        (u) => u.email === loggedInUserEmail
      );
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemovePhoto = async () => {
    try {
      const response = await fetch("/api/removephoto", {
        method: "POST",
        body: new FormData().append("email", data.email),
      });

      if (response.ok) {
        alert("Photo removed");
      } else {
        alert("Photo not removed");
      }
    } catch (error) {
      console.error("Error removing photo:", error);
    }
  };

  return (
    <div className="flex">
      <div className="flex justify-center mt-32 flex-col mx-8 w-42 border-r border-black pr-4">
        <div className="bg-gray-300 w-48 h-48 mb-4">
          <Image
            src={data.image}
            alt="Selected File"
            className="object-cover w-full h-full"
            width={100}
            height={100}
          />
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2">
          Edit Photo
        </button>
        <button
          className="mt-2 bg-red-500 text-white px-4 py-2"
          onClick={handleRemovePhoto}
        >
          Remove Photo
        </button>
      </div>
      <div className="flex flex-col mt-32">
        <div className="flex mb-8 items-center">
          <label className="w-28 text-right mr-4 text-2xl font-semibold">
            Name:
          </label>
          <div className="w-72 text-xl ml-2 items-center font-medium text-gray-600">
            <div className="bg-gray-200 w-full h-full px-2 py-1 rounded-md">
              {data.name}
            </div>
          </div>
          <div className="w-6 h-6 ml-4">
            <FiEdit2 size={24} />
          </div>
        </div>
        <div className="flex mb-8 items-center">
          <label className="w-28 text-right mr-4 text-2xl font-semibold">
            Category:
          </label>
          <div className="w-72 text-xl ml-2 items-center font-medium text-gray-600">
            <div className="bg-gray-200 w-full h-full px-2 py-1 rounded-md">
              {data.category}
            </div>
          </div>
          <div className="w-6 h-6 ml-4">
            <FiEdit2 size={24} />
          </div>
        </div>
        <div className="flex mb-8 items-center">
          <label className="w-28 text-right mr-4 text-2xl font-semibold">
            Email:
          </label>
          <div className="w-72 text-xl ml-2 items-center font-medium text-gray-600">
            <div className="bg-gray-200 w-full h-full px-2 py-1 rounded-md">
              {data.email}
            </div>
          </div>
          <div className="w-6 h-6 ml-4">
            <FiEdit2 size={24} />
          </div>
        </div>
        <div className="flex mb-8 items-center">
          <label className="w-28 text-right mr-4 text-2xl font-semibold">
            Phone:
          </label>
          <div className="w-72 text-xl ml-2 items-center font-medium text-gray-600">
            <div className="bg-gray-200 w-full h-full px-2 py-1 rounded-md">
              {data.phone}
            </div>
          </div>
          <div className="w-6 h-6 ml-4">
            <FiEdit2 size={24} />
          </div>
        </div>
        <div className="flex items-center">
          <label className="w-28 text-right mr-4 text-2xl font-semibold">
            Password:
          </label>
          <div className="w-72 text-xl ml-2 items-center font-medium text-gray-600">
            <div className="bg-gray-200 w-full h-full px-2 py-1 rounded-md">
              ******
            </div>
          </div>
          <div className="w-6 h-6 ml-4">
            <FiEdit2 size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
