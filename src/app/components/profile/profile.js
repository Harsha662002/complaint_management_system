"use client";
import React from "react";
import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";

const Profile = (props) => {
  // console.log("Props.data", props.data[0].email);
  const encryptPassword = (password) => {
    return password.replaceAll(/./g, "*");
  };

  const handleRemovePhoto = async () => {
    try {
      const response = await fetch("/api/removephoto", {
        method: "POST",
        body: new FormData().append("email", props.data.email),
      });

      if (response.ok) {
        console.log("Photo removed");
      } else {
        console.log("Photo not removed");
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
            src={props.data.image}
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
              {props.data.name}
            </div>
          </div>
          <div className="w-6 h-6 ml-4">
            <FiEdit2 size={24} />
          </div>
        </div>
        <div className="flex mb-8 items-center">
          <label className="w-28 text-right mr-4 text-2xl font-semibold">
            Username:
          </label>
          <div className="w-72 text-xl ml-2 items-center font-medium text-gray-600">
            <div className="bg-gray-200 w-full h-full px-2 py-1 rounded-md">
              {props.data.username}
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
              {props.data.email}
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
              {props.data.phone}
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
              {encryptPassword(props.data.password)}
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
