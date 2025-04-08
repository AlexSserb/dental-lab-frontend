const TECH_ID_OPERATION_GROUP = [
    "",
    "",
    "MO",
    "CA",
    "CE",
    "DE",
];

const techIdToOperationGroup = (groupId?: number): string => {
    return groupId ? TECH_ID_OPERATION_GROUP[groupId] : "";
};

export default techIdToOperationGroup;
