import { useMemo } from "react";
import { Coordinate } from "../models/Coordinate";
import { ParkingLot } from "../models/ParkingLot";
import { ParkingLotWithDistance } from "../models/ParkingLotWithDistance";
import { calculateDistance } from "../utils/calculateDistance";

export function useNearestFreeParkingLots(userCoords: Coordinate | null, parkingLots: ParkingLot[]) {
    return useMemo(() => {
        if (!userCoords) {
            return null;
        }

        const freeParkingLots = parkingLots.filter((parkingLot) => parkingLot.free && parkingLot.free > 0);
        const freeParkingLotsWithDistance: ParkingLotWithDistance[] = freeParkingLots.map((parkingLot) => ({
            ...parkingLot,
            distance: calculateDistance(userCoords, parkingLot),
        }));

        if (freeParkingLotsWithDistance.length === 0) {
            return null;
        }

        freeParkingLotsWithDistance.sort((a, b) => a.distance - b.distance);

        return freeParkingLotsWithDistance;
    }, [userCoords, parkingLots]);
}
