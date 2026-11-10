
import React, { memo } from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Marker } from 'react-native-maps';

import type { Location } from '../types';
import colors from '../constants/colors';

interface CustomMarkerProps {
  coordinate: Location;
  title: string;
  type: 'user' | 'hospital' | 'ambulance';
}

// Konfigurasi tampilan setiap jenis marker
const markerConfig = {
  user: {
    symbol: '●',
    label: 'Lokasi Pengguna',
    color: colors.blue,
  },

  hospital: {
    symbol: '+',
    label: 'Rumah Sakit',
    color: colors.primary,
  },

  ambulance: {
    symbol: 'A',
    label: 'Ambulans',
    color: colors.emergency,
  },
};

function CustomMarker({
  coordinate,
  title,
  type,
}: CustomMarkerProps) {
  const config = markerConfig[type];

  return (
    <Marker
      coordinate={coordinate}
      title={title}
      description={config.label}
      tracksViewChanges={false}
    >
      <View
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel={`${config.label}: ${title}`}
        style={[
          styles.marker,
          { backgroundColor: config.color },
        ]}
      >
        <Text style={styles.symbol}>
          {config.symbol}
        </Text>
      </View>
    </Marker>
  );
}

// Mencegah render ulang jika props tidak berubah
export default memo(CustomMarker);

const styles = StyleSheet.create({
  marker: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 3,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  symbol: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
});
 