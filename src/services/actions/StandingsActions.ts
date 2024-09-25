"use server";

import { database } from "@/db/drizzle";
import {
  contestStanding,
  ContestStanding,
  NewContestStanding,
} from "@/db/schema/contestStanding";
import { DatabaseUtils } from "@/utils/DatabaseUtils";

export async function findAllSubmission(): Promise<ContestStanding[]> {
  return await database.query.contestStanding.findMany();
}

export async function saveAllStandings(entities: NewContestStanding[]) {
  return await database
    .insert(contestStanding)
    .values(entities)
    .onConflictDoUpdate({
      target: contestStanding.id,
      set: DatabaseUtils.conflictUpdateAllExcept(
        contestStanding,
        DatabaseUtils.TIME_COLUMNS
      ),
    });
}
