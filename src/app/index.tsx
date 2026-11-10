
import React, { useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import MapView from '../components/MapView';
import EmergencyButton from '../components/EmergencyButton';
import colors from '../constants/colors';

export default function HomeScreen() {
  const handleEmergency = useCallback(() => {
    Alert.alert(
      'Konfirmasi Darurat',
      'Apakah kamu ingin meminta bantuan darurat?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya, lanjutkan',
          onPress: () => {
            Alert.alert(
              'Informasi',
              'Fitur pengiriman permintaan darurat akan diintegrasikan berikutnya.'
            );
          },
        },
      ]
    );
  }, []);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>
              SehatSigap
            </Text>

            <Text style={styles.subtitle}>
              Smart Health & Emergency Response System
            </Text>
          </View>

          <View
            style={styles.statusContainer}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel="Status aplikasi siap"
          >
            <View style={styles.statusDot} />

            <Text style={styles.status}>
              Siap
            </Text>
          </View>
        </View>

        {/* MAP */}
        <View style={styles.mapContainer}>
          <MapView />
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.information}>
            Butuh bantuan medis?
          </Text>

          <EmergencyButton
            onPress={handleEmergency}
          />

          <Text style={styles.disclaimer}>
            Gunakan tombol ini hanya untuk keadaan darurat.
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
    gap: 14,
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
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.primary,
  },

  subtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 3,
    flexShrink: 1,
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

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 5,
  },

  status: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },

  // MAP
  mapContainer: {
    flex: 1,
    minHeight: 250,
    overflow: 'hidden',
    borderRadius: 20,
  },

  // FOOTER
  footer: {
    gap: 10,
    paddingBottom: 12,
  },

  information: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark,
  },

  disclaimer: {
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center', 
  },  
});
 