import { integer, serial, varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { problemSet } from "./problemSet";

export const problem = schema.table("problem", {
  id: serial("id").primaryKey(),
  problemSetId: integer("problem_set_id").references(() => problemSet.id),
  name: varchar("name", { length: 128 }).notNull(),
  rating: integer("rating"),
  tags: varchar("tags", { length: 64 }).array(),
  author: varchar("author", { length: 64 }),
  timeLimit: integer("time_limit"),
  memoryLimit: integer("memory_limit"),
  ...audit,
});

export type Problem = typeof problem.$inferSelect;
export type NewProblem = typeof problem.$inferInsert;
