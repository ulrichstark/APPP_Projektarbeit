import { Pressable, StyleSheet, View } from "react-native";
import { Title, Subheading } from "react-native-paper";
import { ParkingLot } from "../models/ParkingLot";
import { ParkingLotWithDistance } from "../models/ParkingLotWithDistance";
import { formatDistance } from "../utils/formatDistance";
import { FavoriteButton } from "./FavoriteButton";
import { ParkingLotDescription } from "./ParkingLotDescription";

interface Props {
    parkingLots: ParkingLotWithDistance[];
    onToggleFavorite(parkingLot: ParkingLot): void;
    onPressParkingLot(parkingLot: ParkingLot): void;
}

export function ParkingLotList(props: Props) {
    const { parkingLots, onToggleFavorite, onPressParkingLot } = props;

    return (
        <>
            {parkingLots.map((parkingLot) => (
                <Pressable key={parkingLot.id} style={styles.listItem} onPress={() => onPressParkingLot(parkingLot)}>
                    <FavoriteButton parkingLot={parkingLot} style={styles.listItemAction} onToggleFavorite={onToggleFavorite} />
                    <View style={styles.listItemCenter}>
                        <Subheading>{parkingLot.name}</Subheading>
                        <ParkingLotDescription parkingLot={parkingLot} />
                    </View>
                    <Title>{formatDistance(parkingLot.distance)}</Title>
                </Pressable>
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
    listItemAction: {
        marginLeft: 0,
    },
    listItemCenter: {
        flexGrow: 1,
        paddingRight: 10,
    },
});
