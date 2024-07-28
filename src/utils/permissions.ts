import { User } from "contexts/UserContext/types";

export function isPhysician(user: User): boolean {
    return user?.groupId === 0;
}

export function isDirector(user: User): boolean {
    return user?.groupId === 1;
}

export function isLabAdmin(user: User): boolean {
    return user?.groupId === 2;
}

export function isChiefTech(user: User): boolean {
    return user?.groupId === 3;
}

export function isRegularTech(user: User): boolean {
    return user?.groupId >= 4 && user?.groupId <= 7;
}
