import { Linking } from "react-native";
import { ParkingLot } from "../models/ParkingLot";

export function openNavigation(parkingLot: ParkingLot) {
    const { latitude, longitude } = parkingLot;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
}
