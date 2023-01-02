import { List, Switch } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

interface Props {
    title: string;
    icon: IconSource;
    value: boolean;
    onValueChange(): void;
}

export function SettingItem(props: Props) {
    const { title, icon, value, onValueChange } = props;

    return <List.Item title={title} left={() => <List.Icon icon={icon} />} right={() => <Switch value={value} onValueChange={onValueChange} />} />;
}
