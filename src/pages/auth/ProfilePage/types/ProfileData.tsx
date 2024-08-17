import { Customer } from "types/CustomerTypes/Customer";

export type ProfileData = {
    email: string;
    firstName: string;
    lastName: string;
    group: string;
    createdAt: string;
    customers: Customer[];
};
