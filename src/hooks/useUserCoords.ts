import {
    requestForegroundPermissionsAsync,
    startLocationUpdatesAsync,
    LocationObject,
    LocationAccuracy,
    requestBackgroundPermissionsAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import { Coordinate } from "../models/Coordinate";
import { defineTask, TaskManagerTaskExecutor } from "expo-task-manager";
import { config } from "../config";
import Toast from "react-native-root-toast";

let executors: TaskManagerTaskExecutor[] = [];

defineTask(config.taskLocationUpdates, (body) => {
    for (const executor of executors) {
        executor(body);
    }
});

export function useUserCoords() {
    const [userCoords, setUserCoords] = useState<Coordinate | null>(null);

    useEffect(() => {
        const executor: TaskManagerTaskExecutor = ({ data, error }) => {
            if (error) {
                Toast.show("Standort konnte nicht abgefragt werden");
            } else {
                const locations: LocationObject[] = (data as any).locations;
                if (locations) {
                    setUserCoords(locations[0].coords);
                }
            }
        };

        executors.push(executor);

        requestForegroundPermissionsAsync()
            .then(() => requestBackgroundPermissionsAsync())
            .then(() => startLocationUpdatesAsync(config.taskLocationUpdates, { accuracy: LocationAccuracy.BestForNavigation }))
            .catch(() => Toast.show("Standort-Berechtigung wurde nicht erteilt"));

        return () => {
            executors = executors.filter((e) => e !== executor);
        };
    }, []);

    return userCoords;
}
