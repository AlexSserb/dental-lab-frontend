import { DateTimePicker, DateTimePickerProps } from "@mantine/dates";

const WorkStartDateTimePicker = (props: DateTimePickerProps) => {
    return (
        <DateTimePicker
            {...props}
            valueFormat={"DD.MM.YYYY HH:mm"}
            minDate={new Date("01-01-2010")}
            maxDate={new Date("01-01-2100")}
        />
    );
};

export default WorkStartDateTimePicker;
