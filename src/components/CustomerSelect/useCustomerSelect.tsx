import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext/useUserContext.ts";
import profileService from "../../services/ProfileService.ts";
import { Customer } from "../../types/CustomerTypes/Customer.ts";

const useCustomerSelect = () => {
    const [customers, setCustomers] = useState<string[]>([]);
    const { user } = useUserContext();

    const loadCustomers = () => {
        if (!user) return;

        profileService.getProfileData(user.email)
            .then(res => {
                const customers: string[] = res.data.customers.map(
                    (customer: Customer) => {
                        return { value: customer.id, label: customer.name };
                    },
                );
                setCustomers(customers);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    return {
        customers,
    };
};

export default useCustomerSelect;
