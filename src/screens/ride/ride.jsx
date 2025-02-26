/**
 * src/screens/drivers/drivers.jsx
 */

import { StyleSheet, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { json_rides } from '../../constants/dados';
import icons from '../../constants/icons.js';
import { useEffect, useState } from 'react';

export default function Ride(props) {
  const userId = 2; // CourierID
  const [rides, setRides] = useState([]);

  function ClickRide(id, passenger_id) {
    props.navigation.navigate("ride-detail", {
      rideId: id,
      userId: passenger_id,
    });
  }

  async function RequestRides(){
    // Acessar a API para buscar e listar as caronas...
    setRides(json_rides);
  }

  useEffect(()=>{
    RequestRides();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={rides}
        keyExtractor={(ride) => ride.ride_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.ride}
              onPress={() => ClickRide(item.ride_id, item.passenger_user_id)}>
              <View style={styles.containerName}>
                <Image source={icons.car} style={styles.car} />
                <Text style={styles.name}>{item.passenger_name}</Text>
              </View>
              <Text style={styles.address}>Origem: {item.pickup_address}</Text>
              <Text style={styles.address}>Destino: {item.dropoff_address}</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  name: {
    fontSize: 17,
    fontWeight: "bold"
  },
  address: {
    fontSize: 14,
    color: "#8A8A8A"
  },
  car: {
    width: 30,
    height: 30,
    margin: 3
  },
  containerName: {
    flexDirection: "row"
  },
  ride: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DFDFDF"
  }
});