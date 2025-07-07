import { GenerateMetaData } from "../../../core/populateTypes";
import { Guard } from "../../../shared/utils/Guards";
import { ID } from "../../../shared/value-objects/ID.vo";
import { BaseEntity } from "../../../shared/domain/baseEntity";

export class Country extends BaseEntity {
  name: string;
  code: string;
  flag: string;

  constructor(params: {
    id: ID;
    newId: string;
    name: string;
    code: string;
    flag: string;
    updatedAt?: Date;
    createdAt?: Date;
  }) {
    super(params);
    Guard.againstEmptyString(params.name, "Invalid name");
    Guard.againstEmptyString(params.code, "Invalid code");
    Guard.againstEmptyString(params.flag, "Invalid flag");
    this.name = params.name;
    this.code = params.code;
    this.flag = params.flag;
  }
}

export type CountryMetaData = GenerateMetaData<Country, never>;
