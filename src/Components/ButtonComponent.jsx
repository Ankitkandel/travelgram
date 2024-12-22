import React from "react";

const ButtonComponent = ({ name, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="group px-4 py-2 border-2 border-primary-100 rounded-2xl transition-all duration-500 ease-in-out hover:bg-primary-100"
    >
      <p className="text-primary-100 text-xl font-bold uppercase tracking-widest group-hover:text-white">
        {name}
      </p>
    </button>
  );
};

export default ButtonComponent;