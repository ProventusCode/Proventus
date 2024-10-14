import { integer, jsonb, serial, text, varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { competitor } from "./competitor";
import { contest } from "./contest";

export interface ProblemStatistic {
  problemId: string;
  index: string;
  submitTime: number;
  attempts: number;
}

export const contestStanding = schema.table("contest_standing", {
  id: serial("id").primaryKey(),
  contestId: text("contest_id")
    .notNull()
    .references(() => contest.contestId),
  rank: integer("rank").notNull(),
  userName: text("user_name")
    .notNull()
    .references(() => competitor.name),
  universityName: text("university_name"),
  problemsSolved: integer("problems_solved").notNull(),
  totalTime: integer("total_time").notNull(),
  problemStatistics: jsonb("problem_statistics").$type<ProblemStatistic[]>(),
  ...audit,
});

export type ContestStanding = typeof contestStanding.$inferSelect;
export type NewContestStanding = typeof contestStanding.$inferInsert;
