import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

const Cat = () => {
  const [name, setName] = useState(''); 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, I am {name || '...'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Name me!"
        onChangeText={(text) => setName(text)} 
        value={name} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: 'lightblue',
  },
  input: {
    height: 40,
    borderColor: 'lightblue',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    borderRadius: 5,
    },
});

export default Cat;