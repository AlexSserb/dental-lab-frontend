import ObjectSelect, { ObjectSelectProps } from "../ObjectSelect/ObjectSelect.tsx";
import { UserProfile } from "../../client";

type Props = Omit<ObjectSelectProps<UserProfile | null>, "getValueFn" | "getLabelFn">;

const TechSelect = (props: Props) => {
    return (
        <ObjectSelect
            w="100%"
            label="Техник"
            getValueFn={(tech: UserProfile) => tech.email}
            getLabelFn={(tech: UserProfile) => `${tech.lastName} ${tech.firstName}`}
            {...props}
        />
    );
};

export default TechSelect;
