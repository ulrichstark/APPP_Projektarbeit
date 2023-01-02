import { useEffect } from "react";
import { config } from "../config";
import { ParkingLotWithDistance } from "../models/ParkingLotWithDistance";
import { TTS } from "../models/TTS";

export function useGeofenceEffect(nearestParkingLots: ParkingLotWithDistance[], tts: TTS) {
    const parkingLotInGeofence =
        nearestParkingLots.length > 0 && nearestParkingLots[0].distance <= config.geofenceDistance ? nearestParkingLots[0] : null;

    useEffect(() => {
        if (parkingLotInGeofence) {
            tts(`Sie nähern sich ${parkingLotInGeofence.name} mit ${parkingLotInGeofence.free || "keinen"} freien Plätzen`);
        }
    }, [parkingLotInGeofence?.id]);
}
