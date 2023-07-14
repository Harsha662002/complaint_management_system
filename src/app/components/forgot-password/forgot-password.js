"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpReceived, setOtpReceived] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
    try {
      console.log("email", email);
      // try {
      const emailCheckResponse = await fetch(
        "http://localhost:3000/api/check-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!emailCheckResponse.ok) {
        alert("Email does not exist");
        return;
      }
      // } catch (e) {
      //   alert("Server Down", e);
      // }

      const response = await fetch("http://localhost:3000/api/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      console.log("res", response);

      if (response.ok) {
        const data = await response.json();
        const { success, otp } = data;
        if (success) {
          alert("OTP sent successfully");
          setOtpSent(true);
          setOtpReceived(otp);
        } else {
          alert("Failed to send OTP");
        }
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleUpdatePassword = async () => {
    const enteredOTP = document.getElementById("otp").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (enteredOTP !== otpReceived) {
      alert("Enter VALID OTP");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("PASSWORDS DON'T MATCH");
      document.getElementById("confirmPassword").style.borderColor = "red";
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/update-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      if (response.ok) {
        alert("Password updated successfully");
        router.push("/login");
      } else {
        alert("Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="mt-8 ml-8">
      <h2 className="text-3xl font-bold text-blue-500 mb-8">
        Forgot your Password?
      </h2>
      {!otpSent && (
        <div className="flex">
          <label htmlFor="email" className="text-right mr-4 text-xl">
            Enter your email address:
          </label>
          <div className="ml-2 font-medium text-gray-600">
            <input
              type="email"
              id="email"
              className="border rounded px-4 py-1 mb-8 w-72 bg-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      )}
      {!otpSent && (
        <div>
          <button
            onClick={handleSendOTP}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded"
          >
            Send OTP
          </button>
        </div>
      )}
      {otpSent && (
        <div>
          <p className="mb-4 text-green-500">
            OTP has been sent to the entered email address.
          </p>
          <div className="flex">
            <label htmlFor="otp" className="text-right mr-4 text-xl">
              Enter the OTP:
            </label>
            <div className="ml-2 font-medium text-gray-600">
              <input
                type="text"
                id="otp"
                className="border rounded px-4 py-1 mb-4 w-72 bg-gray-100"
              />
            </div>
          </div>
          <div className="flex">
            <label htmlFor="newPassword" className="text-right mr-4 text-xl">
              Enter New Password:
            </label>
            <div className="ml-2 font-medium text-gray-600">
              <input
                type="password"
                id="newPassword"
                className="border rounded px-4 py-1 mb-4 w-72 bg-gray-100"
              />
            </div>
          </div>
          <div className="flex">
            <label
              htmlFor="confirmPassword"
              className="text-right mr-4 text-xl"
            >
              Confirm Password:
            </label>
            <div className="ml-2 font-medium text-gray-600">
              <input
                type="password"
                id="confirmPassword"
                className="border rounded px-4 py-1 mb-8 w-72 bg-gray-100"
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleUpdatePassword}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
