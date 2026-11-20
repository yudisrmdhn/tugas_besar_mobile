 
import React, { useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../constants/colors';

interface EmergencyScreenProps {
  onBack?: () => void;
}

export default function EmergencyScreen({
  onBack,
}: EmergencyScreenProps) {

  const handleEmergency = useCallback(() => {
    Alert.alert(
      'Konfirmasi Darurat',
      'Apakah kamu yakin ingin meminta bantuan darurat?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya, Minta Bantuan',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Permintaan Darurat',
              'Tampilan permintaan darurat sudah siap. Pengiriman permintaan akan dihubungkan dengan sistem backend.'
            );
          },
        },
      ]
    );
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <Pressable
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Kembali ke beranda"
        >
          <Text style={styles.backText}>
            ← Kembali ke Beranda
          </Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.title}>
            Bantuan Darurat
          </Text>

          <Text style={styles.subtitle}>
            SehatSigap Emergency Response System
          </Text>
        </View>

        <View style={styles.warningCard}>
          <Text style={styles.warningIcon}>
            !
          </Text>

          <Text style={styles.warningTitle}>
            Apakah kamu dalam keadaan darurat?
          </Text>

          <Text style={styles.warningDescription}>
            Gunakan fitur ini apabila kamu membutuhkan
            bantuan medis segera.
          </Text>
        </View>

        <View style={styles.informationCard}>
          <Text style={styles.informationTitle}>
            Informasi
          </Text>

          <Text style={styles.informationText}>
            Pastikan kamu berada di lokasi yang aman.
            Sistem akan membutuhkan informasi lokasi
            untuk membantu proses penanganan darurat.
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.emergencyButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleEmergency}
            accessibilityRole="button"
            accessibilityLabel="Minta bantuan darurat"
          >
            <Text style={styles.emergencyIcon}>
              !
            </Text>

            <Text style={styles.emergencyTitle}>
              MINTA BANTUAN
            </Text>

            <Text style={styles.emergencyDescription}>
              Tekan untuk mengonfirmasi keadaan darurat
            </Text>
          </Pressable>

          <Text style={styles.disclaimer}>
            Gunakan fitur ini hanya untuk keadaan darurat.
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
    padding: 20,
    justifyContent: 'space-between',
  },

  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
  },

  backText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },

  header: {
    marginTop: 20,
  },

  title: {
    color: colors.dark,
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 6,
  },

  warningCard: {
    backgroundColor: colors.primaryLight,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    gap: 12,
  },

  warningIcon: {
    color: colors.emergency,
    fontSize: 48,
    fontWeight: 'bold',
  },

  warningTitle: {
    color: colors.dark,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  warningDescription: {
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },

  informationCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  informationTitle: {
    color: colors.dark,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  informationText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },

  actionContainer: {
    gap: 14,
    marginBottom: 12,
  },

  emergencyButton: {
    backgroundColor: colors.emergency,
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },

  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  emergencyIcon: {
    color: colors.white,
    fontSize: 36,
    fontWeight: 'bold',
  },

  emergencyTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },

  emergencyDescription: {
    color: colors.white,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },

  disclaimer: {
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
  },
});
