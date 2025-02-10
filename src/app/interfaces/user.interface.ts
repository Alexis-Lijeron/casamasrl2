import { Rol } from "./rol.interface";

export interface User {
  userId?: number;
  fullname?: string;
  username: string;
  password?: string;
  email?: string;
  telefono?: string;
  roles?: Rol[];
  token?: string;
}
