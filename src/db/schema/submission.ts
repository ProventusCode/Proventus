import { integer, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./Audit";
import { contest } from "./Contest";
import { judgeResultEnum } from "./Enums";
import { problem } from "./Problem";
import { competitor } from "./Competitor";

export const submission = schema.table("submission", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id").notNull().unique(),
  contestId: varchar("contest_id", { length: 32 })
    .notNull()
    .references(() => contest.contestId),
  userName: varchar("user_name", { length: 64 })
    .notNull()
    .references(() => competitor.name),
  problemId: varchar("problem_id")
    .notNull()
    .references(() => problem.problemId),
  codeLength: integer("code_length"),
  memoryConsumed: integer("memory_consumed"),
  timeConsumed: integer("time_consumed"),
  result: judgeResultEnum("result"),
  language: varchar("language", { length: 64 }),
  sourceCode: text("source_code"),
  submissionDateTime: timestamp("submission_date").notNull(),
  ...audit,
});

export type Submission = typeof submission.$inferSelect;
export type NewSubmission = typeof submission.$inferInsert;
