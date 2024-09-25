import { serial, varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./Audit";

export const competitor = schema.table("competitor", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 64 }).notNull().unique(),
  universityName: varchar("university_name", { length: 128 }),
  ...audit,
});

export type Competitor = typeof competitor.$inferSelect;
export type NewCompetitor = typeof competitor.$inferInsert;
