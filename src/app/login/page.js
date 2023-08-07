import React from "react";
import Link from "next/link";
import Navbar from "../components/navbar/navbar";
import Usercards from "../components/cards/usercards";

const Loginpage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-semibold text-center text-4xl mt-16 sm:text-5xl lg:text-6xl">
          Complaint Management System
        </h1>
        <div className=" flex flex-col sm:flex-row mt-10 space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="p-4 sm:p-0 md:p-2">
            <Usercards
              image="admin.jpg"
              imageName="Staff"
              buttonColor="bg-red-500"
              login="/staffLogin"
            />
          </div>

          <div className="p-4 sm:p-0 md:p-2">
            <Usercards
              image="employeeuser.png"
              imageName="Employee"
              buttonColor="bg-blue-500"
              login="/loginemp"
            />
          </div>
        </div>
        <div>
          <h2 className="mt-3">
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

export default Loginpage;
