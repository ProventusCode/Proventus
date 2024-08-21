import { timestamp } from "drizzle-orm/pg-core/columns/timestamp";

export const audit = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
};
