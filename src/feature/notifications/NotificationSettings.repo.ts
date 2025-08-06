// Basic notification settings repository stub
import { Connection, Model } from "mongoose";
import { BaseRepository } from "../../core/database/baseRepository";
import { Injectable } from "../../core/container/decorators/AutoRegister.decorator";
import { NotificationSettings, NotificationSettingsEntity } from "./NotificationSettings.entity";

@Injectable({
    identifier: "NotificationSettingsRepo",
})
export class NotificationSettingsRepo extends BaseRepository<NotificationSettings, NotificationSettingsEntity> {
    constructor() {
        super(null as any, null as any, "");
    }

    getModel(): Model<NotificationSettings> {
        // Stub implementation
        return null as any;
    }

    dto = NotificationSettingsEntity;
}