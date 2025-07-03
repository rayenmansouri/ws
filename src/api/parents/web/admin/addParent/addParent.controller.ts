import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessCreateResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddParentUseCase } from "../../../../../feature/parents/useCases/AddParent.usecase";
import { UserMapper } from "../../../../../feature/users/mappers/User.mapper";
import { AddParentResponse, AddParentRouteConfig } from "./addParent.types";

@Controller()
export class AddParentController extends BaseController<AddParentRouteConfig> {
  constructor(@inject("AddParentUseCase") private addParentUseCase: AddParentUseCase) {
    super();
  }

  async main(req: TypedRequest<AddParentRouteConfig>): Promise<void | APIResponse> {
    let avatar: FileUploadPayload | null = null;
    if (req.files?.avatar) {
      const { buffer, originalname: name, mimetype } = req.files.avatar[0];
      avatar = { buffer, name, mimetype };
    }

    const parent = await this.addParentUseCase.execute({
      ...req.body,
      students: req.body.students,
      avatar,
      roles: [],
    });

    const userProfile = UserMapper.toUserProfileDTO(parent);

    return new SuccessCreateResponse<AddParentResponse>("parent.addedSuccessfully", userProfile);
  }
}
