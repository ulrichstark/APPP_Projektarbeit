import MapView from "react-native-maps";
import { StatusBar, StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";
import { ParkingLotMarker } from "./ParkingLotMarker";
import { useUserCoords } from "../hooks/useUserCoords";
import { useParkingLots } from "../hooks/useParkingLots";
import { useNearestFreeParkingLots } from "../hooks/useNearestFreeParkingLots";
import { IconButton, Card } from "react-native-paper";
import { useState } from "react";
import { formatDistance } from "../utils/formatDistance";
import { ParkingLotList } from "./ParkingLotList";
import { useMapRegion } from "../hooks/useMapRegion";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
    const [locationFocusActive, setLocationFocusActive] = useState(true);
    const [detailsExpanded, setDetailsExpanded] = useState(false);

    const userCoords = useUserCoords();
    const parkingLots = useParkingLots();
    const mapRegion = useMapRegion(userCoords, locationFocusActive);
    const nearestFreeParkingLots = useNearestFreeParkingLots(userCoords, parkingLots);

    const cardTitle = nearestFreeParkingLots
        ? `${nearestFreeParkingLots[0].name} in ${formatDistance(nearestFreeParkingLots[0].distance)}`
        : "Kein freier Parkplatz";

    return (
        <RootSiblingParent>
            <View style={styles.container}>
                <StatusBar />
                <MapView style={styles.map} showsUserLocation region={mapRegion} showsMyLocationButton={false}>
                    {parkingLots.map((parkingLot) => (
                        <ParkingLotMarker key={parkingLot.id} parkingLot={parkingLot} />
                    ))}
                </MapView>
                <Card style={styles.overlay} onPress={() => setDetailsExpanded(!detailsExpanded)}>
                    <Card.Title
                        title={cardTitle}
                        subtitle="Nächster freier Parkplatz"
                        right={() => (
                            <IconButton
                                icon={locationFocusActive ? "crosshairs-gps" : "crosshairs-off"}
                                onPress={() => setLocationFocusActive(!locationFocusActive)}
                            />
                        )}
                    />
                    {nearestFreeParkingLots && detailsExpanded && (
                        <Card.Content>
                            <ParkingLotList parkingLots={nearestFreeParkingLots} />
                        </Card.Content>
                    )}
                </Card>
            </View>
        </RootSiblingParent>
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
        top: 10,
        left: 10,
        right: 10,
    },
});
