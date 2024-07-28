export const formatTime = (time: string) => {
    const hours = Number.parseInt(time.substring(0, 2));
    const minutes = Number.parseInt(time.substring(3, 5));
    return `${hours} ч. ${minutes} мин.`;
};
