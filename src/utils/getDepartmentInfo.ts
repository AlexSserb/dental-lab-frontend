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
            return 2;
        case "CA":
            return 3;
        case "CE":
            return 4;
        case "DE":
            return 5;
        default:
            return -1;
    }
}
