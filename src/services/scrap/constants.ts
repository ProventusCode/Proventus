import { JudgeResultEnum } from "@/enums/JudgeResultEnum";

export const UNIVERSITY_NAME = "Universidad de Cundinamarca";

export const ACRONYMS = ["UDEC", "CUNDI"];

export const SITES_MAP: Record<string, string> = {
  FACA: `${ACRONYMS[0]} - Facatativá`,
  SOACHA: `${ACRONYMS[0]} - Soacha`,
  ZIPAQUIRA: `${ACRONYMS[0]} - Zipaquirá`,
  UBATE: `${ACRONYMS[0]} - Ubaté`,
  GIRARDOT: `${ACRONYMS[0]} - Girardot`,
  FUSA: `${ACRONYMS[0]} - Fusagasugá`,
  CHIA: `${ACRONYMS[0]} - Chía`,
};

export const RESULTS_MAP: Record<string, JudgeResultEnum> = {
  "OK": JudgeResultEnum.ACCEPTED,
  "ACCEPTED": JudgeResultEnum.ACCEPTED,
  "WRONG ANSWER": JudgeResultEnum.WRONG_ANSWER,
  "TIME LIMIT EXCEEDED": JudgeResultEnum.TIME_LIMIT_EXCEEDED,
  "MEMORY LIMIT EXCEEDED": JudgeResultEnum.MEMORY_LIMIT_EXCEEDED,
  "RUNTIME ERROR": JudgeResultEnum.RUNTIME_ERROR,
  "RUN-TIME ERROR": JudgeResultEnum.RUNTIME_ERROR,
  "COMPILATION ERROR": JudgeResultEnum.COMPILATION_ERROR,
  "COMPILE ERROR": JudgeResultEnum.COMPILATION_ERROR,
  "PRESENTATION ERROR": JudgeResultEnum.PRESENTATION_ERROR,
};

