import { Role } from "@/generate/prisma";
export interface AdminDataDto {
  id: number;
  name: String;
  email: String;
  password: String;
  role: Role;
}
