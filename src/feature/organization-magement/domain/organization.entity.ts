import { OrganizationSystemType, TFeatureFlagsEnum, FEATURE_FLAGS_ENUM, ZoneTemplate } from "../enums";

export enum GradeBookTheme {
    YELLOW = "YELLOW",
    BLUE = "BLUE",
}

export type OrganizationInput = {
    name: string;
    subdomain: string;
    email: string;
    organizationSystemType: OrganizationSystemType;
    address: string
    directorName: string;
    configName: string;
    maxStudentSeats: number;
    gradeBookTheme: GradeBookTheme;
    enableEmail: boolean;
    enableSms?: boolean;
    featureFlags?: Record<TFeatureFlagsEnum, boolean>;
    zonetemplate?: ZoneTemplate;
};

export type Organization ={
  id: string;
  website: string;
  subdomain: string;
  phoneNumber: string;
  directorName: string;
  timeZone: string | null;
  logo: string | null;
  forceCloseSessionDelayInMin: number;
  openSessionDelayInMin: number;
  openSessionAdvanceInMin: number;
  maxStudentSeats: number;
  notAvailableTimes: { day: number; hours: number[] }[];
  enableEmail: boolean;
  cover: string;
  featureFlags: Record<TFeatureFlagsEnum, boolean>;
} & OrganizationInput;

interface OrganizationConstructorData {
  _id?: string;
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  website?: string;
  subdomain?: string;
  phoneNumber?: string;
  directorName?: string;
  configName?: string;
  gradeBookTheme?: GradeBookTheme;
  logo?: string | null;
  forceCloseSessionDelayInMin?: number;
  openSessionDelayInMin?: number;
  openSessionAdvanceInMin?: number;
  maxStudentSeats?: number;
  notAvailableTimes?: { day: number; hours: number[] }[];
  enableEmail?: boolean;
  cover?: string;
  timeZone?: string | null;
  address?: string;
  organizationSystemType?: OrganizationSystemType;
  featureFlags?: Record<TFeatureFlagsEnum, boolean>;
  zonetemplate?: ZoneTemplate;
}

export class OrganizationEntity{
    public id: string;
    public name: string;
    public phone: string;
    public email: string;
    public website: string;
    public subdomain: string;
    public phoneNumber: string;
    public directorName: string;
    public configName: string;
    public gradeBookTheme: GradeBookTheme;
    public logo: string | null;
    public forceCloseSessionDelayInMin: number;
    public openSessionDelayInMin: number;
    public openSessionAdvanceInMin: number;
    public maxStudentSeats: number;
    public notAvailableTimes: { day: number; hours: number[] }[];
    public enableEmail: boolean;
    public cover: string;
    public timeZone: string | null;
    public address: string;
    public organizationSystemType: OrganizationSystemType;
    public featureFlags: Record<TFeatureFlagsEnum, boolean>;
    public zonetemplate?: ZoneTemplate;
    constructor(
       json: OrganizationConstructorData
    ){
        this.id = json._id || json.id || '';
        this.name = json.name || '';
        this.phone = json.phone || '';
        this.email = json.email || '';
        this.website = json.website || '';
        this.subdomain = json.subdomain || '';
        this.phoneNumber = json.phoneNumber || '';
        this.directorName = json.directorName || '';
        this.configName = json.configName || '';
        this.gradeBookTheme = json.gradeBookTheme ?? GradeBookTheme.BLUE;
        this.logo = json.logo || null;
        this.forceCloseSessionDelayInMin = json.forceCloseSessionDelayInMin ?? 30;
        this.openSessionDelayInMin = json.openSessionDelayInMin ?? 15;
        this.openSessionAdvanceInMin = json.openSessionAdvanceInMin ?? 5;
        this.maxStudentSeats = json.maxStudentSeats ?? 100;
        this.notAvailableTimes = json.notAvailableTimes || [];
        this.enableEmail = json.enableEmail ?? true;
        this.cover = json.cover || '';
        this.timeZone = json.timeZone || null;
        this.address = json.address || '';
        this.organizationSystemType = json.organizationSystemType ?? OrganizationSystemType.DNC;
        this.zonetemplate = json.zonetemplate;
        this.featureFlags = json.featureFlags || {
            [FEATURE_FLAGS_ENUM.MESSAGES]: true,
            [FEATURE_FLAGS_ENUM.ANNOUNCEMENTS]: true,
            [FEATURE_FLAGS_ENUM.SMART_CALENDAR]: true,
            [FEATURE_FLAGS_ENUM.TUTORIALS]: true,
            [FEATURE_FLAGS_ENUM.DARK_MODE]: false,
            [FEATURE_FLAGS_ENUM.LMS]: false,
        };
    }
}