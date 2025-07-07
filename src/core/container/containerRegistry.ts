import { MongoDatabaseManager } from "./../database/MongoDatabaseConnection";
import "reflect-metadata";
import { ClientSession, Connection } from "mongoose";
import { AdminRepo } from "../../feature/admins/domain/Admin.repo";
import { TLanguageEnum } from "../../translation/constants";
import { EventDispatcher } from "../domainEvents/EventDispatcher";
import { HandlerSubscriber } from "../domainEvents/HandlerSubscriber";
import { FileManager } from "../../shared/domain/FileManager";
import { CounterRepo } from "../../feature/counter/domain/Counter.repo";
import { RoleRepo } from "../../feature/authorization/domain/Role.repo";
import { CountryRepo } from "../../feature/masters/domain/Country.repo";

export type containerRegistry = {
  FileManager: FileManager;
  Language: TLanguageEnum;
  EventDispatcher: EventDispatcher;
  HandlerSubscriber: HandlerSubscriber;
  Connection: Connection;
  Session: ClientSession | undefined;
  MasterConnection: Connection;
  AdminRepo: AdminRepo;
  CounterRepo: CounterRepo;
  RoleRepo: RoleRepo;
  CountryRepo: CountryRepo;
  IDatabaseManager: MongoDatabaseManager;
};
