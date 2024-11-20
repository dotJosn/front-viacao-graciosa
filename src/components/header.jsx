"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { FaBusAlt } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log(window.innerWidth);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-graciosa text-white py-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/home" className="text-2xl font-extrabold tracking-wide">
          Viação Graciosa
        </Link>
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
        <nav className={`${isMenuOpen ? "block" : "hidden"} lg:block`}>
          <ul className="flex space-x-8 lg:flex-row flex-col lg:space-x-8 space-y-4 lg:space-y-0">
            <li className="flex items-center space-x-2 group">
              <IoMdHome className="text-2xl group-hover:text-yellow-300 transition-colors duration-300" />
              <Link href="/home" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300">
                Página Inicial
              </Link>
            </li>
            <li className="flex items-center space-x-2 group">
              <FaBusAlt className="text-2xl group-hover:text-yellow-300 transition-colors duration-300" />
              <Link href="/aboutUs" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300">
                Sobre nós
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
