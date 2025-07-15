import { RandomUtils } from "../../../helpers/RandomUtils";
import { ID } from "../../../types/BaseEntity";
import { StudentServiceDto } from "../dtos/SchoolService.dto";

export class SchoolServiceMapper {
  static toStudentServiceDto(service: {
    _id: ID;
    name: string;
    amount: number;
    discount: number;
    amountAfterDiscount: number;
    newId: string;
    index: number;
  }): StudentServiceDto {
    return {
      _id: service._id,
      //? THIS FILED NEED TO BE REMOVED
      uuid: RandomUtils.generateUUID(),
      name: service.name,
      amountBeforeDiscount: service.amount,
      discount: service.discount,
      amountAfterDiscount: service.amountAfterDiscount,
      newId: service.newId,
      index: service.index,
    };
  }
}
