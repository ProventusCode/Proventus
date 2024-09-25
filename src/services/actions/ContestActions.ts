"use server";

import { database } from "@/db/drizzle";
import { contest, Contest, NewContest } from "@/db/schema/contest";
import { DatabaseUtils } from "@/utils/DatabaseUtils";
import { eq } from "drizzle-orm";

export async function findAllContest(): Promise<Contest[]> {
  return await database.query.contest.findMany();
}

export async function findContestById(
  contestId: string
): Promise<Contest | undefined> {
  return await database.query.contest.findFirst({
    where: eq(contest.contestId, contestId),
  });
}

export async function saveContest(entity: NewContest): Promise<Contest[]> {
  return await database
    .insert(contest)
    .values(entity)
    .onConflictDoUpdate({
      target: contest.contestId,
      set: DatabaseUtils.conflictUpdateAllExcept(
        contest,
        DatabaseUtils.DEFAULT_IGNORED_COLUMNS
      ),
    });
}
