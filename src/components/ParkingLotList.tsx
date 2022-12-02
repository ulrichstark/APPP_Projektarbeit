import { StyleSheet, View } from "react-native";
import { Caption, Title, Subheading } from "react-native-paper";
import { ParkingLotWithDistance } from "../models/ParkingLotWithDistance";
import { formatDistance } from "../utils/formatDistance";
import { getParkingLotDescription } from "../utils/getParkingLotDescription";

interface Props {
    parkingLots: ParkingLotWithDistance[];
}

export function ParkingLotList(props: Props) {
    const { parkingLots } = props;

    return (
        <>
            {parkingLots.map((parkingLot) => (
                <View key={parkingLot.id} style={styles.listItem}>
                    <View style={styles.listItemLeft}>
                        <Subheading>{parkingLot.name}</Subheading>
                        <Caption>{getParkingLotDescription(parkingLot)}</Caption>
                    </View>
                    <Title>{formatDistance(parkingLot.distance)}</Title>
                </View>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    listItem: {
        display: "flex",
        flexDirection: "row",
        paddingTop: 10,
        alignItems: "center",
    },
    listItemLeft: {
        flexGrow: 1,
    },
});
