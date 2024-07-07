/* eslint-disable no-unused-vars */
// frontend/src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link
            to="/books"
            className="text-gray-300 hover:text-white text-lg transition hover:scale-105 duration-200"
          >
            CRUD1O1
          </Link>
        </div>
        <div>
          <Link
            to="/books"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            About Me
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
