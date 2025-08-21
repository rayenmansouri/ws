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

// Country enums for each organization system type
export enum DncCountryEnum {
    TUNISIA = "Tunisia",
    SOUSSE = "Sousse",
    KAIROUAN = "Kairouan",
}

export enum LibanCountryEnum {
    LEBANON = "Lebanon",
}

export enum CarCountryEnum {
    CENTRAL_AFRICAN_REPUBLIC = "Central African Republic",
    CHAD = "Chad",
    CAMEROON = "Cameroon",
}

export enum SesameCountryEnum {
    SENEGAL = "Senegal",
    MALI = "Mali",
    BURKINA_FASO = "Burkina Faso",
}

export enum CeresCountryEnum {
    EGYPT = "Egypt",
    JORDAN = "Jordan",
    MOROCCO = "Morocco",
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
