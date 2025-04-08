import {
    OperationEditContextProvider,
} from "../../../../components/OperationEditDrawer/contexts/OperationEditContext.tsx";
import { Schedule } from "../components/Schedule.tsx";

export const SchedulePage = () => {
    return (
        <OperationEditContextProvider>
            <Schedule />
        </OperationEditContextProvider>
    );
};
