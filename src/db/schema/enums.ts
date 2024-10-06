import { JudgeResultEnum } from "@/enums/JudgeResultEnum";
import { PlatformEnum } from "@/enums/PlatformEnum";
import { EnumUtils } from "@/utils/EnumUtils";
import { schema } from "../../../drizzle.config";
import { RoleEnum } from "@/enums/RoleEnum";

export const platformEnum = schema.enum(
  "platform_enum",
  EnumUtils.enumToList(PlatformEnum)
);

export const judgeResultEnum = schema.enum(
  "result_enum",
  EnumUtils.enumToList(JudgeResultEnum)
);

export const tag_enum = schema.enum("tag_enum", [""]);

export const rolesEnum = schema.enum(
  "role_enum",
  EnumUtils.enumToList(RoleEnum)
);
