import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext/useUserContext.ts";
import { AccountsService, Customer } from "../../client";
import { Option } from "../../types/Option.ts";

const useCustomerSelect = () => {
    const [customers, setCustomers] = useState<Option[]>([]);
    const { user } = useUserContext();

    const loadCustomers = () => {
        if (!user) return;

        AccountsService.getProfileData({
            email: user.email,
        })
            .then(profileData => {
                const customers: Option[] = profileData.customers.map(
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
