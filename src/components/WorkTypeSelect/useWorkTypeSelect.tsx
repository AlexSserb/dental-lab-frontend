import { useEffect, useState } from "react";
import { WorksService, WorkType } from "../../client";

const useWorkTypeSelect = () => {
    const [workTypes, setWorkTypes] = useState<WorkType[]>([]);

    const loadWorkTypes = () => {
        WorksService.getWorkTypes()
            .then(typesOfWork => {
                setWorkTypes(typesOfWork);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        loadWorkTypes();
    }, []);

    return {
        workTypes,
    };
};

export default useWorkTypeSelect;
