import { useEffect, useState } from "react";
import { Region } from "react-native-maps";
import { Coordinate } from "../models/Coordinate";

export function useMapRegion(userCoords: Coordinate | null, locationFocusActive: boolean) {
    const [mapRegion, setMapRegion] = useState<Region | undefined>(undefined);

    useEffect(() => {
        if (locationFocusActive && userCoords) {
            const mapRegionDelta = 0.005;

            setMapRegion({
                latitude: userCoords.latitude,
                longitude: userCoords.longitude,
                latitudeDelta: mapRegionDelta,
                longitudeDelta: mapRegionDelta,
            });
        }
    }, [userCoords, locationFocusActive]);

    return mapRegion;
}
