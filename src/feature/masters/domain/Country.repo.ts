import { CountryMetaData } from "./Country.entity";
import { BaseRepo } from "../../../core/BaseRepo";

export abstract class CountryRepo extends BaseRepo<CountryMetaData> {}
