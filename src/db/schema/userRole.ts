import { relations } from "drizzle-orm";
import { serial, uuid } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { rolesEnum } from "./enums";
import { Resource, roleResource } from "./roleResource";
import { userInfo } from "./user";

export const userRole = schema.table("user_role", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userInfo.userId),
  role: rolesEnum("role").notNull(),
  ...audit,
});

export const userRoleRelations = relations(userRole, ({ one }) => ({
  roleResource: one(roleResource, {
    fields: [userRole.role],
    references: [roleResource.role],
  }),
  userInfo: one(userInfo, {
    fields: [userRole.userId],
    references: [userInfo.userId],
  }),
}));

export type UserRole = typeof userRole.$inferSelect;

export type UserRoleResource = UserRole & {
  roleResource?: { resources: Resource[] };
};

export type NewUserRole = typeof userRole.$inferInsert;
