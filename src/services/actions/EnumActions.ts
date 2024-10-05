"use server";

import { database } from "@/db/drizzle";
import { sql } from "drizzle-orm";
import { RowList } from "postgres";

export async function selectAllEnumValues(
  enumName: string
): Promise<RowList<Record<string, string>[]>> {
  const statement = sql.raw(
    `SELECT unnest(enum_range(NULL::${enumName})) AS label`
  );
  return await database.execute(statement);
}
