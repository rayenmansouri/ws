export type ClassroomDTO = {
  _id: string;
  newId: string;
  name: string;
  allowAllSubjects: boolean;
  allowAllSessionTypes: boolean;
  subjectTypes: { _id: string; newId: string; name: string }[];
  sessionTypes: { _id: string; newId: string; name: string }[];
};
