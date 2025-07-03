import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";

export interface ISubSubjectType extends IEntity {
  name: string;
  preferredStartingHours: number[];
}

export const subSubjectTypeSchema = createSchema<ISubSubjectType>({
  name: String,
  preferredStartingHours: { type: [Number], default: [] },
});
