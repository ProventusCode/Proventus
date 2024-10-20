import { NewUserInfo, UserInfoDTO } from "@/db/schema/user";
import { NewUserRole, UserRole } from "@/db/schema/userRole";
import { RoleEnum } from "@/enums/RoleEnum";
import { UserType } from "@/types/contest.types";

export class UserMapper {
  static toUserType(userInfo: UserInfoDTO): UserType {
    return {
      id: userInfo.userId,
      name: userInfo.name,
      email: userInfo.email,
      university: userInfo.universityCode,
      role: userInfo.userRole.role as RoleEnum,
    };
  }

  static toNewUserInfo(user: UserType): NewUserInfo {
    return {
      userId: user.id ?? "",
      name: user.name,
      email: user.email,
      universityCode: user.university,
    };
  }

  static toUpdateUserRole(user: UserType): NewUserRole {
    return {
      userId: user.id ?? "",
      role: user.role,
    };
  }
}
