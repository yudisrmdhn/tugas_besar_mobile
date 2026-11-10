
import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { useAppStore } from './src/store/useAppStore';

export default function App() {
  const user = useAppStore((state) => state.user);
  const isLoading = useAppStore((state) => state.isLoading);
  const loadUserFromStorage = useAppStore(
    (state) => state.loadUserFromStorage
  );

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Memuat data pengguna...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SehatSigap</Text>
      <Text>Smart Health & Emergency Response System</Text>

      <Text style={styles.status}>
        {user ? `Selamat datang, ${user.name}` : 'Belum ada pengguna login'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    marginTop: 20,
  },
});
