import { Text, TouchableOpacity, View, Image } from 'react-native';

export default function PrincipalView({ navigation }) {
  return (
    <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
        onPress={() => navigation.push('Crear pedido')}
      >
        <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            top: 50
        }}>Publicar pedido de envío</Text>
        <Image
          style={{
            width: 350,
            height: 350,
            borderRadius: 100,
            top: 80
          }}
          source={require('../../assets/truck2.jpg')}
          resizeMode={'cover'}
        />
        <Text style={{
            top: 110,
            width: 200,
            textAlign: 'center'
        }}>Presiona en cualquier lado para publicar un pedido de envío</Text>
      </TouchableOpacity>
    </View>
  );
}
