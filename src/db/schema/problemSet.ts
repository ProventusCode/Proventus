import { integer, serial, text, varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { contest } from "./contest";

export const problemSet = schema.table("problem_set", {
  id: serial("id").primaryKey(),
  contestId: integer("contest_id")
    .notNull()
    .references(() => contest.id),
  problemsURL: text("problems_url").notNull(),
  editorialURL: text("editorial_url").notNull(),
  ...audit,
});

export type ProblemSet = typeof problemSet.$inferSelect;
export type NewProblemSet = typeof problemSet.$inferInsert;
