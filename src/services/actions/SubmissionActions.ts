"use server";

import { database } from "@/db/drizzle";
import { problem } from "@/db/schema/problem";
import { NewSubmission, submission, Submission } from "@/db/schema/submission";
import { DatabaseUtils } from "@/utils/DatabaseUtils";
import { eq, ilike, or } from "drizzle-orm";

export async function findSubmissionByFilter(keyword: string) {
  return await database
    .select({})
    .from(submission)
    .where(or(ilike(submission.userName, `%${keyword}%`)))
    .innerJoin(problem, eq(submission.problemId, problem.problemId));
}

export async function findSubmissionsByContestId(
  contestId: string
): Promise<Submission[]> {
  return await database.query.submission.findMany({
    where: eq(submission.contestId, contestId),
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
