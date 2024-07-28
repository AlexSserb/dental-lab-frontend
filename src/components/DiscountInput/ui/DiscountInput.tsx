import { TextInput } from "@mantine/core";

export function DiscountInput(props: any) {
    return (
        <TextInput
            mx="xl"
            type="number"
            step={1}
            min={0}
            max={100}
            {...props}
        />
    );
}
