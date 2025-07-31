
export type School =  {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  subdomain: string;
  phoneNumber: string;
  directorName: string;
  dueDate: number;
  taxRate: number;
  timeZone: string | null;
  currency: string;
  logo: string | null;
  forceCloseSessionDelayInMin: number;
  openSessionDelayInMin: number;
  openSessionAdvanceInMin: number;
  maxStudentSeats: number;
  notAvailableTimes: { day: number; hours: number[] }[];
  enableSms: boolean;
  enableEmail: boolean;
  cover: string;
};

export class SchoolEntity implements School{
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
        public dueDate: number,
        public taxRate: number,
        public timeZone: string | null,
        public currency: string,
        public logo: string | null,
        public forceCloseSessionDelayInMin: number,
        public openSessionDelayInMin: number,
        public openSessionAdvanceInMin: number,
        public maxStudentSeats: number,
        public notAvailableTimes: { day: number; hours: number[] }[],
        public enableSms: boolean,
        public enableEmail: boolean,
        public cover: string,
    ){}

    static fromJSON(json: School): SchoolEntity {
        return new SchoolEntity(json.id, json.name, json.address, json.phone, json.email, json.website, json.subdomain, json.phoneNumber, json.directorName, json.dueDate, json.taxRate, json.timeZone, json.currency, json.logo, json.forceCloseSessionDelayInMin, json.openSessionDelayInMin, json.openSessionAdvanceInMin, json.maxStudentSeats, json.notAvailableTimes, json.enableSms, json.enableEmail, json.cover);
    }

    toJSON(): School {
        return {
            id: this.id,
            name: this.name,
            address: this.address,
            phone: this.phone,
            email: this.email,
            website: this.website,
            subdomain: this.subdomain,
            phoneNumber: this.phoneNumber,
            directorName: this.directorName,
            cover: this.cover,
            dueDate: this.dueDate,
            taxRate: this.taxRate,
            timeZone: this.timeZone,
            currency: this.currency,
            logo: this.logo,
            forceCloseSessionDelayInMin: this.forceCloseSessionDelayInMin,
            openSessionDelayInMin: this.openSessionDelayInMin,
            openSessionAdvanceInMin: this.openSessionAdvanceInMin,
            maxStudentSeats: this.maxStudentSeats,
            notAvailableTimes: this.notAvailableTimes,
            enableSms: this.enableSms,
            enableEmail: this.enableEmail,
        };
    }
}