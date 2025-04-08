import { useEffect, useState } from "react";
import { AccountsService, UserProfile } from "../client";

const useTechniciansList = () => {
    const [techs, setTechs] = useState<UserProfile[]>([]);

    const refetch = (groupId?: number) => {
        AccountsService.getTechnicians({ groupId })
            .then(techProfiles => {
                setTechs(techProfiles);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        refetch();
    }, []);

    return {
        refetch,
        techs,
    };
};

export default useTechniciansList;
