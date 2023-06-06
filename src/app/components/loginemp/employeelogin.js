import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

const EmployeeLogin = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
      <svg
        className="absolute top-0 left-0"
        viewBox="0 0 600 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: "rotateX(180deg) rotateY(0deg) ",
        }}
      >
        <path d="M0 0A100 100 0 0 1 100 100H0V0Z" fill="#3490DC" />
      </svg>

      <svg
        className="absolute bottom-0 right-0"
        viewBox="0 0 600 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: "rotateX(0deg) rotateY(180deg) translateX(30px)",
        }}
      >
        <path d="M0 0A100 100 0 0 1 100 100H0V0Z" fill="#3490DC" />
      </svg>

      <div className="w-3/4 h-2/3 rounded-lg shadow-lg bg-white flex flex-row">
        <div className="w-1/2 flex flex-col justify-center items-center border border-blue">
          <div className="flex items-center justify-center">
            <Image
              src="/assests/images/1.png"
              alt="Login"
              width={500}
              height={400}
            />
          </div>
        </div>
        <div className="w-1/2 px-4 py-8">
          <h1 className="text-2xl text-blue-700 font-bold mb-2  text-center">
            Welcome!
          </h1>
          <h2 className="text-lg text-blue-500 mb-8  text-center">
            Sign in to your Account
          </h2>
          <div className="mb-4 mx-8">
            <div className="flex items-center border rounded-full py-2 px-4">
              <HiOutlineMail className="text-gray-500 mr-2" />
              <input
                type="email"
                className="bg-transparent outline-none flex-grow"
                placeholder="Enter Email Address"
              />
            </div>
          </div>
          <div className="mb-8 mx-8">
            <div className="flex items-center border rounded-full py-2 px-4">
              <HiOutlineLockClosed className="text-gray-500 mr-2" />
              <input
                type="password"
                className="bg-transparent outline-none flex-grow"
                placeholder="Enter Password"
              />
            </div>
          </div>
          <div className="text-blue-500 text-sm text-center mb-8">
            <Link href="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="text-center mb-4">or login with</div>
          <button className="hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 border border-black">
            <Image
              src="/assests/images/google.png"
              alt="Google Icon"
              width={25}
              height={25}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;