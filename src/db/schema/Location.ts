import { varchar } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";

export const country = schema.table("country", {
  code: varchar("code", { length: 3 }).notNull().unique(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const city = schema.table("city", {
  code: varchar("code", { length: 5 }).notNull().unique(),
  name: varchar("name", { length: 256 }).notNull(),
  countryCode: varchar("country_code", { length: 3 })
    .notNull()
    .references(() => country.code),
});

export const university = schema.table("university", {
  code: varchar("code", { length: 5 }).notNull().unique(),
  name: varchar("name", { length: 256 }).notNull(),
  cityCode: varchar("city_code", { length: 5 })
    .notNull()
    .references(() => city.code),
});

export type Country = typeof country.$inferSelect;
export type City = typeof city.$inferSelect;
export type University = typeof university.$inferSelect;
