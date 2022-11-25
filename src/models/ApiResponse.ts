export interface ApiResponse {
    Daten: {
        Parkhaus: {
            ID: number;
            Name: string;
            Gesamt: number;
            Aktuell: number;
            Frei: number;
            Trend: -1 | 0 | -1;
            Status: "OK" | "Ersatzwerte" | "Manuell" | "Störung";
            Geschlossen: 0 | 1;
        }[];
        Zeitstempel: string;
    };
}
