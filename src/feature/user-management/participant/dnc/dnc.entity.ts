export enum DncCenterEnum {
    sousse = "sousse",
    kairouan = "kairouan",
};

export enum DncParentRelationEnum {
    father = "father",
    mother = "mother",
    brother = "bother",
    sister = "sister",
};

export enum candidateOriginEnum {
    school = "BETI",
    other = "RECOMMENDATION",
};

export type dncType = {
    uniqueId: string;
    address1?: string;
    address2?: string; 
    parents?: string[];
    level?: string;
    classType?: string;
    DNC: string;
}