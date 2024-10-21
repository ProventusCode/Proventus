import { NewProblem, Problem } from "@/db/schema/problem";
import { ProblemSetWithProblems } from "@/db/schema/problemSet";
import { ProblemType } from "@/types/contest.types";
import { StringUtils } from "@/utils/StringUtils";

export class ProblemMapper {
  static toNewProblem(problem: ProblemType, problemSetId: number): NewProblem {
    return {
      ...problem,
      tags: StringUtils.strToList(problem.tags),
      problemSetId,
    };
  }

  static toNewProblemList(
    problems: ProblemType[],
    problemSetId: number
  ): NewProblem[] {
    return problems.map((problem) => ({
      ...this.toNewProblem(problem, problemSetId),
    }));
  }

  static toProblemType(problem: Problem): ProblemType {
    return {
      ...problem,
      tags: StringUtils.listToStr(problem.tags),
    };
  }

  static async toProblemTypeListAsync(
    problems: Promise<ProblemSetWithProblems | undefined>
  ): Promise<ProblemType[]> {
    const problemsSet = await problems;

    return problemsSet?.problems?.map(this.toProblemType) || [];
  }
}
