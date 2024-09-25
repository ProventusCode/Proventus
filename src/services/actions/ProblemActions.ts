"use server";

import { database } from "@/db/drizzle";
import { NewProblem, problem, Problem } from "@/db/schema/problem";
import { DatabaseUtils } from "@/utils/DatabaseUtils";

export async function findProblemByContestId(
  contestId: string
): Promise<Problem[]> {
  return await database.query.problem.findMany({
    with: {
      contestId: contestId,
    },
  });
}

export async function saveAllProblems(entities: NewProblem[]) {
  return await database
    .insert(problem)
    .values(entities)
    .onConflictDoUpdate({
      target: problem.problemId,
      set: DatabaseUtils.conflictUpdateAllExcept(
        problem,
        DatabaseUtils.DEFAULT_IGNORED_COLUMNS
      ),
    });
}
