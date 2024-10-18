import { integer, serial, text } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { problemSet } from "./problemSet";
import { relations } from "drizzle-orm";
import { submission } from "./submission";

export const problem = schema.table("problem", {
  id: serial("id").primaryKey(),
  problemId: text("problem_id").notNull().unique(),
  problemSetId: integer("problem_set_id")
    .references(() => problemSet.id)
    .notNull(),
  index: text("index").notNull(),
  name: text("name").notNull(),
  rating: integer("rating"),
  tags: text("tags").array(),
  author: text("author"),
  origin: text("origin"),
  timeLimit: integer("time_limit"),
  memoryLimit: integer("memory_limit"),
  ...audit,
});

export const problemRelations = relations(problem, ({ one, many }) => ({
  problemSet: one(problemSet, {
    fields: [problem.problemSetId],
    references: [problemSet.id],
  }),
  submission: many(submission),
}));

export type Problem = typeof problem.$inferSelect;
export type NewProblem = typeof problem.$inferInsert;
