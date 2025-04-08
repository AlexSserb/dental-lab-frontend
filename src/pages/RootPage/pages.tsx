import { User } from "contexts/UserContext/types";
import PageInfo from "types/PageInfo";
import { isLabAdmin, isRegularTech } from "utils/permissions";

export function getPages(user: User | undefined): PageInfo[] {
    if (!user) return [];

    const pages = [
        { title: "Главная", path: "/", state: {} },
        { title: "Профиль", path: "/profile", state: { email: user?.email } },
    ];

    if (isRegularTech(user)) {
        pages.push({ title: "Расписание", path: "/schedule", state: {} });
    }

    if (isLabAdmin(user)) {
        pages.push({ title: "Расписание", path: "/schedule", state: {} });
    }

    return pages;
}
