
import { create } from 'zustand';

import type {
  User,
  Location,
  EmergencyRequest,
  EmergencyStatus,
} from '../types';

import {
  saveSecureData,
  getSecureData,
  deleteSecureData,
} from '../services/secureStorage';

interface AppState {
  // State
  user: User | null;
  currentLocation: Location | null;
  emergency: EmergencyRequest | null;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => Promise<void>;
  loadUserFromStorage: () => Promise<void>;
  clearStoredUser: () => Promise<void>;

  setLocation: (location: Location) => void;
  setEmergency: (emergency: EmergencyRequest | null) => void;
  updateEmergencyStatus: (status: EmergencyStatus) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  user: null,
  currentLocation: null,
  emergency: null,
  isLoading: false,

  // Menyimpan data pengguna
  setUser: async (user) => {
    try {
      if (user) {
        await saveSecureData('user_data', JSON.stringify(user));
      } else {
        await deleteSecureData('user_data');
      }

      set({ user });
    } catch (error) {
      console.error('Gagal menyimpan data pengguna:', error);
    }
  },

  // Memuat data pengguna
  loadUserFromStorage: async () => {
    set({ isLoading: true });

    try {
      const storedUser = await getSecureData('user_data');

      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        set({ user: parsedUser });
      }
    } catch (error) {
      console.error('Gagal memuat data pengguna:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Menghapus data pengguna
  clearStoredUser: async () => {
    try {
      await deleteSecureData('user_data');
      set({ user: null });
    } catch (error) {
      console.error('Gagal menghapus data pengguna:', error);
    }
  },

  // Mengatur lokasi pengguna
  setLocation: (location) =>
    set({ currentLocation: location }),

  // Mengatur permintaan darurat
  setEmergency: (emergency) =>
    set({ emergency }),

  // Memperbarui status darurat
  updateEmergencyStatus: (status) =>
    set((state) => ({
      emergency: state.emergency
        ? { ...state.emergency, status }
        : null,
    })),

  // Mengatur loading
  setLoading: (loading) =>
    set({ isLoading: loading }),
}));