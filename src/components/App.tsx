import MapView, { Marker } from "react-native-maps";
import { requestForegroundPermissionsAsync } from "expo-location";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { registerRootComponent } from "expo";
import { initialParkingLots } from "../initialParkingLots";
import { XMLParser } from "fast-xml-parser";
import { ApiResponse } from "../models/ApiResponse";
import { getParkingLotDescription } from "../utils/getParkingLotDescription";

export default function App() {
    const [parkingLots, setParkingLots] = useState(initialParkingLots);

    useEffect(() => {
        requestForegroundPermissionsAsync();
    }, []);

    useEffect(() => {
        fetch("https://parken.amberg.de/wp-content/uploads/pls/pls.xml")
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

    return (
        <View style={styles.container}>
            <MapView style={styles.map} showsUserLocation followsUserLocation>
                {parkingLots.map((parkingLot) => (
                    <Marker
                        key={parkingLot.id}
                        coordinate={{ ...parkingLot }}
                        title={parkingLot.name}
                        description={getParkingLotDescription(parkingLot)}
                    />
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
