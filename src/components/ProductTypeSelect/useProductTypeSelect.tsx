import { useEffect, useState } from "react";
import { ProductsService, ProductType } from "../../client";

const useProductTypeSelect = () => {
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

    const loadProductTypes = () => {
        ProductsService.getProductTypes()
            .then(typesOfProduct => {
                setProductTypes(typesOfProduct);
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
