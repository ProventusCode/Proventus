import { integer, json, serial, varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { competitor } from "./competitor";
import { audit } from "./audit";
import { contest } from "./contest";

export interface ProblemStatistic {
  problemId: string;
  index: string;
  submitTime: number;
  attempts: number;
}

export const contestStanding = schema.table("contest_standing", {
  id: serial("id").primaryKey(),
  contestId: varchar("contest_id", { length: 16 })
    .notNull()
    .references(() => contest.contestId),
  rank: integer("rank").notNull(),
  userName: varchar("user_name", { length: 128 })
    .notNull()
    .references(() => competitor.name),
  universityName: varchar("university_name", { length: 128 }),
  problemsSolved: integer("problems_solved").notNull(),
  totalTime: integer("total_time").notNull(),
  problemStatistics: json("problem_statistics").$type<ProblemStatistic[]>(),
  ...audit,
});

export type ContestStanding = typeof contestStanding.$inferSelect;
export type NewContestStanding = typeof contestStanding.$inferInsert;
