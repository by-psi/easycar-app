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
import { api, handleError } from '../../constants/api';

export default function Passenger(props) {
  const [myLocation, setMyLocation] = useState({}); // latitude: -19.827144, longitude: -43.983097
  const [title, setTitle] = useState("");
  const [pickupAddress, setPickupAddres] = useState(""); // origem
  const [dropOffAddress, setDropOffAddress] = useState(""); // destino
  const [status, setStatus] = useState("");
  const [rideId, setRideId] = useState(0);
  const [driverName, setDriverName] = useState("");
  const userId = 3; // (passageiro) -> ColetaID

  async function RequestRideFromUser() {
    try {
      const response = await api.get("/rides/list", {
        params: {
          passenger_user_id: userId,
          pickup_date: new Date().toISOString("pt-BR", { timeZone: "America/Sao_Paulo" }).substring(0, 10),
          status_not: "F"
        }
      });
      if (response.data[0])
        return response.data[0]
      else 
        return {};
    } catch (error) {
      handleError(error);
      props.navigation.goBack();
    }
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
    try {
      const json = {
        passenger_user_id: userId,
        pickup_address: pickupAddress,
        pickup_latitude: myLocation.latitude,
        pickup_longitude: myLocation.longitude,
        dropoff_address: dropOffAddress
      }
      const response = await api.post("/rides/insert", json);
      if (response.data)
        props.navigation.goBack();
    } catch (error) {
      handleError(error);
      props.navigation.goBack();
    }
  }

  async function CancelRide() {
    try {
      const response = await api.delete(`/rides/delete/${rideId}`);
      if (response.data)
        props.navigation.goBack();
    } catch (error) {
      handleError(error);
      props.navigation.goBack();
    }
  }

  async function FinishRide() {
    const json = {
      passenger_user_id: userId,
    }
    try {
      const response = await api.put(`/rides/finish/${rideId}`, json);
      if (response.data)
        props.navigation.goBack();
    } catch (error) {
      handleError(error);
      props.navigation.goBack();
    }
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
