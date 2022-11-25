import MapView, { Marker, Region } from "react-native-maps";
import { requestForegroundPermissionsAsync, startLocationUpdatesAsync, LocationObject } from "expo-location";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { registerRootComponent } from "expo";
import { initialParkingLots } from "../initialParkingLots";
import { XMLParser } from "fast-xml-parser";
import { ApiResponse } from "../models/ApiResponse";
import { getParkingLotDescription } from "../utils/getParkingLotDescription";
import { Coordinate } from "../models/Coordinate";
import { defineTask } from "expo-task-manager";
import { config } from "../config";

export default function App() {
    const [userCoords, setUserCoords] = useState<Coordinate | null>(null);
    const [parkingLots, setParkingLots] = useState(initialParkingLots);

    useEffect(() => {
        requestForegroundPermissionsAsync().then(() => {
            defineTask(config.taskLocationUpdates, ({ data, error }) => {
                if (error) {
                    // check error.message for more details.
                    return;
                } else {
                    const locations: LocationObject[] = (data as any).locations;

                    if (locations) {
                        const location = locations[0];

                        setUserCoords(location.coords);
                    }
                }
            });

            startLocationUpdatesAsync(config.taskLocationUpdates);
        });
    }, []);

    useEffect(() => {
        fetch(config.parkingLotsApi)
            .then((response) => response.text())
            .then((responseText) => {
                const parser = new XMLParser({ processEntities: true, htmlEntities: true });
                const responseObject = parser.parse(responseText) as ApiResponse;

                const newParkingLots = [...parkingLots];

                if (responseObject && responseObject.Daten && responseObject.Daten.Parkhaus) {
                    for (const parkingLotApi of responseObject.Daten.Parkhaus) {
                        const parkingLot = newParkingLots.find((p) => p.id === parkingLotApi.ID);

                        if (parkingLot) {
                            parkingLot.total = parkingLotApi.Gesamt;
                            parkingLot.occupied = parkingLotApi.Aktuell;
                            parkingLot.free = parkingLotApi.Frei;
                            parkingLot.trend = parkingLotApi.Trend;
                            parkingLot.status = parkingLotApi.Status;
                            parkingLot.closed = parkingLotApi.Geschlossen === 1;
                        }
                    }
                }

                setParkingLots(newParkingLots);
            });
    }, []);

    const mapRegionDelta = 0.005;
    const mapRegion: Region | undefined = userCoords
        ? { latitude: userCoords.latitude, longitude: userCoords.longitude, latitudeDelta: mapRegionDelta, longitudeDelta: mapRegionDelta }
        : undefined;

    return (
        <View style={styles.container}>
            <MapView style={styles.map} showsUserLocation region={mapRegion}>
                {parkingLots.map((parkingLot) => (
                    <Marker
                        key={parkingLot.id}
                        coordinate={{ ...parkingLot }}
                        title={parkingLot.name}
                        description={getParkingLotDescription(parkingLot)}
                    />
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
