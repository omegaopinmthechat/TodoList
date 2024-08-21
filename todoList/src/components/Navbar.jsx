import React from "react";

const navbar = () => {
  return (
    <nav className="flex justify-between px-2 py-2 text-white bg-violet-700">
      <div className="logo">
        <span className="text-xl font-bold cursor-pointer mx-9">iList</span>
      </div>
      <ul className="flex gap-8">
        <li className="transition-all duration-75 cursor-pointer hover:font-bold">Home</li>
        <li className="transition-all duration-75 cursor-pointer hover:font-bold">Your Tasks</li>
      </ul>
    </nav>
  );
};

export default navbar;
