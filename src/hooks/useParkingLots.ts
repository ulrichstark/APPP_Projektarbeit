import { useEffect, useState } from "react";
import { initialParkingLots } from "../initialParkingLots";
import { XMLParser } from "fast-xml-parser";
import { ApiResponse } from "../models/ApiResponse";
import { config } from "../config";
import { integrateApiResponse } from "../utils/integrateApiResponse";

export function useParkingLots() {
    const [parkingLots, setParkingLots] = useState(initialParkingLots);

    useEffect(() => {
        fetch(config.parkingLotsApi)
            .then((response) => response.text())
            .then((responseText) => {
                const responseObject = new XMLParser().parse(responseText) as ApiResponse;
                const newParkingLots = integrateApiResponse(responseObject, parkingLots);
                setParkingLots(newParkingLots);
            });
    }, []);

    return parkingLots;
}
