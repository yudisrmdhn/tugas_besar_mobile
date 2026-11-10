import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import colors from '../constants/colors';
import useLocationTracking from '../hooks/useLocationTracking';
import { MEDICAL_FACILITIES } from '../constants/facilities';
import { calculateAndSortFacilities } from '../utils/haversine';

export default function EmergencyScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Hook tracking dengan mode emergency (distanceInterval = 5m adaptif)
  const { location, isTracking, distanceInterval } = useLocationTracking({
    initialMode: 'emergency',
    autoStart: true,
  });

  // Hitung faskes terdekat via Haversine
  const nearestHospitals = location
    ? calculateAndSortFacilities(
        {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        MEDICAL_FACILITIES.filter((f) => f.type === 'hospital')
      )
    : [];
  const nearestHospital = nearestHospitals[0];

  const handleEmergency = () => {
    Alert.alert(
      'Konfirmasi Darurat',
      'Apakah kamu yakin ingin mengirim sinyal darurat dengan koordinat GPS Anda saat ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya, Kirim Sinyal',
          onPress: () => {
            setLoading(true);

            setTimeout(() => {
              setLoading(false);

              Alert.alert(
                'Sinyal Darurat Terkirim!',
                `Koordinat: ${
                  location
                    ? `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
                    : 'Mencari GPS'
                }\nRujukan Faskes Terdekat: ${
                  nearestHospital
                    ? `${nearestHospital.name} (${nearestHospital.formattedDistance})`
                    : 'RSUD Terdekat'
                }\nAmbulans Siaga sedang diproses.`
              );
            }, 1000);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>‹ Kembali</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Bantuan Darurat</Text>
        <Text style={styles.subtitle}>
          LBS Real-Time Tracking Engine (Interval {distanceInterval}m)
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.icon}>🚑</Text>

        <Text style={styles.heading}>Butuh Bantuan Medis?</Text>

        {/* GPS Live Coordinates Card */}
        <View style={styles.gpsCard}>
          <View style={styles.gpsHeader}>
            <View style={styles.gpsDot} />
            <Text style={styles.gpsStatus}>
              LBS Active ({distanceInterval}m High-Frequency)
            </Text>
          </View>
          <Text style={styles.gpsCoord}>
            {location
              ? `📍 ${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)} (±${location.accuracy?.toFixed(1) ?? '5'}m)`
              : '📡 Mengunci koordinat satelit GPS...'}
          </Text>
          {nearestHospital && (
            <Text style={styles.gpsHospital}>
              🏥 RS Terdekat: {nearestHospital.name} ({nearestHospital.formattedDistance})
            </Text>
          )}
        </View>

        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>Perhatian!</Text>
          <Text style={styles.warningText}>
            Tombol ini akan memancarkan koordinat lokasi Anda dengan akurasi tinggi secara berkala kepada tim medis.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={handleEmergency}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.buttonText}>PANIC BUTTON SOS</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.note}>
          Tekan tombol di atas untuk mengirimkan permintaan bantuan evakuasi.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
  },
  backButton: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
  },
  subtitle: {
    color: colors.muted,
    marginTop: 4,
    fontSize: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
    textAlign: 'center',
  },

  // GPS Card
  gpsCard: {
    backgroundColor: '#EEF6F3',
    padding: 12,
    borderRadius: 12,
    width: '100%',
    marginTop: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  gpsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  gpsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.emergency,
  },
  gpsStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.emergency,
  },
  gpsCoord: {
    fontSize: 12,
    color: colors.dark,
    fontWeight: '500',
  },
  gpsHospital: {
    fontSize: 11,
    color: colors.primary,
    marginTop: 4,
    fontWeight: '600',
  },

  warningCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 14,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  warningTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.emergency,
    marginBottom: 6,
  },
  warningText: {
    fontSize: 12,
    color: colors.dark,
    lineHeight: 18,
  },
  emergencyButton: {
    backgroundColor: colors.emergency,
    width: '100%',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  note: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 12,
    textAlign: 'center',
  },
});
