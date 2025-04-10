import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LogoMeeting = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://i.ibb.co/QvVcDQqJ/meeting.png',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    logo: {
        width: 1000,
        height: 300,
        resizeMode: 'contain',
      },
    container: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  
});

export default LogoMeeting;
