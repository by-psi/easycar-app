/**
 * src/screens/ride/ride-details.jsx
 */

import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import MyButton from "../../components/btn/btn.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import icons from "../../constants/icons.js";
import { api, handleError } from "../../constants/api.js";

export default function RideDetail(props) {
    const rideId = props.route.params.rideId;
    const userId = props.route.params.userId;

    console.log(rideId, userId);
    
    const [title, setTitle] = useState("");
    const [ride, setRide] = useState({});
   
    async function RequestRideDetail() {
        try {
            const response = await api.get(`/rides/details/${rideId}`);
            if (response.data) {
                setRide(response.data);
                setTitle(response.data.passenger_name + " - " + response.data.passenger_phone);
            }
          } catch (error) {
            handleError(error);
            props.navigation.goBack();
          }
    }

    async function AcceptRide() {
        const json = {
            driver_user_id: userId,
        }
        try {
            const response = await api.put(`/rides/accept/${rideId}`, json);
            if (response.data) {
                props.navigation.goBack();
            }
        } catch (error) {
            handleError(error);
            props.navigation.goBack();
        }
    }

    async function CancelRide(){
        const json = {
            driver_user_id: userId,
        }
        try {
            const response = await api.put(`/rides/cancel/${rideId}`, json);
            if (response.data) {
                props.navigation.goBack();
            }
          } catch (error) {
            handleError(error);
            props.navigation.goBack();
        }
    }

    useEffect(()=>{
        RequestRideDetail();
    }, [])

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map}
                provider={PROVIDER_DEFAULT}
                initialRegion={{
                    latitude: Number(ride.pickup_latitude), 
                    longitude: Number(ride.pickup_longitude),
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.004
                }}
            >
                <Marker 
                    coordinate={{
                        latitude: Number(ride.pickup_latitude), 
                        longitude: Number(ride.pickup_longitude),
                    }}
                    title={ride.passenger_name}
                    description={ride.pickup_address}
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
                        style={styles.input} 
                        value={ride.pickup_address}
                        editable={false}
                    />
                </View>
                <View style={styles.footerFields}>
                    <Text style={{marginBottom: 5}}>Destino</Text>
                    <TextInput 
                        style={styles.input} 
                        value={ride.dropoff_address}
                        editable={false}
                    />
                </View>
            </View>

            { ride.status === "P" && 
                <MyButton 
                    text="ACEITAR" 
                    theme="default" 
                    onClick={AcceptRide} 
                /> 
            }

            { ride.status === "A" && 
                <MyButton 
                    text="CANCELAR" 
                    theme="red" 
                    onClick={CancelRide} 
                /> 
            }

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
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    footerText: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15
    },
    input: {
        color: "#000",
        backgroundColor: "#FFCC",
        borderWidth: 1,
        borderColor: "#CCC",
        padding: 10
    }
});