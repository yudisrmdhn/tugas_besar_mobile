import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

interface PermissionStatusProps {
  isGranted?: boolean;
}

function PermissionStatus({
  isGranted = false,
}: PermissionStatusProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="location"
          size={22}
          color={colors.primary}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>Izin Lokasi</Text>
        <Text style={styles.description}>
          {isGranted
            ? 'Akses lokasi telah diberikan'
            : 'Akses lokasi belum diberikan'}
        </Text>
      </View>

      <View
        style={[
          styles.badge,
          isGranted ? styles.activeBadge : styles.inactiveBadge,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            isGranted ? styles.activeText : styles.inactiveText,
          ]}
        >
          {isGranted ? 'Aktif' : 'Belum Aktif'}
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

export default memo(PermissionStatus);
