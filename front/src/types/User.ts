import { Role } from "./roles";

export interface User {
  id: string;
  key?: string | number;
  name: string;
  lastname: string;
  email: string;
  role: Role;
  status: "active" | "desactive";
  created_at_show?: string;
}
