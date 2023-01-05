import { StyleSheet, View } from "react-native";
import { Button, Dialog, Paragraph, Portal, Title } from "react-native-paper";
import { ParkingLot } from "../models/ParkingLot";
import { ParkingLotWithDistance } from "../models/ParkingLotWithDistance";
import { formatDistance } from "../utils/formatDistance";
import { FavoriteButton } from "./FavoriteButton";
import { ParkingLotDescription } from "./ParkingLotDescription";

interface Props {
    parkingLot: ParkingLotWithDistance;
    onDismiss(): void;
    onToggleFavorite(parkingLot: ParkingLot): void;
}

export function ParkingLotDialog(props: Props) {
    const { parkingLot, onDismiss, onToggleFavorite } = props;

    return (
        <Portal>
            <Dialog visible onDismiss={onDismiss}>
                <View style={styles.title}>
                    <FavoriteButton parkingLot={parkingLot} onToggleFavorite={onToggleFavorite} />
                    <Title>{parkingLot.name}</Title>
                </View>
                <Dialog.Content>
                    <ParkingLotDescription parkingLot={parkingLot} />
                    <View style={[styles.row, { marginTop: 15 }]}>
                        <Paragraph>Trend der Belegung</Paragraph>
                        <Paragraph style={styles.importantValue}>
                            {parkingLot.trend ? (parkingLot.trend > 0 ? "steigt" : "fällt") : "Gleichbleibend"}
                        </Paragraph>
                    </View>
                    <View style={styles.row}>
                        <Paragraph>Entfernung</Paragraph>
                        <Paragraph style={styles.importantValue}>{formatDistance(parkingLot.distance)}</Paragraph>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    title: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    importantValue: {
        fontWeight: "bold",
    },
});
