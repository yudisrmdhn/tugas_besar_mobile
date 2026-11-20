
import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

interface DocumentStatusProps {
  isAvailable?: boolean;
}

function DocumentStatus({
  isAvailable = false,
}: DocumentStatusProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="document-text"
          size={22}
          color={colors.primary}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>Dokumen Medis</Text>
        <Text style={styles.description}>
          {isAvailable
            ? 'Data dokumen medis tersedia'
            : 'Belum ada dokumen medis tersimpan'}
        </Text>
      </View>

      <View
        style={[
          styles.badge,
          isAvailable ? styles.activeBadge : styles.inactiveBadge,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            isAvailable ? styles.activeText : styles.inactiveText,
          ]}
        >
          {isAvailable ? 'Tersedia' : 'Kosong'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.dark,
  },
  description: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeBadge: {
    backgroundColor: colors.primaryLight,
  },
  inactiveBadge: {
    backgroundColor: '#FFF3E0',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  activeText: {
    color: colors.primary,
  },
  inactiveText: {
    color: '#D97706',
  },
});

export default memo(DocumentStatus);
