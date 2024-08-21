import { JudgeResultEnum } from "@/enums/JudgeResultEnum";
import { enumToList } from "@/utils/enumUtils";
import { integer, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { contest } from "./contest";
import { user } from "./user";

export const judgeResultEnum = schema.enum(
  "result",
  enumToList(JudgeResultEnum)
);

export const submission = schema.table("submission", {
  id: serial("id").primaryKey(),
  contestId: integer("contest_id")
    .notNull()
    .references(() => contest.id),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  problemId: integer("problem_id").notNull(),
  codeLength: integer("code_length").notNull(),
  memoryConsumed: integer("memory_consumed"),
  timeConsumed: integer("time_consumed"),
  result: judgeResultEnum("result"),
  language: varchar("language", { length: 64 }).notNull(),
  sourceCode: text("source_code"),
  submissionDateTime: timestamp("submission_date").notNull(),
  ...audit,
});

export type Submission = typeof submission.$inferSelect;
export type NewSubmission = typeof submission.$inferInsert;
