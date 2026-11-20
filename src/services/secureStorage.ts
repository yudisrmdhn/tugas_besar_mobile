
import * as SecureStore from 'expo-secure-store';

export const SECURE_KEYS = {
  USER_DATA: 'user_data',
  AUTH_TOKEN: 'auth_token',
  USER_NIK: 'user_nik',
  USER_CREDENTIALS: 'user_credentials',
} as const;

export const saveSecureData = async (
  key: string,
  value: string
): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Gagal menyimpan data dengan key ${key}:`, error);
    throw error;
  }
};

export const getSecureData = async (
  key: string
): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Gagal membaca data dengan key ${key}:`, error);
    throw error;
  }
};

export const deleteSecureData = async (
  key: string
): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Gagal menghapus data dengan key ${key}:`, error);
    throw error;
  }
};
