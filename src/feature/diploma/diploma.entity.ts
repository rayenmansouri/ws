import { GenerateMetaData } from "../../core/populateTypes";
import { BaseEntity } from "../../types/BaseEntity";

export const TEMPLATE_ENUM = {
  GREEN: "green",
  GOLD: "gold",
  BLUE: "blue",
  RED: "red",
  PURPLE: "purple",
} as const;
export type TTemplateEnum = (typeof TEMPLATE_ENUM)[keyof typeof TEMPLATE_ENUM];

export type Diploma = {
  name: string;
  minAverage: number;
  maxAverage: number;
  template: TTemplateEnum;
} & BaseEntity;

export type DiplomaMetaData = GenerateMetaData<Diploma, never>;
