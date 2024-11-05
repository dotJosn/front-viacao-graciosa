import { readTrips, writeTrips } from "@/lib/tripUtils";

export async function GET(request) {
  const trips = readTrips();
  return new Response(JSON.stringify(trips), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request) {
  const newTrip = await request.json();
  const trips = readTrips();
  trips.push(newTrip);
  writeTrips(trips);

  return new Response(JSON.stringify({ message: "Viagem salva com sucesso!" }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
