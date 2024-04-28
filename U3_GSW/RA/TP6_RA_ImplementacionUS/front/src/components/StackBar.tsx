import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import CrearPedidoScreen from "../views/CrearPedidoView";

const Stack = createStackNavigator();

const HomeView = () => (<View><Text>Home - Hello, World</Text></View>)

export default function StackBar() {
  return (
    <Stack.Navigator initialRouteName="Principal">
      <Stack.Screen name="Principal" component={HomeView} />
      <Stack.Screen name="Settings" component={CrearPedidoScreen} />
    </Stack.Navigator>
  );
}
