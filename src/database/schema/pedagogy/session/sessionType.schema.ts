import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";

export interface ISessionType extends IEntity {
  name: string;
}

export const sessionTypeSchema = createSchema<ISessionType>({
  name: { type: String, unique: true },
});
