import MapView from "react-native-maps";
import { requestForegroundPermissionsAsync } from "expo-location";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        requestForegroundPermissionsAsync();
    }, []);

    return (
        <View style={styles.container}>
            <MapView style={styles.map} showsUserLocation followsUserLocation />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
