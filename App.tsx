
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import { useAppStore } from './src/store/useAppStore';
import HomeScreen from './src/app/index';
import Dashboard from './src/app/dashboard';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard'>('home');

  const isLoading = useAppStore((state) => state.isLoading);
  const loadUserFromStorage = useAppStore(
    (state) => state.loadUserFromStorage
  );

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  const openDashboard = () => {
    setCurrentPage('dashboard');
  };

  const openHome = () => {
    setCurrentPage('home');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#15966B" />
          <Text style={styles.loadingText}>
            Memuat data pengguna...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (currentPage === 'home') {
    return (
      <HomeScreen onOpenDashboard={openDashboard} />
    );
  }

  return (
    <SafeAreaView
      style={styles.screen}
      edges={['top', 'left', 'right']}
    >
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.backButtonPressed,
        ]}
        onPress={openHome}
        accessibilityRole="button"
        accessibilityLabel="Kembali ke Beranda"
      >
        <Text style={styles.backButtonText}>
          ← Kembali ke Beranda
        </Text>
      </Pressable>

      <View style={styles.dashboardContainer}>
        <Dashboard />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAF8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    color: '#253B35',
  },
  screen: {
    flex: 1,
    backgroundColor: '#F7FAF8',
  },
  backButton: {
    backgroundColor: '#E8F5EF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backButtonText: {
    color: '#15966B',
    fontSize: 14,
    fontWeight: '600',
  },
  dashboardContainer: {
    flex: 1,
  },
});
