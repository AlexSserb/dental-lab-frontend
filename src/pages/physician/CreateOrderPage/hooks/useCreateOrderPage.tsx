import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "services/OrderService";
import productTypesService from "services/ProductTypeService";
import ProductType from "types/ProductTypes/ProductType";

import styles from "components/ToothMarks/styles/ToothMarksStyles.module.css";
import { ProductBrief } from "types/ProductTypes/Product";
import { isMobile } from "react-device-detect";

function useCreateOrderPage() {
    const [listOfProducts, setListOfProducts] = useState<ProductBrief[]>([]);
    const [allProductTypes, setAllProductTypes] = useState<ProductType[]>([]);
    const [selectedProductType, setSelectedProductType] = useState<
        string | null
    >(null);
    const [orderCost, setOrderCost] = useState(0);
    const [numberOfProducts, setNumberOfProducts] = useState<number>(1);

    // States for dental formula
    const [upperJaw, setUpperJaw] = useState<number[]>([]);
    const [lowerJaw, setLowerJaw] = useState<number[]>([]);
    const [markedTeeth, setMarkedTeeth] = useState<Set<number>>(new Set());

    const navigate = useNavigate();

    useEffect(() => {
        fillUpperJaw();
        fillLowerJaw();

        productTypesService
            .getAll()
            .then(res => {
                const products = res.data;

                setAllProductTypes(products);
                if (products.length > 0) {
                    setSelectedProductType(products[0].name);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const saveProduct = () => {
        const productType = allProductTypes.find(
            (val, _) => val.name === selectedProductType
        );
        if (!productType) {
            return;
        }
        const sumCost = productType.cost * numberOfProducts;
        setOrderCost(orderCost + sumCost);

        const product: ProductBrief = {
            productTypeId: productType.id,
            productTypeName: productType.name,
            productTypeCost: productType.cost,
            sumCost: sumCost,
            amount: numberOfProducts,
            teeth: [...markedTeeth],
        };

        listOfProducts.push(product);

        const set = new Set<number>();
        setMarkedTeeth(set);
    };

    const handleDelete = (product: ProductBrief) => {
        let list = [...listOfProducts];
        const index = list.indexOf(product);

        if (index > -1) {
            list.splice(index, 1);
            setListOfProducts(list);
            setOrderCost(orderCost - product.sumCost);
        }
    };

    // Functions to fill in the dental formula in the form
    const fillUpperJaw = () => {
        let arrUpperJaw = [];
        for (let num = 18; num >= 11; num--) arrUpperJaw.push(num);
        for (let num = 21; num <= 28; num++) arrUpperJaw.push(num);
        setUpperJaw(arrUpperJaw);
    };
    const fillLowerJaw = () => {
        let arrLowerJaw = [];
        for (let num = 48; num >= 41; num--) arrLowerJaw.push(num);
        for (let num = 31; num <= 38; num++) arrLowerJaw.push(num);
        setLowerJaw(arrLowerJaw);
    };

    const getToothMark = (num: number) => {
        const toothSizeStyle = isMobile
            ? styles.toothMarkMobile
            : styles.toothMarkDesktop;

        const toothStyle = markedTeeth.has(num)
            ? styles.markedTooth
            : styles.notMarkedTooth;

        const onClickFunc = () => {
            const teeth = new Set(markedTeeth.values());

            if (!teeth.has(num)) {
                teeth.add(num);
            } else {
                teeth.delete(num);
            }

            setMarkedTeeth(teeth);
        };

        return (
            <button
                type="button"
                onClick={onClickFunc}
                className={`${styles.toothMarkBase} ${toothSizeStyle} ${toothStyle}`}>
                {num}
            </button>
        );
    };

    const sendOrder = () => {
        orderService
            .post(listOfProducts)
            .then(_ => {
                navigate("/");
                notifications.show({
                    title: "Success",
                    message: "Заказ успешно оформлен!",
                });
            })
            .catch(err => console.log(err));
    };

    return {
        listOfProducts,
        allProductTypes,
        handleDelete,
        selectedProductType,
        setSelectedProductType,
        numberOfProducts,
        setNumberOfProducts,
        upperJaw,
        lowerJaw,
        getToothMark,
        orderCost,
        saveProduct,
        sendOrder,
    };
}

export default useCreateOrderPage;
