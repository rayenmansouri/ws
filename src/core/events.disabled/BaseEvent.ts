import { EventEnum } from "./event.constants";
import { TEndUserEnum } from "../../constants/globalEnums";
import { SocketManager } from "./../socket/socketManager";

export type Users = {
  type: TEndUserEnum;
  id: string;
}[];

export type platformType = "web" | "mobile";

export class BaseEvent {
  tenantId: string;
  eventName: EventEnum;
  payload: any;

  constructor(tenantId: string, eventName: EventEnum, payload: any) {
    this.tenantId = tenantId;
    this.eventName = eventName;
    this.payload = payload;
  }

  protected sendToUsers(users: Users, deviceTypes?: platformType[]): void {
    const userDeviceTypes: platformType[] = !deviceTypes ? ["web", "mobile"] : deviceTypes;
    const roomIds = userDeviceTypes.flatMap(deviceType =>
      users.map(user =>
        SocketManager.getInstance().generateRoomId(this.tenantId, user.type, user.id, deviceType),
      ),
    );
    SocketManager.getInstance().emitEventToRooms(roomIds, this.eventName, this.payload);
  }
}
