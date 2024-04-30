import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import CrearPedidoView from './src/views/CrearPedidoView';
import PrincipalView from './src/views/PrincipalView';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Principal'>
        <Stack.Screen name='Principal' component={PrincipalView} />
        <Stack.Screen name='Crear pedido' component={CrearPedidoView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    color: 'rgb(45, 45, 45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
