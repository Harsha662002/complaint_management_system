"use client";
import React, { useState } from "react";
import RegisterPic from "./registerpic";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [imageData, setImageData] = useState("");

  const handleImageChange = (binaryData) => {
    setImageData(binaryData);
  };

  const validateEmail = async () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
    }
  };

  const validatePhone = () => {
    if (!phone) {
      setPhoneError("Phone number is required");
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Phone number should contain 10 digits");
    } else {
      setPhoneError("");
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return regex.test(password);
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateEmail();
    validatePhone();
    validatePassword();
    validateConfirmPassword();

    if (!emailError && !phoneError && !passwordError && !confirmPasswordError) {
      try {
        try {
          const response = await fetch(
            "http://localhost:3000/api/check-email",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, category }),
            }
          );

          const data = await response.json();
          if (response.ok && data) {
            alert("Email already Exists!!!");
            setName("");
            setEmail("");
            setPhone("");
            setCategory("");
            setPassword("");
            setConfirmPassword("");
            return;
          } else {
            setEmailError("");
          }
        } catch (error) {
          console.log("Error occurred while checking email uniqueness:", error);
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("category", category);
        formData.append("password", password);

        formData.append("image", imageData || "1");

        const response = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          //console.log("User created successfully");

          setName("");
          setEmail("");
          setPhone("");
          setCategory("");
          setPassword("");
          setConfirmPassword("");

          alert("User Created Successfully!!!");
          router.push("/login");
        } else {
          console.log("Error occurred while creating user");
        }
      } catch (error) {
        alert("User Not Created");
        console.log("Error occurred while creating user:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <svg
        className="absolute top-0"
        viewBox="0 0 1000 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: "rotateX(180deg) rotateY(180deg)",
        }}
      >
        <path d="M0 0A100 100 0 0 1 100 100H0V0Z" fill="#3490DC" />
      </svg>

      <svg
        className="absolute bottom-0"
        viewBox="0 0 1000 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0A100 100 0 0 1 100 100H0V0Z" fill="#3490DC" />
      </svg>
      <div
        className="bg-white w-full md:w-3/4 p-8 rounded-lg shadow-lg flex flex-col md:flex-row"
        style={{ zIndex: 999 }}
      >
        <div className="w-full md:w-1/2 flex justify-center items-center border md:border-0">
          <div className="flex flex-col items-center justify-center mb-8">
            <h2 className="text-3xl text-center text-blue-500 font-semibold mb-4">
              Hello! Welcome to Complaino!!
            </h2>
            <h4 className="text-lg text-center">
              {'"Complaints are opportunities to improve" - Unknown'}
            </h4>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center pl-4 pr-4">
          <div>
            <h2 className="text-3xl text-blue-700 font-bold text-center mb-8">
              REGISTER NOW
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                  <label className="block mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full border rounded px-4 py-2 ${
                      nameError ? "border-red-500" : "border-gray-300"
                    }`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {nameError && (
                    <p className="text-red-500 text-sm">{nameError}</p>
                  )}
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full border rounded px-4 py-2 ${
                      emailError ? "border-red-500" : "border-gray-300"
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validateEmail}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                  <label className="block mb-2" htmlFor="phone">
                    Phone number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className={`w-full border rounded px-4 py-2 ${
                      phoneError ? "border-red-500" : "border-gray-300"
                    }`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={validatePhone}
                  />
                  {phoneError && (
                    <p className="text-red-500 text-sm">{phoneError}</p>
                  )}
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block mb-2" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    className="w-full border rounded px-4 py-2 border-gray-300"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    <option value="Student">Student</option>
                    <option value="Sales">Sales</option>
                    <option value="Accounting">Accounting</option>
                    <option value="IT">IT</option>
                    <option value="Misc">Miscellaneous</option>
                  </select>
                </div>
              </div>
              <div className="flex mb-8">
                <div className="w-1/2 pr-2">
                  <label className="block mb-2" htmlFor="password">
                    Enter Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`w-full border rounded px-4 py-2 ${
                      passwordError ? "border-red-500" : "border-gray-300"
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => validatePassword(password)}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`w-full border rounded px-4 py-2 ${
                      confirmPasswordError
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={validateConfirmPassword}
                  />
                  {confirmPasswordError && (
                    <p className="text-red-500 text-sm">
                      {confirmPasswordError}
                    </p>
                  )}
                </div>
              </div>
              <RegisterPic onImageChange={handleImageChange} />
              <div className="flex justify-center mt-8 ">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
