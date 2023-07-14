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
    handleUpload(file);
  };

  const handleUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const binaryData = reader.result;
        onImageChange(binaryData);
        setIsSuccess(true);
        setUploadMessage("Image uploaded successfully");
      };

      reader.onerror = () => {
        setIsSuccess(false);
        setUploadMessage("Image not uploaded");
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center mb-4">
      {selectedFile && (
        <div className="w-12 h-12 relative mr-4">
          <Image
            src={URL.createObjectURL(selectedFile)}
            alt="Selected File"
            className="object-cover w-full h-full rounded-full"
            layout="fill"
          />
        </div>
      )}
      <div>
        <label
          htmlFor="file-upload"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        >
          {selectedFile ? "Change Photo" : "Upload Photo"}
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        {uploadMessage && (
          <p
            className={`text-sm ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {uploadMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterPic;
