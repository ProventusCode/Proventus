import { JudgeResultEnum } from "@/enums/JudgeResultEnum";
import { ACRONYMS, RESULTS_MAP, SITES_MAP } from "@/services/scrap/constants";
import { StringUtils } from "./StringUtils";

export class DataUtils {
  static kbToMb(kilobytes: number): number {
    return kilobytes / 1024;
  }

  static msToSec(milliseconds: number): number {
    return milliseconds / 1000;
  }

  static separateValueWithUnit(value: string): number {
    return Number.parseInt(this.splitAndGetFirst(value)) || 0;
  }

  static splitAndGetFirst(value: string): string {
    return !value ? "" : value.split(" ")[0];
  }

  static getProblemIndex(value: string): string {
    return value.split("-")[1];
  }

  static normalizeResult(result: string): JudgeResultEnum {
    result = result.toUpperCase();
    if (result in JudgeResultEnum) {
      return JudgeResultEnum[result as keyof typeof JudgeResultEnum];
    }
    if (result in RESULTS_MAP) {
      return RESULTS_MAP[result];
    }
    return JudgeResultEnum.UNKNOWN;
  }

  static normalizeUniversityName(universityName: string): string {
    const upperCaseUniversityName = universityName
      .toUpperCase()
      .replace("Á", "A")
      .replace("É", "E")
      .replace("Í", "I")
      .replace("Ó", "O")
      .replace("Ú", "U");

    for (const [site, siteName] of Object.entries(SITES_MAP)) {
      if (upperCaseUniversityName.includes(site)) {
        return siteName;
      }
    }
    if (
      upperCaseUniversityName.includes(ACRONYMS[0]) ||
      upperCaseUniversityName.includes(ACRONYMS[1])
    ) {
      return `${ACRONYMS[0]} - N/A`;
    }
    return StringUtils.isEmptyString(universityName) ? "N/A" : universityName;
  }
}
