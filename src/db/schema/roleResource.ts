import { relations } from "drizzle-orm";
import { jsonb, serial } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { rolesEnum } from "./enums";
import { userRole } from "./userRole";

export type Resource = {
  label: string;
  href: string;
  code: string;
};

export const roleResource = schema.table("role_resource", {
  id: serial("id").primaryKey(),
  role: rolesEnum("role").notNull().unique(),
  resources: jsonb("resources").$type<Resource[]>().notNull(),
  ...audit,
});

export const roleResourceRelations = relations(roleResource, ({ many }) => ({
  userRole: many(userRole),
}));

export type RoleResource = typeof roleResource.$inferSelect;
