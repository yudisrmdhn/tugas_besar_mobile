
import React, { ReactNode } from 'react';

import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';

import colors from '../constants/colors';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
      />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
