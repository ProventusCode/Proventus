import { PlatformEnum } from "@/enums/PlatformEnum";
import { enumToList } from "@/utils/enumUtils";
import { integer, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";

export const platformEnum = schema.enum("platform", enumToList(PlatformEnum));

export const contest = schema.table("contest", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  platform: platformEnum("platform").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  manager: varchar("manager", { length: 64 }),
  participants: integer("participants"),
  source: varchar("source", { length: 256 }).notNull(),
  ...audit,
});

export type Contest = typeof contest.$inferSelect;
export type NewContest = typeof contest.$inferInsert;
