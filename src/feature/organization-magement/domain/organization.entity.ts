


export enum GradeBookTheme {
    YELLOW = "YELLOW",
    BLUE = "BLUE",
}

export type OrganizationInput = {
    name: string;
    subdomain: string;
    phone: string;
    email: string;
    address: string
    directorName: string;
    configName: string;
    maxStudentSeats: number;
    gradeBookTheme: GradeBookTheme;
    enableEmail: boolean;
};

export type Organization = OrganizationInput & {
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
};

export class OrganizationEntity implements Organization{
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    subdomain: string;
    phoneNumber: string;
    directorName: string;
    configName: string;
    gradeBookTheme: GradeBookTheme;
    timeZone: string | null;
    logo: string | null;
    forceCloseSessionDelayInMin: number;
    openSessionDelayInMin: number;
    openSessionAdvanceInMin: number;
    maxStudentSeats: number;
    notAvailableTimes: { day: number; hours: number[] }[];
    enableEmail: boolean;
    cover: string;

    constructor(
         public organization: Organization,
    ){
        this.id = organization.id;
        this.name = organization.name;
        this.address = organization.address;
        this.phone = organization.phone;
        this.email = organization.email;
        this.website = organization.website;
        this.subdomain = organization.subdomain;
        this.phoneNumber = organization.phoneNumber;
        this.directorName = organization.directorName;
        this.configName = organization.configName;
        this.gradeBookTheme = organization.gradeBookTheme;
        this.timeZone = organization.timeZone;
        this.logo = organization.logo;
        this.forceCloseSessionDelayInMin = organization.forceCloseSessionDelayInMin;
        this.openSessionDelayInMin = organization.openSessionDelayInMin;
        this.openSessionAdvanceInMin = organization.openSessionAdvanceInMin;
        this.maxStudentSeats = organization.maxStudentSeats;
        this.notAvailableTimes = organization.notAvailableTimes;
        this.enableEmail = organization.enableEmail;
        this.cover = organization.cover;
    }

    static fromJSON(json: Organization): OrganizationEntity {
        return new OrganizationEntity(
           json
        );
    }

    toJSON(): Organization {
        return this.organization
    }
}