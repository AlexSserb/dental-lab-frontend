import useWorkTypeSelect from "./useWorkTypeSelect.tsx";
import ObjectSelect, { ObjectSelectProps } from "../ObjectSelect/ObjectSelect.tsx";
import { WorkType } from "../../client";

type Props = Omit<
    ObjectSelectProps<WorkType | null>,
    "data" | "getValueFn" | "getLabelFn"
>;

const WorkTypeSelect = (props: Props) => {
    const { workTypes } = useWorkTypeSelect();

    return (
        <ObjectSelect
            w="100%"
            label="Тип работы"
            data={workTypes}
            getLabelFn={(workType: WorkType) => workType.name}
            getValueFn={(workType: WorkType) => workType.id.toString()}
            {...props}
        />
    );
};

export default WorkTypeSelect;
