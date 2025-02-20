/**
 * src/screens/passenger/passenger.jsx
 */

import { useState } from 'react';
import { StyleSheet, Image, Text, TextInput, View } from 'react-native';
import MyButton from '../../components/btn/btn';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import icons from '../../constants/icons';

export default function Passenger() {

  const [myLocation, setMyLocation] = useState({
    latitude: -23.561747,
    longitude: -46.656244,
  });

  return (
    <View style={styles.container}>
      <Image source={icons.logoBlack} style={styles.logo} />     
      <MapView 
        style={styles.map} 
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: -23.561747,
          longitude: -46.656244,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004
        }}
      >
        <Marker 
          coordinate={{
            latitude: -23.561747, // -19.827144132189964, 
            longitude: -46.656244 // -43.98309707518033,
          }}  
          title="Heber Stein Mazutti" // "Ezequias Martins"
          description="Av. Paulista, 1500" // "R. Comanches, 870 Sta. Mônica"
          image={icons.location}
          style={styles.marker}
        />     
      </MapView>

      <View style={styles.footer}>
        <View style={styles.footerText}>
            <Text>Encontre a sua carona</Text>
        </View>

        <View style={styles.footerFields}>
            <Text>Origem</Text>
            <TextInput style={styles.input} />
        </View>

        <View style={styles.footerFields}>
            <Text>Destino</Text>
            <TextInput style={styles.input} />
        </View>

        <View style={styles.footerFields}>
            <Text>Motorista</Text>
            <TextInput style={styles.input} />
        </View>
      </View>      
      <MyButton text="CONFIRMAR" theme="yellow" />
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
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 10
  }
});