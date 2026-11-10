import React, {
  memo,
  useMemo,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MapViewNative, {
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';

import CustomMarker from './CustomMarker';
import colors from '../constants/colors';
import type { Location, MedicalFacility } from '../types';
import { MEDICAL_FACILITIES } from '../constants/facilities';
import { calculateAndSortFacilities } from '../utils/haversine';
import useLocationTracking, { TrackingMode } from '../hooks/useLocationTracking';

interface MapViewProps {
  currentLocation?: Location | null;
  mode?: TrackingMode;
  onToggleTrackingMode?: () => void;
}

const DEFAULT_LOCATION: Location = {
  latitude: -7.9797,
  longitude: 112.6304,
};

function MapView({
  currentLocation: externalLocation,
  mode: externalMode,
  onToggleTrackingMode,
}: MapViewProps) {
  // Gunakan useLocationTracking internal jika externalLocation tidak disediakan
  const internalTracking = useLocationTracking({
    initialMode: externalMode ?? 'normal',
    autoStart: true,
    syncWithStore: true,
  });

  const mapRef = useRef<MapViewNative | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<MedicalFacility | null>(null);

  // Tentukan koordinat aktif (external atau internal tracking atau fallback)
  const activeLocation = useMemo<Location>(() => {
    if (externalLocation) return externalLocation;
    if (internalTracking.location) {
      return {
        latitude: internalTracking.location.latitude,
        longitude: internalTracking.location.longitude,
        accuracy: internalTracking.location.accuracy,
      };
    }
    return DEFAULT_LOCATION;
  }, [externalLocation, internalTracking.location]);

  // Mode tracking aktif dan interval adaptif
  const activeMode: TrackingMode =
    externalMode ?? internalTracking.trackingMode;
  const distanceInterval = activeMode === 'emergency' ? 5 : 20;

  // Hitung kalkulasi jarak lurus Haversine untuk seluruh fasilitas medis
  const sortedFacilities = useMemo(() => {
    return calculateAndSortFacilities(activeLocation, MEDICAL_FACILITIES);
  }, [activeLocation]);

  const nearestFacility = sortedFacilities[0];

  // Wilayah awal peta
  const initialRegion = useMemo<Region>(
    () => ({
      latitude: activeLocation.latitude,
      longitude: activeLocation.longitude,
      latitudeDelta: 0.035,
      longitudeDelta: 0.035,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Center peta ke posisi user
  const handleRecenter = useCallback(() => {
    if (mapRef.current && activeLocation) {
      mapRef.current.animateToRegion(
        {
          latitude: activeLocation.latitude,
          longitude: activeLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        600
      );
    }
  }, [activeLocation]);

  // Toggle mode adaptif
  const handleToggleMode = useCallback(() => {
    if (onToggleTrackingMode) {
      onToggleTrackingMode();
    } else {
      const nextMode = activeMode === 'normal' ? 'emergency' : 'normal';
      internalTracking.setTrackingMode(nextMode);
    }
  }, [activeMode, internalTracking, onToggleTrackingMode]);

  // Callback peta siap
  const handleMapReady = useCallback(() => {
    console.log('[MapView] Interactive Mapping Engine siap digunakan');
  }, []);

  return (
    <View style={styles.container}>
      <MapViewNative
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass
        showsScale
        onMapReady={handleMapReady}
        accessibilityLabel="Peta interaktif LBS SehatSigap"
      >
        {/* 1. Marker Lokasi Pengguna (User Location) */}
        <CustomMarker
          coordinate={activeLocation}
          title="Lokasi Anda"
          type="user"
          description={`Akurasi GPS: ±${activeLocation.accuracy ? activeLocation.accuracy.toFixed(1) : '5'}m`}
        />

        {/* 2. Custom Markers Fasilitas Medis dengan Kalkulasi Jarak Haversine */}
        {sortedFacilities.map((facility) => (
          <CustomMarker
            key={facility.id}
            coordinate={facility.coordinate}
            title={facility.name}
            type={facility.type}
            description={facility.address}
            distance={facility.formattedDistance}
            onPress={() => setSelectedFacility(facility)}
          />
        ))}
      </MapViewNative>

      {/* Header Info Banner: Mode LBS Adaptif & Status */}
      <View style={styles.topCard}>
        <View style={styles.topCardRow}>
          <View style={styles.statusBadge}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor:
                    activeMode === 'emergency' ? colors.emergency : colors.primary,
                },
              ]}
            />
            <Text style={styles.statusText}>
              Mode: {activeMode === 'emergency' ? '🚨 Darurat' : '🛡️ Normal'}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.modeToggleButton,
              activeMode === 'emergency' && styles.emergencyToggleActive,
            ]}
            onPress={handleToggleMode}
            activeOpacity={0.7}
          >
            <Text style={styles.modeToggleText}>
              Interval: {distanceInterval}m (Ubah)
            </Text>
          </TouchableOpacity>
        </View>

        {nearestFacility && (
          <View style={styles.nearestRow}>
            <Text style={styles.nearestLabel}>Faskes Terdekat (Haversine):</Text>
            <Text style={styles.nearestValue} numberOfLines={1}>
              {nearestFacility.name} •{' '}
              <Text style={styles.distanceHighlight}>
                {nearestFacility.formattedDistance}
              </Text>
            </Text>
          </View>
        )}
      </View>

      {/* Tombol Aksi: Recenter GPS */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.actionFab}
          onPress={handleRecenter}
          activeOpacity={0.8}
          accessibilityLabel="Arahkan peta ke posisi saya"
        >
          <Text style={styles.fabIcon}>🎯</Text>
        </TouchableOpacity>
      </View>

      {/* Detail Fasilitas yang Dipilih via Marker */}
      {selectedFacility && (
        <View style={styles.selectedFacilityCard}>
          <View style={styles.selectedHeader}>
            <Text style={styles.selectedTitle} numberOfLines={1}>
              {selectedFacility.name}
            </Text>
            <TouchableOpacity onPress={() => setSelectedFacility(null)}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.selectedAddress}>{selectedFacility.address}</Text>
          <View style={styles.selectedFooter}>
            <Text style={styles.selectedDistance}>
              📍 Jarak Lurus: <Text style={styles.boldText}>{selectedFacility.formattedDistance}</Text>
            </Text>
            {selectedFacility.phone && (
              <Text style={styles.selectedPhone}>📞 {selectedFacility.phone}</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

export default memo(MapView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 18,
    position: 'relative',
  },
  map: {
    flex: 1,
  },

  // Top Card / Status Header
  topCard: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  topCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.dark,
  },
  modeToggleButton: {
    backgroundColor: colors.paleGreen,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  emergencyToggleActive: {
    backgroundColor: '#FDE8E8',
    borderColor: colors.emergency,
  },
  modeToggleText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.dark,
  },
  nearestRow: {
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  nearestLabel: {
    fontSize: 10,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nearestValue: {
    fontSize: 12,
    color: colors.dark,
    fontWeight: '600',
    marginTop: 1,
  },
  distanceHighlight: {
    color: colors.primary,
    fontWeight: 'bold',
  },

  // Recenter FAB
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    right: 14,
    gap: 10,
  },
  actionFab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabIcon: {
    fontSize: 20,
  },

  // Selected Facility Bottom Sheet / Card
  selectedFacilityCard: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 66,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.dark,
    flex: 1,
  },
  closeBtn: {
    fontSize: 14,
    color: colors.muted,
    paddingLeft: 8,
  },
  selectedAddress: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 3,
  },
  selectedFooter: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedDistance: {
    fontSize: 11,
    color: colors.primary,
  },
  boldText: {
    fontWeight: 'bold',
  },
  selectedPhone: {
    fontSize: 11,
    color: colors.text,
  },
});
