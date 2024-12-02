import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "services/OrderService";
import productTypesService from "services/ProductTypeService";
import ProductType from "types/ProductTypes/ProductType";

import styles from "components/ToothMarks/styles/ToothMarksStyles.module.css";
import { ProductBrief } from "types/ProductTypes/Product";
import { isMobile } from "react-device-detect";
import profileService from "services/ProfileService";
import { useUserContext } from "contexts/UserContext/useUserContext";
import { Customer } from "types/CustomerTypes/Customer";

function useCreateOrderPage() {
    const { user } = useUserContext();
    const [listOfProducts, setListOfProducts] = useState<ProductBrief[]>([]);
    const [allProductTypes, setAllProductTypes] = useState<ProductType[]>([]);
    const [selectedProductType, setSelectedProductType] = useState<
        string | null
    >(null);
    const [orderCost, setOrderCost] = useState(0);
    const [numberOfProducts, setNumberOfProducts] = useState<number>(1);
    const [customers, setCustomers] = useState<string[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<string | null>(
        null
    );

    // States for dental formula
    const [markedTeeth, setMarkedTeeth] = useState<Set<number>>(new Set());

    const navigate = useNavigate();

    const loadCustomers = () => {
        if (!user) return;

        profileService.getProfileData(user.email)
            .then(res => {
                const customers: string[] = res.data.customers.map(
                    (customer: Customer) => {
                        return { value: customer.id, label: customer.name };
                    }
                );
                setCustomers(customers);
            })
            .catch(err => console.log(err));
    };

    const loadProductTypes = () => {
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
    };

    useEffect(() => {
        if (!user?.isVerified) navigate("/registration");

        loadCustomers();
        loadProductTypes();
    }, []);

    const saveProduct = () => {
        const productType = allProductTypes.find(
            val => val.name === selectedProductType
        );
        if (!productType) {
            notifications.show({
                title: "Error",
                message: "Тип изделия не выбран",
            });
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
                message: "Заказчик не выбран",
            });
            return;
        }

        orderService
            .post(listOfProducts, selectedCustomer)
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
        allProductTypes,
        handleDelete,
        selectedProductType,
        setSelectedProductType,
        numberOfProducts,
        setNumberOfProducts,
        customers,
        selectedCustomer,
        setSelectedCustomer,
        getToothMark,
        orderCost,
        saveProduct,
        sendOrder,
    };
}

export default useCreateOrderPage;
