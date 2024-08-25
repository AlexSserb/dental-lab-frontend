export function getDepartmentName(code: string) {
    switch (code) {
        case "MO":
            return "Отдел моделирования";
        case "CA":
            return "Информационный отдел CAD/CAM";
        case "CE":
            return "Отдел керамики";
        case "DE":
            return "Отдел протезирования";
        default:
            return "Код не известен";
    }
}

export function getDepartmentIdByCode(code: string) {
    switch (code) {
        case "MO":
            return 4;
        case "CA":
            return 5;
        case "CE":
            return 6;
        case "DE":
            return 7;
        default:
            return -1;
    }
}
