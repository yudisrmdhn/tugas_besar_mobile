
import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import colors from "../constants/colors";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard SehatSigap</Text>
      <Text style={styles.description}>
        Sistem pemantauan lokasi dan respons keadaan darurat.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/")}
      >
        <Text style={styles.buttonText}>
          Kembali ke Beranda
        </Text>
      </Pressable>

      <Pressable
        style={styles.emergencyButton}
        onPress={() => router.push("/emergency")}
      >
        <Text style={styles.buttonText}>
          Buka Fitur Darurat
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: colors.background,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.dark,
  },
  description: {
    color: colors.muted,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  emergencyButton: {
    backgroundColor: colors.emergency,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
