import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        App Criado por Victor de A. Costa
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'black',
    borderColor: 'lightblue',
  },
  text: {
    fontSize: 10,
    margin: 10,
    color: 'lightblue',
  },
});

export default Footer;
