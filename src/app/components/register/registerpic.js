"use client";

import React, { useState } from "react";
import Image from "next/image";

const RegisterPic = ({ onImageChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const binaryData = reader.result;
        onImageChange(binaryData);
        setIsSuccess(true);
        setUploadMessage("Photo uploaded successfully");
      };

      reader.onerror = () => {
        setIsSuccess(false);
        setUploadMessage("Photo not uploaded");
      };

      reader.readAsDataURL(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <div className="w-1/2 flex flex-col items-center justify-center mb-64">
      <div className="bg-gray-300 w-48 h-48 rounded-full mb-4">
        {selectedFile && (
          <Image
            src={URL.createObjectURL(selectedFile)}
            alt="Selected File"
            className="object-cover w-full h-full rounded-full"
            width={80}
            height={80}
          />
        )}
      </div>
      <label
        htmlFor="file-upload"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
      >
        {selectedFile ? "Change Pic" : "Upload Pic"}
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <button
          className="inline-block text-white px-4 py-2 font-semibold border border-black rounded-md mt-4"
          onClick={handleUpload}
        >
          Upload
        </button>
      )}
      {uploadMessage && (
        <p
          className={`mt-2 text-sm ${
            isSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          {uploadMessage}
        </p>
      )}
    </div>
  );
};

export default RegisterPic;
