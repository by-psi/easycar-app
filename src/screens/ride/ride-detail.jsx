/**
 * src/screens/ride/ride-details.jsx
 */

import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import MyButton from "../../components/btn/btn.jsx";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import icons from "../../constants/icons.js";

export default function RideDetail(props) {
    const rideId = props.route.params.rideId;
    const userId = props.route.params.userId;
    const [title, setTitle] = useState("");
    const [ride, setRide] = useState({});
   
    async function RequestRideDetail() {

        // Get (buscar), Post (inserir), Put (atualizar), Delete (remover)

        // const response = {
        //     ride_id: 2,
        //     passenger_user_id: 2,
        //     passenger_name: "Paulo César",
        //     passenger_phone: "(31) 99999-9999",
        //     pickup_address: "Rua dos Astecas, 2917 - Santa Mônica",
        //     pickup_latitude: "-19.8297025",
        //     pickup_longitude: "-43.9792047",
        //     pickup_date: "2025-02-16",
        //     dropoff_address: "R. Padre Pedro Pinto, 933 - Venda Nova",
        //     status: "P",
        //     driver_user_id: 1,
        //     driver_name: null,
        //     driver_phone: null,
        // }

        const response = {
            ride_id: 2,
            passenger_user_id: 2,
            passenger_name: "Paulo César",
            passenger_phone: "(31) 99999-9999",
            pickup_address: "Rua dos Astecas, 2917 - Santa Mônica",
            pickup_latitude: "-19.8297025",
            pickup_longitude: "-43.9792047",
            pickup_date: "2025-02-16",
            dropoff_address: "R. Padre Pedro Pinto, 933 - Venda Nova",
            status: "A",
            driver_user_id: 1,
            driver_name: "Ezequias Matins",
            driver_phone: "(31) 98410-7540",
        }

        if (response.passenger_name) {
            setTitle(response.passenger_name + " - " + response.passenger_phone);
            setRide(response);
        }
    }

    async function AcceptRide(){
        const json = {
            passenger_user_id: userId,
            ride_id: rideId
        }
        console.log("Aceitar", json)
        props.navigation.goBack();
    }

    async function CancelRide(){
        const json = {
            driver_user_id: userId,
            ride_id: rideId
        }
        console.log("Cancelar", json)
        props.navigation.goBack();
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
        margin: 15
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