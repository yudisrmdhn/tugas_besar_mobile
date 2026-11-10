import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import MapView from '../components/MapView';
import EmergencyButton from '../components/EmergencyButton';
import colors from '../constants/colors';
import useLocationTracking, { TrackingMode } from '../hooks/useLocationTracking';

export default function HomeScreen() {
  const router = useRouter();
  const [trackingMode, setTrackingMode] = useState<TrackingMode>('normal');

  // Integrasi Custom Hook useLocationTracking dengan distanceInterval adaptif
  const {
    location,
    loading,
    error,
    isTracking,
    distanceInterval,
    setTrackingMode: setHookMode,
    startTracking,
  } = useLocationTracking({
    initialMode: trackingMode,
    autoStart: true,
    syncWithStore: true,
  });

  // Toggle mode antara normal (20m) dan darurat (5m)
  const toggleTrackingMode = useCallback(() => {
    const nextMode: TrackingMode = trackingMode === 'normal' ? 'emergency' : 'normal';
    setTrackingMode(nextMode);
    setHookMode(nextMode);
  }, [trackingMode, setHookMode]);

  // Handler tombol darurat
  const handleEmergency = useCallback(() => {
    // Otomatis ubah mode tracking ke mode darurat (5m interval)
    setTrackingMode('emergency');
    setHookMode('emergency');

    Alert.alert(
      'Aktivasi Mode Darurat',
      'Mode LBS diubah ke frekuensi tinggi (interval 5m) untuk pelacakan darurat. Lanjutkan ke panel darurat?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Buka Panel Darurat',
          onPress: () => {
            try {
              router.push('/emergency');
            } catch {
              console.log('Navigasi ke panel darurat');
            }
          },
        },
      ]
    );
  }, [router, setHookMode]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>SehatSigap</Text>
            <Text style={styles.subtitle}>
              LBS & Interactive Mapping Engine (Milestone 1)
            </Text>
          </View>

          {/* Status GPS / LBS */}
          <TouchableOpacity
            style={[
              styles.statusContainer,
              trackingMode === 'emergency' && styles.statusContainerEmergency,
            ]}
            onPress={toggleTrackingMode}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.statusDot,
                trackingMode === 'emergency' && styles.statusDotEmergency,
              ]}
            />
            <Text
              style={[
                styles.status,
                trackingMode === 'emergency' && styles.statusEmergency,
              ]}
            >
              {loading
                ? 'Mencari GPS...'
                : isTracking
                ? `${distanceInterval}m (${trackingMode === 'emergency' ? 'SOS' : 'GPS'})`
                : 'GPS Siap'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifikasi Error LBS jika izin ditolak */}
        {error && (
          <TouchableOpacity
            style={styles.errorBanner}
            onPress={startTracking}
            activeOpacity={0.8}
          >
            <Text style={styles.errorText}>⚠️ {error} (Ketuk untuk coba lagi)</Text>
          </TouchableOpacity>
        )}

        {/* MAP VIEW INTERAKTIF DENGAN CUSTOM MARKERS & HAVERSINE */}
        <View style={styles.mapContainer}>
          <MapView
            currentLocation={
              location
                ? {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    accuracy: location.accuracy,
                  }
                : null
            }
            mode={trackingMode}
            onToggleTrackingMode={toggleTrackingMode}
          />
        </View>

        {/* FOOTER & TOMBOL DARURAT */}
        <View style={styles.footer}>
          <View style={styles.footerHeader}>
            <Text style={styles.information}>Butuh bantuan medis darurat?</Text>
            <TouchableOpacity onPress={() => router.push('/dashboard')}>
              <Text style={styles.dashboardLink}>Dashboard ›</Text>
            </TouchableOpacity>
          </View>

          <EmergencyButton onPress={handleEmergency} />

          <Text style={styles.disclaimer}>
            Formulasi Haversine aktif menghitung jarak faskes terdekat secara otomatis.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  headerContent: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 2,
  },

  // STATUS
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.paleGreen,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    flexShrink: 0,
  },
  statusContainerEmergency: {
    backgroundColor: '#FDE8E8',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 6,
  },
  statusDotEmergency: {
    backgroundColor: colors.emergency,
  },
  status: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  statusEmergency: {
    color: colors.emergency,
  },

  // ERROR
  errorBanner: {
    backgroundColor: '#FFF4E5',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD599',
  },
  errorText: {
    color: '#B76E00',
    fontSize: 12,
    textAlign: 'center',
  },

  // MAP
  mapContainer: {
    flex: 1,
    minHeight: 280,
    overflow: 'hidden',
    borderRadius: 18,
  },

  // FOOTER
  footer: {
    gap: 8,
    paddingBottom: 10,
  },
  footerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  information: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.dark,
  },
  dashboardLink: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  disclaimer: {
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
  },
});
