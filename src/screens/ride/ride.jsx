/**
 * src/screens/drivers/drivers.jsx
 */

import { StyleSheet, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { json_rides } from '../../constants/dados';
import icons from '../../constants/icons.js';

export default function Ride(props) {

  function ClickRide(id) {
    console.log("Ride=" + id);
    props.navigation.navigate("ride-detail");
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={json_rides}
        keyExtractor={(ride) => ride.ride_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.ride}
              onPress={() => ClickRide(item.ride_id)}>
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
    backgroundColor: '#fff',
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
    width: 20,
    height: 20,
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