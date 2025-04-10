import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center', // Centraliza os elementos
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
}); 

const DisplayAnImageWithStyle = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
      />
    </View>
  );
};

const Display = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
      <Image style={styles.tinyLogo} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
      <Image style={styles.logo} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
    </View>
  );
};

export { Display, DisplayAnImageWithStyle };