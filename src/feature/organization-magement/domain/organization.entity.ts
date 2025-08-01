
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
    constructor(
       json:any
    ){
        this.id = json.id;
        this.name = json.name;
        this.phone = json.phone;
        this.email = json.email;
        this.website = json.website;
        this.subdomain = json.subdomain;
        this.phoneNumber = json.phoneNumber;
        this.directorName = json.directorName;
        this.configName = json.configName;
        this.gradeBookTheme = json.gradeBookTheme;
        this.logo = json.logo;
        this.forceCloseSessionDelayInMin = json.forceCloseSessionDelayInMin;
        this.openSessionDelayInMin = json.openSessionDelayInMin;
        this.openSessionAdvanceInMin = json.openSessionAdvanceInMin;
        this.maxStudentSeats = json.maxStudentSeats;
        this.notAvailableTimes = json.notAvailableTimes;
        this.enableEmail = json.enableEmail;
        this.cover = json.cover;
        this.timeZone = json.timeZone;
    }


}