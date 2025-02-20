/**
 * src/routes.js
 */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import Home from "./screens/home/home.jsx";
import Passenger from "./screens/passenger/passenger.jsx";
import Ride from "./screens/ride/ride.jsx";
import RideDetail from "./screens/ride/ride-detail.jsx";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen 
          name="home" 
          component={Home} 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="passenger" 
          component={Passenger} 
          options={{
            headerShadowVisible: true,
            headerTitle: "PASSAGEIRO",           
          }}
        />
        <Stack.Screen 
          name="ride" 
          component={Ride}
          options={{
            headerTitle: "Viagens Disponíveis",
            headerShadowVisible: true,
            headerTitleAlign: "center"
          }} 
        />
        <Stack.Screen name="ride-detail" component={RideDetail}
          options={{
            headerTitle: "Detalhes da Viagem",
            headerShadowVisible: true,
            headerTitleAlign: "center"
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  navigate:{
    backgroundColor: '#999999'
  }
});
