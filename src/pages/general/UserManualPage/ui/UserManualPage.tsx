import { Center, Paper } from "@mantine/core";
import { useUserContext } from "../../../../contexts/UserContext/useUserContext.ts";
import { isLabAdmin, isPhysician } from "../../../../utils/permissions.ts";
import LabAdminManual from "../components/LabAdminManual.tsx";
import PhysicianManual from "../components/PhysicianManual.tsx";
import TechManual from "../components/TechManual.tsx";

export function UserManualPage() {
    const { user } = useUserContext();

    const getContent = () => {
        if (!user) return;

        if (isLabAdmin(user)) {
            return <LabAdminManual />;
        }
        if (isPhysician(user)) {
            return <PhysicianManual />;
        }
        return <TechManual />;
    };

    return (
        <Center>
            <Paper w="50%" miw="380" shadow="md" radius="sm" px={50} py={30}>
                {getContent()}
            </Paper>
        </Center>
    );
}
