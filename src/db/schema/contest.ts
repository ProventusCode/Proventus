import { integer, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./Audit";
import { platformEnum } from "./Enums";

export const contest = schema.table("contest", {
  id: serial("id").primaryKey(),
  contestId: varchar("contest_id", { length: 16 }).notNull().unique(),
  name: varchar("name", { length: 128 }).notNull(),
  platform: platformEnum("platform").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  manager: varchar("manager", { length: 64 }),
  participants: integer("participants").notNull(),
  source: varchar("source", { length: 256 }),
  ...audit,
});

export type Contest = typeof contest.$inferSelect;
export type NewContest = typeof contest.$inferInsert;
