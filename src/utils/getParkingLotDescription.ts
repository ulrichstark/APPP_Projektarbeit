import { ParkingLot } from "../models/ParkingLot";

export function getParkingLotDescription(parkingLot: ParkingLot) {
    const { closed, occupied, total } = parkingLot;

    if (closed) {
        return "Geschlossen";
    }

    if (occupied !== undefined && total !== undefined) {
        return `${occupied} / ${total} belegt`;
    }

    return "Daten werden geladen...";
}
