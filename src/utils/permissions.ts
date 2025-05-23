import { User } from "contexts/UserContext/types";

export function isPhysician(user: User): boolean {
    return user?.groupId === 0;
}

export function isLabAdmin(user: User): boolean {
    return user?.groupId === 1;
}

export function isRegularTech(user: User): boolean {
    return user?.groupId >= 2 && user?.groupId <= 5;
}
