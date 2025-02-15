import { NumberInput, NumberInputProps } from "@mantine/core";

export function DiscountInput(props: NumberInputProps) {
    return (
        <NumberInput
            mx="xl"
            step={1}
            min={0}
            max={100}
            {...props}
        />
    );
}
