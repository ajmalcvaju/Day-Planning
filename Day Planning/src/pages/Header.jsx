import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-5 shadow-lg rounded-b-lg">
      <nav className="flex justify-center items-center space-x-12 text-white">
        <Link
          to="/"
          className="text-2xl font-semibold hover:text-gray-200 transition duration-300 transform hover:scale-105"
        >
          🏠 Ambitions
        </Link>
        <Link
          to="/time-table"
          className="text-2xl font-semibold hover:text-gray-200 transition duration-300 transform hover:scale-105"
        >
          🗓️ Time Table
        </Link>
        <Link
          to="/do-list"
          className="text-2xl font-semibold hover:text-gray-200 transition duration-300 transform hover:scale-105"
        >
          📝 Do List
        </Link>
      </nav>
    </header>
  );
};

export default Header;
