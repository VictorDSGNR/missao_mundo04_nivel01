import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Platform, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage/lib/module/AsyncStorage.js';



const CadastroClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [imagem, setImagem] = useState(null);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const dados = await AsyncStorage.getItem('clientes');
        if (dados) setClientes(JSON.parse(dados));
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };
    carregarClientes();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('clientes', JSON.stringify(clientes));
  }, [clientes]);

  const selecionarImagem = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagem(reader.result); // URI base64
      };
      reader.readAsDataURL(file);
    }
  };

  const adicionarOuEditarCliente = () => {
    if (!nome.trim() || !endereco.trim()) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    if (editandoId) {
      const atualizados = clientes.map((c) =>
        c.id === editandoId ? { ...c, nome, endereco, contato, imagem } : c
      );
      setClientes(atualizados);
      setEditandoId(null);
    } else {
      const novo = { id: Date.now().toString(), nome, endereco, contato, imagem };
      setClientes([...clientes, novo]);
    }

    setNome('');
    setEndereco('');
    setImagem(null);
  };

  const editarCliente = (cliente) => {
    setNome(cliente.nome);
    setEndereco(cliente.endereco);
    setImagem(cliente.imagem || null);
    setContato(cliente.contato || '');
    setEditandoId(cliente.id);
  };

  const excluirCliente = (id) => {
    if (Platform.OS === 'web') {
      if (window.confirm('Deseja realmente excluir este cliente?')) {
        const atualizados = clientes.filter(c => c.id !== id);
        setClientes(atualizados);
      }
    } else {
      Alert.alert('Confirmar', 'Deseja realmente excluir este cliente?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const atualizados = clientes.filter(c => c.id !== id);
            setClientes(atualizados);
          }
        }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Clientes</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />

     <TextInput
            style={styles.input}
            placeholder="Contato"
            value={contato}
            onChangeText={setContato}
          />



<input type="file" accept="image/*" onChange={selecionarImagem} style={{ marginBottom: 10 }} />


      {imagem && <Image source={{ uri: imagem }} style={styles.imagemPreview} />}

      <Button
        title={editandoId ? 'Salvar Edição' : 'Adicionar Cliente'}
        onPress={adicionarOuEditarCliente}
      />

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imagem && <Image source={{ uri: item.imagem }} style={styles.imagemCard} />}
            <Text style={styles.textoCard}>👤 {item.nome}</Text>
            <Text>🏠 {item.endereco}</Text>
            <Text>📞 {item.contato}</Text>

            <View style={styles.botoesCard}>
              <TouchableOpacity onPress={() => editarCliente(item)} style={styles.botaoEditar}>
                <Text style={styles.textoBotaoCard}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirCliente(item.id)} style={styles.botaoExcluir}>
                <Text style={styles.textoBotaoCard}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: '#fff' },
  botaoImagem: { backgroundColor: '#3498db', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  textoBotao: { color: '#fff', fontWeight: 'bold' },
  imagemPreview: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 10, borderRadius: 10, marginBottom: 10 },
  textoCard: { fontSize: 18, fontWeight: 'bold' },
  imagemCard: { width: 80, height: 80, borderRadius: 10, marginBottom: 5 },
  botoesCard: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  botaoEditar: { backgroundColor: '#f1c40f', padding: 8, borderRadius: 5, flex: 1, marginRight: 5, alignItems: 'center' },
  botaoExcluir: { backgroundColor: '#e74c3c', padding: 8, borderRadius: 5, flex: 1, marginLeft: 5, alignItems: 'center' },
  textoBotaoCard: { color: '#fff', fontWeight: 'bold' },
});

export default CadastroClientes;
