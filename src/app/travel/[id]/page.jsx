"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header";

const TripDetails = ({ params }) => {
  const { id } = params; // Obter o ID da rota diretamente de params
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        console.log("Buscando detalhes da viagem com ID:", id); // Log do ID
        const res = await fetch(`/api/trips/${id}`);
        
        if (!res.ok) {
          throw new Error(`Erro na resposta: ${res.status}`);
        }

        const data = await res.json();
        console.log("Dados da viagem carregados:", data); // Log dos dados recebidos
        setTrip(data);
      } catch (err) {
        setError("Não foi possível carregar os detalhes da viagem.");
        console.error("Erro ao carregar detalhes da viagem:", err); // Log do erro
      }
    };

    if (id) {
      fetchTripDetails();
    }
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!trip) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header />
      <div className="p-12 flex justify-center">
        <div className="w-3/5 bg-graciosa p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-white">Detalhes da Viagem</h2>
          <p className="text-white"><strong>ID da Viagem:</strong> {trip.id}</p>
          <p className="text-white"><strong>Motorista:</strong> {trip.driverName}</p>
          <p className="text-white"><strong>Destino:</strong> {trip.destino}</p>
          <p className="text-white"><strong>Início:</strong> {new Date(trip.start).toLocaleString()}</p>
          <p className="text-white"><strong>Fim:</strong> {new Date(trip.end).toLocaleString()}</p>
        </div>
      </div>
    </>
  );
};

export default TripDetails;
