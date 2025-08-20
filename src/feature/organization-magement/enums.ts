export enum OrganizationSystemType {
    DNC = "DNC", //tunis
    CAR = "CAR", //center africa
    SESAME = "SESAME", //senegal
    CERES = "CERES",
    LIBAN = "JANAH",
    DEFAULT = "DEFAULT",
};

export enum ZoneTemplate {
    FRANCE = "france",
    SUB_SAHARAN_AFRICA = "subSaharanAfrica",
    MEDITERRANEAN_BASIN = "mediterraneanBasin",
    SOUTHEAST_ASIA = "southeastAsia",
}

export const FEATURE_FLAGS_ENUM = {
    MESSAGES: "messages",
    ANNOUNCEMENTS: "announcements",
    SMART_CALENDAR: "smartCalendar",
    TUTORIALS: "tutorials",
    DARK_MODE: "darkMode",
    LMS: "lms",
  } as const;
export type TFeatureFlagsEnum = (typeof FEATURE_FLAGS_ENUM)[keyof typeof FEATURE_FLAGS_ENUM];
