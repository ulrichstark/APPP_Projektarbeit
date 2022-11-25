import { ApiResponse } from "../models/ApiResponse";
import { ParkingLot } from "../models/ParkingLot";

export function integrateApiResponse(response: ApiResponse, parkingLots: ParkingLot[]) {
    const newParkingLots = [...parkingLots];

    if (response && response.Daten && response.Daten.Parkhaus) {
        for (const parkingLotApi of response.Daten.Parkhaus) {
            const parkingLot = newParkingLots.find((p) => p.id === parkingLotApi.ID);

            if (parkingLot) {
                parkingLot.total = parkingLotApi.Gesamt;
                parkingLot.occupied = parkingLotApi.Aktuell;
                parkingLot.free = parkingLotApi.Frei;
                parkingLot.trend = parkingLotApi.Trend;
                parkingLot.status = parkingLotApi.Status;
                parkingLot.closed = parkingLotApi.Geschlossen === 1;
            }
        }
    }

    return newParkingLots;
}
