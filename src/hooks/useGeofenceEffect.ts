import { useEffect } from "react";
import Toast from "react-native-root-toast";
import { config } from "../config";
import { ParkingLotWithDistance } from "../models/ParkingLotWithDistance";
import { speak } from "expo-speech";

export function useGeofenceEffect(nearestParkingLots: ParkingLotWithDistance[]) {
    const parkingLotInGeofence =
        nearestParkingLots.length > 0 && nearestParkingLots[0].distance <= config.geofenceDistance ? nearestParkingLots[0] : null;

    useEffect(() => {
        if (parkingLotInGeofence) {
            const text = `Sie nähern sich ${parkingLotInGeofence.name} mit ${parkingLotInGeofence.free || "keinen"} freien Plätzen`;

            Toast.show(text);
            speak(text, { language: "de" });
        }
    }, [parkingLotInGeofence?.id]);
}
