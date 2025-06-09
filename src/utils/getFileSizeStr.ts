const getFileSizeStr = (size: number) => {
    if (size < 1024) return `${size} байт`;
    size = size / 1024;
    if (size < 1024) return `${size.toFixed(1)} КБ`;
    size = size / 1024;
    if (size < 1024) return `${size.toFixed(1)} МБ`;
    size = size / 1024;
    return `${size.toFixed(1)} ГБ`;
};

export default getFileSizeStr;
