// src/app/api/trips/route.js
import trips from '@/data/trips.json';

export async function GET() {
  return new Response(JSON.stringify(trips), { status: 200 });
}
