import { Role } from "@prisma/client";

export interface AdminDataDto {
  id: number;
  name: String;
  email: String;
  password: String;
  role: Role;
}
