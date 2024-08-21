import { integer, serial, varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";

export const user = schema.table("user", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 128 }).notNull().unique(),
  universityCode: integer("university_code").notNull(),
  ...audit,
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
