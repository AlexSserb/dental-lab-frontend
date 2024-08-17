export const formatDate = (date: Date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const formatDateTime = (date: Date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date
        .toTimeString()
        .substring(0, 5)}`;

export const formatTime = (time: string) => {
    const hours = Number.parseInt(time.substring(0, 2));
    const minutes = Number.parseInt(time.substring(3, 5));
    if (hours) return `${hours} ч. ${minutes} мин.`;
    return `${minutes} мин.`;
};
