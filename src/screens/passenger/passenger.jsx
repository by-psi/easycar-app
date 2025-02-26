/**
 * src/screens/passenger/passenger.jsx
 */

import { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Image, Text, TextInput, View } from 'react-native';
import MyButton from '../../components/btn/btn';
import icons from '../../constants/icons';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync
} from 'expo-location';

export default function Passenger(props) {
  const [myLocation, setMyLocation] = useState({}); // latitude: -19.827144, longitude: -43.983097
  const [title, setTitle] = useState("");
  const [pickupAddress, setPickupAddres] = useState(""); // origem
  const [dropOffAddress, setDropOffAddress] = useState(""); // destino
  const [status, setStatus] = useState("");
  const [rideId, setRideId] = useState(0);
  const [driverName, setDriverName] = useState("");
  const userId = 1; // DeliveryID

  async function RequestRideFromUser() {
    // Acessa dados na API..

    // const response = {}; // status ""

    // const response = {
    //   ride_id: 1,
    //   passenger_user_id: 1,
    //   passenger_name: "João Silva",
    //   passenger_phone: "(31) 99999-9999",
    //   pickup_address: "Av. Álvaro Camargos, 2053 São João Batista",
    //   pickup_date: "2025-02-17",
    //   pickup_latitude: "-19.82727124903014", 
    //   pickup_longitude: "-43.96676278687116",
    //   dropoff_address: "Rua Alcides Lins, 320 Venda Nova",
    //   status: "P", // Pendente
    //   driver_user_id: null,
    //   driver_name: null,
    //   driver_phone: null
    // };

    const response = {
      ride_id: 1,
      passenger_user_id: 1,
      passenger_name: "João Silva",
      passenger_phone: "(31) 99999-9999",
      pickup_address: "Av. Álvaro Camargos, 2053 São João Batista",
      pickup_date: "2025-02-17",
      pickup_latitude: "-19.82727124903014", 
      pickup_longitude: "-43.96676278687116",
      dropoff_address: "Rua Alcides Lins, 320 Venda Nova",
      status: "A", // Aceito
      driver_user_id: 1,
      driver_name: "Ezequias Martins",
      driver_phone: "(31) 98410-7540"
    };
    
    return response;
  }

  async function RequestPermissionAndGetLocation() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();

      if (currentPosition.coords) 
        return currentPosition.coords;
      else
        return {};
    } else {
      return {};
    }
  }

  async function RequestAddressName(lat, long) {
    const response = await reverseGeocodeAsync({
      latitude: lat,
      longitude: long
    });
    // console.log(response);

    if (response[0].street && response[0].streetNumber && response[0].district) {
      setPickupAddres(response[0].street + ", " + response[0].streetNumber + " - " + response[0].district);
    }

  }

  async function loadScreen() {
    // buscar dados de corrida abarta na API para o usuário...
    const response = await RequestRideFromUser();

    if (!response.ride_id) {
      // const location = { latitude: -19.827144, longitude: -43.983097 }
      const location = await RequestPermissionAndGetLocation();
      console.log(`Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
      
      if (location.latitude) {
        setTitle("Encontre sua carona agora") // "Produto pronto para retirada..."
        setMyLocation(location);
        RequestAddressName(location.latitude, location.longitude);
      } else {
        Alert.alert('Não foi possível obter sua localização')
      }
    } else {
      setTitle(response.status === "P" ? "Aguardando uma carona...": "Carona confirmada!");
      setMyLocation({
        latitude: Number(response.pickup_latitude),
        longitude: Number(response.pickup_longitude)
      });
      setPickupAddres(response.pickup_address);
      setDropOffAddress(response.dropoff_address);
      setStatus(response.status);
      setRideId(response.ride_id);
      setDriverName(response.driver_name + " - " + response.driver_phone);
    }
  }

  async function AskForRide() {
    const json = {
      passenger_id: userId,
      pickup_address: pickupAddress,
      dropoff_address: dropOffAddress, 
      pickup_latitude: myLocation.latitude,
      pickup_longitude: myLocation.longitude
    }
    console.log("Fazer post para o servidor", json)
    props.navigation.goBack();
  }

  async function CancelRide() {
    const json = {
      passenger_user_id: userId,
      ride_id: rideId
    }
    console.log("Cancelar carona", json);
    props.navigation.goBack();
  }

  async function FinishRide() {
    const json = {
      passenger_user_id: userId,
      ride_id: rideId
    }
    console.log("Finalizar carona", json);   
    props.navigation.goBack();
  }

  useEffect(()=>{
    loadScreen();
  }, []);

  return (
    <View style={styles.container}>
      {myLocation.latitude ? 
        <>
          <Image source={icons.logoBlack} style={styles.logo} />     
          <MapView 
            style={styles.map} 
            // provider={PROVIDER_DEFAULT}
            initialRegion={{
              latitude: myLocation.latitude, //-23.561747,
              longitude: myLocation.longitude, //-46.656244,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker 
              coordinate={{
                latitude: myLocation.latitude, // -19.827144132189964, 
                longitude: myLocation.longitude, // -43.98309707518033,
              }}  
              title="Ezequias Martins"
              description="R. Comanches, 870 Sta. Mônica"
              image={icons.location}
              style={styles.marker}
            />     
          </MapView>

          <View style={styles.footer}>
            <View style={styles.footerText}>
                <Text style={{fontWeight: "bold"}}>{title}</Text>
            </View>

            <View style={styles.footerFields}>
                <Text style={{marginBottom: 5}}>Origem</Text>
                <TextInput 
                  style={[styles.input, {backgroundColor: status === "" ? "#FFF" : "#FFCC"}]} 
                  value={pickupAddress} 
                  onChangeText={(text)=>setPickupAddres(text)}
                  editable={status === "" ? true : false}
                />
            </View>

            <View style={styles.footerFields}>
                <Text style={{marginBottom: 5}}>Destino</Text>
                <TextInput 
                  style={[styles.input, {backgroundColor: status === "" ? "#FFF" : "#FFCC"}]} 
                  value={dropOffAddress} 
                  onChangeText={(text)=>setDropOffAddress(text)}
                  editable={status === "" ? true : false}
                />
            </View>

            {status === "A" && 
              <View style={styles.footerFields}>
                <Text style={{marginBottom: 5}}>Motorista</Text>
                <TextInput 
                  style={[styles.input, {backgroundColor: status === "" ? "#FFF" : "#FFCC"}]} 
                  value={driverName}
                  editable={false} 
                />
              </View>
            }

          </View>      
          { status === "" && 
            <MyButton 
              text="CONFIRMAR" 
              theme="default" 
              onClick={AskForRide} 
            /> 
          }
          { status === "P" && 
            <MyButton 
              text="CANCELAR" 
              theme="red" 
              onClick={CancelRide} 
            /> 
          }
          { status === "A" && 
            <MyButton 
              text="FINALIZAR CARONA" 
              theme="red" 
              onClick={FinishRide} 
            /> 
          }
        </> 
      : 
        <View>
          <ActivityIndicator
            size="50"
          />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%"
  },
  marker: {
    width: 60,
    height: 60
  },
  logo: {
    width: 200,
    height: 46,
  },  
  text: {
    color: '#0099CC',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 30
  },
  footer: {
    width: '100%',
    backgroundColor: "#FFF",
  },
  footerFields: {
    margin: 15
  },
  footerText: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10
  }
});


// useEffect(()=>{
//   async function getLocationPermission() {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       setErrorMsg('Permissão de localização negada');
//       return;
//     }
//     // obtendo a localização atual
//     let locationData = await Location.getCurrentPositionAsync({});
//     setMyLocation(locationData.coords);
//   }
//   getLocationPermission();
// }, [])

// let text = 'Aguardando permissão de localização...';
// if (errorMsg) {
//   text = errorMsg;
// } else if (myLocation) {
//   text = `Latitude: ${myLocation.latitude}, Longitude: ${myLocation.longitude}`;
// }
