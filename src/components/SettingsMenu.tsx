import { ReactNode, useState } from "react";
import { IconButton, Menu } from "react-native-paper";

interface Props {
    children: ReactNode;
}

export function SettingsMenu(props: Props) {
    const [visible, setVisible] = useState(false);

    return (
        <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={<IconButton icon="cog" style={{ margin: 0 }} onPress={() => setVisible(!visible)} />}
        >
            {props.children}
        </Menu>
    );
}
