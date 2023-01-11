import { StyleSheet, View } from "react-native";
import { Button, Dialog, IconButton, Paragraph, Portal, Title } from "react-native-paper";
import { ParkingLot } from "../models/ParkingLot";
import { ParkingLotWithDistance } from "../models/ParkingLotWithDistance";
import { formatDistance } from "../utils/formatDistance";
import { openNavigation } from "../utils/openNavigation";
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
                <View style={styles.header}>
                    <FavoriteButton parkingLot={parkingLot} onToggleFavorite={onToggleFavorite} />
                    <Title style={styles.title}>{parkingLot.name}</Title>
                    <IconButton icon="close" onPress={onDismiss} />
                </View>
                <Dialog.Content>
                    <ParkingLotDescription parkingLot={parkingLot} />
                    <View style={styles.cellContainer}>
                        <View style={styles.cell}>
                            <Paragraph>Öffnungszeiten</Paragraph>
                            <Paragraph style={styles.importantValue}>{parkingLot.openingTimes}</Paragraph>
                        </View>
                        <View style={styles.cell}>
                            <Paragraph>Preis (erste Stunde)</Paragraph>
                            <Paragraph style={styles.importantValue}>{parkingLot.price.toFixed(2)}€</Paragraph>
                        </View>
                        <View style={styles.cell}>
                            <Paragraph>Trend der Belegung</Paragraph>
                            <Paragraph
                                style={[styles.importantValue, { color: parkingLot.trend ? (parkingLot.trend > 0 ? "red" : "green") : undefined }]}
                            >
                                {parkingLot.trend ? (parkingLot.trend > 0 ? "steigt ▲" : "fällt ▼") : "gleichbleibend ⬤"}
                            </Paragraph>
                        </View>
                        <View style={styles.cell}>
                            <Paragraph>Entfernung</Paragraph>
                            <Paragraph style={styles.importantValue}>{formatDistance(parkingLot.distance)}</Paragraph>
                        </View>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button icon="navigation-variant" onPress={() => openNavigation(parkingLot)}>
                        Navigation starten
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    title: {
        flexGrow: 1,
    },
    cellContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    cell: {
        marginTop: 20,
        width: "50%",
        display: "flex",
        alignItems: "center",
    },
    importantValue: {
        fontWeight: "bold",
    },
});
