"use server";

import { database } from "@/db/drizzle";
import { NewSubmission, submission, Submission } from "@/db/schema/Submission";
import { DatabaseUtils } from "@/utils/DatabaseUtils";

export async function findAllSubmission(): Promise<Submission[]> {
  return await database.query.submission.findMany();
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
