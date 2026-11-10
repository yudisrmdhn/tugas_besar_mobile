import React, { memo, useCallback } from 'react';

import {
  Pressable,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import colors from '../constants/colors';

interface EmergencyButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

function EmergencyButton({
  onPress,
  disabled = false,
}: EmergencyButtonProps) {
  const handlePress = useCallback(() => {
    if (!disabled) {
      onPress();
    }
  }, [disabled, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel="Tombol darurat"
      accessibilityHint="Tekan untuk memulai permintaan bantuan darurat"
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>!</Text>
        <Text style={styles.title}>DARURAT</Text>
        <Text style={styles.subtitle}>
          Tekan untuk meminta bantuan
        </Text>
      </View>
    </Pressable>
  );
}

export default memo(EmergencyButton);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.emergency,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.white,
    fontSize: 12,
  },
});