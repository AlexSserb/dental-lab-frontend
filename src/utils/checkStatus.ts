export const isOrderFresh = (orderStatusNumber?: number | null): boolean => {
    return orderStatusNumber === 1;
};

export const isOrderDefected = (orderStatusNumber?: number | null): boolean => {
    return orderStatusNumber === 5;
};

export const isOrderCompleted = (orderStatusNumber?: number | null): boolean => {
    return orderStatusNumber === 4;
};
