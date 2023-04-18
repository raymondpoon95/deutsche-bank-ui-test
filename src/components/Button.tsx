import React from "react";

type ButtonProps = {
  text?: string;
  handleClick: () => void;
};

const Button = ({ text = "Submit", handleClick }: ButtonProps) => {
  return (
    <button
      className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-md px-2 ml-6 cursor-pointer"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
