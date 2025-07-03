import { Connection } from "mongoose";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ReactToMessageUseCase } from "../../../../../feature/messages/useCases/ReactToMessage.usecase";
import { TEndUserEnum, TEndUserWithoutMasterEnums } from "./../../../../../constants/globalEnums";
import { getCurrentTimeOfSchool } from "./../../../../../core/getCurrentTimeOfSchool";
import { AddReactToMessageRequestDTO } from "./../../../../../feature/messages/dtos/AddReactionToMessageRequest.dto";
import {
  NOTIFICATION_STATUS_ENUM,
  NOTIFICATION_TYPES_ENUM,
} from "./../../../../../features/notification/constants/constants";
import { sendNotificationsToUsers } from "./../../../../../features/notification/services/helpers.service";
import {
  AddReactToMessageResponse,
  AddReactToMessageRouteConfig,
  SendNotificationsParams,
} from "./AddReactToMessage.types";

@Controller()
export class AddReactToMessageController extends BaseController<AddReactToMessageRouteConfig> {
  constructor(
    @inject("ReactToMessageUseCase") private reactToMessageUseCase: ReactToMessageUseCase,
    @inject("Connection") private connection: Connection,
  ) {
    super();
  }

  async main(req: TypedRequest<AddReactToMessageRouteConfig>): Promise<void | APIResponse> {
    const dto: AddReactToMessageRequestDTO = {
      messageNewId: req.params.messageNewId,
      reactionType: req.body.reactionType,
      userId: req.user._id,
      userType: req.userType as TEndUserEnum,
      tenantId: req.tenantId,
    };
    const result = await this.reactToMessageUseCase.execute(dto);

    if (req.body.reactionType && result.message.sender && result.message.sender !== req.user._id)
      this.sendNotifications({
        senderId: result.message.sender,
        senderType: result.message.senderType,
        userFullName: req.user.fullName,
        tenantId: req.tenantId,
        reactionType: req.body.reactionType,
        messageNewId: result.message.newId,
        conversationNewId: result.message.conversation.newId,
      });
    return new SuccessResponse<AddReactToMessageResponse>("global.success");
  }

  private sendNotifications(params: SendNotificationsParams): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    sendNotificationsToUsers(
      this.connection,
      [params.senderId],
      {
        userId: "",
        message: "",
        userType: params.senderType as TEndUserWithoutMasterEnums,
        status: NOTIFICATION_STATUS_ENUM.UNSEEN,
        date: getCurrentTimeOfSchool(params.tenantId),
        dynamicFieldValues: {
          $userFullName: params.userFullName,
        },
        topic: NOTIFICATION_TYPES_ENUM.NEW_REACTION_ON_MESSAGE,
        details: {
          userFullName: params.userFullName,
          messageNewId: params.messageNewId,
          conversationNewId: params.conversationNewId,
          reactionType: params.reactionType,
        },
      },
      {
        topic: NOTIFICATION_TYPES_ENUM.NEW_MESSAGE_RECEIVED,
        senderType: params.senderType,
        $userFullName: params.userFullName,
      },
    );
  }
}
