import { useEffect, useMemo, useState } from "react";
import { initialParkingLots } from "../initialParkingLots";
import { XMLParser } from "fast-xml-parser";
import { ApiResponse } from "../models/ApiResponse";
import { config } from "../config";
import { integrateApiResponse } from "../utils/integrateApiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParkingLot } from "../models/ParkingLot";
import Toast from "react-native-root-toast";

const storageKey = "parking-lots";

async function loadParkingLots(): Promise<ParkingLot[]> {
    const item = await AsyncStorage.getItem(storageKey);

    if (!item) {
        throw new Error("Keine alten Parkplatz-Daten");
    }

    return JSON.parse(item);
}

async function saveParkingLots(parkingLots: ParkingLot[]) {
    await AsyncStorage.setItem(storageKey, JSON.stringify(parkingLots));
}

async function fetchAPI() {
    return fetch(config.parkingLotsApi)
        .then((response) => {
            if (response.status === 200) {
                return response.text();
            } else {
                throw new Error("Fehler bei Anfrage der API");
            }
        })
        .then((responseText) => new XMLParser().parse(responseText) as ApiResponse);
}

function updateParkingLots(): Promise<ParkingLot[]> {
    return new Promise((resolve, reject) => {
        fetchAPI()
            .then((apiResponse) => {
                const newParkingLots = integrateApiResponse(apiResponse, initialParkingLots);
                Toast.show("Parkplatz-Daten wurden aktualisiert");
                resolve(newParkingLots);
            })
            .catch(() => {
                loadParkingLots()
                    .then((loadedParkingLots) => {
                        Toast.show("Alte Parkplatz-Daten wurden geladen");
                        resolve(loadedParkingLots);
                    })
                    .catch(reject);
            });
    });
}

export function useParkingLots(favorites: number[], onlyFavorites: boolean) {
    const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);

    useEffect(() => {
        const updater = () => {
            updateParkingLots()
                .then(setParkingLots)
                .catch(() => Toast.show("Fehler beim Laden der Parkplatz-Daten"));
        };

        updater();
        const intervalHandle = window.setInterval(updater, config.parkingLotsUpdateInterval);
        return () => window.clearInterval(intervalHandle);
    }, []);

    useEffect(() => {
        if (parkingLots.length > 0) {
            saveParkingLots(parkingLots);
        }
    }, [parkingLots]);

    return useMemo(() => {
        return parkingLots
            .map((parkingLot) => ({ ...parkingLot, favorite: favorites.includes(parkingLot.id) }))
            .filter((parkingLot) => parkingLot.favorite || !onlyFavorites);
    }, [parkingLots, favorites, onlyFavorites]);
}
