import { ReactNode } from "react";
import { Button, Dialog, List, Portal } from "react-native-paper";

interface Props {
    visible: boolean;
    children: ReactNode;
    onDismiss(): void;
}

export function SettingsDialog(props: Props) {
    const { visible, children, onDismiss } = props;

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title>Einstellungen</Dialog.Title>
                <Dialog.Content>
                    <List.Section>{children}</List.Section>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
