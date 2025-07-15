import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";

export interface ISubjectType extends IEntity {
  name: string;
  preferredStartingHours: number[];
  illustration: string;
}

export const subjectTypeSchema = createSchema<ISubjectType>({
  name: String,
  preferredStartingHours: { type: [Number], default: [] },
  illustration: String,
});
