import { useEffect, useState } from "react";
import { Region } from "react-native-maps";
import { Coordinate } from "../models/Coordinate";
import { ParkingLotWithDistance } from "../models/ParkingLotWithDistance";

export function useMapRegion(userCoords: Coordinate | null, nearestFreeParkingLot: ParkingLotWithDistance | null, locationFocusActive: boolean) {
    const [mapRegion, setMapRegion] = useState<Region | undefined>(undefined);

    useEffect(() => {
        if (locationFocusActive && userCoords && nearestFreeParkingLot) {
            const latCenter = (userCoords.latitude + nearestFreeParkingLot.latitude) / 2;
            const longCenter = (userCoords.longitude + nearestFreeParkingLot.longitude) / 2;
            const latDelta = Math.abs(userCoords.latitude - nearestFreeParkingLot.latitude);
            const longDelta = Math.abs(userCoords.longitude - nearestFreeParkingLot.longitude);

            setMapRegion({
                latitude: latCenter,
                longitude: longCenter,
                latitudeDelta: Math.max(0.002, latDelta * 1.2),
                longitudeDelta: Math.max(0.002, longDelta * 1.2),
            });
        }
    }, [userCoords, nearestFreeParkingLot, locationFocusActive]);

    return mapRegion;
}
