import { requestForegroundPermissionsAsync, startLocationUpdatesAsync, LocationObject } from "expo-location";
import { useEffect, useState } from "react";
import { Coordinate } from "../models/Coordinate";
import { defineTask } from "expo-task-manager";
import { config } from "../config";

export function useUserCoords() {
    const [userCoords, setUserCoords] = useState<Coordinate | null>(null);

    useEffect(() => {
        requestForegroundPermissionsAsync().then(() => {
            defineTask(config.taskLocationUpdates, ({ data, error }) => {
                if (error) {
                    // check error.message for more details.
                    return;
                } else {
                    const locations: LocationObject[] = (data as any).locations;
                    if (locations) {
                        setUserCoords(locations[0].coords);
                    }
                }
            });

            startLocationUpdatesAsync(config.taskLocationUpdates);
        });
    }, []);

    return userCoords;
}
