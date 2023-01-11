import { Coordinate } from "./Coordinate";

export interface ParkingLot extends Coordinate {
    id: number;
    name: string;
    total?: number;
    occupied?: number;
    free?: number;
    trend?: -1 | 0 | -1;
    status?: "OK" | "Ersatzwerte" | "Manuell" | "Störung";
    closed?: boolean;
    favorite?: boolean;
    openingTimes: string;
    price: number;
}
