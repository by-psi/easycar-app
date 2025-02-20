/**
 * src/screens/ride/ride-details.jsx
 */

import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import MyButton from "../../components/btn/btn.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import icons from "../../constants/icons.js";

export default function RideDetail(props) {

    const [myLocation, setMyLocation] = useState({
        latitude: 20,
        longitude: 20
    });

    return (
        <View style={styles.container}>
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
                        latitude: -23.561747,
                        longitude: -46.656244
                    }}
                    title="Heber Stein Mazutti"
                    description="Av. Paulista, 1500"
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
            </View>
            <MyButton text="ACEITAR" theme="yellow" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1,
        width: "100%"
    },
    marker: {
        width: 60,
        height: 60
    },
    footer: {
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