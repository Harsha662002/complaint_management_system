import React from "react";
import Image from "next/image";
import Link from "next/link";

const Usercards = (props) => {
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 px-4 py-6">
        <Image
          src={`/assests/images/${props.image}`}
          alt={props.imageName}
          width={320}
          height={320}
        />
        <div className="flex justify-center items-center">
          <Link
            href={props.login}
            className={`inline-block text-white px-4 py-2 border border-black rounded-md mt-4 ${props.buttonColor}`}
          >
            {props.imageName} Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Usercards;
