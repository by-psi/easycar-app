/**
 * src/screens/home.jsx
 */

import { ImageBackground, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import icons from "../../constants/icons.js"

export default function Home(props) {

  function OpenPassenger() {
    props.navigation.navigate("passenger")
  }

  function OpenRide() {
    props.navigation.navigate("ride")
  }

  return (
    <ImageBackground 
      source={icons.bg} 
      resizeMode='cover' 
      style={styles.container}
    >
      <Image source={icons.logo} style={styles.logo} />

      <TouchableOpacity style={styles.btn} onPress={OpenPassenger}>
        <Image source={icons.passenger} style={styles.img}/>
        <Text style={styles.title}>Passageiro</Text>
        <Text style={styles.subtitle}>Encontre uma carona pra você!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={OpenRide}>
        <Image source={icons.driver} style={{width: 150, height: 150}}/>
        <Text style={styles.title}>Motorista</Text>
        <Text style={styles.subtitle}>Ofereça uma carona em seu carro!</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',   
    width: "100%",
    marginTop: 30
  },
  logo: {
    width: 200,
    height: 46,
    marginBottom: 40
  },  
  img: {
    width: 150, 
    height: 150,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20
  },
  title: {
    color: '#0099CC',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 30
  },
  subtitle: {
    fontStyle: 'italic',
    color: '#0099CC'
  }
});