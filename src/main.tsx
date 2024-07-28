import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";

import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { UserProvider } from "contexts/UserContext/contextProvider";
import { RootPage } from "pages/RootPage";
import axios from "axios";
import "dayjs/locale/ru";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(config => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens") ?? "{}");

    if (authTokens?.access) {
        config.headers["Authorization"] =
            "Bearer " + String(authTokens?.access);
    }

    return config;
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <MantineProvider>
            <DatesProvider
                settings={{
                    locale: "ru",
                    firstDayOfWeek: 1,
                    weekendDays: [0, 6],
                }}>
                <Notifications />
                <UserProvider>
                    <RootPage />
                </UserProvider>
            </DatesProvider>
        </MantineProvider>
    </React.StrictMode>
);
