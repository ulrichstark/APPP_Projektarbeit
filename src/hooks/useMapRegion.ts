import { useEffect, useState } from "react";
import { Region } from "react-native-maps";
import { Coordinate } from "../models/Coordinate";
import { ParkingLotWithDistance } from "../models/ParkingLotWithDistance";

const defaultMapRegion: Region = {
    latitude: 49.445,
    longitude: 11.859,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
};

export function useMapRegion(userCoords: Coordinate | null, nearestFreeParkingLot: ParkingLotWithDistance | null, locationFocus: boolean) {
    const [mapRegion, setMapRegion] = useState<Region | null>(null);

    useEffect(() => {
        if (locationFocus && userCoords && nearestFreeParkingLot) {
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
        } else {
            setMapRegion(null);
        }
    }, [userCoords, nearestFreeParkingLot, locationFocus]);

    return mapRegion || defaultMapRegion;
}
