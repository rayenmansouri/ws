import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";

export type Tutorial = {
  link: string;
  title: string;
  interfaceKeys: string[];
} & BaseEntity;

export type TutorialMetaData = GenerateMetaData<Tutorial, never>;
