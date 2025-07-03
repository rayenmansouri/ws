import mongoose, { ObjectId } from 'mongoose';
import { createSchema } from '../../../../helpers/createSchema';
import { IEntity } from '../../../../types/entities';

export interface IClassroom extends IEntity {
  name: string;
  floor: number;
  allSubjectTypes: boolean;
  subjectTypes: ObjectId[];
  sessionTypes: ObjectId[];
  allSessionTypes: boolean;
}

export const classroomSchema = createSchema<IClassroom>({
  name: String,
  floor: Number,
  allSubjectTypes: Boolean,
  subjectTypes: [{ type: mongoose.Types.ObjectId, ref: 'subjectType', default: [] }],
  allSessionTypes: Boolean,
  sessionTypes: [{ type: mongoose.Types.ObjectId, ref: 'sessionType', default: [] }],
});
