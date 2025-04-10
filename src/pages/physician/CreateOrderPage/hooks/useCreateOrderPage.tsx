import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "components/ToothMarks/styles/ToothMarksStyles.module.css";
import { ProductBrief } from "types/ProductTypes/ProductBrief.ts";
import { isMobile } from "react-device-detect";
import { useUserContext } from "contexts/UserContext/useUserContext";
import { OrdersService, ProductType } from "../../../../client";

function useCreateOrderPage() {
    const { user } = useUserContext();
    const [listOfProducts, setListOfProducts] = useState<ProductBrief[]>([]);
    const [selectedProductType, setSelectedProductType] = useState<
        ProductType | null
    >(null);
    const [orderCost, setOrderCost] = useState(0);
    const [numberOfProducts, setNumberOfProducts] = useState<number>(1);
    const [selectedCustomer, setSelectedCustomer] = useState<string | null>(
        null,
    );
    const [comment, setComment] = useState("");

    // States for dental formula
    const [markedTeeth, setMarkedTeeth] = useState<Set<number>>(new Set());

    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.isVerified) navigate("/registration");
    }, []);

    const saveProduct = () => {
        if (!selectedProductType) {
            notifications.show({
                title: "Error",
                message: "Тип изделия не выбран",
            });
            return;
        }
        const sumCost = (selectedProductType.cost ?? 0) * numberOfProducts;
        setOrderCost(orderCost + sumCost);

        const product: ProductBrief = {
            productTypeId: selectedProductType.id,
            productTypeName: selectedProductType.name,
            productTypeCost: selectedProductType.cost ?? 0,
            sumCost: sumCost,
            amount: numberOfProducts,
            teeth: [...markedTeeth],
        };

        listOfProducts.push(product);

        const set = new Set<number>();
        setMarkedTeeth(set);
    };

    const handleDelete = (product: ProductBrief) => {
        const list = [...listOfProducts];
        const index = list.indexOf(product);

        if (index > -1) {
            list.splice(index, 1);
            setListOfProducts(list);
            setOrderCost(orderCost - product.sumCost);
        }
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
        if (!selectedCustomer) {
            notifications.show({
                title: "Error",
                message: "Организация-заказчик не выбран",
            });
            return;
        }
        console.log(listOfProducts);
        OrdersService.createOrder({
            requestBody: {
                comment,
                productTypes: listOfProducts,
                customerId: selectedCustomer,
            },
        })
            .then(() => {
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
        handleDelete,
        setSelectedProductType,
        numberOfProducts,
        setNumberOfProducts,
        selectedCustomer,
        setSelectedCustomer,
        comment,
        setComment,
        getToothMark,
        orderCost,
        saveProduct,
        sendOrder,
    };
}

export default useCreateOrderPage;
