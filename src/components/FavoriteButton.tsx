import { StyleProp, ViewStyle } from "react-native";
import { IconButton } from "react-native-paper";
import { ParkingLot } from "../models/ParkingLot";

interface Props {
    parkingLot: ParkingLot;
    style?: StyleProp<ViewStyle>;
    onToggleFavorite(parkingLot: ParkingLot): void;
}

export function FavoriteButton(props: Props) {
    const { parkingLot, style, onToggleFavorite } = props;

    return (
        <IconButton
            icon={parkingLot.favorite ? "heart" : "heart-outline"}
            color={parkingLot.favorite ? "red" : "#666"}
            onPress={() => onToggleFavorite(parkingLot)}
            style={style}
        />
    );
}
