// src/app/api/trips/[id].js
import tripsData from "@/data/trips.json";

export default function handler(req, res) {
  const { id } = req.query;
  const tripId = parseInt(id, 10); // Convertendo id para número
  const trip = tripsData.find((trip) => trip.id === tripId);

  if (trip) {
    res.status(200).json(trip);
  } else {
    res.status(404).json({ message: "Viagem não encontrada" });
  }
}
