import { serial, text } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { contest } from "./contest";
import { relations } from "drizzle-orm";
import { Problem, problem } from "./problem";

export const problemSet = schema.table("problem_set", {
  id: serial("id").primaryKey(),
  contestId: text("contest_id")
    .notNull()
    .references(() => contest.contestId)
    .unique(),
  problemsURL: text("problems_url"),
  editorialURL: text("editorial_url"),
  ...audit,
});

export const problemSetRelations = relations(problemSet, ({ one, many }) => ({
  contest: one(contest, {
    fields: [problemSet.contestId],
    references: [contest.id],
  }),
  problems: many(problem),
}));

export type ProblemSet = typeof problemSet.$inferSelect;
export type ProblemSetWithProblems = ProblemSet & {
  problems: Problem[];
};
export type NewProblemSet = typeof problemSet.$inferInsert;
