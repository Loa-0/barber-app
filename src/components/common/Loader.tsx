import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

export const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#DAA520" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
