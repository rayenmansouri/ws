import { UserRepository } from "../../../feature/user-management/base-user/domain/base-user.repository";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";

@Injectable({
    identifier: "MongoTeacherRepo",
})
export class MongoTeacherRepo extends UserRepository {
    // This is a compatibility class that extends UserRepository
    // All functionality is inherited from the base UserRepository
}