import { BarCodeConfig } from "../domain/barCodeConfig.entity";
import { BarCodeConfigDto } from "../dtos/barCodeConfig.dto";

export class BarCodeConfigMapper {
  static toBarCodeConfigDto(barCode: BarCodeConfig): BarCodeConfigDto {
    return {
      _id: barCode._id,
      newId: barCode.newId,
      name: barCode.name,
      numRows: barCode.numRows,
      numCodes: barCode.numCodes,
      top: barCode.top,
      left: barCode.left,
      width: barCode.width,
      height: barCode.height,
    };
  }
}
