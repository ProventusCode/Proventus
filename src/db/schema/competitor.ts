import { serial, text, varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";

export const competitor = schema.table("competitor", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  universityName: text("university_name"),
  ...audit,
});

export type Competitor = typeof competitor.$inferSelect;
export type NewCompetitor = typeof competitor.$inferInsert;
