import MapView from "react-native-maps";
import { requestForegroundPermissionsAsync } from "expo-location";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { registerRootComponent } from "expo";

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

registerRootComponent(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
