import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useSetting(key: string, defaultValue: boolean): [boolean, () => void] {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        AsyncStorage.getItem(key).then((loadedValue) => {
            if (loadedValue) {
                setValue(JSON.parse(loadedValue));
            }
        });
    }, []);

    function toggleValue() {
        const newValue = !value;

        setValue(newValue);
        AsyncStorage.setItem(key, JSON.stringify(newValue));
    }

    return [value, toggleValue];
}
