import { Role } from "../common/enums/role.enum"

export interface ICurrentUser {
  userId: string;
  role: Role;
  username: string;
}
