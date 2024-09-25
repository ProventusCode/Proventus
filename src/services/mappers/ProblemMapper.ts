import { NewProblem } from "@/db/schema/Problem";
import { ProblemType } from "@/types/contest.types";
import { StringUtils } from "@/utils/StringUtils";

export class ProblemMapper {
  static toNewProblem(problem: ProblemType): NewProblem {
    return {
      ...problem,
      tags: StringUtils.strToList(problem.tags),
    };
  }

  static toNewProblemList(problems: ProblemType[]): NewProblem[] {
    return problems.map(this.toNewProblem);
  }
}
