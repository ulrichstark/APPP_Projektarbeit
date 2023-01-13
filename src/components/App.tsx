import MapView from "react-native-maps";
import { StatusBar, StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";
import { ParkingLotMarker } from "./ParkingLotMarker";
import { useUserCoords } from "../hooks/useUserCoords";
import { useParkingLots } from "../hooks/useParkingLots";
import { useParkingLotsWithDistance } from "../hooks/useParkingLotsWithDistance";
import { IconButton, Card, DefaultTheme, Theme } from "react-native-paper";
import { useMemo, useState } from "react";
import { formatDistance } from "../utils/formatDistance";
import { ParkingLotList } from "./ParkingLotList";
import { useMapRegion } from "../hooks/useMapRegion";
import { RootSiblingParent } from "react-native-root-siblings";
import { useGeofenceEffect } from "../hooks/useGeofenceEffect";
import { useFavorites } from "../hooks/useFavorites";
import { SettingsMenu } from "./SettingsMenu";
import { Provider as PaperProvider } from "react-native-paper";
import { useSetting } from "../hooks/useSetting";
import { SettingItem } from "./SettingItem";
import { useTTS } from "../hooks/useTTS";
import { ParkingLotDialog } from "./ParkingLotDialog";
import { FavoriteButton } from "./FavoriteButton";

const theme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#08e",
    },
};

export default function App() {
    const [locationFocus, toggleLocationFocus] = useSetting("setting-location-focus", true);
    const [ttsEnabled, toggleTtsEnabled] = useSetting("tts", true);
    const [onlyFavorites, toggleOnlyFavorites] = useSetting("only-favorites", false);

    const [listExpanded, setListExpanded] = useState(false);
    const [parkingLotIdForDialog, setParkingLotIdForDialog] = useState<number | null>(null);

    const tts = useTTS(ttsEnabled);
    const [favorites, toggleFavorite] = useFavorites();
    const userCoords = useUserCoords();
    const parkingLots = useParkingLots(favorites, onlyFavorites);
    const parkingLotsWithDistance = useParkingLotsWithDistance(userCoords, parkingLots);

    const nearestFreeParkingLot = useMemo(() => {
        for (const parkingLot of parkingLotsWithDistance) {
            if (parkingLot.free && parkingLot.free > 0) {
                return parkingLot;
            }
        }

        return null;
    }, [parkingLotsWithDistance]);

    const parkingLotForDialog = useMemo(() => {
        return parkingLotsWithDistance.find((parkingLot) => parkingLot.id === parkingLotIdForDialog);
    }, [parkingLotsWithDistance, parkingLotIdForDialog]);

    const cardTitle = nearestFreeParkingLot ? nearestFreeParkingLot.name : userCoords ? "Kein Parkplatz verfügbar" : "Standort wird geladen...";
    const cardSubtitle = nearestFreeParkingLot ? `${formatDistance(nearestFreeParkingLot.distance)} - Nächster freier Parkplatz` : "";

    const mapRegion = useMapRegion(userCoords, nearestFreeParkingLot, locationFocus);
    useGeofenceEffect(parkingLotsWithDistance, tts);

    return (
        <PaperProvider theme={theme}>
            <RootSiblingParent>
                <View style={styles.container}>
                    <StatusBar />
                    <MapView style={styles.map} showsUserLocation region={mapRegion} showsMyLocationButton={false}>
                        {parkingLots.map((parkingLot) => (
                            <ParkingLotMarker
                                key={parkingLot.id}
                                parkingLot={parkingLot}
                                onCalloutPress={() => setParkingLotIdForDialog(parkingLot.id)}
                            />
                        ))}
                    </MapView>
                    <View style={styles.overlay}>
                        <Card onPress={() => setListExpanded(!listExpanded)}>
                            <Card.Title
                                title={cardTitle}
                                subtitle={cardSubtitle}
                                subtitleStyle={{ fontSize: 14 }}
                                left={
                                    nearestFreeParkingLot
                                        ? () => <FavoriteButton parkingLot={nearestFreeParkingLot} onToggleFavorite={toggleFavorite} />
                                        : undefined
                                }
                                right={() => (
                                    <View style={{ flexDirection: "row", marginRight: 5 }}>
                                        <IconButton
                                            icon={listExpanded ? "chevron-up" : "chevron-down"}
                                            style={{ margin: 0 }}
                                            onPress={() => setListExpanded(!listExpanded)}
                                        />
                                        <SettingsMenu>
                                            <SettingItem
                                                title="Automatischer Fokus"
                                                icon="image-filter-center-focus"
                                                value={locationFocus}
                                                onValueChange={toggleLocationFocus}
                                            />
                                            <SettingItem
                                                title="Sprachausgabe"
                                                icon="volume-high"
                                                value={ttsEnabled}
                                                onValueChange={toggleTtsEnabled}
                                            />
                                            <SettingItem
                                                title="Zeige nur Favoriten"
                                                icon="heart"
                                                value={onlyFavorites}
                                                onValueChange={toggleOnlyFavorites}
                                            />
                                        </SettingsMenu>
                                    </View>
                                )}
                            />
                            {listExpanded && (
                                <Card.Content>
                                    <ParkingLotList
                                        parkingLots={parkingLotsWithDistance}
                                        onToggleFavorite={toggleFavorite}
                                        onPressParkingLot={(parkingLot) => setParkingLotIdForDialog(parkingLot.id)}
                                    />
                                </Card.Content>
                            )}
                        </Card>
                    </View>
                </View>
                {parkingLotForDialog && (
                    <ParkingLotDialog
                        parkingLot={parkingLotForDialog}
                        onDismiss={() => setParkingLotIdForDialog(null)}
                        onToggleFavorite={(parkingLot) => toggleFavorite(parkingLot)}
                    />
                )}
            </RootSiblingParent>
        </PaperProvider>
    );
}

registerRootComponent(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    map: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        top: 10,
        left: 10,
        right: 10,
    },
});
