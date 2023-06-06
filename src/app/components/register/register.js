"use client";
import React, { useState } from "react";
import RegisterPic from "./registerpic";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [imageData, setImageData] = useState("");

  const handleImageChange = (binaryData) => {
    setImageData(binaryData);
  };
  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError("");
    }
  };

  const validateUsername = () => {
    const hasUpperCase = /[A-Z]/.test(username);
    const hasSpecialChar = /[!@#$&*]/.test(username);
    const hasNumber = /[0-9]/.test(username);

    if (!hasUpperCase || !hasSpecialChar || !hasNumber) {
      setUsernameError(
        "Username must contain at least 1 capital letter, 1 special character, and 1 number."
      );
    } else {
      setUsernameError("");
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
    validateUsername();
    validatePhone();
    validatePassword();
    validateConfirmPassword();

    if (
      !emailError &&
      !usernameError &&
      !phoneError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);

        formData.append("image", imageData || "1");

        const response = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("User created successfully");

          setName("");
          setUsername("");
          setEmail("");
          setPhone("");
          setPassword("");
          setConfirmPassword("");

          router.push("/login");
        } else {
          console.log("Error occurred while creating user");
        }
      } catch (error) {
        console.log("Error occurred while creating user:", error);
      }
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="flex flex-col items-center bg-gray-200 p-8 rounded-lg w-full max-w-screen-2xl mx-4">
        <div className="flex w-full">
          <div className="w-1/2 pr-4">
            <h2 className="text-2xl font-semibold mb-4">Register</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
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
              <div>
                <label className="block mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className={`w-full border rounded px-4 py-2 ${
                    usernameError ? "border-red-500" : "border-gray-300"
                  }`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={validateUsername}
                />
                {usernameError && (
                  <p className="text-red-500 text-sm">{usernameError}</p>
                )}
              </div>
              <div>
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
              <div>
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
              <div>
                <label className="block mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={`w-full border rounded px-4 py-2 ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
              </div>
              <div>
                <label className="block mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={`w-full border rounded px-4 py-2 ${
                    confirmPasswordError ? "border-red-500" : "border-gray-300"
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={validateConfirmPassword}
                />
                {confirmPasswordError && (
                  <p className="text-red-500 text-sm">{confirmPasswordError}</p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
          <RegisterPic onImageChange={handleImageChange} />
        </div>
      </div>
    </div>
  );
};

export default Register;
