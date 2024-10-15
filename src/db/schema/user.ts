import { relations } from "drizzle-orm";
import { serial, text, uuid } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";
import { audit } from "./audit";
import { University, university } from "./location";
import { UserRole, userRole } from "./userRole";

export const userInfo = schema.table("user", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  universityCode: text("university_code").references(() => university.code),
  ...audit,
});

export const userInfoRelations = relations(userInfo, ({ one }) => ({
  userRole: one(userRole, {
    fields: [userInfo.userId],
    references: [userRole.userId],
  }),
  university: one(university, {
    fields: [userInfo.universityCode],
    references: [university.code],
  }),
}));

export type UserInfo = typeof userInfo.$inferSelect;
export type UserInfoDTO = UserInfo & {
  userRole: UserRole;
  university: University | null;
};
export type NewUserInfo = typeof userInfo.$inferInsert;
