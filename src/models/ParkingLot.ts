export interface ParkingLot {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    total?: number;
    occupied?: number;
    free?: number;
    trend?: -1 | 0 | -1;
    status?: "OK" | "Ersatzwerte" | "Manuell" | "Störung";
    closed?: boolean;
}
