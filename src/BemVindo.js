import React, { useState, useEffect } from 'react';
import { Text, Image, TextInput, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage/lib/module/AsyncStorage.js';

const BemVindo = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const loadName = async () => {
      const savedName = await AsyncStorage.getItem('userName');
      if (savedName) {
        setName(savedName);
      }
    };
    loadName();
  }, []);

    useEffect(() => {
    if (name) {
      AsyncStorage.setItem('userName', name);
    }
  }, [name]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Identifique-se"
        onChangeText={(text) => setName(text)}
        value={name}
      />
            <Text style={styles.text}>
        Seja Bem-Vindo ao Meeting{name ? `, ${name}!` : '!'}
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
    fontSize: 20,
    margin: 10,
    color: 'lightblue',
  },
  input: {
    height: 40,
    borderColor: 'lightblue',
    borderWidth: 2,
    width: '80%',
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'lightblue',
    textAlign: 'center',
      },
  tinyLogo: {
    margin: 10,
    alignItems: 'center',  
    width: 60,
    height: 50,
  },
});

export default BemVindo;