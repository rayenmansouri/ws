import { Server as HTTPServer } from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { environment, tokenSecret } from "../../config";
import { END_USER_ENUM, TEndUserEnum } from "../../constants/globalEnums";
import { BaseUser } from "../../feature/users/domain/baseUser.entity";
import { ENVIRONMENT_ENUM } from "../../helpers/constants";
import { parseDate } from "../../helpers/parseDate";
import { platformType } from "../events/BaseEvent";
import { schoolDocStore } from "../subdomainStore";
import { logCompilationErrorAndExitProcess } from "./../logErrorAndExitProcess";
import { ErrorSocketEnum } from "./constants/errorSocket.constants";
import { middlewareWS, nextWS, protectsSocket } from "./index.types";
import { getNewTenantConnection } from "../../database/connectionDB/tenantPoolConnection";

const authError = (msg: ErrorSocketEnum): Error => new Error(msg);

export class SocketManager {
  private static instance: SocketManager;
  private server: HTTPServer;
  io: Server;

  private constructor(server: HTTPServer) {
    this.server = server;
    this.io = new Server(this.server, { cors: { origin: "*" } });
    this.io.use(this.authWebsocket.bind(this) as unknown as middlewareWS);
  }

  static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      logCompilationErrorAndExitProcess(new Error("Socket manager instance not created"));
    }
    return SocketManager.instance;
  }

  static initialize(server: HTTPServer): void {
    const socketManagerInstance = new SocketManager(server);
    this.instance = socketManagerInstance;
  }

  emitEventToRooms(rooms: string[], eventName: string, payload: any): void {
    if (rooms.length === 0) return;
    this.io.to(rooms).emit(eventName, parseDate(payload));
  }

  stopServer(): void {
    this.io.close();
  }

  generateRoomId(
    tenantId: string,
    userType: TEndUserEnum,
    userId: string,
    platform: platformType,
  ): string {
    return `${tenantId}_${platform}_${userType}_${userId}`;
  }

  async authWebsocket(socket: protectsSocket, next: nextWS): Promise<void> {
    try {
      const userType = this.extractUserTypeFromSocket(socket);
      const deviceType = this.getPlatformType(socket);
      this.checkUserType(userType);
      this.decodeJwtWS(socket);
      await this.addTenantConnectionToSocket(socket);

      await this.verifyJwtWS(userType, socket);

      const userRoomId = this.generateRoomId(socket.tenantId, userType, socket.userId, deviceType);
      socket.join(userRoomId);
      next();
    } catch (error) {
      if (environment === ENVIRONMENT_ENUM.TEST || environment === ENVIRONMENT_ENUM.LOCAL) {
        return next(error as Error);
      }
      return next(authError(ErrorSocketEnum.INVALID_CREDENTIAL));
    }
  }

  private extractUserTypeFromSocket = (socket: protectsSocket): TEndUserEnum => {
    return socket.handshake.auth?.userType || (socket.handshake.query.userType as TEndUserEnum);
  };

  private checkUserType(userType: string | undefined): void {
    if (
      userType != END_USER_ENUM.ADMIN &&
      userType != END_USER_ENUM.TEACHER &&
      userType != END_USER_ENUM.PARENT &&
      userType != END_USER_ENUM.STUDENT
    )
      throw authError(ErrorSocketEnum.INVALID_USER_TYPE);
  }

  private getPlatformType(socket: protectsSocket): platformType {
    const platform: string | undefined =
      socket.handshake.auth?.platform || socket.handshake.query.platform;

    if (!platform) return "web";
    if (platform != "web" && platform != "mobile") {
      throw authError(ErrorSocketEnum.INVALID_PLATFORM);
    }

    return platform;
  }

  private decodeJwtWS(socket: protectsSocket): void {
    const token: string | undefined = this.extractTokenFromSocket(socket);

    if (!token) throw authError(ErrorSocketEnum.MISSING_TOKEN);

    let decoded: jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, tokenSecret) as jwt.JwtPayload;
    } catch {
      throw authError(ErrorSocketEnum.INVALID_TOKEN);
    }
    socket.tenantId = decoded.tenantId;
    socket.userId = decoded.id;
    socket.tokenExpires = decoded.iat!;
  }

  private extractTokenFromSocket = (socket: protectsSocket): string | undefined => {
    if (
      socket.handshake.headers.authorization &&
      socket.handshake.headers.authorization?.startsWith("Bearer") &&
      environment === ENVIRONMENT_ENUM.LOCAL
    )
      return (
        socket.handshake.headers.authorization.split(" ")[1] ||
        (socket.handshake.query.token as string)?.split(" ")[1]
      );
    else
      return (
        socket.handshake.auth.token?.split(" ")[1] ||
        (socket.handshake.query.token as string)?.split(" ")[1]
      );
  };

  private addTenantConnectionToSocket = async (socket: protectsSocket): Promise<void> => {
    const schoolSubdomain = schoolDocStore[socket.tenantId]?.subdomain;
    if (!schoolSubdomain) {
      throw authError(ErrorSocketEnum.SUBDOMAIN_NOT_FOUND);
    }

    const connection = await getNewTenantConnection(schoolSubdomain);
    socket.connection = connection;
  };

  private verifyJwtWS = async (entity: TEndUserEnum, socket: protectsSocket): Promise<void> => {
    const user = (await socket.connection
      .model(entity)
      .findOne({ _id: socket.userId })
      .lean()) as unknown as BaseUser;
    if (!user) throw authError(ErrorSocketEnum.USER_NOT_FOUND);

    if (
      user.passwordChangedAt &&
      Math.floor(user.passwordChangedAt.getTime() / 1000) > socket.tokenExpires
    )
      throw authError(ErrorSocketEnum.YOU_NEED_TO_LOGIN_AGAIN);
    socket.user = user;
    socket.userType = entity;
  };
}
