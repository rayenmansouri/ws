import { createSchema } from '../../../../helpers/createSchema';
import { IEntity } from '../../../../types/entities';

export interface IExamType extends IEntity {
  name: string;
  rank: number;
}

export const examTypeSchema = createSchema<IExamType>({
  name: {
    type: String,
    unique: true,
  },
  rank: Number,
});
