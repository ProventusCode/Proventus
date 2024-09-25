import { PlatformEnum } from "@/enums/PlatformEnum";
import { schema } from "../../../drizzle.config";
import { EnumUtils } from "@/utils/EnumUtils";
import { JudgeResultEnum } from "@/enums/JudgeResultEnum";

export const platformEnum = schema.enum(
  "platform",
  EnumUtils.enumToList(PlatformEnum)
);

export const judgeResultEnum = schema.enum(
  "result",
  EnumUtils.enumToList(JudgeResultEnum)
);
