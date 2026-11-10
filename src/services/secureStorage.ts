import * as SecureStore from 'expo-secure-store';

console.log('SecureStore tersedia:', Object.keys(SecureStore));
console.log(
  'getItemAsync:',
  typeof SecureStore.getItemAsync
);
console.log(
  'setItemAsync:',
  typeof SecureStore.setItemAsync
);
console.log(
  'deleteItemAsync:',
  typeof SecureStore.deleteItemAsync
);

export const saveSecureData = async (
  key: string,
  value: string
): Promise<void> => {
  if (typeof SecureStore.setItemAsync !== 'function') {
    throw new Error('SecureStore.setItemAsync tidak tersedia');
  }

  await SecureStore.setItemAsync(key, value);
};

export const getSecureData = async (
  key: string
): Promise<string | null> => {
  if (typeof SecureStore.getItemAsync !== 'function') {
    throw new Error('SecureStore.getItemAsync tidak tersedia');
  }

  return await SecureStore.getItemAsync(key);
};

export const deleteSecureData = async (
  key: string
): Promise<void> => {
  if (typeof SecureStore.deleteItemAsync !== 'function') {
    throw new Error('SecureStore.deleteItemAsync tidak tersedia');
  }

  await SecureStore.deleteItemAsync(key);
};