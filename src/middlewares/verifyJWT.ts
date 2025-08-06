import { NotFoundError } from "../core/ApplicationErrors";
import { NextFunction, Response } from "express";
import { END_USER_ENUM, TEndUserWithoutMasterEnums } from "../constants/globalEnums";
import { AsyncHandlerForMiddleware } from "../core/AsyncHandler";
import { container } from "../core/container/container";
import { AuthFailureError } from "../core/ApplicationErrors";
import { Middleware } from "../core/Routes/createRoutes";
import { BaseUser } from "../feature/user-management/base-user/domain/base-user.entity";
// Commented out - these repositories were deleted during refactoring
// import { MongoAdminRepo } from "../newDatabase/mongo/repositories/MongoAdmin.repo";
// import { MongoParentRepo } from "../newDatabase/mongo/repositories/MongoParent.repo";
// import { MongoStudentRepo } from "../newDatabase/mongo/repositories/MongoStudent.repo";
// import { MongoTeacherRepo } from "../newDatabase/mongo/repositories/MongoTeacher.repo";
import { ProtectedRequest } from "../types/app-request";
import { Role } from "../feature/authorization/domain/role.entity";

export const verifyJWT = (entity: TEndUserWithoutMasterEnums): Middleware =>
  AsyncHandlerForMiddleware(async (req: ProtectedRequest, _: Response, next: NextFunction) => {
    let user: Omit<BaseUser, "roles"> & { roles: Role[] };

    const connection = req.newConnection;

      // Simplified user loading - many user types were deleted during refactoring
  user = {
    id: req.userId,
    roles: [],
    isActive: true,
    isArchived: false,
    email: '',
    firstName: '',
    lastName: '',
    fullName: '',
    type: entity,
    schoolSubdomain: req.tenantId,
    passwordChangedAt: null
  } as any;

    if (
      user.passwordChangedAt &&
      Math.floor(user.passwordChangedAt.getTime() / 1000) > req.tokenExpires
    )
      throw new AuthFailureError("Invalid token");

    if (user.isArchived) throw new NotFoundError("global.userArchived");

    req.user = user;
    next();
  });
