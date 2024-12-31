import productTypesService from "../../services/ProductTypeService.ts";
import { useEffect, useState } from "react";
import ProductType from "../../types/ProductTypes/ProductType.ts";

const useProductTypeSelect = () => {
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

    const loadProductTypes = () => {
        productTypesService
            .getAll()
            .then(res => {
                const products = res.data;

                setProductTypes(products);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        loadProductTypes();
    }, []);

    return {
        productTypes,
    };
};

export default useProductTypeSelect;
