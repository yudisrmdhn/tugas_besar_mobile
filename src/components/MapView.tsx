
import React, {
  memo,
  useMemo,
  useCallback,
} from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import MapViewNative, {
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';

import CustomMarker from './CustomMarker';
import colors from '../constants/colors';
import type { Location } from '../types';

interface MapViewProps {
  currentLocation?: Location | null;
}

const DEFAULT_LOCATION: Location = {
  latitude: -7.9797,
  longitude: 112.6304,
};

// Data rumah sakit sementara
const HOSPITALS: Location[] = [
  {
    latitude: -7.9818,
    longitude: 112.6295,
  },
];

// Data ambulans sementara
const AMBULANCES: Location[] = [
  {
    latitude: -7.9778,
    longitude: 112.6320,
  },
];

function MapView({ currentLocation }: MapViewProps) {
  const userLocation = currentLocation ?? DEFAULT_LOCATION;

  // Mengoptimalkan perhitungan wilayah awal peta
  const initialRegion = useMemo<Region>(
    () => ({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    }),
    [userLocation.latitude, userLocation.longitude]
  );

  // Mengoptimalkan pembuatan marker rumah sakit
  const hospitalMarkers = useMemo(
    () =>
      HOSPITALS.map((hospital, index) => (
        <CustomMarker
          key={`hospital-${index}`}
          coordinate={hospital}
          title={`Rumah Sakit ${index + 1}`}
          type="hospital"
        />
      )),
    []
  );

  // Mengoptimalkan pembuatan marker ambulans
  const ambulanceMarkers = useMemo(
    () =>
      AMBULANCES.map((ambulance, index) => (
        <CustomMarker
          key={`ambulance-${index}`}
          coordinate={ambulance}
          title={`Ambulans ${index + 1}`}
          type="ambulance"
        />
      )),
    []
  );

  // Callback ketika peta selesai dimuat
  const handleMapReady = useCallback(() => {
    console.log('Peta SehatSigap siap digunakan');
  }, []);

  return (
    <View style={styles.container}>
      <MapViewNative
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass
        showsScale
        onMapReady={handleMapReady}
        accessibilityLabel="Peta lokasi SehatSigap"
      >
        {/* Marker lokasi pengguna */}
        <CustomMarker
          coordinate={userLocation}
          title="Lokasi Pengguna"
          type="user"
        />

        {/* Marker rumah sakit */}
        {hospitalMarkers}

        {/* Marker ambulans */}
        {ambulanceMarkers}

      </MapViewNative>

      {/* Label peta */}
      <View
        style={styles.mapLabel}
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel="Lokasi Darurat SehatSigap"
      >
        <Text style={styles.mapLabelText}>
          Lokasi Darurat SehatSigap
        </Text>
      </View>
    </View>
  );
}

export default memo(MapView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 18,
  },

  map: {
    flex: 1,
  },

  mapLabel: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 12,
    elevation: 4,
  },

  mapLabelText: {
    color: colors.dark,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
 