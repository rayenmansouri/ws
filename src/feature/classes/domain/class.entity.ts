// Basic class entity stub
export interface Class {
  id: string;
  name: string;
  students: string[];
  teacherId: string;
}

export class ClassEntity {
  public id: string;
  public name: string;
  public students: string[];
  public teacherId: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.students = data.students || [];
    this.teacherId = data.teacherId;
  }
}