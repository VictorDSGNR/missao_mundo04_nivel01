import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image, Platform, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage/lib/module/AsyncStorage.js';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import {  DragDropContext, Droppable, Draggable, } from 'react-beautiful-dnd';

const CadastroFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagem, setImagem] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    const carregar = async () => {
      const dados = await AsyncStorage.getItem('fornecedores');
      if (dados) setFornecedores(JSON.parse(dados));
    };
    carregar();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('fornecedores', JSON.stringify(fornecedores));
  }, [fornecedores]);

  const selecionarImagem = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagem(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const adicionarFornecedor = () => {
    if (!nome || !endereco || !contato || !categoria) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    if (editandoId) {
      const atualizados = fornecedores.map((f) =>
        f.id === editandoId
          ? { ...f, nome, endereco, contato, categoria, imagem }
          : f
      );
      setFornecedores(atualizados);
      setEditandoId(null);
    } else {
      const novo = {
        id: Date.now().toString(),
        nome,
        endereco,
        contato,
        categoria,
        imagem,
      };
      setFornecedores([...fornecedores, novo]);
    }

    setNome('');
    setEndereco('');
    setContato('');
    setCategoria('');
    setImagem(null);
  };

  const editarFornecedor = (fornecedor) => {
    setNome(fornecedor.nome);
    setEndereco(fornecedor.endereco);
    setContato(fornecedor.contato);
    setCategoria(fornecedor.categoria);
    setImagem(fornecedor.imagem || null);
    setEditandoId(fornecedor.id);
  };
const excluirFornecedor = (id) => {
    if (Platform.OS === 'web') {
      if (window.confirm('Deseja realmente excluir este fornecedor?')) {
        const atualizados = fornecedores.filter(c => c.id !== id);
        setFornecedores(atualizados);
      }
    } else {
      Alert.alert('Confirmar', 'Deseja realmente excluir este fornecedor?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const atualizados = fornecedores.filter(c => c.id !== id);
            setFornecedores(atualizados);
          }
        }
      ]);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const novaOrdem = Array.from(fornecedores);
    const [removido] = novaOrdem.splice(result.source.index, 1);
    novaOrdem.splice(result.destination.index, 0, removido);
    setFornecedores(novaOrdem);
  };

  const fornecedoresFiltrados =
    filtroCategoria === ''
      ? fornecedores
      : fornecedores.filter((f) => f.categoria === filtroCategoria);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Fornecedores</Text>

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
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
      />

            <input
        type="file"
        accept="image/*"
        onChange={selecionarImagem}
        style={{ marginBottom: 10 }}
      />
      {imagem && <Image source={{ uri: imagem }} style={styles.imagem} />}

      <Button
        title={editandoId ? 'Salvar Edição' : 'Adicionar Fornecedor'}
        onPress={adicionarFornecedor}
      />
<View style={{ marginTop: 20 }} />
       <FormControl fullWidth style={{ marginBottom: 15 }}>
        <InputLabel id="filtro-categoria-label">Filtrar por categoria</InputLabel>
        <Select
          labelId="filtro-categoria-label"
          value={filtroCategoria}
          label="Filtrar por categoria"
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>
          {[...new Set(fornecedores.map((f) => f.categoria))]
            .sort()
            .map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <br>
      </br>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fornecedores">
          {(provided) => (
            <View ref={provided.innerRef} {...provided.droppableProps}>
              {fornecedoresFiltrados.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <View
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={[styles.card, provided.draggableProps.style]}
                    >
                      {item.imagem && (
                        <Image
                          source={{ uri: item.imagem }}
                          style={styles.imagemCard}
                        />
                      )}
                      <Text style={styles.textoCard}>📌 {item.nome}</Text>
                      <Text>🏠 {item.endereco}</Text>
                      <Text>📞 {item.contato}</Text>
                      <Text>📦 {item.categoria}</Text>

                      <View style={styles.botoesCard}>
                        <TouchableOpacity
                          onPress={() => editarFornecedor(item)}
                          style={styles.botaoEditar}
                        >
                          <Text style={styles.textoBotaoCard}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => excluirFornecedor(item.id)}
                          style={styles.botaoExcluir}
                        >
                          <Text style={styles.textoBotaoCard}>Excluir</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </View>
          )}

          
        </Droppable>
      </DragDropContext>

  

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  imagem: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  textoCard: { fontSize: 18, fontWeight: 'bold' },
  imagemCard: { width: 80, height: 80, borderRadius: 10, marginBottom: 5 },
  botoesCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botaoEditar: {
    backgroundColor: '#f1c40f',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  botaoExcluir: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  textoBotaoCard: { color: '#fff', fontWeight: 'bold' },
});

export default CadastroFornecedores;
