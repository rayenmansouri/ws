// Basic class group entity stub
export interface ClassGroup {
  id: string;
  name: string;
  students: string[];
  classId: string;
}

export class ClassGroupEntity {
  public id: string;
  public name: string;
  public students: string[];
  public classId: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.students = data.students || [];
    this.classId = data.classId;
  }
}