import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";
import { ParkingLot } from "../models/ParkingLot";

const storageKey = "favorites";

async function loadFavorites(): Promise<number[]> {
    const item = await AsyncStorage.getItem(storageKey);

    if (!item) {
        return [];
    }

    return JSON.parse(item);
}

async function saveFavorites(favorites: number[]) {
    await AsyncStorage.setItem(storageKey, JSON.stringify(favorites));
}

export function useFavorites(): [number[], (parkingLot: ParkingLot) => void] {
    const [favorites, setFavorites] = useState<number[]>([]);

    function toggleFavorite(parkingLot: ParkingLot) {
        let newFavorites = [...favorites];

        if (parkingLot.favorite) {
            // Remove it from favorites
            newFavorites = newFavorites.filter((f) => f !== parkingLot.id);
        } else {
            // Add it to favorites
            newFavorites.push(parkingLot.id);
        }

        setFavorites(newFavorites);
        saveFavorites(newFavorites);
    }

    useEffect(() => {
        loadFavorites()
            .then(setFavorites)
            .catch(() => Toast.show("Fehler beim Laden der Favoriten"));
    }, []);

    return [favorites, toggleFavorite];
}
