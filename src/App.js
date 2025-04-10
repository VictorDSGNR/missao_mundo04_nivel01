import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CadastroClientes from './CadastroCliente';
import BemVindo from './BemVindo';
import CadastroFornecedores from './CadastroFornecedores';
import LogoMeeting from './Logo';
import Footer from './Foot';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
                <BemVindo />
                <LogoMeeting />
        <CadastroClientes />
        <CadastroFornecedores />
        <Footer />
                    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  text: {
    padding: 10,
    fontSize: 42,
  },
});

export default App;