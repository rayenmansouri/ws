import mongoose from "mongoose";
import { Tutorial } from "../../../feature/tutorial/domain/tutorial.entity";
import { createMongoSchema } from "../createSchema";

export const mongoTutorialSchema = createMongoSchema<Tutorial>({
  link: String,
  title: String,
  interfaceKeys: [{ type: String }],
});

export const mongoTutorialModel = mongoose.model<Tutorial>("tutorial", mongoTutorialSchema);
