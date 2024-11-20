'use client'

import React, { useState } from "react";
import Link from "next/link";
import { IoBag, IoPeople } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaBell, FaChevronLeft, FaChevronRight, FaMoneyBillWave } from "react-icons/fa";
import { MdAirplaneTicket } from "react-icons/md";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`h-screen bg-gray-800 text-white fixed top-0 transition-all duration-300 z-50 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Botão de Recolher/Expandir */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-[-15px] bg-gray-700 text-white p-2 rounded-full focus:outline-none z-50"
      >
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Cabeçalho */}
      <div
        className={`p-4 text-center text-xl font-bold border-b border-gray-700 transition-opacity ${
          isCollapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        {!isCollapsed && "Menu"}
      </div>

      {/* Itens do Menu */}
      <ul className="flex flex-col mt-4">
        <li
          className={`flex items-center space-x-3 p-3 hover:bg-gray-700 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <IoBag className="text-2xl" />
          {!isCollapsed && (
            <Link href="/building" className="text-lg">
              Vagas Internas
            </Link>
          )}
        </li>
        <li
          className={`flex items-center space-x-3 p-3 hover:bg-gray-700 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <CiHeart className="text-2xl" />
          {!isCollapsed && (
            <Link href="/building" className="text-lg">
              Parcerias
            </Link>
          )}
        </li>
        <li
          className={`flex items-center space-x-3 p-3 hover:bg-gray-700 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <FaBell className="text-2xl" />
          {!isCollapsed && (
            <Link href="/building" className="text-lg">
              Notificações
            </Link>
          )}
        </li>
        <li
          className={`flex items-center space-x-3 p-3 hover:bg-gray-700 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <IoPeople className="text-2xl" />
          {!isCollapsed && (
            <Link href="/travel" className="text-lg">
              Viagem
            </Link>
          )}
        </li>
        {/* Novo item: Financeiro */}
        <li
          className={`flex items-center space-x-3 p-3 hover:bg-gray-700 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <FaMoneyBillWave className="text-2xl" />
          {!isCollapsed && (
            <Link href="/financeiro" className="text-lg">
              Financeiro
            </Link>
          )}
        </li>
        <li
          className={`flex items-center space-x-3 p-3 hover:bg-gray-700 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <MdAirplaneTicket className="text-2xl" />
          {!isCollapsed && (
            <Link href="/passagens" className="text-lg">
              Passagens
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
