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

    return (
        <Marker coordinate={parkingLot}>
            <Callout onPress={onCalloutPress}>
                <View style={styles.callout}>
                    <Subheading style={{ color: "#08e" }}>{parkingLot.name}</Subheading>
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
