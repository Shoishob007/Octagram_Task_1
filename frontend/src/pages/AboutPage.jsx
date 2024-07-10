/* eslint-disable no-unused-vars */
import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="container text-center mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">About Me</h1>
      <p className="mb-4">
        I am a recent graduate with a high enthusiasm for system development and
        eager to acquire and practice the corresponding industry-level skills. I
        dedicate my time to understanding new technologies and creating
        innovative solutions. I possess an up-front approach and aspire to be
        able to build a successful professional career.
      </p>
      <div className="mb-4">
        <p className="font-semibold text-xl">Shoishob Ahmed</p>
        <div className="flex justify-center items-center space-x-4 mt-2">
          <a
            href="tel:+8801405453554"
            className="flex items-center text-gray-800 hover:text-gray-900 transform transition-transform duration-300 hover:scale-105"
          >
            <FaPhone className="mr-2" /> +8801405453554
          </a>
          <a
            href="mailto:shoishob554@gmail.com"
            className="flex items-center text-blue-600 hover:text-blue-800 transform transition-transform duration-300 hover:scale-105"
          >
            <FaEnvelope className="mr-2" /> shoishob554@gmail.com
          </a>
          <a
            href="https://github.com/Shoishob007"
            className="flex items-center text-gray-800 hover:text-gray-900 transform transition-transform duration-300 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="mr-2" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/shoishob-ahmed-/"
            className="flex items-center text-blue-600 hover:text-blue-800 transform transition-transform duration-300 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="mr-2" /> LinkedIn
          </a>
          <a
            href="https://wa.me/8801883274002"
            className="flex items-center text-green-500 hover:text-green-700 transform transition-transform duration-300 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="mr-2" /> +8801883274002
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
