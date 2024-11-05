import trips from '@/data/trips.json';

export async function GET(req, { params }) {
  const { id } = params;
  
  const trip = trips.find((t) => t.id === parseInt(id, 10));
  
  if (!trip) {
    return new Response("Viagem não encontrada", { status: 404 });
  }

  return new Response(JSON.stringify(trip), { status: 200 });
}
