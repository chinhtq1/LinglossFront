import { Language } from './language';

export interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  languages: Language[];
  disciplines: string[];
}
