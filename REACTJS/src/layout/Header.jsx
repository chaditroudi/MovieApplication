import React, { useState } from "react";
import { Link } from "react-router-dom";
import User from '../assets/images/user.png';

export const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSearch(searchTerm);
  };

  return (
    <div className="bg-white h-24 flex items-center justify-between py-0 px-10">
      <div className="text-font-secondary text-xl font-semibold">
        <Link to="/">Movie App</Link>
      </div>
      <div className="w-6/12 flex justify-center">
        <form
          className="w-[70%] flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full text-lg px-[5px] pt-[5px] pb-[10px] h-10 outline-none"
            type="text"
            placeholder="Search Movies"
          />
          <button
            className="py-0 px-2 m-2 flex justify-center items-center h-10 cursor-pointer text-xl bg-font-primary"
            type="submit"
          >
            <span className="material-icons-outlined">search</span>
          </button>
        </form>
      </div>
      <div className="user-image w-12 h-12">
        <img src={User} alt="User" />
      </div>
    </div>
  );
};
