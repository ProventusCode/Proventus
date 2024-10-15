"use server";

import { database } from "@/db/drizzle";
import { NewProblem, problem } from "@/db/schema/problem";
import {
  NewProblemSet,
  problemSet,
  ProblemSetWithProblems,
} from "@/db/schema/problemSet";
import { DatabaseUtils } from "@/utils/DatabaseUtils";
import { eq } from "drizzle-orm";

export async function findProblemsByContestId(
  contestId: string
): Promise<ProblemSetWithProblems | undefined> {
  return await database.query.problemSet.findFirst({
    where: eq(problemSet.contestId, contestId),
    with: {
      problems: true,
    },
  });
}

export async function saveProblemSet(newProblemSet: NewProblemSet) {
  return await database
    .insert(problemSet)
    .values(newProblemSet)
    .onConflictDoUpdate({
      target: problemSet.id,
      set: DatabaseUtils.conflictUpdateAllExcept(
        problemSet,
        DatabaseUtils.TIME_COLUMNS
      ),
    })
    .returning({ insertedId: problemSet.id });
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
