import MapView, { Marker } from "react-native-maps";
import { requestForegroundPermissionsAsync } from "expo-location";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { registerRootComponent } from "expo";
import { initialParkingLots } from "../initialParkingLots";

export default function App() {
    const [parkingLots, setParkingLots] = useState(initialParkingLots);

    useEffect(() => {
        requestForegroundPermissionsAsync();
    }, []);

    return (
        <View style={styles.container}>
            <MapView style={styles.map} showsUserLocation followsUserLocation>
                {parkingLots.map((parkingLot) => (
                    <Marker key={parkingLot.id} coordinate={{ ...parkingLot }} title={parkingLot.name} />
                ))}
            </MapView>
        </View>
    );
}

registerRootComponent(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
