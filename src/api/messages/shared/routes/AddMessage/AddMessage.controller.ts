import { Connection } from "mongoose";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { BadRequestError } from "../../../../../core/ApplicationErrors";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { TEndUserEnum, TEndUserWithoutMasterEnums } from "./../../../../../constants/globalEnums";
import { getCurrentTimeOfSchool } from "./../../../../../core/getCurrentTimeOfSchool";
import { InternalError } from "../../../../../core/ApplicationErrors";
import { AddMessageRequestDTO } from "./../../../../../feature/messages/dtos/AddMessageRequest.dto";
import { ConversationMapper } from "./../../../../../feature/messages/mappers/ConversationMapper";
import { AddMessageUseCase } from "./../../../../../feature/messages/useCases/AddMessage.usecase";
import {
  NOTIFICATION_STATUS_ENUM,
  NOTIFICATION_TYPES_ENUM,
} from "./../../../../../features/notification/constants/constants";
import { sendNotificationsToUsers } from "./../../../../../features/notification/services/helpers.service";
import { ID } from "./../../../../../types/BaseEntity";
import { AddMessageResponse, AddMessageRouteConfig } from "./AddMessage.types";

@Controller()
export class AddMessageController extends BaseController<AddMessageRouteConfig> {
  constructor(
    @inject("AddMessageUseCase")
    private readonly AddMessageUseCase: AddMessageUseCase,
    @inject("Connection") private readonly connection: Connection,
  ) {
    super();
  }

  async main(req: TypedRequest<AddMessageRouteConfig>): Promise<void | APIResponse> {
    if (
      (!req.files?.files || req.files.files.length === 0) &&
      (!req.files?.media || req.files.media.length === 0) &&
      !req.body.content
    ) {
      throw new BadRequestError("messages.eitherContentOrAttachmentMustBeProvided");
    }

    const addMessageDto: AddMessageRequestDTO = {
      files: req.files?.files ? req.files.files : [],
      media: req.files?.media ? req.files.media : [],
      links: req.body.links,
      content: req.body.content,
      replyTo: req.body.replyTo,
      userId: req.user._id,
      userNewId: req.user.newId,
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
      avatar: req.user.avatar.link,
      userType: req.userType as TEndUserEnum,
      tenantId: req.tenantId,
      fullName: req.user.fullName,
      participants: req.body.participants,
      conversationNewId: req.body.conversationNewId,
    };

    const result = await this.AddMessageUseCase.execute(addMessageDto);

    this.sendNotifications(
      {
        participants: result.allParticipants,
        newId: result.conversation.newId,
        _id: result.conversation._id,
      },
      req.user.fullName,
      req.user._id,
      req.tenantId,
    );

    return new SuccessResponse<AddMessageResponse>("global.success", {
      isNewConversation: result.isNewConversation,
      conversation: result.conversation,
      message: result.message,
    });
  }

  private sendNotifications(
    conversation: {
      participants: { id: ID; userType: TEndUserEnum }[];
      newId: string;
      _id: ID;
    },
    userFullName: string,
    currentUserId: ID,
    tenantId: string,
  ): void {
    const promises = [];

    const userIdsWithTypes = conversation.participants
      .filter(participant => participant.id !== currentUserId)
      .map(participant => {
        if (!participant.id) throw new InternalError("participant _id must be defined");
        return { userType: participant.userType, _id: participant.id };
      });

    const userTypeToUserIds = ConversationMapper.CategorizeParticipantsByUserType(userIdsWithTypes);

    for (const [userType, userIds] of Object.entries(userTypeToUserIds)) {
      promises.push(
        sendNotificationsToUsers(
          this.connection,
          userIds,
          {
            userId: "",
            message: "",
            userType: userType as TEndUserWithoutMasterEnums,
            status: NOTIFICATION_STATUS_ENUM.UNSEEN,
            date: getCurrentTimeOfSchool(tenantId),
            dynamicFieldValues: {
              $userFullName: userFullName,
            },
            topic: NOTIFICATION_TYPES_ENUM.NEW_MESSAGE_RECEIVED,
            details: {
              conversationId: conversation._id,
              conversationNewId: conversation.newId,
              senderFullName: userFullName,
            },
          },
          {
            topic: NOTIFICATION_TYPES_ENUM.NEW_MESSAGE_RECEIVED,
            userType,
            $userFullName: userFullName,
          },
        ),
      );
    }

    Promise.all(promises);
  }
}
