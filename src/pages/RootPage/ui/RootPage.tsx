import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "components/Header";
import { NavBar } from "components/NavBar";
import { useUserContext } from "contexts/UserContext/useUserContext";
import { BrowserRouter } from "react-router-dom";
import { routesAdmin, routesPhysician, routesTech, routesUnauthorized } from "../routes";
import { isLabAdmin, isPhysician, isRegularTech } from "utils/permissions";

import styles from "pages/RootPage/styles/RootPageStyles.module.scss";
import { getPages } from "../pages";

export function RootPage() {
    const { user } = useUserContext();
    const [opened, { toggle }] = useDisclosure();

    const pages = getPages(user);

    const getRoutes = () => {
        if (!user) return routesUnauthorized;
        if (isPhysician(user)) return routesPhysician;
        if (isRegularTech(user)) return routesTech;
        if (isLabAdmin(user)) return routesAdmin;
    };

    return (
        <AppShell
            header={{ height: 70 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { desktop: true, mobile: !opened },
            }}
            padding="md">
            <BrowserRouter>
                <Header opened={opened} toggle={toggle} pages={pages} />
                <NavBar pages={pages} />
                <AppShell.Main className={styles.bodyColor}>
                    {getRoutes()}
                </AppShell.Main>
            </BrowserRouter>
        </AppShell>
    );
}
