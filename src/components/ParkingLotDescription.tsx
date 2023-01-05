import { View } from "react-native";
import { Paragraph, ProgressBar, Text } from "react-native-paper";
import { ParkingLot } from "../models/ParkingLot";

interface Props {
    parkingLot: ParkingLot;
    small?: boolean;
}

export function ParkingLotDescription(props: Props) {
    const { parkingLot, small } = props;
    const { closed, free, total, occupied } = parkingLot;

    if (closed) {
        return <Paragraph>Geschlossen</Paragraph>;
    }

    if (free !== undefined && total !== undefined && occupied !== undefined) {
        return (
            <View>
                {!small && (
                    <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <Paragraph>
                            <Text style={{ fontWeight: "bold" }}>{occupied}</Text> belegt
                        </Paragraph>
                        <View style={{ width: 20 }} />
                        {free > 0 && (
                            <Paragraph>
                                <Text style={{ fontWeight: "bold" }}>{free}</Text> frei
                            </Paragraph>
                        )}
                    </View>
                )}
                <ProgressBar progress={occupied / total} style={{ height: 10 }} />
            </View>
        );
    }

    return <Paragraph>Daten werden geladen...</Paragraph>;
}
