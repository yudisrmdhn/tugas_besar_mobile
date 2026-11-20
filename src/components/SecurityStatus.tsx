
import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import colors from '../constants/colors';

interface SecurityStatusProps {
  isSecure?: boolean;
}

function SecurityStatus({
  isSecure = true,
}: SecurityStatusProps) {
  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="text"
      accessibilityLabel={
        isSecure
          ? 'Keamanan penyimpanan aktif'
          : 'Keamanan penyimpanan belum tersedia'
      }
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🔒</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Keamanan Data
        </Text>

        <Text style={styles.description}>
          {isSecure
            ? 'Data sensitif disimpan melalui SecureStore.'
            : 'Penyimpanan aman belum tersedia.'}
        </Text>
      </View>

      <View
        style={[
          styles.badge,
          isSecure ? styles.active : styles.inactive,
        ]}
      >
        <Text style={styles.badgeText}>
          {isSecure ? 'Aktif' : 'Tidak aktif'}
        </Text>
      </View>
    </View>
  );
}

export default memo(SecurityStatus);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.dark,
  },
  description: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  active: {
    backgroundColor: colors.primaryLight,
  },
  inactive: {
    backgroundColor: '#FDECEC',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
});
