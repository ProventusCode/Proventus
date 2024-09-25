"use server";

import { database } from "@/db/drizzle";
import { competitor, NewCompetitor } from "@/db/schema/Competitor";
import { DatabaseUtils } from "@/utils/DatabaseUtils";

export async function saveAllCompetitors(entities: NewCompetitor[]) {
  return await database
    .insert(competitor)
    .values(entities)
    .onConflictDoUpdate({
      target: competitor.name,
      set: DatabaseUtils.conflictUpdateAllExcept(
        competitor,
        DatabaseUtils.DEFAULT_IGNORED_COLUMNS
      ),
    });
}
