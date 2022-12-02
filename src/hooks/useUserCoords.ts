import { requestForegroundPermissionsAsync, startLocationUpdatesAsync, LocationObject, LocationAccuracy } from "expo-location";
import { useEffect, useState } from "react";
import { Coordinate } from "../models/Coordinate";
import { defineTask, TaskManagerTaskExecutor } from "expo-task-manager";
import { config } from "../config";

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
                // check error.message for more details.
            } else {
                const locations: LocationObject[] = (data as any).locations;
                if (locations) {
                    setUserCoords(locations[0].coords);
                }
            }
        };

        executors.push(executor);

        requestForegroundPermissionsAsync().then(() => {
            startLocationUpdatesAsync(config.taskLocationUpdates, { accuracy: LocationAccuracy.BestForNavigation });
        });

        return () => {
            executors = executors.filter((e) => e !== executor);
        };
    }, []);

    return userCoords;
}
