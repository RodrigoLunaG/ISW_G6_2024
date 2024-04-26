import React from 'react';
import { View, StyleSheet } from 'react-native';
import CrearPedidoScreen from './crearPedidoScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <CrearPedidoScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
