import { OrderWithPhysician, ProductAndOperations } from "../../../../client";

export const getProductCost = (product: ProductAndOperations, order: OrderWithPhysician | null) => {
    if (!order) return 0;

    const cost = product.productType.cost ?? 0;
    const discount = Math.max(product.discount ?? 0, order?.discount ?? 0);
    return cost * product.amount * (1 - discount / 100);
};

export const getOrderCost = (products: ProductAndOperations[], order: OrderWithPhysician | null) => {
    if (!order) return 0;

    return products.reduce(
        (partialSum, product) => partialSum + getProductCost(product, order),
        0
    );
};
