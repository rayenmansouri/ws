
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
    constructor(
        public id: string,
        public name: string,
        public address: string,
        public phone: string,
        public email: string,
        public website: string,
        public subdomain: string,
        public phoneNumber: string,
        public directorName: string,
        public configName: string,
        public gradeBookTheme: GradeBookTheme,
        public logo: string | null,
        public forceCloseSessionDelayInMin: number,
        public openSessionDelayInMin: number,
        public openSessionAdvanceInMin: number,
        public maxStudentSeats: number,
        public notAvailableTimes: { day: number; hours: number[] }[],
        public cover: string,
        public timeZone: string | null,
        public enableEmail: boolean,
    ){}


}