
export interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  altitude?: number | null;
  accuracy?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

export type FacilityType = 'hospital' | 'ambulance' | 'clinic';

export interface MedicalFacility {
  id: string;
  name: string;
  type: FacilityType;
  coordinate: Location;
  address?: string;
  phone?: string;
  distanceKm?: number;
  formattedDistance?: string;
}

export interface User {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  bloodType?: string;
  emergencyContact?: string;
}

export interface AuthData {
  token: string;
  nik: string;
}

export interface UserCredentials {
  nik: string;
  password: string;
}

export type EmergencyStatus =
  | 'idle'
  | 'pending'
  | 'searching'
  | 'accepted'
  | 'en_route'
  | 'arrived'
  | 'completed'
  | 'cancelled';

export interface EmergencyRequest {
  id: string;
  userId: string;
  location: Location;
  status: EmergencyStatus;
  createdAt: string;
  description?: string;
  assignedAmbulanceId?: string;
  nearestHospitalId?: string;
}
