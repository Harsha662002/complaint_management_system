"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { BsPersonFill, BsListTask } from "react-icons/bs";
import { AiOutlineForm } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Add Complaint", link: "/complaints", icon: AiOutlineForm },
    { name: "Unsolved Complaints", link: "/unsolved", icon: BsListTask },
    { name: "Solved Complaints", link: "/solved", icon: FaCheckCircle },
    { name: "Profile", link: "/profile", icon: BsPersonFill },

    { name: "Logout", link: "/", icon: FiLogOut },
  ];

  const [open, setOpen] = useState(true);
  const [screenSize, setScreenSize] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      if (innerWidth < 768) {
        setScreenSize("small");
      } else if (innerWidth < 1024) {
        setScreenSize("medium");
      } else {
        setScreenSize("large");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`bg-[#0e0e0e] min-h-screen ${
        open ? "w-96" : "w-16"
      } duration-500 text-white px-4 ${
        screenSize !== "large" && open ? "z-10 absolute" : ""
      }`}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {menuItems.map((item, i) => (
          <Link
            href={item.link}
            key={i}
            className="group flex items-center text-md gap-3 font-medium p-2 hover:bg-gray-800 rounded-md"
          >
            <div>{item.icon({ size: 20 })}</div>
            <h2
              style={{
                transitionDelay: `${i + 2}50ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {item.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
            >
              {item.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
