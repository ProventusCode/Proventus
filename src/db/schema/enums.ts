import { JudgeResultEnum } from "@/enums/JudgeResultEnum";
import { PlatformEnum } from "@/enums/PlatformEnum";
import { EnumUtils } from "@/utils/EnumUtils";
import { schema } from "../../../drizzle.config";

export const platformEnum = schema.enum(
  "platform",
  EnumUtils.enumToList(PlatformEnum)
);

export const judgeResultEnum = schema.enum(
  "result",
  EnumUtils.enumToList(JudgeResultEnum)
);
