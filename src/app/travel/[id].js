import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const TravelDetails = () => {
  const [tripDetails, setTripDetails] = useState(null);
  const { query } = useRouter();  // Pega o parâmetro da URL
  const tripId = query.id;

  useEffect(() => {
    if (tripId) {
      fetch(`/api/trips/${tripId}`)
        .then((res) => res.json())
        .then((data) => setTripDetails(data))
        .catch((err) => console.error("Erro ao buscar detalhes da viagem:", err));
    }
  }, [tripId]);

  if (!tripDetails) {
    return <p>Carregando detalhes...</p>;
  }

  return (
    <div className="p-12 flex justify-center">
      <div className="w-3/5 bg-graciosa p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Detalhes da Viagem</h2>
        <p className="text-white"><strong>ID da Viagem:</strong> {tripDetails.id}</p>
        <p className="text-white"><strong>Motorista:</strong> {tripDetails.driverName}</p>
        <p className="text-white"><strong>Destino:</strong> {tripDetails.destino}</p>
        <p className="text-white"><strong>Início:</strong> {new Date(tripDetails.start).toLocaleString()}</p>
        <p className="text-white"><strong>Fim:</strong> {new Date(tripDetails.end).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TravelDetails;
