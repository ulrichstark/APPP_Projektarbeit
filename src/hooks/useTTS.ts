import { speak } from "expo-speech";
import { useCallback } from "react";
import Toast from "react-native-root-toast";
import { TTS } from "../models/TTS";

export function useTTS(enabled: boolean): TTS {
    return useCallback(
        (text: string) => {
            Toast.show(text);

            if (enabled) {
                speak(text, { language: "de" });
            }
        },
        [enabled]
    );
}
