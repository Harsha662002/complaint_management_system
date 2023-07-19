"use client";
import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/contexts/authcontext";

const StaffLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    setIsLoggedIn,
    loggedInUserEmail,
    setLoggedInUserEmail,
    userType,
    setUserType,
  } = useContext(AuthContext);

  useEffect(() => {
    console.log("loggedInUserEmail", loggedInUserEmail);
    setUserType("staff");
    //console.log("CCC", loggedInUserEmail === "admin@admin.com");
    if (loggedInUserEmail === "admin@admin.com") {
      router.push("/admin_dashboard");
    }
  }, [loggedInUserEmail, setUserType, userType]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // console.log("USER TYPE", userType);
    const response = await fetch("/api/checkCredentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, userType }),
    });

    const data = await response.json();
    console.log(data.success);
    // console.log(data.body);

    if (data.success) {
      setIsLoggedIn(true);
      setLoggedInUserEmail(email);
      router.push("/staff_dashboard");
      // console.log("CCC", loggedInUserEmail === "admin@admin.com");
      // if (loggedInUserEmail === "admin@admin.com") {
      //   router.push("/admin_dashboard");
      // } else {
      //   router.push("/staff_dashboard");
      // }
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
      <svg
        className="absolute top-0 left-0"
        viewBox="0 0 1000 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: "rotateX(180deg) rotateY(0deg) ",
        }}
      >
        <path d="M0 0A100 100 0 0 1 100 100H0V0Z" fill="#3490DC" />
      </svg>

      <svg
        className="absolute bottom-0 right-0"
        viewBox="0 0 1000 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: "rotateX(0deg) rotateY(180deg) translateX(30px)",
        }}
      >
        <path d="M0 0A100 100 0 0 1 100 100H0V0Z" fill="#3490DC" />
      </svg>

      <div
        className="w-3/4 h-2/3 rounded-lg shadow-lg bg-white flex flex-col md:flex-row"
        style={{ zIndex: 999 }}
      >
        <div className="sm:w-4 md:w-96 lg:w-1/2 flex flex-col justify-center mx-auto items-center border border-blue">
          <div className="flex items-center justify-center">
            <Image
              src="/assests/images/1.png"
              alt="Login"
              width={500}
              height={400}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 py-8">
          <h1 className="text-2xl text-blue-700 font-bold mb-2 text-center">
            Welcome!
          </h1>
          <h2 className="text-lg text-blue-500 mb-8 text-center">
            Sign in to your Account
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4 mx-8">
              <div className="flex items-center border rounded-full py-2 px-4">
                <HiOutlineMail className="text-gray-500 mr-2" />
                <input
                  type="email"
                  className="bg-transparent outline-none flex-grow"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-8 rounded"
                  type="submit"
                >
                  LOGIN
                </button>
              </div>
            </div>
          </form>
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
          <h2 className="mt-3 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-2xl text-blue-500">
              Register
            </Link>{" "}
            Now!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
