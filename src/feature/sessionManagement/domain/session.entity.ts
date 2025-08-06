// Basic session entity stub
export interface IAttendance {
  studentId: string;
  status: string;
  date: Date;
}

export interface Session {
  id: string;
  name: string;
  date: Date;
  duration: number;
  attendances: IAttendance[];
}

export class SessionEntity {
  public id: string;
  public name: string;
  public date: Date;
  public duration: number;
  public attendances: IAttendance[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.date = data.date;
    this.duration = data.duration;
    this.attendances = data.attendances || [];
  }
}