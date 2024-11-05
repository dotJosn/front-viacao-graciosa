"use client";
import Header from "@/components/header";
import React, { useState } from "react";
import Image from "next/image";
import { IoBag } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";

const Home = () => {
  const [isRaceActive, setIsRaceActive] = useState(false);
  const [driverInfo, setDriverInfo] = useState({
    name: "",
    license: "",
  });
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleStartRace = () => {
    setStartTime(new Date());
    setIsRaceActive(true);
    setEndTime(null);
  };

  const handleEndRace = () => {
    setEndTime(new Date());
    setIsRaceActive(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <>
      <Header />
      <div className="pt-16">
        <div className="flex content-center justify-center">
          <Image
            src="/images/onibus.png"
            alt="Imagem de um ônibus"
            width={500}
            height={200}
            className="rounded"
          />
          <div className="pl-2 grid gap-2 grid-cols-2 grid-rows-2 w-1/3">
            <Image
              src="/images/bus1.png"
              alt="Imagem de um ônibus"
              width={300}
              height={200}
              className="rounded"
            />
            <Image
              src="/images/onibus4.png"
              alt="Imagem de um ônibus"
              width={300}
              height={200}
              className="rounded"
            />
            <Image
              src="/images/onibus2.png"
              alt="Imagem de um ônibus"
              width={300}
              height={200}
              className="rounded"
            />
            <Image
              src="/images/onibus3.png"
              alt="Imagem de um ônibus"
              width={300}
              height={200}
              className="rounded"
            />
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="pt-16 flex justify-center">
        <div className="grid gap-2 grid-cols-4 grid-rows-2 w-3/5">
          <ul className="flex items-center space-x-2 bg-graciosa p-2 rounded-lg group">
            <IoBag className="text-2xl text-white" />
            <a href="" className="text-white text-lg">Vagas Internas</a>
          </ul>
          <ul className="flex items-center space-x-2 bg-graciosa p-2 rounded-lg group">
            <CiHeart className="text-2xl text-white" />
            <a href="" className="text-white text-lg">Parcerias</a>
          </ul>
          <ul className="flex items-center space-x-2 bg-graciosa p-2 rounded-lg group">
            <FaBell className="text-2xl text-white" />
            <a href="" className="text-white text-lg">Notificações</a>
          </ul>
          <ul className="flex items-center space-x-2 bg-graciosa p-2 rounded-lg group">
            <IoPeople className="text-2xl text-white" />
            <a href="" className="text-white text-lg">Novos colaboradores</a>
          </ul>
        </div>
      </div>

      {/* Formulário e Simulação de Corrida */}
      <div className="flex justify-center">
        <div className="w-3/5 bg-graciosa p-6 rounded-lg shadow-md">
          {!isRaceActive ? (
            <div>
              <h2 className="text-white text-2xl font-bold mb-4">Iniciar Corrida</h2>
              <form className="mb-4">
                <label className="block mb-2 text-white">
                  Nome do Motorista:
                  <input

                    type="text"
                    name="name"
                    value={driverInfo.name}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black"
                  />
                </label>
                <label className="block mb-4 text-white">
                  Numero do Ônibus:
                  <input
                    type="text"
                    name="license"
                    value={driverInfo.license}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleStartRace}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Iniciar Corrida
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-white text-2xl font-bold mb-4">Corrida em Andamento</h2>
              <p className="text-white"><strong>Motorista:</strong> {driverInfo.name}</p>
              <p className="text-white"><strong>Carteira de Habilitação:</strong> {driverInfo.license}</p>
              <p className="text-white"><strong>Início:</strong> {startTime && startTime.toLocaleString()}</p>
              <button
                onClick={handleEndRace}
                className="bg-red-500 text-white p-2 mt-4 rounded"
              >
                Finalizar Corrida
              </button>
            </div>
          )}

          {endTime && (
            <div className="mt-6">
              <h2 className="text-white text-xl font-bold">Corrida Finalizada</h2>
              <p className="text-white"><strong>Fim:</strong> {endTime.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
