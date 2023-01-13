import { StyleSheet, View } from "react-native";
import { List, Subheading, Switch } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

interface Props {
    title: string;
    icon: IconSource;
    value: boolean;
    onValueChange(): void;
}

export function SettingItem(props: Props) {
    const { title, icon, value, onValueChange } = props;

    return (
        <View style={styles.container}>
            <List.Icon icon={icon} color="#666" />
            <Subheading style={styles.title}>{title}</Subheading>
            <Switch color="#08e" value={value} onValueChange={onValueChange} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 10,
    },
    title: {
        flexGrow: 1,
    },
});
