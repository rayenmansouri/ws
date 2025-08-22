import { OrganizationSystemType, TFeatureFlagsEnum, FEATURE_FLAGS_ENUM, ZoneTemplate } from "../enums";
import { createOrganization } from "./organization.validation";
import { z } from "zod";

export enum GradeBookTheme {
    YELLOW = "YELLOW",
    BLUE = "BLUE",
}
export type OrganizationInput = z.infer<typeof createOrganization>;

export type Organization ={
  id: string;
  timeZone: string | null;
  logo: string | null;
  featureFlags: Record<TFeatureFlagsEnum, boolean>;
} & OrganizationInput;

export class OrganizationEntity {
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
    public country: string;
    
    constructor(
       json: any
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
        this.country = json.country || '';
    }
}