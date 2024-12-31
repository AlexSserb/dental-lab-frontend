import useProductTypeSelect from "./useProductTypeSelect.tsx";
import ObjectSelect, { ObjectSelectProps } from "../ObjectSelect/ObjectSelect.tsx";
import ProductType from "../../types/ProductTypes/ProductType.ts";

type Props = Omit<
    ObjectSelectProps<ProductType | null>,
    "data" | "getValueFn" | "getLabelFn"
>;

const ProductTypeSelect = (props: Props) => {
    const { productTypes } = useProductTypeSelect();

    return (
        <ObjectSelect
            w="100%"
            label="Тип изделия"
            data={productTypes}
            getLabelFn={(productType: ProductType) => productType.name}
            getValueFn={(productType: ProductType) => productType.id.toString()}
            {...props}
        />
    );
};

export default ProductTypeSelect;
