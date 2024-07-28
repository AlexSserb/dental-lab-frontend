export function calcDiscount(
    value: number | null | undefined,
    discount: number | null | undefined
): number {
    return (value ?? 0) * (1 - (discount ?? 0) / 100);
}

export function formatCost(cost: number): string {
    return cost.toFixed(2);
}
