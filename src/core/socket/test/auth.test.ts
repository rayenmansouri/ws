import { SocketManager } from "./../socketManager";
import { faker } from "@faker-js/faker";
import express from "express";
import http from "http";
import jwt from "jsonwebtoken";
import { io } from "socket.io-client";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { crudRepo } from "../../../database/repositories/crud.repo";
import { createRandomSchoolConnection } from "../../../helpers/testHelper/createRandomSchoolConnection";
import { ErrorSocketEnum } from "../constants/errorSocket.constants";

describe("Socket.IO Server", () => {
  let server: http.Server;
  let socketManager: SocketManager;
  let url: string;

  beforeEach(() => {
    const app = express();
    server = http.createServer(app).listen();
    SocketManager.initialize(server);
    socketManager = SocketManager.getInstance();

    const port = (server.address() as { port: number })?.port;
    url = `http://localhost:${port}`;
  });

  afterEach(() => {
    socketManager.stopServer();
    server.close();
  });

  it("should return error when missing userType", async done => {
    const clientSocket = io(url, { transports: ["websocket"] });

    clientSocket.on("connect_error", error => {
      expect(error.message).toBe(ErrorSocketEnum.INVALID_USER_TYPE);
      done();
    });
  });

  it("should return error when missing token", async done => {
    const clientSocket = io(url, { auth: { userType: END_USER_ENUM.ADMIN } });

    clientSocket.on("connect_error", error => {
      expect(error.message).toBe(ErrorSocketEnum.MISSING_TOKEN);
      done();
    });
  });

  it("should return error when token is invalid", async done => {
    const clientSocket = io(url, {
      auth: { token: "Bearer " + faker.string.alphanumeric(20), userType: END_USER_ENUM.ADMIN },
    });

    clientSocket.on("connect_error", error => {
      expect(error.message).toBe(ErrorSocketEnum.INVALID_TOKEN);
      done();
    });
  });

  it("should return invalid credential when token is valid but the school is not found", async done => {
    jest.spyOn(jwt, "verify").mockImplementation(() => ({
      id: faker.database.mongodbObjectId(),
      tenantId: faker.database.mongodbObjectId(),
    }));

    const clientSocket = io(url, {
      auth: { userType: END_USER_ENUM.ADMIN, token: "Bearer token" },
    });

    clientSocket.on("connect_error", error => {
      expect(error.message).toBe(ErrorSocketEnum.SUBDOMAIN_NOT_FOUND);
      done();
    });
  });

  it("should return invalid credential when token is valid but the user is not found", async done => {
    const school = await createRandomSchoolConnection();

    jest.spyOn(jwt, "verify").mockImplementation(() => ({
      id: faker.database.mongodbObjectId(),
      tenantId: school.id,
    }));

    const clientSocket = io(url, {
      auth: { userType: END_USER_ENUM.ADMIN, token: "Bearer token" },
    });

    clientSocket.on("connect_error", error => {
      expect(error.message).toBe(ErrorSocketEnum.USER_NOT_FOUND);
      done();
    });
  });

  it("should join the user to room when he is been authenticated successfully ", async done => {
    const school = await createRandomSchoolConnection();

    const admin = await crudRepo(school.connection, "admin").addOne({});

    jest.spyOn(jwt, "verify").mockImplementation(() => ({
      id: admin._id,
      tenantId: school.id,
    }));

    const roomId = socketManager.generateRoomId(
      school.id,
      END_USER_ENUM.ADMIN,
      admin._id.toString(),
      "mobile",
    );

    const socketServer = socketManager.io;

    const clientSocket = io(url, {
      auth: { userType: END_USER_ENUM.ADMIN, token: "Bearer token" },
    });

    clientSocket.on("connect", async () => {
      const sockets = await socketServer.in(roomId).fetchSockets();
      expect(sockets.length).toBe(1);
      done();
    });
  });
});
