import { Select, SelectProps } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

interface ObjectWithIdAndName {
    id: number;
    name: string;
}

export type SelectObjectType<T> = T;

type ControlledValueProps<T> = {
    value: SelectObjectType<T>;
    onChange: (value: SelectObjectType<T>) => void;
};
type CustomLabelAndKeyProps<T> = {
    getLabelFn: (item: SelectObjectType<T>) => string;
    getValueFn: (item: SelectObjectType<T>) => string;
};

type RestProps<T> = {
    defaultValue?: SelectObjectType<T>;
    onChange: (value: SelectObjectType<T>) => void;
    data: SelectObjectType<T>[];
};

const defaultGetLabelFn = <T extends { name: string }>(item: T): string => {
    return item.name;
};

const defaultGetValueFn = <T extends { id: number }>(item: T): string => {
    if (!item) return item;
    return item.id.toString();
};

export type ObjectSelectProps<T> = (RestProps<T> &
    Partial<ControlledValueProps<T>>) &
    Omit<SelectProps, "value" | "onChange" | "data"> &
    (T extends ObjectWithIdAndName
        ? Partial<CustomLabelAndKeyProps<T>>
        : CustomLabelAndKeyProps<T>);

const ObjectSelect = <T,>(props: ObjectSelectProps<T>) => {
    const isControlled = "value" in props;
    const haveGetValueFn = "getValueFn" in props;
    const haveGetLabelFn = "getLabelFn" in props;
    const [internalValue, setInternalValue] = useState<
        SelectObjectType<T> | undefined
    >(props.defaultValue);

    const value = isControlled ? props.value : internalValue;

    const getValueFn =
        (haveGetValueFn && props.getValueFn) || defaultGetValueFn;
    const getLabelFn =
        (haveGetLabelFn && props.getLabelFn) || defaultGetLabelFn;

    const data = useMemo(() => {
        return props.data.map(item => ({
            label: getLabelFn(item),
            value: getValueFn(item),
        }));
    }, [props.data]);

    const handleOnChange = (event: string | null) => {
        if (!event) return;
        const object = props.data.find(item => event == getValueFn(item));
        if (!object) return;
        if (isControlled) {
            props.onChange(object);
            return;
        }
        setInternalValue(object);
    };

    useEffect(() => {
        if (isControlled || !internalValue) return;
        props.onChange(internalValue);
    }, [internalValue]);

    return (
        <Select
            {...props}
            value={value && getValueFn(value)}
            onChange={handleOnChange}
            data={data}
        />
    );
};

export default ObjectSelect;
