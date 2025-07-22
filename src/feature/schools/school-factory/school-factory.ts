import { SchoolSystemEnum } from "../enums";


export interface IPayload{
    timeZone:string;
    currency:string;
}
export interface ISchoolSystem{
    getPayload(): IPayload;
}

export class DncSchool implements ISchoolSystem{
    getPayload(): IPayload{
        return {
            timeZone:"Africa/tunis",
            currency:'TND'
        }
    }
}

export class LibanSchool implements ISchoolSystem{
    getPayload(): IPayload{
        return {
            timeZone:"Africa/Beirut",
            currency:'USD'
        }
    }
}

export class CarSchool implements ISchoolSystem{
    getPayload(): IPayload{
        return {
            timeZone:"Africa/Bangui",
            currency:'XAF'
        }
    }
}

export class SesameSchool implements ISchoolSystem{
    getPayload(): IPayload{
        return {
            timeZone:"Indian/Antananarivo",
            currency:'MGA'
        }
    }
}

export function schoolFactory(schoolSystem: SchoolSystemEnum): ISchoolSystem{
    switch(schoolSystem){
        case SchoolSystemEnum.DNC:
            return new DncSchool();
        case SchoolSystemEnum.CAR:
            return new CarSchool();
        case SchoolSystemEnum.LIBAN:
                return new LibanSchool();
        case SchoolSystemEnum.SESAME:
        case SchoolSystemEnum.CERES:
            return new SesameSchool();

        default:
            throw new Error("Invalid school system");
    }
}