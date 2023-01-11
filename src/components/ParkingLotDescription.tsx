import { View } from "react-native";
import { Paragraph, ProgressBar, Text } from "react-native-paper";
import { ParkingLot } from "../models/ParkingLot";

interface Props {
    parkingLot: ParkingLot;
}

export function ParkingLotDescription(props: Props) {
    const { parkingLot } = props;
    const { closed, free, total, occupied } = parkingLot;

    if (closed) {
        return <Paragraph>Geschlossen</Paragraph>;
    }

    if (free !== undefined && total !== undefined && occupied !== undefined) {
        return (
            <View style={{ position: "relative", minWidth: 180 }}>
                <ProgressBar progress={occupied / total} style={{ height: 25 }} />
                <Paragraph style={{ position: "absolute", left: 10, color: "white" }}>
                    <Text style={{ fontWeight: "bold", color: "white" }}>{occupied}</Text> belegt
                </Paragraph>
                {free > 0 && (
                    <Paragraph style={{ position: "absolute", right: 10 }}>
                        frei <Text style={{ fontWeight: "bold" }}>{free}</Text>
                    </Paragraph>
                )}
            </View>
        );
    }

    return <Paragraph>Daten werden geladen...</Paragraph>;
}
