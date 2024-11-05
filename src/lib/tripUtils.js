import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'trips.json');

export function readTrips() {
  const fileData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileData);
}

export function writeTrips(trips) {
  fs.writeFileSync(filePath, JSON.stringify(trips, null, 2));
}
