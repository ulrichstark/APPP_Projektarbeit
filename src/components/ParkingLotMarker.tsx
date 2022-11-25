import { Marker } from "react-native-maps";
import { ParkingLot } from "../models/ParkingLot";
import { getParkingLotDescription } from "../utils/getParkingLotDescription";

export function ParkingLotMarker(props: { parkingLot: ParkingLot }) {
    const { parkingLot } = props;
    const description = getParkingLotDescription(parkingLot);

    return <Marker coordinate={{ ...parkingLot }} title={parkingLot.name} description={description} />;
}
