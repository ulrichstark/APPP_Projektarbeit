import MapView, { Marker, Region } from "react-native-maps";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { registerRootComponent } from "expo";
import { ParkingLotMarker } from "./ParkingLotMarker";
import { useUserCoords } from "../hooks/useUserCoords";
import { useParkingLots } from "../hooks/useParkingLots";
import { useNearestFreeParkingLots } from "../hooks/useNearestFreeParkingLots";

export default function App() {
    const userCoords = useUserCoords();
    const parkingLots = useParkingLots();
    const nearestFreeParkingLots = useNearestFreeParkingLots(userCoords, parkingLots);
    const nearestFreeParkingLot = nearestFreeParkingLots?.[0] || null;

    const mapRegionDelta = 0.005;
    const mapRegion: Region | undefined = userCoords
        ? { latitude: userCoords.latitude, longitude: userCoords.longitude, latitudeDelta: mapRegionDelta, longitudeDelta: mapRegionDelta }
        : undefined;

    return (
        <View style={styles.container}>
            <StatusBar />
            <MapView style={styles.map} showsUserLocation region={mapRegion}>
                {parkingLots.map((parkingLot) => (
                    <ParkingLotMarker key={parkingLot.id} parkingLot={parkingLot} />
                ))}
                {userCoords && <Marker coordinate={userCoords} />}
            </MapView>
            <View style={styles.overlay}>
                {nearestFreeParkingLot && (
                    <View style={styles.nearestFreeParkingLot}>
                        <Text style={styles.textSmall}>Nächster freier Parkplatz</Text>
                        <Text style={styles.textLarge}>
                            {nearestFreeParkingLot.name} - {Math.round(nearestFreeParkingLot.distance)} m
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

registerRootComponent(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    map: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        left: 10,
        top: 10,
    },
    nearestFreeParkingLot: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
    },
    textSmall: {
        opacity: 0.7,
    },
    textMedium: {
        fontSize: 16,
    },
    textLarge: {
        fontSize: 20,
    },
});
