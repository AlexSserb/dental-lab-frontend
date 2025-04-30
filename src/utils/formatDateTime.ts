export const formatDate = (date: Date) =>
    `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

export const formatDateTime = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const time = date.toTimeString().substring(0, 5);

    return `${day}.${month}.${year} ${time}`;
};

export const formatStrTime = (time: string) => {
    const hours = Number.parseInt(time.substring(0, 2));
    const minutes = Number.parseInt(time.substring(3, 5));
    if (hours) return `${hours} ч. ${minutes} мин.`;
    return `${minutes} мин.`;
};

export const formatTime = (date: Date) => {
    return date.toTimeString().substring(0, 5);
};

export const strToDate = (strDate?: string | null | Date): Date | null | undefined => {
    if (typeof strDate !== "string") return strDate;
    const [day, month, year, time] = strDate.split(/[.\s]/);
    const [hours, minutes] = time.split(":");

    const date = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes),
    );
    console.log(date);
    return date;
};
