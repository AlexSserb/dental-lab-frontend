import { Select, SelectProps } from "@mantine/core";

type Props = {
    value: string;
    onChange: (value: string) => void;
} & Omit<SelectProps, "onChange" | "value">;

const VitaShadeSelector = ({ value, onChange, ...props }: Props) => {
    const vitaShades = [
        "A1", "A2", "A3", "A3.5", "A4",
        "B1", "B2", "B3", "B4",
        "C1", "C2", "C3", "C4",
        "D2", "D3", "D4",
    ];

    return (
        <Select
            label={"Выберите оттенок"}
            data={vitaShades}
            value={value}
            onChange={value => value && onChange(value)}
            {...props}
        />
    );
};

export default VitaShadeSelector;
