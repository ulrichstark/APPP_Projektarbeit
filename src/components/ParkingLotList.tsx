import { StyleSheet, View } from "react-native";
import { Caption, Title, Subheading, IconButton } from "react-native-paper";
import { ParkingLot } from "../models/ParkingLot";
import { ParkingLotWithDistance } from "../models/ParkingLotWithDistance";
import { formatDistance } from "../utils/formatDistance";
import { getParkingLotDescription } from "../utils/getParkingLotDescription";

interface Props {
    parkingLots: ParkingLotWithDistance[];
    onToggleFavorite(parkingLot: ParkingLot): void;
}

export function ParkingLotList(props: Props) {
    const { parkingLots, onToggleFavorite } = props;

    return (
        <>
            {parkingLots.map((parkingLot, index) =>
                index > 0 ? (
                    <View key={parkingLot.id} style={styles.listItem}>
                        <IconButton
                            icon={parkingLot.favorite ? "heart" : "heart-outline"}
                            color={parkingLot.favorite ? "red" : "#666"}
                            onPress={() => onToggleFavorite(parkingLot)}
                            style={styles.listItemAction}
                        />
                        <View style={styles.listItemCenter}>
                            <Subheading>{parkingLot.name}</Subheading>
                            <Caption>{getParkingLotDescription(parkingLot)}</Caption>
                        </View>
                        <Title>{formatDistance(parkingLot.distance)}</Title>
                    </View>
                ) : null
            )}
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
    listItemAction: {
        marginLeft: 0,
    },
    listItemCenter: {
        flexGrow: 1,
    },
});
