import { ParkingLot } from "../models/ParkingLot";

export function getParkingLotDescription(parkingLot: ParkingLot) {
    const { closed, occupied, free } = parkingLot;

    if (closed) {
        return "Geschlossen";
    }

    if (occupied !== undefined && free !== undefined) {
        return `${occupied} belegt / ${free} frei`;
    }

    return "Daten werden geladen...";
}
