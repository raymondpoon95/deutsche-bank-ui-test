import React from "react";
import { Employees } from "../pages/Home";
import splash from "../assets/splash.jpg";

type CardProps = {
  employee: Employees;
};

const Card = ({
  employee: { firstName, lastName, email, tel, department },
}: CardProps) => {
  const tagColor =
    department === "Finance" ? "bg-emerald-300" : "bg-orange-300";

  return (
    <div
      className={`w-full p-3 rounded-r-md rounded-l-sm space-x-6 shadow-xl flex md:space-x-0 md:space-y-2 md:flex-col md:items-center bg-cyan-200 hover:bg-cyan-300 cursor-pointer transition duration-300`}
    >
      <picture className="min-w-min shrink-0 w-24 h-24 sm:w-32 sm:h-32">
        <img
          src={splash}
          className="w-full h-full sm:w-32 sm:h-32 object-cover aspect-square rounded-md md:rounded-full border-2 border-cyan-600"
          alt={`${firstName}-${lastName}-image`}
        />
      </picture>
      <div className="space-y-2 sm:flex-1 truncate md:text-center flex flex-col justify-evenly">
        <p className="text-lg font-semibold md:text-center">
          {firstName} {lastName}
        </p>

        <p className="text-slate-500 text-sm md:text-center">
          {department === "Finance" ? email : tel}
        </p>
        <div className="flex md:justify-center">
          <p className={`${tagColor} text-sm rounded-md px-2 py-0.5 w-min`}>
            {department}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
