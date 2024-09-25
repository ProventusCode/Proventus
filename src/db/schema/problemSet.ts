import { integer, serial, varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./Audit";
import { contest } from "./Contest";

export const problemSet = schema.table("problem_set", {
  id: serial("id").primaryKey(),
  contestId: integer("contest_id")
    .notNull()
    .references(() => contest.id),
  problemsURL: varchar("problems_url", { length: 256 }).notNull(),
  editorialURL: varchar("editorial_url", { length: 256 }).notNull(),
  ...audit,
});

export type ProblemSet = typeof problemSet.$inferSelect;
export type NewProblemSet = typeof problemSet.$inferInsert;
