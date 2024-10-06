import { serial, uuid } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { rolesEnum } from "./enums";

export const userRole = schema.table("user_role", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull(),
  role: rolesEnum("role").notNull(),
  ...audit,
});

export type UserRole = typeof userRole.$inferSelect;
