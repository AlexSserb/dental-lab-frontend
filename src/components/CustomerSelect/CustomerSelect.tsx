import { Select, SelectProps } from "@mantine/core";
import useCustomerSelect from "./useCustomerSelect.tsx";

type Props = Omit<SelectProps, "data">;

const CustomerSelect = (props: Props) => {
    const { customers } = useCustomerSelect();

    return (
        <Select
            w="100%"
            label="Организация-заказчик"
            data={customers}
            {...props}
        />
    );
};

export default CustomerSelect;
