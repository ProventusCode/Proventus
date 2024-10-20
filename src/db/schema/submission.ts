import { integer, serial, text, timestamp } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { competitor } from "./competitor";
import { contest } from "./contest";
import { judgeResultEnum } from "./enums";
import { Problem, problem } from "./problem";
import { relations } from "drizzle-orm";

export const submission = schema.table("submission", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id").notNull().unique(),
  contestId: text("contest_id")
    .notNull()
    .references(() => contest.contestId),
  userName: text("user_name")
    .notNull()
    .references(() => competitor.name),
  problemId: text("problem_id")
    .notNull()
    .references(() => problem.problemId),
  codeLength: integer("code_length"),
  memoryConsumed: integer("memory_consumed"),
  timeConsumed: integer("time_consumed"),
  result: judgeResultEnum("result"),
  language: text("language"),
  sourceCode: text("source_code"),
  submissionDateTime: timestamp("submission_date").notNull(),
  ...audit,
});

export const submissionRelations = relations(submission, ({ one }) => ({
  problem: one(problem, {
    fields: [submission.problemId],
    references: [problem.problemId],
  }),
}));

export type Submission = typeof submission.$inferSelect;
export type NewSubmission = typeof submission.$inferInsert;

export type SubmissionWithProblem = {
  submission: Submission | null;
  problem: Problem | null;
};
