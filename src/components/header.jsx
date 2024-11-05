"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { FaBusAlt } from "react-icons/fa";

const Header = () => {
  useEffect(() => {
    console.log(window.innerWidth);
  }, []);

  return (
    <header className="bg-graciosa text-white py-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/home" className="text-2xl font-extrabold tracking-wide">
          Viação Graciosa
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li className="flex items-center space-x-2 group">
              <IoMdHome className="text-2xl group-hover:text-yellow-300 transition-colors duration-300" />
              <Link href="/home" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300">
                Página Inicial
              </Link>
            </li>
            <li className="flex items-center space-x-2 group">
              <FaBusAlt className="text-2xl group-hover:text-yellow-300 transition-colors duration-300" />
              <Link href="/about" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300">
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
