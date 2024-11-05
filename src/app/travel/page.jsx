"use client";
import React, { useState } from "react";
import Header from "@/components/header";

const Travel = () => {
  const [isRaceActive, setIsRaceActive] = useState(false);
  const [driverInfo, setDriverInfo] = useState({
    name: "",
    viagem: "",
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
      <div className="p-12 flex justify-center">
        <div className="w-3/5 bg-graciosa p-6 rounded-lg shadow-md">
          {!isRaceActive ? (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Iniciar Corrida</h2>
              <form className="mb-4">
                <label className="block mb-2 text-white">
                  ID do Motorista:
                  <input
                    type="text"
                    name="name"
                    value={driverInfo.name}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black"
                  />
                </label>
                <label className="block mb-4 text-white">
                  Número da Viagem:
                  <input
                    type="text"
                    name="viagem"
                    value={driverInfo.viagem}
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
              <h2 className="text-2xl font-bold mb-4 text-white">Corrida em Andamento</h2>
              <p className="text-white"><strong>Motorista:</strong> {driverInfo.name}</p>
              <p className="text-white"><strong>Número da Viagem:</strong> {driverInfo.viagem}</p>
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
              <h2 className="text-xl font-bold text-white">Corrida Finalizada</h2>
              <p className="text-white"><strong>Fim:</strong> {endTime.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Travel;
