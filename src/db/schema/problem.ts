import { integer, serial, text } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { problemSet } from "./problemSet";

export const problem = schema.table("problem", {
  id: serial("id").primaryKey(),
  problemId: text("problem_id").notNull().unique(),
  problemSetId: integer("problem_set_id").references(() => problemSet.id),
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

export type Problem = typeof problem.$inferSelect;
export type NewProblem = typeof problem.$inferInsert;
