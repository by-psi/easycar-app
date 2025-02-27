/**
 * src/screens/drivers/drivers.jsx
 */

import { StyleSheet, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import icons from '../../constants/icons.js';
import { useCallback, useEffect, useState } from 'react';
import { api, handleError } from '../../constants/api.js';
import { useFocusEffect } from '@react-navigation/native';

export default function Ride(props) {
  const userId = 1; // (motorista) -> CourierID
  const [rides, setRides] = useState([]);

  function ClickRide(id) {
    props.navigation.navigate("ride-detail", {
        rideId: id,
        userId: userId
    });
  }

  async function RequestRides(){
    try {
      const response = await api.get(`/rides/list_for_driver/${userId}`);
      if (response.data)
        setRides(response.data);
      else 
        return {};
    } catch (error) {
      handleError(error);
      props.navigation.goBack();
    }
    setRides(json_rides);
  }

  useFocusEffect(
    useCallback(()=>{
      RequestRides();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rides}
        keyExtractor={(ride) => ride.ride_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.ride}
              onPress={() => ClickRide(item.ride_id)}>
              <View style={styles.containerName}>
                <Image source={item.status === "P" ? icons.askforride : icons.car } style={styles.car} />
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