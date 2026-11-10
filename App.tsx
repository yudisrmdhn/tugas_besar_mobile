
import { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAppStore } from './src/store/useAppStore';
import HomeScreen from './src/app/index';

export default function App() {
  const isLoading = useAppStore((state) => state.isLoading);
  const loadUserFromStorage = useAppStore(
    (state) => state.loadUserFromStorage
  );

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  return (
    <SafeAreaProvider>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
          <Text>Memuat data pengguna...</Text>
        </View>
      ) : (
        <HomeScreen />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
