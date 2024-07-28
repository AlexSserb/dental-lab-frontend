import Operation from "types/OperationTypes/Operation";
import ProductStatus from "./ProductStatus";
import ProductType from "./ProductType";

type Product = {
    id: string;
    productType: ProductType;
    productStatus: ProductStatus;
    discount: number;
    amount: number;
    cost: number;
    teeth: number[];
};

export default Product;

export type FullProduct = Product & {
    operations: Operation[];
};

export type ProductBrief = {
    productTypeId: string;
    productTypeName: string;
    productTypeCost: number;
    sumCost: number;
    amount: number;
    teeth: number[];
};
