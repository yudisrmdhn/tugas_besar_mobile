 
import React, { memo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SecurityStatus from '../components/SecurityStatus';
import PermissionStatus from '../components/PermissionStatus';
import DocumentStatus from '../components/DocumentStatus';
import colors from '../constants/colors';

function Dashboard() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Selamat Datang,</Text>
            <Text style={styles.title}>SehatSigap</Text>
          </View>

          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Siap</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          Smart Health & Emergency Response System
        </Text>

        {/* Emergency Information */}
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>
            Tetap Siaga, Tetap Aman
          </Text>
          <Text style={styles.emergencyDescription}>
            Pastikan seluruh fitur keamanan dan informasi
            kesehatan telah disiapkan untuk keadaan darurat.
          </Text>
        </View>

        {/* Security Status */}
        <Text style={styles.sectionTitle}>
          Status Keamanan
        </Text>

        <SecurityStatus isSecure={true} />

        {/* Permission Status */}
        <Text style={styles.sectionTitle}>
          Status Perangkat
        </Text>

        <PermissionStatus isGranted={false} />

        {/* Document Status */}
        <Text style={styles.sectionTitle}>
          Informasi Kesehatan
        </Text>

        <DocumentStatus isAvailable={false} />

        {/* Footer */}
        <Text style={styles.footer}>
          SehatSigap © 2026
        </Text>
      </ScrollView>
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
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: colors.muted,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: colors.dark,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 6,
  },
  statusText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 12,
  },
  emergencyCard: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 18,
    marginTop: 24,
    marginBottom: 24,
  },
  emergencyTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emergencyDescription: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 12,
    marginTop: 8,
  },
  footer: {
    textAlign: 'center',
    color: colors.muted,
    fontSize: 12,
    marginTop: 20,
  },
});

export default memo(Dashboard);
