import { Order } from "types/OrderTypes/Order";
import { FullProduct } from "types/ProductTypes/Product";

export const getProductCost = (product: FullProduct, order: Order | null) => {
    if (!order) return 0;

    const discount = Math.max(product.discount, order?.discount ?? 0);
    return product.productType.cost * product.amount * (1 - discount / 100);
};

export const getOrderCost = (products: FullProduct[], order: Order | null) => {
    if (!order) return 0;

    return products.reduce(
        (partialSum, product) => partialSum + getProductCost(product, order),
        0
    );
};
