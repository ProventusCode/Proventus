import { integer, json, serial, varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { contest } from "./contest";

export interface ProblemStatistic {
  problemId: string;
  indicative: string;
  submitTime: string;
  attempts: number;
}

export const contestStanding = schema.table("contest_standing", {
  id: serial("id").primaryKey(),
  contestId: integer("contest_id")
    .notNull()
    .references(() => contest.id),
  rank: integer("rank").notNull(),
  team: varchar("team", { length: 128 }).notNull(),
  problemsSolved: integer("problems_solved").notNull(),
  penalty: integer("penalty").notNull(),
  problemStatistics: json("problem_statistics").notNull(),
  ...audit,
});

export type ContestStanding = typeof contestStanding.$inferSelect;
export type NewContestStanding = typeof contestStanding.$inferInsert;
