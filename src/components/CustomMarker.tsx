import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import type { Location } from '../types';
import colors from '../constants/colors';

export interface CustomMarkerProps {
  coordinate: Location;
  title: string;
  type: 'user' | 'hospital' | 'ambulance' | 'clinic';
  description?: string;
  distance?: string;
  onPress?: () => void;
}

// Konfigurasi visual untuk setiap tipe marker
const markerConfig = {
  user: {
    symbol: '●',
    label: 'Lokasi Anda',
    color: colors.blue,
    borderColor: '#FFFFFF',
    size: 26,
  },
  hospital: {
    symbol: '🏥',
    label: 'Rumah Sakit',
    color: colors.primary,
    borderColor: '#FFFFFF',
    size: 40,
  },
  ambulance: {
    symbol: '🚑',
    label: 'Ambulans Siaga',
    color: colors.emergency,
    borderColor: '#FFFFFF',
    size: 40,
  },
  clinic: {
    symbol: '🩺',
    label: 'Klinik Medis',
    color: '#0891B2',
    borderColor: '#FFFFFF',
    size: 38,
  },
};

function CustomMarker({
  coordinate,
  title,
  type,
  description,
  distance,
  onPress,
}: CustomMarkerProps) {
  const config = markerConfig[type] || markerConfig.hospital;
  const isUser = type === 'user';

  return (
    <Marker
      coordinate={{
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      }}
      title={title}
      description={distance ? `${config.label} • ${distance}` : config.label}
      onPress={onPress}
      anchor={isUser ? { x: 0.5, y: 0.5 } : { x: 0.5, y: 1 }}
    >
      {/* Visual Marker Pin */}
      {isUser ? (
        <View style={styles.userMarkerWrapper}>
          <View style={styles.userPulseRing} />
          <View style={styles.userCoreDot} />
        </View>
      ) : (
        <View style={styles.markerContainer}>
          <View style={[styles.facilityBadge, { backgroundColor: config.color }]}>
            <Text style={styles.badgeSymbol}>{config.symbol}</Text>
          </View>
          <View style={[styles.pinTip, { borderTopColor: config.color }]} />
          {distance && (
            <View style={styles.distanceTag}>
              <Text style={styles.distanceTagText}>{distance}</Text>
            </View>
          )}
        </View>
      )}

      {/* Callout Info Window */}
      <Callout tooltip style={styles.calloutContainer}>
        <View style={styles.calloutBubble}>
          <Text style={styles.calloutTitle}>{title}</Text>
          <Text style={styles.calloutType}>{config.label}</Text>
          {description && (
            <Text style={styles.calloutDescription}>{description}</Text>
          )}
          {distance && (
            <View style={styles.calloutDistanceBox}>
              <Text style={styles.calloutDistanceText}>
                📍 Jarak: <Text style={styles.boldText}>{distance}</Text> (Haversine)
              </Text>
            </View>
          )}
        </View>
      </Callout>
    </Marker>
  );
}

export default memo(CustomMarker);

const styles = StyleSheet.create({
  // User Marker
  userMarkerWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPulseRing: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(66, 133, 244, 0.25)',
    borderWidth: 2,
    borderColor: 'rgba(66, 133, 244, 0.5)',
  },
  userCoreDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.blue,
    borderWidth: 2,
    borderColor: colors.white,
  },

  // Facility Marker Pin
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  facilityBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  badgeSymbol: {
    fontSize: 18,
  },
  pinTip: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -2,
  },
  distanceTag: {
    backgroundColor: 'rgba(37, 59, 53, 0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 2,
  },
  distanceTagText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },

  // Callout Popup
  calloutContainer: {
    width: 200,
  },
  calloutBubble: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    borderColor: colors.border,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.dark,
  },
  calloutType: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 2,
  },
  calloutDescription: {
    fontSize: 11,
    color: colors.text,
    marginTop: 4,
  },
  calloutDistanceBox: {
    marginTop: 6,
    paddingTop: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  calloutDistanceText: {
    fontSize: 11,
    color: colors.primary,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
