"use server";

import { database } from "@/db/drizzle";
import {
  contestStanding,
  ContestStanding,
  NewContestStanding,
} from "@/db/schema/contestStanding";
import { DatabaseUtils } from "@/utils/DatabaseUtils";
import { eq } from "drizzle-orm";

export async function findStandingsByContestId(
  contestId: string
): Promise<ContestStanding[]> {
  return await database.query.contestStanding.findMany({
    where: eq(contestStanding.contestId, contestId),
    orderBy: [contestStanding.rank],
  });
}

export async function saveAllStandings(entities: NewContestStanding[]) {
  return await database
    .insert(contestStanding)
    .values(entities)
    .onConflictDoUpdate({
      target: contestStanding.id,
      set: DatabaseUtils.conflictUpdateAllExcept(
        contestStanding,
        DatabaseUtils.DEFAULT_IGNORED_COLUMNS
      ),
    });
}
