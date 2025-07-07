import { BaseRepo } from "../../../core/BaseRepo";
import { CountryMetaData } from "./country.entity";

export abstract class CountryRepo extends BaseRepo<CountryMetaData> {}
