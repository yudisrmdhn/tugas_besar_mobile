 import type { Location, MedicalFacility } from "../types";

// Radius rata-rata bumi dalam kilometer
const EARTH_RADIUS_KM = 6371;

/**
 * Menghitung jarak lurus (great-circle distance) antara dua titik koordinat
 * menggunakan Formulasi Haversine.
 *
 * Rumus:
 * a = sin²(Δlat/2) + cos(lat1) * cos(lat2) * sin²(Δlon/2)
 * c = 2 * atan2(√a, √(1−a))
 * d = R * c
 *
 * @param lat1 Latitude titik 1 (derajat)
 * @param lon1 Longitude titik 1 (derajat)
 * @param lat2 Latitude titik 2 (derajat)
 * @param lon2 Longitude titik 2 (derajat)
 * @returns Jarak dalam kilometer (km)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRadians = (degree: number) => (degree * Math.PI) / 180;

  const latitude1 = toRadians(lat1);
  const latitude2 = toRadians(lat2);

  const deltaLatitude = toRadians(lat2 - lat1);
  const deltaLongitude = toRadians(lon2 - lon1);

  const a =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(deltaLongitude / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

/**
 * Format jarak ke format string yang mudah dibaca pengguna:
 * - < 1 km: ditampilkan dalam meter (contoh: "450 m")
 * - >= 1 km: ditampilkan dalam kilometer dengan 2 desimal (contoh: "2.35 km")
 */
export function formatDistance(distanceInKm: number): string {
  if (distanceInKm < 1) {
    const meters = Math.round(distanceInKm * 1000);
    return `${meters} m`;
  }
  return `${distanceInKm.toFixed(2)} km`;
}

/**
 * Menghitung jarak pengguna ke daftar fasilitas medis dan mengurutkannya dari yang terdekat.
 */
export function calculateAndSortFacilities(
  userLocation: Location,
  facilities: MedicalFacility[]
): (MedicalFacility & { distanceKm: number; formattedDistance: string })[] {
  return facilities
    .map((facility) => {
      const distanceKm = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        facility.coordinate.latitude,
        facility.coordinate.longitude
      );

      return {
        ...facility,
        distanceKm,
        formattedDistance: formatDistance(distanceKm),
      };
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
}
