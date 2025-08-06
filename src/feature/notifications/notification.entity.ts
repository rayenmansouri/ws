// Basic notification entity stub
export interface Notification {
  id: string;
  title: string;
  message: string;
  userId: string;
  read: boolean;
  createdAt: Date;
}

export class NotificationEntity {
  public id: string;
  public title: string;
  public message: string;
  public userId: string;
  public read: boolean;
  public createdAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.message = data.message;
    this.userId = data.userId;
    this.read = data.read;
    this.createdAt = data.createdAt;
  }
}