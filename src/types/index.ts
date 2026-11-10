// Role pengguna aplikasi
export type UserRole = 'victim' | 'first_responder' | 'admin';

// Data pengguna
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Koordinat lokasi
export interface Location {
  latitude: number;
  longitude: number;
}

// Status keadaan darurat
export type EmergencyStatus =
  | 'idle'
  | 'pending'
  | 'accepted'
  | 'completed'
  | 'cancelled';

// Data keadaan darurat
export interface EmergencyRequest {
  id: string;
  userId: string;
  location: Location;
  status: EmergencyStatus;
  createdAt: string;
}

// Data kontak darurat
export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}