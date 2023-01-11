import { StyleSheet, View } from "react-native";
import { Callout, Marker } from "react-native-maps";
import { Subheading } from "react-native-paper";
import { ParkingLot } from "../models/ParkingLot";
import { ParkingLotDescription } from "./ParkingLotDescription";

interface Props {
    parkingLot: ParkingLot;
    onCalloutPress(): void;
}

export function ParkingLotMarker(props: Props) {
    const { parkingLot, onCalloutPress } = props;
    const { free, total, name } = parkingLot;

    // Grün: mehr als 20% frei
    // Gelb: weniger als 20% frei
    // Rot: nichts frei
    const pinColor = free && total ? (free / total > 0.2 ? "green" : "yellow") : "red";

    return (
        <Marker coordinate={parkingLot} pinColor={pinColor}>
            <Callout onPress={onCalloutPress}>
                <View style={styles.callout}>
                    <Subheading style={{ color: "#08e" }}>{name}</Subheading>
                    <ParkingLotDescription parkingLot={parkingLot} />
                </View>
            </Callout>
        </Marker>
    );
}

const styles = StyleSheet.create({
    callout: {
        margin: 10,
    },
});
