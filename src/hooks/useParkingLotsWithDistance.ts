import { useMemo } from "react";
import { Coordinate } from "../models/Coordinate";
import { ParkingLot } from "../models/ParkingLot";
import { ParkingLotWithDistance } from "../models/ParkingLotWithDistance";
import { calculateDistance } from "../utils/calculateDistance";

export function useParkingLotsWithDistance(userCoords: Coordinate | null, parkingLots: ParkingLot[]) {
    return useMemo(() => {
        if (!userCoords) {
            return [];
        }

        const parkingLotsWithDistance: ParkingLotWithDistance[] = parkingLots.map((parkingLot) => ({
            ...parkingLot,
            distance: calculateDistance(userCoords, parkingLot),
        }));

        parkingLotsWithDistance.sort((a, b) => a.distance - b.distance);

        return parkingLotsWithDistance;
    }, [userCoords, parkingLots]);
}
