import { createSchema } from '../../../../helpers/createSchema';
import { IEntity } from '../../../../types/entities';

export interface IHoliday extends IEntity {
  name: string;
  start: Date;
  end: Date;
}

export const holidaySchema = createSchema<IHoliday>({
  name: {
    type: String,
    unique: true,
  },
  start: Date,
  end: Date,
});
