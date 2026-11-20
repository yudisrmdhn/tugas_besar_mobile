
import { create } from 'zustand';

import type {
  User,
  Location,
  EmergencyRequest,
  EmergencyStatus,
} from '../types';

import {
  SECURE_KEYS,
  saveSecureData,
  getSecureData,
  deleteSecureData,
} from '../services/secureStorage';

interface AppState {
  // State
  user: User | null;
  authToken: string | null;
  userNik: string | null;
  currentLocation: Location | null;
  emergency: EmergencyRequest | null;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => Promise<void>;
  setAuthData: (token: string, nik: string) => Promise<void>;
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
  authToken: null,
  userNik: null,
  currentLocation: null,
  emergency: null,
  isLoading: false,

  // Menyimpan profil pengguna
  setUser: async (user) => {
    try {
      if (user) {
        await saveSecureData(
          SECURE_KEYS.USER_DATA,
          JSON.stringify(user)
        );
      } else {
        await deleteSecureData(SECURE_KEYS.USER_DATA);
      }

      set({ user });
    } catch (error) {
      console.error('Gagal menyimpan profil pengguna:', error);
      throw error;
    }
  },

  // Menyimpan Token dan NIK
  setAuthData: async (token, nik) => {
    try {
      await saveSecureData(SECURE_KEYS.AUTH_TOKEN, token);
      await saveSecureData(SECURE_KEYS.USER_NIK, nik);

      set({
        authToken: token,
        userNik: nik,
      });
    } catch (error) {
      console.error('Gagal menyimpan data autentikasi:', error);
      throw error;
    }
  },

  // Memuat data dari SecureStore
  loadUserFromStorage: async () => {
    set({ isLoading: true });

    try {
      const [storedUser, storedToken, storedNik] =
        await Promise.all([
          getSecureData(SECURE_KEYS.USER_DATA),
          getSecureData(SECURE_KEYS.AUTH_TOKEN),
          getSecureData(SECURE_KEYS.USER_NIK),
        ]);

      set({
        user: storedUser ? JSON.parse(storedUser) as User : null,
        authToken: storedToken,
        userNik: storedNik,
      });
    } catch (error) {
      console.error('Gagal memuat data pengguna:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Menghapus data pengguna dan autentikasi
  clearStoredUser: async () => {
    try {
      await Promise.all([
        deleteSecureData(SECURE_KEYS.USER_DATA),
        deleteSecureData(SECURE_KEYS.AUTH_TOKEN),
        deleteSecureData(SECURE_KEYS.USER_NIK),
      ]);

      set({
        user: null,
        authToken: null,
        userNik: null,
      });
    } catch (error) {
      console.error('Gagal menghapus data pengguna:', error);
      throw error;
    }
  },

  // Mengatur lokasi pengguna
  setLocation: (location) => set({ currentLocation: location }),

  // Mengatur permintaan darurat
  setEmergency: (emergency) => set({ emergency }),

  // Memperbarui status darurat
  updateEmergencyStatus: (status) =>
    set((state) => ({
      emergency: state.emergency
        ? { ...state.emergency, status }
        : null,
    })),

  // Mengatur loading
  setLoading: (loading) => set({ isLoading: loading }),
}));
