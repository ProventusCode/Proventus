import { varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";

export const country = schema.table("country", {
  code: varchar("code", { length: 3 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const city = schema.table("city", {
  code: varchar("code", { length: 5 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  country_code: varchar("country_code", { length: 3 }).notNull(),
});

export const university = schema.table("university", {
  code: varchar("code", { length: 5 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  city_code: varchar("city_code", { length: 5 }).notNull(),
});

export type Country = typeof country.$inferSelect;
export type City = typeof city.$inferSelect;
export type University = typeof university.$inferSelect;
