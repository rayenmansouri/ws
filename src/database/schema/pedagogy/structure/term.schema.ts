import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";

export interface ITerm extends IEntity {
  name: string;
}

export const termSchema = createSchema<ITerm>({
  name: String,
});
