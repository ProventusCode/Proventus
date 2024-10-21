"use server";

import { database } from "@/db/drizzle";
import { problem } from "@/db/schema/problem";
import {
  NewSubmission,
  submission,
  Submission,
  SubmissionWithProblem,
} from "@/db/schema/submission";
import { DatabaseUtils } from "@/utils/DatabaseUtils";
import { and, eq, ilike, isNotNull, or } from "drizzle-orm";

export async function findSubmissionByFilter(
  keyword: string
): Promise<SubmissionWithProblem[]> {
  return await database
    .select()
    .from(submission)
    .leftJoin(problem, eq(submission.problemId, problem.problemId))
    .where(
      and(
        isNotNull(submission.sourceCode),
        or(
          ilike(submission.userName, `%${keyword}%`),
          ilike(problem.name, `%${keyword}%`)
        )
      )
    )
    .limit(100);
}

export async function findSubmissionsByContestId(
  contestId: string
): Promise<Submission[]> {
  return await database.query.submission.findMany({
    where: eq(submission.contestId, contestId),
    orderBy: [submission.submissionDateTime],
  });
}

export async function saveAllSubmission(entities: NewSubmission[]) {
  return await database
    .insert(submission)
    .values(entities)
    .onConflictDoUpdate({
      target: submission.submissionId,
      set: DatabaseUtils.conflictUpdateAllExcept(
        submission,
        DatabaseUtils.DEFAULT_IGNORED_COLUMNS
      ),
    });
}
