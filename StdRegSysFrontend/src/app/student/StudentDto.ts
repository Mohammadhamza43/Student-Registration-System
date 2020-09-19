export class StudentDto {
  _id: string;
  std_ID: string;
  name: string;
  gender: string;
  date: string;
  email?: string;
  section: {
    _id: string,
    name?: string
  };
}
