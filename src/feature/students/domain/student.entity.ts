// Basic student entity stub
export interface StudentMetaData {
  parentId: string;
  classId: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  parents: Array<{ _id: string }>;
}

export class StudentEntity {
  public id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public parents: Array<{ _id: string }>;

  constructor(data: any) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.parents = data.parents || [];
  }
}