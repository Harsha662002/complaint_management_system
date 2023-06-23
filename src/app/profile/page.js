// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import Profile from "../components/profile/profile";
// import Navbar from "../components/navbar/navbar";
// import { AuthContext } from "@/app/contexts/authcontext";
// import Sidebar from "../components/sidebar/sidebar";

// const ProfilePage = () => {
//   const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     fetchData();
//   }, []);
//   const fetchData = async () => {
//     try {
//       const response = await fetch("/api/checkCredentials", {
//         method: "GET",
//       });
//       if (!response.ok) {
//         throw new Error("Error fetching datad");
//       }
//       const responseData = await response.json();
//       // console.log("responseData", responseData);
//       const filteredData = responseData.user.filter(
//         (u) => u.email === loggedInUserEmail
//       );
//       console.log("Filtered Data:", filteredData);
//       setData(filteredData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   console.log("DAta", data);
//   return (
//     <div>
//       <Navbar isLoggedIn={isLoggedIn} />
//       <div className="flex gap-6 flex-row">
//         <div>
//           <Sidebar />
//         </div>
//         <div className="text-xl w-screen h-1/2">
//           <Profile data={data[0]} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

"use client";
import React, { useContext, useEffect, useState } from "react";
// import { useRouter } from "next/router";
import Profile from "../components/profile/profile";
import Navbar from "../components/navbar/navbar";
import { AuthContext } from "@/app/contexts/authcontext";
import Sidebar from "../components/sidebar/sidebar";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { isLoggedIn, loggedInUserEmail } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login"); // Redirect to login page if not logged in
    } else {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/checkCredentials", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const responseData = await response.json();
      const filteredData = responseData.user.filter(
        (u) => u.email === loggedInUserEmail
      );
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log("isLoggedIn", isLoggedIn);
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="flex gap-6 flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="text-xl w-screen h-1/2">
          <Profile data={data[0]} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
