"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header";

const Travel = () => {
  const [isRaceActive, setIsRaceActive] = useState(false);
  const [driverInfo, setDriverInfo] = useState({
    name: "",
    destino: "",
  });
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [trips, setTrips] = useState([]);
  const [driverFilter, setDriverFilter] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    fetch("/api/trips")
      .then((res) => res.json())
      .then((data) =>
        setTrips(
          data.map((trip) => ({
            ...trip,
            avgSpeed: (Math.random() * 60 + 40).toFixed(2),
            maxSpeed: (Math.random() * 20 + 100).toFixed(2),
            minSpeed: (Math.random() * 10 + 20).toFixed(2),
            totalDistance: "30", // Definindo o valor fixo de 30 km para todas as viagens
          }))
        )
      );
  }, []);

  const handleStartRace = () => {
    setStartTime(new Date());
    setIsRaceActive(true);
    setEndTime(null);
  };

  const handleEndRace = () => {
    const end = new Date();
    setEndTime(end);
    setIsRaceActive(false);

    const newTrip = {
      id: trips.length + 1,
      driverName: driverInfo.name,
      destino: driverInfo.destino,
      start: startTime,
      end,
      avgSpeed: (Math.random() * 60 + 40).toFixed(2),
      maxSpeed: (Math.random() * 20 + 100).toFixed(2),
      minSpeed: (Math.random() * 10 + 20).toFixed(2),
      totalDistance: "30", // Definindo o valor fixo de 30 km para a nova viagem
    };

    fetch("/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTrip),
    })
      .then((res) => res.json())
      .then(() => {
        setTrips((prevTrips) => [...prevTrips, newTrip]);
      });

    setDriverInfo({ name: "", destino: "" });
    setStartTime(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "driverFilter") {
      setDriverFilter(value);
    } else if (name === "destinationFilter") {
      setDestinationFilter(value);
    }
  };

  const handleViewDetails = (trip) => {
    setSelectedTrip(trip);
  };

  const handleCloseDetails = () => {
    setSelectedTrip(null);
  };

  const filteredTrips = trips.filter((trip) => {
    return (
      (driverFilter === "" || trip.driverName.toLowerCase().includes(driverFilter.toLowerCase())) &&
      (destinationFilter === "" || trip.destino.toLowerCase().includes(destinationFilter.toLowerCase()))
    );
  });

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
                    placeholder="ID do Motorista"
                    value={driverInfo.name}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black rounded"
                  />
                </label>
                <label className="block mb-4 text-white">
                  Destino:
                  <input
                    type="text"
                    name="destino"
                    placeholder="Destino"
                    value={driverInfo.destino}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black rounded"
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
              <p className="text-white"><strong>Destino:</strong> {driverInfo.destino}</p>
              <p className="text-white"><strong>Início:</strong> {startTime && startTime.toLocaleString()}</p>
              <button
                onClick={handleEndRace}
                className="bg-red-500 text-white p-2 mt-4 rounded"
              >
                Finalizar Corrida
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-12 flex justify-center">
        <div className="w-3/5 bg-graciosa p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-white">Histórico de Viagens</h2>

          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              name="driverFilter"
              placeholder="Filtrar por motorista"
              value={driverFilter}
              onChange={handleFilterChange}
              className="border p-2 w-1/2 text-black rounded"
            />
            <input
              type="text"
              name="destinationFilter"
              placeholder="Filtrar por destino"
              value={destinationFilter}
              onChange={handleFilterChange}
              className="border p-2 w-1/2 text-black rounded"
            />
          </div>

          <div className="max-h-80 overflow-y-auto">
            {filteredTrips.length > 0 ? (
              <ul className="space-y-4">
                {filteredTrips.map((trip) => (
                  <li key={trip.id} className="p-4 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
                    <p className="text-white"><strong>ID da Viagem:</strong> {trip.id}</p>
                    <p className="text-white"><strong>ID do Motorista:</strong> {trip.driverName}</p>
                    <p className="text-white"><strong>Destino:</strong> {trip.destino}</p>
                    <button
                      onClick={() => handleViewDetails(trip)}
                      className="bg-blue-500 text-white p-2 mt-2 rounded"
                    >
                      Detalhes
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white">Nenhuma viagem corresponde aos critérios de filtro.</p>
            )}
          </div>
        </div>
      </div>

      {selectedTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Detalhes da Viagem</h2>
            <p><strong>ID da Viagem:</strong> {selectedTrip.id}</p>
            <p><strong>ID do Motorista:</strong> {selectedTrip.driverName}</p>
            <p><strong>Destino:</strong> {selectedTrip.destino}</p>
            <p><strong>Início:</strong> {new Date(selectedTrip.start).toLocaleString()}</p>
            <p><strong>Fim:</strong> {new Date(selectedTrip.end).toLocaleString()}</p>
            <p><strong>Velocidade Média:</strong> {Math.round(selectedTrip.avgSpeed)} km/h</p>
            <p><strong>Maior Velocidade:</strong> {Math.round(selectedTrip.maxSpeed)} km/h</p>
            <p><strong>Menor Velocidade:</strong> {Math.round(selectedTrip.minSpeed)} km/h</p>
            <p><strong>Distância Total:</strong> {selectedTrip.totalDistance} km</p>
            <button
              onClick={handleCloseDetails}
              className="bg-red-500 text-white p-2 mt-4 rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Travel;
