import { text } from "drizzle-orm/pg-core";
import { schema } from "../../../drizzle.config";

export const country = schema.table("country", {
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
});

export const city = schema.table("city", {
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  countryCode: text("country_code")
    .notNull()
    .references(() => country.code),
});

export const university = schema.table("university", {
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  cityCode: text("city_code")
    .notNull()
    .references(() => city.code),
});

export type Country = typeof country.$inferSelect;
export type City = typeof city.$inferSelect;
export type University = typeof university.$inferSelect;
