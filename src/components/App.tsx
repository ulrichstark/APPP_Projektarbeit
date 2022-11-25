import MapView, { Marker, Region } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";
import { ParkingLotMarker } from "./ParkingLotMarker";
import { useUserCoords } from "../hooks/useUserCoords";
import { useParkingLots } from "../hooks/useParkingLots";

export default function App() {
    const userCoords = useUserCoords();
    const parkingLots = useParkingLots();

    const mapRegionDelta = 0.005;
    const mapRegion: Region | undefined = userCoords
        ? { latitude: userCoords.latitude, longitude: userCoords.longitude, latitudeDelta: mapRegionDelta, longitudeDelta: mapRegionDelta }
        : undefined;

    return (
        <View style={styles.container}>
            <MapView style={styles.map} showsUserLocation region={mapRegion}>
                {parkingLots.map((parkingLot) => (
                    <ParkingLotMarker key={parkingLot.id} parkingLot={parkingLot} />
                ))}
                {userCoords && <Marker coordinate={userCoords} />}
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
