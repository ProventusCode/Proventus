import { integer, serial, text, timestamp } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { platformEnum } from "./enums";

export const contest = schema.table("contest", {
  id: serial("id").primaryKey(),
  contestId: text("contest_id").notNull().unique(),
  name: text("name").notNull(),
  platform: platformEnum("platform").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  manager: text("manager"),
  participants: integer("participants").notNull(),
  source: text("source"),
  ...audit,
});

export type Contest = typeof contest.$inferSelect;
export type NewContest = typeof contest.$inferInsert;
