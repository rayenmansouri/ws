import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";

export const ANNUAL_TERM_ID = "ANNUAL";

export type Term = {
  name: string;
  coefficient: number;
} & BaseEntity;

export type TermMetaData = GenerateMetaData<Term, never>;
