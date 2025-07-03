import { BarCodeConfig } from "../../../feature/barCode/domain/barCodeConfig.entity";
import { createMongoSchema } from "../createSchema";

export const mongoBarCodeConfigSchema = createMongoSchema<BarCodeConfig>({
  name: { type: String },
  numRows: { type: Number },
  numCodes: { type: Number },
  top: { type: Number },
  left: { type: Number },
  width: { type: Number },
  height: { type: Number },
});
