import MapView from "react-native-maps";
import { StatusBar, StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";
import { ParkingLotMarker } from "./ParkingLotMarker";
import { useUserCoords } from "../hooks/useUserCoords";
import { useParkingLots } from "../hooks/useParkingLots";
import { useParkingLotsWithDistance } from "../hooks/useParkingLotsWithDistance";
import { IconButton, Card } from "react-native-paper";
import { useMemo, useState } from "react";
import { formatDistance } from "../utils/formatDistance";
import { ParkingLotList } from "./ParkingLotList";
import { useMapRegion } from "../hooks/useMapRegion";
import { RootSiblingParent } from "react-native-root-siblings";
import { useGeofenceEffect } from "../hooks/useGeofenceEffect";

export default function App() {
    const [locationFocusActive, setLocationFocusActive] = useState(true);
    const [detailsExpanded, setDetailsExpanded] = useState(false);

    const userCoords = useUserCoords();
    const parkingLots = useParkingLots();
    const mapRegion = useMapRegion(userCoords, locationFocusActive);
    const parkingLotsWithDistance = useParkingLotsWithDistance(userCoords, parkingLots);

    const nearestFreeParkingLot = useMemo(() => {
        for (const parkingLot of parkingLotsWithDistance) {
            if (parkingLot.free && parkingLot.free > 0) {
                return parkingLot;
            }
        }

        return null;
    }, [parkingLotsWithDistance]);

    const cardTitle = nearestFreeParkingLot
        ? `${nearestFreeParkingLot.name} in ${formatDistance(nearestFreeParkingLot.distance)}`
        : "Kein freier Parkplatz";

    useGeofenceEffect(parkingLotsWithDistance);

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
                    {detailsExpanded && (
                        <Card.Content>
                            <ParkingLotList parkingLots={parkingLotsWithDistance} />
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
